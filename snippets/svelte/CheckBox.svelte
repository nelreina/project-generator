<script>
  export let value;
  export let label;
  export let checked = false;
</script>

<label class="flex items-center space-x-2">
  <input type="checkbox" class="checkbox" {value} bind:checked on:change />
  <p>{label}</p>
</label>
