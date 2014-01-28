---
layout: default
title: Adding Support for @supports to Coda
---
I use [Coda](http://panic.com/coda) for all of my web development, and recently, while creating this very site, I was playing around with various new-fangled <abbr title="Cascading StyleSheets">CSS</abbr> goodness and realised that Coda, as of version 2.0.7, did not _ahem_ support `@supports`. It wasn't a lovely shade of orange like all of the other `@rules`. So this is how to add custom `@rules` to Coda 2.x.

1. The file we will be changing is read-only to everyone except the root user, so the easiest way to edit it is to fire up Terminal.app and enter `sudo nano "/Applications/Coda 2.app/Contents/Resources/CSS/Contents/Resources/SyntaxDefinition.xml"`. You may be asked for your password.
<small>Note: This is the file for the CSS syntax mode. If you use Sass instead (and this means SCSS as well), replace CSS with Sass in the command above (or do both - future-proofing!).</small>
<small>Unfortunately, LESS is a funny beast, and this method doesn't work for it. I don't use LESS, but if you do and know how to fix this, let me know in the comments!</small>

2. The terminal window should now be displaying the Nano text editor. As you can see, this syntax mode file is written in <abbr title="eXtensible Markup Language">XML</abbr>, so it should look very familiar to any web developer, and I don't need to go into the structure of it in great detail here. Inside the `<keyword>` element with an ID of `Rules`, add the following element: `<string>@supports</string>`.

3. Hit <kbd>Control</kbd><kbd>X</kbd> to exit, then <kbd>Y</kbd> to confirm that you want to save the file, and then <kbd>Return</kbd> to confirm that the file name is correct.

4. Nano will close, and you can now quit Terminal and quit and relaunch Coda, in which you should now have syntax highlighting for `@supports`.
