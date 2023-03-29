let raw = "";
let deciphered = "";

// DOM Elements
const raw_textarea = document.getElementById("incrypted_ta");
const ciphered_textarea = document.getElementById("decrypted_ta");
const encrypt_button = document.getElementById("encrypt_button");
const decrypt_button = document.getElementById("decrypt_button");
const key1_input = document.getElementById("key_1");
const key2_input = document.getElementById("key_2");

encrypt_button.onclick = handleEncryptInput;
decrypt_button.onclick = handleDecryptInput;

function handleEncryptInput(e) {
   const input = raw_textarea.value;
   const key_1 = key1_input.value;
   const key_2 = key2_input.value;
   const deciphered = encryptTwoKeys(input, key_1, key_2);
   console.log(deciphered);
   ciphered_textarea.value = deciphered;
}

function handleDecryptInput(e) {
   const input = ciphered_textarea.value;
   const { key_1, key_2, decrypted } = decryptTwoKeys(input);
   key1_input.value = key_1;
   key2_input.value = key_2;
   raw_textarea.value = decrypted;
}

function encryptTwoKeys(input, key1, key2) {
   let ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let code_1 = ab.substring(key1, ab.length) + ab.substring(0, key1);
   let code_2 = ab.substring(key2, ab.length) + ab.substring(0, key2);
   let cipher = [];
   for (i = 0; i < input.length; i++) {
      let c = input.charAt(i);
      let pos = ab.indexOf(c.toUpperCase());
      let code = i % 2 == 1 ? code_1 : code_2;
      if (pos === -1) cipher.push(c);
      else cipher.push(code.charAt(pos).toLocaleLowerCase());
   }
   return cipher.join("");
}

function decryptTwoKeys(encrypted) {
   const first = halfOfString(encrypted, true);
   const second = halfOfString(encrypted, false);
   console.log(first);
   console.log(second);
   const key_1 = getKey(first);
   const key_2 = getKey(second);
   const decrypted = encryptTwoKeys(encrypted, key_1, key_2);
   return {
      key_1,
      key_2,
      decrypted,
   };
}

// User text input limitations

var charlimit = 5; // char limit per line
raw_textarea.onkeyup = () => limitTextArea(raw_textarea);
ciphered_textarea.onkeyup = () => limitTextArea(ciphered_textarea);
function limitTextArea(box) {
   var lines = box.value.split("\n");
   for (var i = 0; i < lines.length; i++) {
      if (lines[i].length <= charlimit) continue;
      var j = 0;
      space = charlimit;
      while (j++ <= charlimit) {
         if (lines[i].charAt(j) === " ") space = j;
      }
      lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
      lines[i] = lines[i].substring(0, space);
   }
   box.value = lines.slice(0, 10).join("\n");
}

// HELPERS

function halfOfString(encrypted, evenIndex) {
   const outS = [];
   const start = evenIndex ? 0 : 1;
   for (i = start; i < encrypted.length; i += 2) {
      outS.push(encrypted.charAt(i));
   }
   return outS.join("");
}

function getKey(cipher) {
   const max_index = indexOfMax(getCountsArray(cipher));
   const indOfTxposedE = (4 - max_index + 26) % 26;
   return indOfTxposedE;
}

function getCountsArray(str) {
   str = str.toLowerCase();
   const charCounts = new Array(26).fill(0);
   for (let i = 0; i < str.length; i++) {
      if (/[a-z]/.test(str.charAt(i))) {
         const charIndex = str.charCodeAt(i) - "a".charCodeAt(0);
         charCounts[charIndex]++;
      }
   }
   return charCounts;
}

function indexOfMax(arr) {
   const max = arr.indexOf(Math.max(...arr));
   return max;
}
