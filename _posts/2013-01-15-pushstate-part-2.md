---
layout: default
title: history.pushState, Part 2
---
Following on from my <a href="http://rosspenman.com/pushstate-jquery">introduction to `history.pushState`</a>, I thought I'd share a tip on making it more efficient.

When we load in new content with AJAX, we only really use the main part of the document, `<main>` in my case. Headers and footers, etc. are discarded. One way could detect this is my appending a query string to the end of the URL, so http://rosspenman.com/sass-web-fonts would become http://rosspenman.com/sass-web-fonts?ajax=yes. But there is an even more elegant way to do it.

<del>I use PHP and WordPress on this site</del>, but this should be applicable to any other server-side language or framework.

With WordPress, all of your theme functions are set in a file called `functions.php`, which, because it declares all of your functions, is run before any other file in your theme. In this file, we can set a boolean variable, `$ajax`, that tell us whether or not the current page is being loaded by AJAX.

{% highlight php startinline %}
$ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
{% endhighlight %}

And then later on, when we would usually use `get_header();` and `get_footer();`, we can check to see if the page is being loaded with AJAX, and only include them if it is not.

{% highlight php startinline %}
if (!$ajax) get_header();
// Main code
if (!$ajax) get_footer();
{% endhighlight %}

The only part of the page now missing when the page is being loaded with AJAX is the title, which we can simply output in `functions.php` if necessary.

{% highlight php startinline %}
$ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
if ($ajax) {
  echo '<title>'; wp_title(); echo '</title>';
}
{% endhighlight %}

And that's it!
