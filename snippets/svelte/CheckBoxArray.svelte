<script>
  import CheckBox from "./CheckBox.svelte";

  export let options = [];
  let values = options.map((option) => option.value);
  export let selected = [];
</script>

<form action="" method="post" class="card p-5 variant-glass-surface">
  <div class="space-y-2">
    {#each options as option (option.value)}
      <CheckBox
        value={option.value}
        label={option.label}
        checked={selected.includes(option.value)}
        on:change={(e) => {
          if (e.target.checked) {
            selected = [...selected, option.value];
          } else {
            selected = selected.filter((value) => value !== option.value);
          }
        }}
      />
    {/each}
  </div>
  <input type="hidden" name="" />
</form>
