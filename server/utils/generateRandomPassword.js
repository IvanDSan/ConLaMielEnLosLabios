import crypto from 'crypto';

const generateRandomPassword = (length = 10) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return Array.from(crypto.randomBytes(length))
    .map((byte) => chars[byte % chars.length])
    .join('');
};

export default generateRandomPassword;
