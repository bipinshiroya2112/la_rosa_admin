import cryptoJS from "crypto-js";
const useEncryption = () => {
  const cryptoKey = process.env.REACT_APP_ENCRYPT_KEY;

  const encryptData = (data) => {
    try {
      let dataToBeEncrypted;
      if (typeof data === "string") dataToBeEncrypted = data;
      else if (typeof data === "number") dataToBeEncrypted = data.toString();
      return cryptoJS.AES.encrypt(dataToBeEncrypted, cryptoKey).toString();
    } catch (err) {
      console.log("Error --->", err);
    }
  };

  // const Encrypt = (n) => {
  //   const data = cryptoJs.enc.Utf8.parse(n);
  //   const key = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_KEY);
  //   const iv = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_IV);
  //   const encrypted = cryptoJs.AES.encrypt(data, key, {
  //     iv,
  //     mode: cryptoJs.mode.CBC,
  //     keySize: 256,
  //   });
  //   return encrypted.toString();
  // };

  const decryptData = (encryptedData) => {
    try {
      const plain = cryptoJS.AES.decrypt(encryptedData?.toString(), cryptoKey);
      return JSON.parse(plain.toString(cryptoJS.enc.Utf8));
    } catch (err) {
      console.log("Error --->", err);
    }
  };

  // const Decrypt = (n) => {
  //   const key = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_KEY);
  //   const iv = cryptoJs.enc.Utf8.parse(process.env.REACT_APP_ENCRYPT_IV);

  //   const decrypt = cryptoJs.AES.decrypt(n, key, {
  //     iv,
  //     mode: cryptoJs.mode.CBC,
  //     keySize: 256,
  //   });
  //   return decrypt.toString(cryptoJs.enc.Utf8);
  // };
  // export default Decrypt;

  return {
    encryptData,
    decryptData,
  };
};

export default useEncryption;
