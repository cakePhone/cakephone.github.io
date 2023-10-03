<script>
	export let to;
	export let name;
	export let icon = 'help';
	export let variant = 'variant-filled-primary';

	import Icon from '@iconify/svelte';

	function sendTo(link) {
		window.open(link, '_blank').focus();
	}
</script>

<button on:click={sendTo(to)} class="btn {variant} relative m-2 min-w-[10rem] max-w-2xl basis-full">
	<Icon icon="mdi:{icon}" class="absolute left-2 top-2 text-2xl" />
	<p>{name}</p>
</button>
