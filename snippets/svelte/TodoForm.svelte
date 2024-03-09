<script>
  export let action = "create";
  export let title = "";
  export let close = () => {};
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
</script>

<div class="card p-10 variant-glass-surface space-y-3">
  <h1 class="text-2xl uppercase">{title}</h1>
  <form
    action="?/{action}"
    method="post"
    class="flex flex-col gap-5"
    use:enhance={() => {
      return async ({ result }) => {
        if (result) {
          await invalidateAll();
          close();
        }
      };
    }}
  >
    <input
      type="text"
      class="input rounded-sm"
      name="title"
      placeholder="Title"
      required
    />
    <textarea
      class="input rounded-sm"
      name="content"
      required
      placeholder="Content"
    ></textarea>
    <button class="btn variant-outline-primary" type="submit">{action}</button>
  </form>
</div>
