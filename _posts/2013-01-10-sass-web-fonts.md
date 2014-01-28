---
layout: default
title: Easy Google Web Fonts with Sass
---
I recently wrote a Sass `@mixin` that makes [Google Web Fonts](http://google.com/webfonts) easier. You can download it and read the full documentation over at [GitHub](https://github.com/penman/web-fonts.scss), but here’s a quick tutorial.

The basic syntax is this:

{% highlight scss %}
@import "web-fonts";
@include web-font((Open Sans));
{% endhighlight %}

Where “Open Sans” is the font we want to import.

Multiple fonts can be specified like this.

{% highlight scss %}
@import "web-fonts";
@include web-font((Open Sans, Damion));
{% endhighlight %}

Here, Open Sans and Damion will be imported.

We can also specify font variants.

{% highlight scss %}
@import "web-fonts";
@include web-font(
  (Open Sans , Damion),
  (italic 500, italic)
);
{% endhighlight %}

Both Open Sans and Damion will be imported with both their normal and italic variants, and Open Sans will have a weight of 500, while Damion will have the default weight of 400.

You may use the following tokens in the variants parameter:

* <i>italic</i> (<i><abbr title="italic">i</abbr></i> for short)
* <b>bold</b> (<b><abbr title="bold">b</abbr></b> for short)
* <b><i><abbr title="bold italic">bolditalic</abbr></i></b> (<b><i><abbr title="bold italic">bi</abbr></i></b> for short)
* Numeric weights (e.g. 700)

Multiple tokens can be specified and would be separated by spaces.
The index of the specified variants in the parameter determines which font it will be applied to. (For example, the first variant is applied to the first font.)

That's it for this tutorial. There are some more advanced features though, so I encourage you to check out the more complete documentation on [GitHub](https://github.com/penman/web-fonts.scss), where you can also contribute to the project and help it grow.
