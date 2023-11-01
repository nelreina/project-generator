import { redirect } from "@sveltejs/kit";
import { authenticator } from "otplib";

export const redirectIfLoggedIn = (user) => {
  if (user.role === "ADMIN") {
    throw redirect(303, `/admin`);
  } else {
    throw redirect(303, `/`);
  }
};

export const checkAuthCode = async ({ locals, request }) => {
  const { user, pb } = locals;
  const data = Object.fromEntries(await request.formData());
  const { authCode } = data;
  const record = await pb
    .collection("otpSettings")
    .getFirstListItem(`user="${user.id}"`);
  const secret = record.secret;

  const isValid = authenticator.check(authCode, secret);
  if (isValid) {
    await pb
      .collection("users")
      .update(user.id, { otpSettingCompleted: true, otp: true });
    redirectIfLoggedIn(user);
    // throw redirect(303, `/otp`);
  } else {
    return {
      error: true,
      message: "Invalid code! Please try again.",
    };
  }
};
