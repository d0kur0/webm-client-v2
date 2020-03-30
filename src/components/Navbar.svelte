<script>
	import { link } from "svelte-spa-router";

	export let linkUrl = "/";
	export let linkIcon = "";
	export let videoName = "";
</script>

<template>
	<nav class="navbar">
		<a href="{linkUrl}" use:link class="button button--circle">
			<ion-icon name="{linkIcon}"></ion-icon>
		</a>

		<div class="navbar__video-name">
			<span class="navbar__video-name-wrapper">{videoName}</span>
		</div>
	</nav>
</template>