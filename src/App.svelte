<script>
	import Router from "svelte-spa-router";
	import { theme } from "/stores/theme.js";
	import { onMount } from "svelte";

	import IndexPage from "/pages/Index.svelte";
	import SettingsPage from "/pages/Settings.svelte";
	import DisclaimerPage from "/pages/Disclaimer.svelte";
	import NotFoundPage from "/pages/NotFound.svelte";

	const routes = {
		"/": IndexPage,
		"/settings": SettingsPage,
		"/disclaimer": DisclaimerPage,
		"*": NotFoundPage,
	};

	onMount(() => document.body.classList.toggle("dark", !$theme));
</script>

<template>
	<Router {routes} />
</template>

<style global lang="scss">
	@import "./styles/base.scss";
	@import "./styles/colors.scss";
	@import "./styles/navbar.scss";
	@import "./styles/button.scss";
	@import "./styles/checkbox-list.scss";
	@import "./styles/loading.scss";

	@import "./styles/videoPlayer/layout.scss";
	@import "./styles/videoPlayer/slider.scss";
	@import "./styles/videoPlayer/controls.scss";
</style>