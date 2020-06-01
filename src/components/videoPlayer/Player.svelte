<script>
  import { schema } from "/stores/schema.js";
  import { playerUI } from "/stores/playerUI.js";
  import { playerVolume } from "/stores/playerVolume.js";
  import { videos } from "/stores/videos.js";
  import { playerCurrentTime } from "/stores/playerCurrentTime.js";
  import { playerPaused } from "/stores/playerPaused.js";
  import { playerDuration } from "/stores/playerDuration.js";

  import Controls from "./Controls.svelte";
  import Notification from "/components/Notification.svelte";

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

  const handleHotKeys = event => {};

  const handleFullScreenChange = () => {
    $playerUI.isFullscreen = !$playerUI.isFullscreen;
  };

  // Swipe video on touch screens
  let touchState = {
    isStarted: true,
    touch: undefined,
    direction: undefined,
    range: 0,
    generatedCSS: ""
  };

  const handleTouchStart = event => {
    if (event.touches.length !== 1) return;

    touchState = {
      ...touchState,
      isStarted: true,
      touch: event.changedTouches[0]
    };
  };

  const handleTouchMove = event => {
    if (!touchState.isStarted || !touchState.touch) return;

    const touch = event.changedTouches[0];
    const range = Math.abs(touch.screenX - touchState.touch.screenX);
    const direction =
      touch.screenX < touchState.touch.screenX
        ? "right"
        : touch.screenX > touchState.touch.screenX
        ? "left"
        : undefined;

    const MAX_SIZE = 150;
    const generatedCSS = `
      background-image: linear-gradient(to ${direction}, rgba(0, 0, 0, 0) 0%, var(--swipe-color) 100%);
      background-repeat: no-repeat;
      background-size: ${range > MAX_SIZE ? MAX_SIZE : range}px 100%;
      background-position: ${direction};
    `;

    touchState = { ...touchState, direction, range, generatedCSS };
  };

  const handleTouchEnd = event => {
    touchState = { ...touchState, generatedCSS: "" };

    if (!touchState.isStarted || !touchState.direction) return;
    if (touchState.range < 50) return;

    touchState.direction === "left" && videos.previousFile();
    touchState.direction === "right" && videos.nextFile();

    touchState = {
      ...touchState,
      isStarted: false,
      range: 0,
      direction: undefined
    };
  };
</script>

<svelte:window on:mousemove={hackForDetectMousePosition} />

<template>
  <div
    on:mousemove={playerUI.toggleControls}
    on:keydown={event => handleHotKeys(event) + playerUI.toggleControls()}
    on:mouseleave={() => ($playerUI.showControls = false)}
    on:fullscreenchange={handleFullScreenChange}
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
    on:touchmove={handleTouchMove}
    class="player"
    tabindex="0"
    bind:this={$playerUI.playerElement}>

    <div class="player-swipe" style={touchState.generatedCSS} />

    {#if currentVideo}
      <video
        autoplay
        bind:paused={$playerPaused}
        bind:duration={$playerDuration}
        bind:currentTime={$playerCurrentTime}
        bind:volume={$playerVolume}
        on:error={errorHandler}
        on:ended={videos.nextFile}
        on:loadstart={event => (isLoading = true)}
        on:canPlay={event => (isLoading = false)}
        on:loadeddata={event => (isLoading = false)}
        src={currentVideo.path} />
    {/if}

    {#if !$schema.length || schema.isAllDisable()}
      <Notification
        message="Кажется вы зашли на сайт впервые или выключили все доски в
        настройках выборки. Откройте настройки и выберите нужные доски." />
    {/if}

    {#if isLoading && $schema.length && !schema.isAllDisable()}
      <div class="player-loading loading-bar">
        <ion-icon name="aperture-outline" />
      </div>
    {/if}

    {#if $playerPaused || $playerUI.showControls}
      <Controls disabled={!currentVideo} />
    {/if}
  </div>
</template>
