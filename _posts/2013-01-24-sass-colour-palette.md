---
layout: default
title: Generating a Colour Palette with Sass
---
When people talk about Sass, they usually describe the big features like nesting and variables, but forget about all of the other stuff that makes it awesome.

I recently made use of two of these lesser-known features: loops and color functions, to automatically generate a good-looking color palette.

## `adjust-hue`

The `adjust-hue` function allows you to adjust the hue of a color by a given value in degrees. Like this:

{% highlight scss %}
$blue: adjust-hue(red, 240deg);
{% endhighlight %}

That's all there is to it. You can already see how powerful this can be. Adjusting hues is a sure-fire way to get colors that look great together.

## `@for` Loops

You might be familiar with for loops in programming languages, but, while it may not seem like it would be, it can be incredibly useful in <abbr title="Cascading StyleSheets">CSS</abbr> as well, especially when combined with the <abbr title="Cascading StyleSheets Level 3">CSS3</abbr> `:nth-child()` selector.

So we could do this.

{% highlight scss %}
@for $i from 1 to 5 {
  body :nth-child(#{$i}) {
    left: $i * 5px;
  }
}
{% endhighlight %}

## Creating the color palette

If we have a container element `.container`, and 6 `<div>`s inside (one for each color), we can do this:

{% highlight scss %}
.container div {
  width: 3em;
  height: 3em;
  display: inline-block;

  $num-colors: 6;
  $base-color: #c24;

  @for $i from 0 to $num-colors {
    &:nth-child(#{$i}) {
      background: adjust-hue($base-color, 360deg / $num-colors * $i);
    }
  }
}
{% endhighlight %}

`360deg` is assuming you want the colors to span the entire visible spectrum. If you want to say, have your colors range only half the spectrum, use `180deg` instead of `360deg`, and you can add some extra degrees on if you want to offset where in the spectrum the colors start.

Here is an example of a more advanced color palette.

{% highlight scss %}
.container div {
  width: 3em;
  height: 3em;
  display: inline-block;

  $num-colors: 6;
  $base-color: #c24;
  $spectrum: 180deg;
  $offset: 30deg;

  @for $i from 0 to $num-colors {
    &:nth-child(#{$i}) {
      background: adjust-hue($base-color, $offset + $spectrum / $num-colors * $i);
    }
  }
}
{% endhighlight %}
