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
		<div class="navbar__pull-left">
			<a href="{linkUrl}" use:link class="button button--circle">
				<ion-icon name="{linkIcon}"></ion-icon>
			</a>

			<div class="navbar__video-name">
				<span class="navbar__video-name-wrapper">{videoName}</span>
			</div>
		</div>

		{#if themeToggler}
			<div class="navbar__pull-right">
				<button class="button button--circle" on:click={toggleTheme}>
					{#if $theme}
						<ion-icon name="sunny-outline"></ion-icon>
					{:else}
						<ion-icon name="moon-outline"></ion-icon>
					{/if}
				</button>
			</div>
		{/if}
	</nav>
</template>