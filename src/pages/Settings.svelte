<script>
	import Navbar from "/components/Navbar.svelte";
	import { onMount } from 'svelte';
	import { schema } from "/stores/schema.js";

	onMount(async () => {
		await schema.fetch();
	});

	// TODO: Убрать этот хак и сделать на CSS.
	const keyboardEvents = event => {
	 if (event.code === "Space" || event.code === "Enter") {
		 event.preventDefault();
		 event.target.click();
	 }
	};
</script>

<template>
	<Navbar linkUrl="/" linkIcon="arrow-back-outline" />

	<div class="page-wrapper">
		<h3>Настройка выборки</h3>

		<div class="checkbox-list">
			{#if !$schema}
				<div class="loading-bar">
					<ion-icon name="aperture-outline"></ion-icon>
				</div>
			{:else}
				{#each $schema as vendor}
					<div class="checkbox-list__header">Вендор: {vendor.name}</div>

					<div class="checkbox-list__items">
						{#each vendor.boards as board}
							<label class="checkbox-item" on:keydown="{keyboardEvents}" tabindex="0">
								<input
										checked="{board.checked}"
										on:change="{() => schema.toggleCheckedOfBoard({ boardName: board.name, vendorName: vendor.name })}"
										class="checkbox-item__input"
										type="checkbox">
								<span class="checkbox-item__flag"></span>

								<span class="checkbox-item__label">
								{board.name} ({board.description})
							</span>
							</label>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</template>

<style>
	h3 {
		margin: 0;
		padding-bottom: 15px;
	}
</style>