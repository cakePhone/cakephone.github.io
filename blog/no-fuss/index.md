---
title: No Fuss
description: Bye bye frameworks for building my portfolio/blog.
tags: posts
date: 2025-06-23
layout: layouts/post_layout.liquid
image: /assets/blog/no-fuss/thumbnail.png
---

# No Fuss

After a long time using frameworks like React, Svelte, Vue and whatever you may use as a web developer,
I looked back at what I used them for and I noticed that I was using them for no reason.

In this case I was using Svelte Kit for this. What did it bring to the table? Yes, you can go on about
components, reactivity, server-side rendering, etc. But 90% of a framework's features go unused.

An even more blatant example that I was using it for the wrong use case is that I was using the static
adapter for Svelte Kit and it screamed at me while trying to build the main page/navigator for the blog
pages. Heck! I was even using JSON and parsing it, grabbing the data, markdown files, throwing it around
just for a god damned main page. What the hell is that? Over-complication!

_sigh_ - You can check the mess I wrote about it [here](/blog/welcome).

## So why now? What brought some sense to me?

My frustrations started when I updated from Svelte Kit 4 to 5. I had to rewrite a lot of code
and I was surely not happy about it. Simply because it was a mess - my code, not Svelte Kit's.

The amount of workarounds I needed in that codebase started to pile up to spaghetti code levels
you won't see even in the most vibe coded projects.

The funny part here is what made me finally do this change: [this article](https://justfuckingusehtml.com/)
Yes, Just Fucking Use HTML... I even learned that giving an ID automatically gives it a JS variable.
Which I don't use in this project, but it's a nice touch. But that's out of the scope of this article.
The point here is that this article made me realise that a lot of the things I was doing could be done
more elegantly with just HTML, CSS and (barely any) JS.

## What's actually changed?

Everything! Layout, design and the MUCH easier way of writing posts. Again, just Markdown, like before, but no JSON to add 
data to. This was made possible using two "libraries": [11ty](https://11ty.dev/) and [Liquidjs](https://liquidjs.com/).
A static site generator and a templating engine, as the HTML gods intended. Simple, elegant and easy to use.

The only thing I miss was the ease of integration of JS in components, but I can live with that. It's a minor code change
to get the kind of behaviour I wanted out of what I used components for: bubbles, buttons and other small, repeatable elements.

## Conclusion

Stop following all those framework trends like your life depends on it, mine surely didn't. Neither do any of my projects
using them. I can say I learned a lot, but if you're already familiar with their syntax, pick them up only for what they
were made for: complex applications, not your To Do app or calculator.

And just like that, I hope you enjoy this new change. Don't forget to click the cookie down below.
(Yes, even those are back. Batteries included.)
