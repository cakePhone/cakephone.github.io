<script>
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

  function getImageURL(name) {
    return new URL(`./imgs/${name}.jpg`, import.meta.url).href
  }
</script>

<svelte:head>
  <!--Meta Tags for embeds-->
  <meta property="og:image" content={getImageURL('embed')}>
  <meta property="og:title" content="Miguel Santos' Portfolio" />
  <meta property="og:description" content="An interesting Portfolio made by Miguel" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cakephone.github.io/OreoPortfolio" />
  <title>Miguel's Portfolio</title>
</svelte:head>

<slot />
