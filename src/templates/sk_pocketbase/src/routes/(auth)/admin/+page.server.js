import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, locals }) {
  await parent();
  const { user } = locals;
  if (!user) throw redirect(302, `/login`);
  if (user.role !== "ADMIN") {
    throw redirect(302, `/`);
  }
  return {};
}
