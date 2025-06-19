---
title: Welcome to the new blog
description: Yes, I made one after 3 years of this site's existence, and it's rudimentary...
date: 2025-03-07
tags: posts
layout: post_layout.liquid
---
# Welcome to the new blog

[OUTDATED]

Yes, I made one after 3 years of this site's existence, and it's rudimentary... to say the least.
So let's walk ourselves through how I made it, because why not?

As the site is using GitHub pages you'd expect that:

- All posts are just static pages written in HTML
- It's a pain for to write posts

And to that I say, you're correct on the first point only. Yes, it's written in HTML, it's just not me doing it. That's something for the computer to figure out.
I don't know, really if your experience with GitHub pages is good or bad, but I know that you cannot do SSR and that's an important piece for anything that might want to retrieve posts. There's also the fact that I don't want to be hosting the page anywhere else for the simple fact that I do not own a url, nor do I want to spend the money on one (and a dedicated server).
Although I cannot do SSR, I can use slugs along with some hacks. This is what enables you to go to any /blog/title-here page and find available pages by crawling.
With these conditions, my choice was the classic JSON file describing _every single_ post and where to find it. But what about an easy way to write it?

## The wonders of Markdown and Svelte pre-renders

"Markdown? Renders? What?" - That's not what you're thinking, right? Either way, every post is written in Markdown, Github README.md style.
This is cool since I can write comfortably. But there's still the fact that I'm using slugs to render pages based on where you go. That's not Pages friendly, or Svelte Static Site Generator friendly. The most common error I found was the one where the whole set of blogs was simply not pre-renderable!

That's where a cool trick comes into play! You can describe your entries on the "server" at build stage. You can check it out in the repo at `/src/routes/blog/[title]/+page.ts`. This allows Svelte to go in those paths and pre-render them for you.

The code in there might seem a little weird, no? Fetch the official page... if that fails fetch the localhost and if all else fails default to empty?? That's a huge code smell, ain't it? That's okay here, because those are fail safes so that the build doesn't fail if I happen to move the json or rename it, it's still gonna build and fetch the new one on the website itself.

### What about the Markdown? Browsers don't render that out like champs!

MARKER! PAULER!! Uh? Where did he go? Marker? That's the magic "guy" here! I said that it was something for the computer to figure out and yeah, it does! Using Marker, we can just parse the post's Markdown and render it out as raw HTML in Svelte.
Another code smell emerges here, as we're fetching the posts JSON again. Why? Can't you pass the HTML from +page.ts now that you've allowed for it to be pre-renderable? Yes, but it came down to the fact that I was lazy to implement that again as it was my first approach (the implementation might change in the future). This makes it a bit slow and pop-in might occur if your internet is slow, as this is indeed rendering and erroring out _on_ the client.

## The effects! Wow!

Cool, aren't they? With some Svelte power (note that any other framework could've done this), using +layout and a couple CSS tricks you got the splash and a beautiful fade out of the bubbles after you clicked on this post!
I find this to be the fascination I've got with portfolios. The effects, the creativity! Oh wow it's all at your fingertips!

## A Thank You

I've got to thank you for reading through all of this, no? I summarized this a lot, so if you arrived here, you're probably curious how everything still works (I guess). For a more detailed view of what is actually going on behind the scenes, check the code out in the repo, maybe you'll find something useful!

And don't forget to take your cookie, down below. Come on! Click it!
