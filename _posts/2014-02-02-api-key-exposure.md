---
layout: default
title: Accidental API Key Exposure is a Major Problem
---

[This article](http://blog.shubh.am/prezi-bug-bounty/), about how a security researcher managed to gain access to Prezi's source code by using credentials he found in a public BitBucket repo, became very popular recently. The author concludes his article by saying "Please be aware of what you put up on github/bitbucket."

Accidentally posting API keys, as well as passwords and other sensitive information, on public source control repositories is a huge problem. It potentially allows anybody who comes across your code to access data, send communications, or even make purchases on your behalf. And yet API keys exposed in public GitHub repos is a common occurrence.

As somebody who has accidentally posted private credentials on GitHub in the past myself, before quickly noticing and taking them down, I was interested to see how widespread the problem of inadvertently publishing private credentials is.

I did a quick GitHub search for Twilio auth tokens and was alarmed at the results that were returned. (I had no reason in particular for choosing Twilio tokens over any other API tokens; I'm sure every major API provider is affected.) Combining that search with a simple Ruby script wrapping a regular expression, I was able to discover 187 Twilio auth tokens in a matter of minutes.

One hundred and eighty seven. Sitting there waiting to be discovered by a GitHub search. And GitHub would only display the first 1000 results out of around 20,000.

But this is just scratching the surface.

When people realise that their API credentials are visible on a public repository, their first instinct is, as it should be, to remove them. But the problem is, removing the tokens and committing the result is not enough. While they will no longer appear in a GitHub code search, any sufficiently motivated person can scroll back through your repository's history on GitHub, and find your code containing your tokens, just as it was before you "removed" them.

But, especially for side-projects or for casual GitHub users who might not yet fully understand the purpose or features of Git, this potential vulnerability may not be obvious - I have seen more than one person make the mistake of leaving API keys or passwords in their Git history.

## So what can we do about this?

### Replace sensitive information with placeholders

If you aren't using Git for managing a project, and just want to throw it up on GitHub so you can share your code, the solution is simple: you can just remove your sensitive passwords from the code and replace them with an empty string or “&lt;api key here&gt;” or some other placeholder.

But when you're actually using source control for managing your project, this solution starts to fall apart. You need another way of keeping your credentials out of your repository.

### Storing sensitive information outside of source control

Some common methods of storing sensitive information that won't show up in your repository are:

* Environment variables - these have the added advantage of making it easy to have different API keys or passwords for different environments your application may be deployed on (like development, staging and production for a web app).
* Config files that are kept out of version control - these are typically JSON or YAML files that contain any sensitive information, like API keys or passwords, that should not be publicly available. Your application can then just import this file and access all of the information it needs. Depending on your programming language of choice, there may be a library available to help you with this.

Depending on your programming language of choice, there may be some libraries available to help you with this, like [nconf](https://github.com/flatiron/nconf) for Node.js, or [any of these RubyGems](https://www.ruby-toolbox.com/categories/Configuration_Management).

### Removing sensitive information that's already in your repository

As stated above, the history features of version control systems mean that simply removing the tokens and then committing the result is not enough. If you can, you might want to consider revoking the keys that have been made public, so that anybody who may have discovered them already will be prevented from using them.

If not, your only option is to rewrite your entire commit history since the API keys were added. If you are using git, this is possible with the [`git-filter-branch`](http://git-scm.com/docs/git-filter-branch/) command. [GitHub has a good tutorial on it](https://help.github.com/articles/remove-sensitive-data) that details specifically the problem of removing sensitive data from a Git repository.

**Please be aware that this can cause problems if there are multiple collaborators on your project**, as each collaborator will have to rebase their changes to be on top of yours.

Accidental API key exposure is one of those problems that is easy to avoid as long as you keep it in mind from the beginning of a project, but once you've slipped up, it becomes very difficult to fix. By keeping the dangers in mind, and making sure you're always keeping your API keys, passwords, and any other sensitive information out of version control from the beginning, you're protecting yourself from a very real and very severe threat to the security of both you and your users.