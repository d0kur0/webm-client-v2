<script>
	import { schema } from '/stores/schema.js';
	import { playerUI } from '/stores/playerUI.js';
	import { playerVolume } from '/stores/playerVolume.js';
	import { videos } from "/stores/videos.js";
	import { playerCurrentTime } from '/stores/playerCurrentTime.js';
	import { playerPaused } from "/stores/playerPaused.js";
	import { playerDuration } from "/stores/playerDuration.js";

	import Controls from './Controls.svelte';
	import Notification from '/components/Notification.svelte';

	$: currentVideo = $videos.files[$videos.currentIndex];

	let isLoading = true;

	const errorHandler = () => {
		videos.nextFile();

		console.log("Ошибка загрузки видео, пропускаем");
	};

	const hackForDetectMousePosition = event => {
		window.mousePosition = {
			X: event.screenX,
			Y: event.screenY
		};
	};

	const handleHotKeys = event => {

	}
</script>

<svelte:window on:mousemove="{hackForDetectMousePosition}" />

<template>
	<div
		on:mousemove="{playerUI.toggleControls}"
		on:keydown="{event => handleHotKeys(event) + playerUI.toggleControls()}"
		on:mouseleave="{() => $playerUI.showControls = false}"

		class="player" 
		tabindex="0"
		bind:this="{$playerUI.playerElement}">

		{#if currentVideo}
			<video
				autoplay

				bind:paused="{$playerPaused}"
				bind:duration="{$playerDuration}"
				bind:currentTime="{$playerCurrentTime}"
				bind:volume="{$playerVolume}"

				on:error="{errorHandler}"
				on:ended="{videos.nextFile}"

				on:loadstart="{event => isLoading = true}"
				on:canPlay="{event => isLoading = false}"
				on:loadeddata="{event => isLoading = false}"

				src="{currentVideo.path}">
			</video>
		{/if}

		{#if !$schema.length || schema.isAllDisable()}
			<Notification message="Кажется вы зашли на сайт впервые или выключили все доски в настройках выборки. Откройте настройки и выберите нужные доски." />
		{/if}

		{#if isLoading && $schema.length && !schema.isAllDisable()}
			<div class="player-loading loading-bar">
				<ion-icon name="aperture-outline"></ion-icon>
			</div>
		{/if}

		{#if $playerPaused || $playerUI.showControls}
			<Controls disabled="{!currentVideo}" />
		{/if}
	</div>	
</template>