// Import CSS
import "./style.css";
// Import data for 3 palettes stored on palettes.json
import palettes from "./palettes.json";
console.log(palettes); // it's now a regular js code!

// Import local storage function helpers.
import {
  setLocalStorageKey,
  getLocalStorageKey,
  formDataHandler,
  loadPalettesFromLocalStorage,
  renderPalette,
} from "./local-storage";

// Then, we'll import the v4( function from uuid, renaming it to generateUUID.
// Whenever you need a new UUID you can just invoke that function:
import { v4 as generateUUID } from "uuid";

const newPaletteID = generateUUID();
// Import dom-helpers.js functions
import { addNewPalette } from "./dom-helpers";

// store form in a variable
const form = document.querySelector("#palette-form");
// store the submit form button in a variable.
const submitButton = document.querySelector("#submit-button");

// add an event listener to submitButton in order to prevent its default behavior
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const paletteTitle = form.querySelector("#palette-title").value;

  if (!paletteTitle) {
    alert("Please fill in palette title field");
    return; // Stop execution if fields are empty
  }

  // invoke function formDataHandler that returns to us all input names and values in
  // object format
  const palette = formDataHandler(event);

  // generate a new UUID and store it in a variable
  const newUUID = generateUUID();

  // invoke setLocalStorageKey using our newUUID as the key to store our formData object
  setLocalStorageKey(newUUID, palette);

  // invoke function that adds a new palette.
  addNewPalette();

  // make sure to clear form input values after submitting form
  form.reset();
});

// add an event listener for everytime the page is reloaded
window.addEventListener("DOMContentLoaded", () => {
  // Load and render saved palettes from localStorage
  const palettes = loadPalettesFromLocalStorage();
});

// EVENT LISTENERS FOR DEFAULT PALETTES.

// store all delete-buttons in a variable
const deleteButtons = document.querySelectorAll(".delete-button");
// add an event listener to delete-button so that the user can remove default palettes at will
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });
});

// store copyHexButtons on a variable.
const copyHexButtons = document.querySelectorAll(".copyHexButton");
// add an event listener so that copyHexButtons on default palettes have the expected functionality
copyHexButtons.forEach((copyHexButton) => {
  copyHexButton.addEventListener("click", () => {
    // store text to be copied in a variable
    const textToCopy = copyHexButton.dataset.hex;
    // use the clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy);
    // make text content of copy hex button change for one second after its
    // clicked by an user.
    copyHexButton.textContent = "Copied hex";

    // after one second has passed set the value of text content return to its original format
    setTimeout(() => {
      copyHexButton.textContent = `Copy ${textToCopy}`;
    }, 1000);
  });
});
