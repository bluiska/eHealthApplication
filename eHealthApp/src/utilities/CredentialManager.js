import Base64 from "crypto-js/enc-base64";
import hmacSHA1 from "crypto-js/hmac-sha1";

export default new (class CredentialEncryptor {
  constructor() {
    this.EncryptAccesscode = (privateKey, secred) => {
      // Encrypt password based on username
      let hash = hmacSHA1(secred, privateKey);
      return Base64.stringify(hash);
    };
  }
})();
