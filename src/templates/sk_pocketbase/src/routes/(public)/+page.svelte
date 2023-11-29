<script>
  export let data;
  import { base } from "$app/paths";
  import { i18n } from "$lib/stores/i18next.js";
  import LanguagesButtons from "$lib/components/LanguagesButtons.svelte";
</script>

<div
  class="card variant-glass-surface space-y-10 p-5 text-center flex flex-col items-center"
>
  <img src="{base}/logo.png" alt="" class="w-64 h-64 rounded" />
  {#if data.user}
    <h2 class="h2">
      {$i18n.t("You are already logged in as:")}
      {data.user.username}
    </h2>
    <div class="flex justify-center space-x-2">
      <LanguagesButtons />
    </div>
    <div class="flex justify-center space-x-2">
      <a class="btn variant-filled-primary btn-xl" href="{base}/app/dashboard">
        {$i18n.t("To the Dashboard")}
      </a>
    </div>
  {:else}
    <!-- else content here -->
    <h2 class="h2">{$i18n.t("Welcome to Auth Simple App.")}</h2>
    <div class="flex justify-center space-x-2">
      <LanguagesButtons />
    </div>
    <div class="flex justify-center space-x-2">
      <a class="btn variant-filled-primary btn-xl" href="/login">
        {$i18n.t("Please Login to Continue")}
      </a>
    </div>
  {/if}
</div>
