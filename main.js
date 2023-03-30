const MAX_KEY = 26;
const MIN_KEY = 0;

const state = {
   raw: "",
   ciphertext: "",
   key_1: 0,
   key_2: 0,
};

// DOM Elements
const raw_textarea = document.getElementById("incrypted_ta");
const ciphered_textarea = document.getElementById("decrypted_ta");
const encrypt_button = document.getElementById("encrypt_button");
const decrypt_button = document.getElementById("decrypt_button");
const key1_input = document.getElementById("key_1");
const key2_input = document.getElementById("key_2");
const slider1_input = document.getElementById("key_1_slider");
const slider2_input = document.getElementById("key_2_slider");
const increase_key_button = document.getElementById("increase_key_button");
const decrease_key_button = document.getElementById("decrease_key_button");

raw_textarea.onchange = (e) => (state.raw = e.target.value);
ciphered_textarea.onchange = (e) => (state.ciphertext = e.target.value);
raw_textarea.oninput = (e) => (state.raw = e.target.value);
ciphered_textarea.oninput = (e) => (state.ciphertext = e.target.value);
encrypt_button.onclick = () => updateState(handleEncryptInput);
decrypt_button.onclick = () => updateState(handleDecryptInput);
key1_input.addEventListener("change", (e) =>
   updateState(handleKey1Input.bind(this, e))
);
key2_input.addEventListener("change", (e) =>
   updateState(handleKey2Input.bind(this, e))
);
slider1_input.addEventListener("input", (e) =>
   updateState(handleKey1Input.bind(this, e))
);
slider2_input.addEventListener("input", (e) =>
   updateState(handleKey2Input.bind(this, e))
);

updateState(() => null);

// Central State Manager
function updateState(cbf) {
   cbf();
   raw_textarea.value = state.raw;
   ciphered_textarea.value = state.ciphertext;
   key1_input.value = state.key_1;
   key2_input.value = state.key_2;
   slider1_input.value = state.key_1;
   slider2_input.value = state.key_2;
}

// Event Handlers

function handleEncryptInput(e) {
   const input = state.raw;
   if (input.length == 0) return;
   const key_1 = state.key_1;
   const key_2 = state.key_2;
   const ciphered = encryptTwoKeys(input, key_1, key_2);
   state.ciphertext = ciphered;
}

function handleDecryptInput(e) {
   const input = state.ciphertext;
   if (input.length == 0) return;
   const { key_1, key_2, decrypted } = decryptTwoKeys(input);
   state.key_1 = (MAX_KEY - key_1) % MAX_KEY;
   state.key_2 = (MAX_KEY - key_2) % MAX_KEY;
   state.raw = decrypted;
}

function handleKey1Input(e) {
   const val = parseInt(e.target.value);
   state.key_1 = Math.max(MIN_KEY, val % 26);
}

function handleKey2Input(e) {
   const val = parseInt(e.target.value);
   state.key_2 = Math.max(MIN_KEY, val % 26);
}

function handleButtonClick(id, val) {
   const key = id;
   const current_key = parseInt(state[key]);
   if (val === 1) state[key] = (current_key + val) % 26;
   if (val === -1) state[key] = Math.max(MIN_KEY, current_key + val);
   updateState(() => null);
}

// Functionalities

function encryptTwoKeys(input, key1, key2) {
   let ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let code_1 = ab.substring(key1, ab.length) + ab.substring(0, key1);
   let code_2 = ab.substring(key2, ab.length) + ab.substring(0, key2);
   let cipher = [];
   for (i = 0; i < input.length; i++) {
      let c = input.charAt(i);
      let upper_case = c == c.toUpperCase();
      let pos = ab.indexOf(c.toUpperCase());
      let code = i % 2 == 0 ? code_1 : code_2;
      let cc = code.charAt(pos);
      if (pos === -1) cipher.push(c);
      else cipher.push(upper_case ? cc : cc.toLocaleLowerCase());
   }
   return cipher.join("");
}

function decryptTwoKeys(encrypted) {
   const first = halfOfString(encrypted, true);
   const second = halfOfString(encrypted, false);
   const key_1 = getKey(first);
   const key_2 = getKey(second);
   const decrypted = encryptTwoKeys(encrypted, key_1, key_2);
   return {
      key_1,
      key_2,
      decrypted,
   };
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
