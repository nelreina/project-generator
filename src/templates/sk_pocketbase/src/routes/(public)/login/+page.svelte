<script>
  /** @type {import('./$types').PageData} */
  import { enhance } from "$app/forms";
  export let form;
  import { i18n } from "$lib/stores/i18next.js";
  import { base } from "$app/paths";
  import LanguagesButtons from "$lib/components/LanguagesButtons.svelte";

  export let data;
  const browserSessionToken = data.browserSessionToken;
  // import { base } from '$app/paths'
</script>

<div
  class="card variant-glass-surface p-10 rounded-md shadow-md w-full sm:w-96 space-y-5"
>
  <div class="flex justify-center">
    <a href="/">
      <img src="{base}/logo.png" alt="" class="w-44 h-44 rounded" />
    </a>
  </div>

  <h2 class="text-4xl font-semibold mb-6 text-center text-tertiary-200">
    {$i18n.t("Enter Credentials")}
  </h2>

  {#if form?.error}
    <div class="alert variant-filled-error rounded-md">
      <div class="alert-message">
        {$i18n.t(form?.error)}
      </div>
    </div>
  {/if}
  <LanguagesButtons />
  <form method="post" use:enhance>
    <div class="mb-4">
      <input
        type="hidden"
        name="browserSessionToken"
        value={browserSessionToken}
      />
      <input
        type="text"
        id="username"
        name="username"
        placeholder={$i18n.t("Username")}
        value={form?.username ?? ""}
        class="w-full input px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>

    <div class="mb-4">
      <input
        type="password"
        id="password"
        name="password"
        placeholder={$i18n.t("Password")}
        class="w-full input px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="btn variant-filled-primary px-4 py-2 w-full rounded-md"
      >
        {$i18n.t("Login")}
      </button>
    </div>
  </form>
</div>
