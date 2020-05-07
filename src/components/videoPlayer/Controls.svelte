<script>
	import { playerCurrentTime } from '/stores/playerCurrentTime.js';
	import { playerPaused } from "/stores/playerPaused.js";
	import { playerDuration } from "/stores/playerDuration.js";
	import { videos } from "/stores/videos.js";

	$: isLastVideo = $videos.currentIndex === $videos.files.length;
	$: isFirstVideo = $videos.currentIndex === 0;

	const inputCurrentTime = event => {
		$playerCurrentTime = +event.target.value;
	};

	const formatTime = seconds => {
		if (isNaN(seconds)) return '...';
		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);

		if (seconds < 10) seconds = '0' + seconds;
		return `${minutes}:${seconds}`;
	};
</script>

<template>
	<div class="controls">
		<ul class="controls-list">
			<li>
				<button class="button button--player" on:click="{playerPaused.toggle}">
					<ion-icon name="{['play', 'pause'][+!$playerPaused]}"></ion-icon>
				</button>
			</li>

			<li>
				<button disabled="{isFirstVideo}" class="button button--player">
					<ion-icon name="play-back"></ion-icon>
				</button>
			</li>

			<li>
				<button disabled="{isLastVideo}" class="button button--player">
					<ion-icon name="play-forward"></ion-icon>
				</button>
			</li>
			<li class="controls-list__time-value">
				{formatTime($playerCurrentTime)}
			</li>
		</ul>

		<div class="controls-time-line">
			<div class="slider" style="--min: 0; --max: {$playerDuration}; --val: {$playerCurrentTime}">
				<input type="range" min="0" step="any" max="{$playerDuration}" bind:value="{$playerCurrentTime}" />
			</div>
		</div>

		<ul class="controls-list">
			<li class="controls-list__time-value">
				{formatTime($playerDuration)}
			</li>
			<li>
				<button class="button button--player">
					<ion-icon name="volume-medium"></ion-icon>
				</button>

				<div class="slider" style="--track-width: 70px; --min: 0; --max: 100; --val: 50">
					<input type="range" />
				</div>
			</li>
			
			<li>
				<button class="button button--player">
					<ion-icon name="expand"></ion-icon>
				</button>
			</li>
		</ul>
	</div>
</template>