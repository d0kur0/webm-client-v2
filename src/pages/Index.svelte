<script>
	import Navbar from "/components/Navbar.svelte";
	import Player from "/components/VideoPlayer/Player.svelte";

	import { onMount } from "svelte";

	import { schema } from "/stores/schema.js";
	import { videos } from "/stores/videos.js";

	onMount(async () => {
		await schema.fetch();
		await videos.fetchBySchema($schema);
	});

	$: videoName = $videos.files[$videos.currentIndex] 
								? $videos.files[$videos.currentIndex].name 
								: "...";
</script>

<template>
	<Navbar linkUrl="/settings" linkIcon="settings-outline" videoName="{videoName}" />

	<Player />
</template>