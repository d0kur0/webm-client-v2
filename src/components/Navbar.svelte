<script>
	import { link } from "svelte-spa-router";
	import { theme } from "/stores/theme.js";

	export let linkUrl = "/";
	export let linkIcon = "";
	export let videoName = "";
	export let themeToggler = true;

	function toggleTheme () {
		theme.toggleTheme();
		document.body.classList.add("transition");
		document.body.classList.toggle("dark", !$theme);

		setTimeout(() => {
			document.body.classList.remove("transition");
		}, 500);

		localStorage.overrideTheme = $theme;
	}
</script>

<template>
	<div class="navbar-top-margin"></div>

	<nav class="navbar">
		<a href="{linkUrl}" use:link class="navbar__button button button--circle">
			<ion-icon name="{linkIcon}"></ion-icon>
		</a>

		<div class="navbar__video-name">{videoName}</div>

		{#if themeToggler}
			<button class="navbar__button button button--circle" on:click={toggleTheme}>
				<ion-icon name="{['sunny-outline', 'moon-outline'][+$theme]}"></ion-icon>
			</button>
		{/if}
	</nav>
</template>