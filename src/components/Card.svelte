<script>
	import Link from './Link.svelte';

	export let title;
	export let description;
	export let image;
	export let link;
	export let github;
</script>

<div class="card card-hover variant-filled-surface w-full max-w-md overflow-hidden lg:w-96">
	<img src={image} alt={title} class="h-52 w-full object-cover" />
	<header class="card-header" data-toc-ignore>{title}</header>
	<section class="p-4">
		{description}
	</section>
	<footer class="card-footer flex w-full flex-wrap items-center justify-center lg:flex-nowrap">
		{#if github}
			<Link name="Github" icon="github" to={github} variant="variant-filled-tertiary" />
		{/if}
		{#if link}
			<Link name="Visit" icon="open-in-new" to={link} />
		{/if}
	</footer>
</div>
