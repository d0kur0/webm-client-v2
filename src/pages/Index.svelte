<script>
    import Navbar from "/components/Navbar.svelte";
    import Player from "/components/VideoPlayer/Player.svelte";

    import { onMount } from "svelte";

    import { schema } from "/stores/schema.js";
    import { videos } from "/stores/videos.js";

    onMount(async () => {
        await videos.fetchBySchema($schema);
    });

    $: videoName = $videos.files[$videos.currentIndex] 
                  ? $videos.files[$videos.currentIndex].name 
                  : "...";
</script>

<template>
  <Navbar linkUrl="/settings" linkIcon="settings-outline" videoName="{videoName}" />

  {#if $videos.files.length}
    <Player />
  {:else}
   <div class="page-wrapper">
      <div class="loading-bar">
        <ion-icon name="aperture-outline"></ion-icon>
      </div>
    </div>
  {/if}
</template>