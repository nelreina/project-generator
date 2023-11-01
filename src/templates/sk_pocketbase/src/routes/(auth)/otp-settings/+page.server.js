import { redirect } from "@sveltejs/kit";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { checkAuthCode } from "$lib/utils";

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
  const { user, pb } = locals;
  if (!user) throw redirect(302, `/login`);
  if (user.otpSettingCompleted) {
    throw redirect(302, `/otp`);
  }

  let secret = authenticator.generateSecret();

  const data = {
    user: user.id,
    secret: secret,
  };
  try {
    const record = await pb.collection("otpSettings").create(data);
  } catch (error) {
    // User already has a secret
    // get the secret from the database
    const record = await pb
      .collection("otpSettings")
      .getFirstListItem(`user="${user.id}"`);
    // const record = await pb.collection('otpSettings').getOne(user.id);
    secret = record.secret;
  }

  // Generate authKey for the user
  const authKey = authenticator.keyuri(user.name, "NELREINA TECH", secret);
  const qrcode = await QRCode.toDataURL(authKey);
  return {
    qrcode,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: checkAuthCode,
};
