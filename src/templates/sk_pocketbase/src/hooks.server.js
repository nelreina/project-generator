// @ts-nocheck
import { createInstance } from "$lib/pocketbase.js";
import { redirect } from "@sveltejs/kit";
import { redirectIfLoggedIn } from "$lib/utils";

export const handle = async ({ event, resolve }) => {
  const pb = createInstance();

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    // check url startwith /events ,  /profile , /tickets
    if (event.url.pathname.startsWith("/admin")) {
      if (pb.authStore.isValid) {
        await pb.collection("users").authRefresh();
      } else {
        throw redirect(303, "/");
      }
    }
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  event.locals.pb = pb;
  event.locals.user = pb.authStore.model;

  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  try {
    // TODO: describe why we need to set httpOnly to false
    response.headers.set(
      "set-cookie",
      pb.authStore.exportToCookie({ httpOnly: false })
    );
  } catch (error) {
    // ignore cookie export errors
    // console.log('LOG:  ~ file: hooks.server.js:29 ~ handle ~ error:', error.message);
  }

  return response;
};
