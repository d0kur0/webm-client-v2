<script>
    import Navbar from "/components/Navbar.svelte";
    import Player from "/components/VideoPlayer/Player.svelte";

    import { onMount } from "svelte";

    import { schema } from "/stores/schema.js";
    import { videos } from "/stores/videos.js";

    onMount(async () => {
        await videos.fetchBySchema($schema);
    });
</script>

<template>
  <Navbar linkUrl="/settings" linkIcon="settings-outline" videoName="RandomName.webm" />

  <div class="page-wrapper">
    {#if $videos.files.length}
	    <Player />
  {:else}
    <div class="loading-bar">
      <ion-icon name="aperture-outline"></ion-icon>
    </div>
  {/if}
  </div>
</template>