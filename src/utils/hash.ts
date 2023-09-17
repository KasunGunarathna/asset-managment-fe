export function simpleEncrypt(text: string | undefined, key: string): string {
  if (text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }
  return "";
}

export function simpleDecrypt(
  encryptedText: string | undefined,
  key: string,
): string {
  if (encryptedText) {
    let result = "";
    for (let i = 0; i < encryptedText.length; i++) {
      const charCode =
        encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }
  return "";
}
