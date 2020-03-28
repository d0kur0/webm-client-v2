<script>
  const vendors = [
    {
      name: "2ch",
      boards: [
        {
          name: "b",
          description: "Бред"
        },
        {
          name: "a",
          description: "Аниме"
        },
        {
          name: "h",
          description: "Хентай"
        }
      ]
    }
  ];
</script>

<template>
  <div class="page-wrapper">
    <div class="checkbox-list">
      {#each vendors as vendor}
        <div class="checkbox-list__header">{vendor.name}</div>

        {#each vendor.boards as board}
          <div class="checkbox-list__item">
            {board.name} ({board.description})
          </div>
        {/each}
      {/each}
    </div>
  </div>
</template>