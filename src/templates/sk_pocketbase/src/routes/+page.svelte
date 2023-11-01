<script>
  export let data;
</script>

<h3 class="h3">Welcome !</h3>
{#if data.user}
  <h4 class="h4">Welcome back {data.user.name}</h4>
  <a href="/admin" class="btn variant-filled-tertiary">Continue</a>
{:else}
  <h4 class="h4">Please login to continue</h4>
  <a href="/login" class="btn variant-filled-primary">LOGIN</a>
{/if}
