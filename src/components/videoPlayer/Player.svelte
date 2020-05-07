<script>
	import Controls from './Controls.svelte';
	import { videos } from "/stores/videos.js";
	import { playerCurrentTime } from '/stores/playerCurrentTime.js';
	import { playerPaused } from "/stores/playerPaused.js";
	import { playerDuration } from "/stores/playerDuration.js";

	$: currentVideo = $videos.files[$videos.currentIndex];
</script>

<template>
	<div class="player" tabindex="0">
		<video
			bind:paused="{$playerPaused}"
			bind:duration="{$playerDuration}"
			bind:currentTime={$playerCurrentTime}
			src="{currentVideo.path}">
		</video>

		<Controls />
	</div>
</template>