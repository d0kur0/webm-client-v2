<script>
	import { link } from "svelte-spa-router";
</script>

<template>
	<nav class="navbar">
		<a href="/settings" use:link class="button button--circle">
			<ion-icon name="settings-outline"></ion-icon>
		</a>

		<div class="navbar__video-name">
			<span class="navbar__video-name-wrapper">name of video.webm</span>
		</div>
	</nav>
</template>