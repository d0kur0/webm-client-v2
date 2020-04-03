<script>
    import Navbar from "/components/Navbar.svelte";
    import { onMount } from "svelte";

    import { schema } from "/stores/schema.js";
    import { videos } from "/stores/videos.js";

    onMount(async () => {
    	await videos.fetchBySchema($schema);
    });
</script>

<template>
    <Navbar linkUrl="/settings" linkIcon="settings-outline" videoName="RandomName.webm" />
</template>