<script>
	import { playerUI } from '/stores/playerUI.js';
	import { playerVolume } from '/stores/playerVolume.js';
	import { playerCurrentTime } from '/stores/playerCurrentTime.js';
	import { playerPaused } from "/stores/playerPaused.js";
	import { playerDuration } from "/stores/playerDuration.js";
	import { videos } from "/stores/videos.js";

	export let disabled = false;

	$: isLastVideo = $videos.currentIndex === $videos.files.length;
	$: isFirstVideo = $videos.currentIndex === 0;

	// Function for format seconds in format: mm:ss
	const formatTime = seconds => {
		if (isNaN(seconds)) return '...';
		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);

		if (seconds < 10) seconds = '0' + seconds;
		return `${minutes}:${seconds}`;
	};

	// Watch changes of volume and update localStorage
	$: {
		localStorage.volume = $playerVolume;
	}

	// Function for toggle fullscreen mode
	const toggleFullScreen = event => {
		if ($playerUI.isFullscreen) {
			document.exitFullscreen();
		} else {
			$playerUI.playerElement.requestFullscreen();
		}

		$playerUI.isFullscreen = !$playerUI.isFullscreen;
	};

	// Function for toggle volume (0 <-> last value)
	const toggleVolume = event => {
		if (!$playerVolume) {
			$playerVolume = sessionStorage.latestVolume;
		} else {
			sessionStorage.latestVolume = $playerVolume;
			$playerVolume = 0;
		}
	};
</script>

<template>
	<div class="controls">
		<ul class="controls-list controls-based">
			<li>
				<button disabled="{disabled}" class="button button--player" on:click="{playerPaused.toggle}">
					<ion-icon name="{['play', 'pause'][+!$playerPaused]}"></ion-icon>
				</button>
			</li>

			<li>
				<button disabled="{isFirstVideo || disabled}" on:click="{videos.previousFile}" class="button button--player">
					<ion-icon name="play-back"></ion-icon>
				</button>
			</li>

			<li>
				<button disabled="{isLastVideo || disabled}" on:click="{videos.nextFile}" class="button button--player">
					<ion-icon name="play-forward"></ion-icon>
				</button>
			</li>
		</ul>

		<div class="controls-time-line">
			<div class="controls-list__time-value">
				{formatTime($playerCurrentTime)}
			</div>

			<div class="slider" style="--min: 0; --max: {$playerDuration}; --val: {$playerCurrentTime}">
				<input disabled="{disabled}" type="range" min="0" step="any" max="{$playerDuration}" bind:value="{$playerCurrentTime}" />
			</div>

			<div class="controls-list__time-value">
				{formatTime($playerDuration)}
			</div>
		</div>

		<ul class="controls-list controls-other">
			<li>
				<button disabled="{disabled}" on:click="{toggleVolume}" class="button button--player">
					<ion-icon name="volume-medium"></ion-icon>
				</button>

				<div class="slider" style="--track-width: 70px; --min: 0; --max: 1; --val: {$playerVolume}">
					<input disabled="{disabled}" type="range" min="0" step="any" max="1" bind:value="{$playerVolume}" />
				</div>
			</li>
			
			<li>
				<button disabled="{disabled}" on:click="{toggleFullScreen}" class="button button--player">
					<ion-icon name="{["expand", "resize-outline"][+$playerUI.isFullscreen]}"></ion-icon>
				</button>
			</li>
		</ul>
	</div>
</template>