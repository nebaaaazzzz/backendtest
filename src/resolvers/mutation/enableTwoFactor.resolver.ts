import qrcode from "qrcode";
import speakeasy from "speakeasy";
const enableTwoFactor = async (_, __, context) => {
  if (context.user) {
    const user = context.user;
    const secret = speakeasy.generateSecret({
      issuer: "backendtest",
      otpauth_url: true,
    });
    try {
      const data_url = await qrcode.toDataURL(secret.otpauth_url);
      user.twoFactorSecret = secret.base32;
      user.twoFactorEnabled = true;
      await user.save();
      return data_url;
    } catch (err) {
      throw new Error("QR code generation failed");
    }
  }
  throw new Error("unauthorized ");
};

export default enableTwoFactor;
