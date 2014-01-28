---
layout: default
title: Choosing Your Breakpoints
---
For a lot of people, choosing their breakpoints is a simple case of Googling to find the resolutions of the iPad and iPhone. But we are living in a fast-moving world where the most common devices now will soon be replaced by different devices, with different resolutions.

We should be picking breakpoints not based on device resolutions, but how well our sites look at different resolutions. A lot of people have recently been pointing out that browsing the web with a window 767 pixels wide is a painful experience.

> Start with the small screen first, then expand until it looks like shit. TIME FOR A BREAKPOINT!
<address>Stephen Hay</address>

The best way I have found to choose breakpoints is to use `em`s. Ems are a good way to distance yourself for device dimensions. You probably don't know how many `em`s wide an iPad is, and nor should you. With `em`s, you can pick a size that looks good, without worrying about what device that breakpoint is for.

Using `em`s for breakpoints is also good for accessibility, as [Chris Coyier discovered](http://css-tricks.com/zooming-squishes/).
