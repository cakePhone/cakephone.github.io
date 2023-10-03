<script>
	import Link from './Link.svelte';

	export let title;
	export let description;
	export let image;
	export let link;
	export let github;
</script>

<div class="card card-hover variant-filled-surface my-4 w-full overflow-hidden lg:w-96 lg:my-0">
	<img src={image} alt={title} class="h-fit object-cover lg:h-52" />
	<header class="card-header" data-toc-ignore>{title}</header>
	<section class="p-4">
		{description}
	</section>
	<footer class="card-footer flex w-full flex-wrap items-center justify-center lg:flex-nowrap">
		<Link name="Github" icon="github" to={github} variant="variant-filled-tertiary" />
		<Link name="Visit" icon="open-in-new" to={link} />
	</footer>
</div>
