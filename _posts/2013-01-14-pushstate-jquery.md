---
layout: default
title: history.pushState and jQuery
---
## Introduction to `history.pushState`

Everybody knows that <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> is awesome, but the real problem up to this point is that you would have to use URLs with hashes and your content might not show up if a user did not have <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> available. HTML5 includes the `history.pushState` API, which allows you to add history entries and change the URL currently displayed in the browser.

`history.pushState` is becoming more and more popular, particularly after it was implemented at <a href="https://github.com">GitHub</a>.

The basic syntax for `history.pushState` is this:

{% highlight javascript %}
history.pushState({id: 'SOME ID'}, '', 'myurl.html');
{% endhighlight %}

If the current URL in the browser is http://rosspenman.com/path/to/page.html, the url will become http://rosspenman.com/path/to/myurl.html, just as if a link had been followed, and add this URL as a history entry.

As you can see, it takes three parameters. The first is an object that you will use to identify the history entry later, the second is referred to as the 'title' parameter, but is not currently implemented in any browser. <a href="https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method">Mozilla recommend either passing it an empty string, or a short title for the new state.</a>

The final parameter is the URL you want to link the new state to. This doesn't have to exist on the server, and it can be relative or absolute, however, as with <abbr title="Asynchronous JavaScript and XML">AJAX</abbr>, you cannot use a domain other than the current one. (If you need to find the current domain with JavaScript, you can use `document.domain`).

## Making links use `history.pushState`

The ideal use for `history.pushState` is using it for every link on your site that links to another page on your site, while ignoring those that go to other sites.

First, we will use <a href="http://jquery.com">jQuery</a> to get links on our site using `history.pushState` by default.

{% highlight javascript %}
$(function() {
  $("a, area").click(function() {
    history.pushState({}, '', $(this).attr("href"));
    return false;
  });
});
{% endhighlight %}

This code selects both `<a>` and `<area>` elements, which are the two elements that create links. (`<area>` isn't very well known, and is used when making image maps.)

It then uses `history.pushState` to add a history entry to the browser with the `href` attribute of the link.

Finally, it returns `false` in order to prevent the default browser behaviour, which in this case would follow the link.

Now we need to use <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> to load in the new content.

For most sites, there are header and footer areas, which don't change, and a main area, which does. When using <abbr title="Asynchronous JavaScript and XML">AJAX</abbr>, it's really only the main area you need to change. jQuery makes it very easy for us to replace only the contents of one element with the contents of another loaded via <abbr title="Asynchronous JavaScript and XML">AJAX</abbr>.

I use the proposed `<main>` element for this, but you may opt for something more stable, such as the classic `<div id="main">`. In this case, you can very easily modify the jQuery selector in the following code to your situation.

{% highlight javascript %}
$(function() {
  var $main = $("main");

  $("a, area").click(function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href + " main>*");
    return false;
  });
});
{% endhighlight %}

The selector `main>*` loads all of the children of the new `<main>` element from the new page, and replace the current contents of the current `<main>` element with the new contents.

I store the `<main>` element in the `$main` variable in order to keep the amount of jQuery function calls as low as possible, to keep the page changes fluid.

But there's a problem with this code. The `a, area` selector is only run once, so if there are any new links in the content that gets loaded, clicking on them will open the link normally. To fix this we have to select the elements a different way. Modifying the code as follows:

{% highlight javascript %}
$(function() {
  var $main = $("main");

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href + " main>*");
    return false;
  });
});
{% endhighlight %}

Sometimes there is code that we want to run when a page loads, such as syntax highlighting scripts. We can call this function once the page loads, by wrapping it in a function and using it as a callback for the <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> load.

{% highlight javascript %}
$(function() {
  var $main = $("main"),
      
      init = function() {
        // Do this when a page loads.
      };
  
  init();

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href + " main>*", init);
    return false;
  });
});
{% endhighlight %}

Sometimes, we want to do something only after the page has been <abbr title="Asynchronous JavaScript and XML">AJAX</abbr>ed, such as updating the document title to reflect the title of the <abbr title="Asynchronous JavaScript and XML">AJAX</abbr>ed page, so we wrap the `init` callback in another function, which is only called after an <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> request, not when the page has loaded.

{% highlight javascript %}
$(function() {
  var $main = $("main"),
  
      init = function() {
        // Do this when a page loads.
      },
      
      ajaxLoad = function(html) {
        document.title = html
          .match(/<title>(.*?)<\/title>/)[1]
          .trim();

        init();
      };
  
  init();

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href + " main>*", ajaxLoad);
    return false;
  });
});
{% endhighlight %}

This uses a regular expression to find the title in the new document, and change the current title to match. The one problem with this is that HTML entities will not be decoded when added to the title. We can extend the `String` prototype to add a method to do this.

{% highlight javascript %}
$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("main"),
  
      init = function() {
        // Do this when a page loads.
      },
      
      ajaxLoad = function(html) {
        document.title = html
          .match(/<title>(.*?)<\/title>/)[1]
          .trim()
          .decodeHTML();

        init();
      };
  
  init();

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href + " main>*", ajaxLoad);
    return false;
  });
});
{% endhighlight %}

This code still tries to `history.pushState` and <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> even if the URL is not local. We need to add a check for this.

{% highlight javascript %}
$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("main"),
  
      init = function() {
        // Do this when a page loads.
      },
      
      ajaxLoad = function(html) {
        document.title = html
          .match(/<title>(.*?)<\/title>/)[1]
          .trim()
          .decodeHTML();

        init();
      };
  
  init();

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    if (href.indexOf(document.domain) > -1
      || href.indexOf(':') === -1)
    {
      history.pushState({}, '', href);
      $main.load(href + " main>*", ajaxLoad);
      return false;
    }
  });
});
{% endhighlight %}

If the link is external, it will now be opened as normal.
It is important to note that if you link to a subdomain, this will cause a problem. If this will be an issue for you, ensure to modify the condition to something more suitable.

The final thing we need to address is that currently, the back button will not work after an <abbr title="Asynchronous JavaScript and XML">AJAX</abbr> call. We need to listen for the back button being clicked, and manually perform what the browser probably should be doing for us. Since we will be loading in new content from different events, we will need to move it into its own function.

{% highlight javascript %}
$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("main"),
  
  init = function() {
    // Do this when a page loads.
  },
  
  ajaxLoad = function(html) {
    document.title = html
      .match(/<title>(.*?)<\/title>/)[1]
      .trim()
      .decodeHTML();

    init();
  },
  
  loadPage = function(href) {
    $main.load(href + " main>*", ajaxLoad);
  };
  
  init();
  
  $(window).on("popstate", function() {
    loadPage(location.href);
  });

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    if (href.indexOf(document.domain) > -1
      || href.indexOf(':') === -1)
    {
      history.pushState({}, '', href);
      loadPage(href);
      return false;
    }
  });
});
{% endhighlight %}

We use the `popstate` event listener to detect when a `history.pushState` is undone by the press of a back button, then we load the page referenced by the current URL, which will already have been changed for us.

This code will work, but there is one final awkwardness. The `popstate` event is fired on the initial page loads, so that page will be requested again unnecessarily. Luckily, there is a way to avoid this.

{% highlight javascript %}
$(function() {
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
  };

  var $main = $("main"),
  
  init = function() {
    // Do this when a page loads.
  },
  
  ajaxLoad = function(html) {
    document.title = html
      .match(/<title>(.*?)<\/title>/)[1]
      .trim()
      .decodeHTML();

    init();
  },
  
  loadPage = function(href) {
    $main.load(href + " main>*", ajaxLoad);
  };
  
  init();
  
  $(window).on("popstate", function(e) {
    if (e.originalEvent.state !== null) {
      loadPage(location.href);
    }
  });

  $(document).on("click", "a, area", function() {
    var href = $(this).attr("href");

    if (href.indexOf(document.domain) > -1
      || href.indexOf(':') === -1)
    {
      history.pushState({}, '', href);
      loadPage(href);
      return false;
    }
  });
});
{% endhighlight %}

By checking whether the event's `state` is null, this will tell us if this is the first page requested on our site. If it is not the first page, the `state` will be the identifier you specified earlier in the first parameter of `history.pushState`.

That should be all you need to get your site working with `history.pushState`.
