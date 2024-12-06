// This is a wrapper that automatically stringifies the value and sets it to a key
export const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// This is a wrapper that automatically parses the value and returns it, but also handles errors
// (JSON.parse should always be wrapped in a try/catch since it breaks so easily). if there is an error console.errors it and return null.
export const getLocalStorageKey = (key) => {
  const storedValue = localStorage.getItem(key);
  return JSON.parse(storedValue);
};

// create a function that turns my form values into an object
export const formDataHandler = (event) => {
  // create object to be used to store form input values.
  const palette = {};
  // store all form elements at the time of event submit in the form in a variable
  const formElements = event.target.elements;

  // loop through form elements, retrive their values and store them in our formData Object
  for (const element of formElements) {
    // skip submit button
    if (element.type === "submit") continue;

    // if input is a radio then only retrieve the value of the checked radio
    if (element.type === "radio") {
      if (element.checked) {
        palette[element.name] = element.value;
      }
    } else {
      // add form data to our formData object with the input name as the key
      palette[element.name] = element.value;
    }
  }
  // return object
  return palette;
};

// create function that renders a list based on palettes saved on local storage
const renderPaletteList = (palette, paletteId, paletteDiv) => {
  // now create an unordered list where we'll be appending our list items
  const ul = document.createElement("ul");
  // create list items and give them the appropiate values
  for (let i = 1; i <= 3; i++) {
    const li = document.createElement("li");
    li.classList.add(`palette${i}`);

    // create overlaid div to use as background for all list items. (half black half white)
    const overlaid = document.createElement("div");
    overlaid.classList.add("overlaid");

    // create a div that has a background color equal to user input color-1 value in form
    const userColor = document.createElement("div");
    // assign userColor1 class of palette-color to set div to the size we want.
    userColor.classList.add("palette-color");
    userColor.id = `color${i}`;
    userColor.name = `color-${i}`;
    // now style the userColor DIV background color to be equal to our palette.color1.value
    userColor.style.background = palette[`color${i}`];
    // append userColor1 to overlaid div
    overlaid.append(userColor);
    // append div overlaid to list item
    li.append(overlaid);
    // append list items to unordered list
    ul.append(li);
  }
  // append unordered list to paletteDiv
  paletteDiv.append(ul);
};

// create a function that renders copy hex button according to our palettes stored on local storage.
const renderCopyHexButton = (palette, paletteId, paletteDiv) => {
  // loop through user color inputs in form
  for (let i = 1; i <= 3; i++) {
    // store each user input in a variable
    const colorInput = palette[`color${i}`];

    // create copyHexButton, give a class to be able to select all of our buttons
    // at once later on
    const copyHexButton = document.createElement("button");
    copyHexButton.classList.add("copyHexbutton");
    copyHexButton.name = "copy-button";
    // give it a dataset equal to hex value. this is what we'll be copying when we
    //click on the button.
    copyHexButton.dataset.hex = colorInput;
    // set text content of button
    copyHexButton.textContent = `Copy ${colorInput}`;

    // add an event listener to each button of event type click
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
        copyHexButton.textContent = `Copy ${colorInput}`;
      }, 1000);
    });

    console.log(`paletteDiv: ${(paletteDiv.children, length)}`);
    // store target list item using both parent element and string interpolation to access
    // the right list item
    const targetListItem = paletteDiv.querySelector(`.palette${i}`);
    console.log(`targetListItem: ${targetListItem}`);
    // if targetListItem is a truthy value then execute block of code
    if (targetListItem) {
      // Append the hexDiv to the target list item
      targetListItem.append(copyHexButton);
    } else {
      console.log(`Target list item .palette${i} not found!`);
    }
  }
};

// create a function that creates a banner displaying the color temperature inputed
// by an user
export const createTemperatureDiv = (paletteDiv, palette) => {
  // create a div html element and store it in a variable
  const temperatureDiv = document.createElement("div");
  // assign a class
  temperatureDiv.classList.add(".temperature-div");
  temperatureDiv.name = "banner";
  // retrieve each temperature radio button in a variable
  const temperature = palette.temperature;
  // set the text content of temperatureDiv's equal to our palette.temperature value.
  temperatureDiv.textContent = temperature;

  // append temperatureDiv to paletteDiv;
  paletteDiv.append(temperatureDiv);
};

// create function that creates delete button for each palette that we create
export const createDeleteButton = (paletteDiv, paletteId) => {
  // create html button and store it in a variable
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.name = "delete";
  deleteButton.textContent = "Delete";

  // add an event listener to deleteButton of event type click
  deleteButton.addEventListener("click", () => {
    // make it so that when deleteButton is clicked, the palette is removed both from page and local storage
    paletteDiv.remove();
    // retrieve palette from local storageusing getLocalStorage function and then remove it.
    localStorage.removeItem(paletteId);
  });

  // append deleteButton to paletteDiv
  paletteDiv.append(deleteButton);
};

// Create a function that renders palettes already store in local storage
export const renderPalette = (palette, paletteId) => {
  // create a palette container
  const paletteDiv = document.createElement("div");
  paletteDiv.classList.add("palette-container");
  paletteDiv.dataset.paletteId = paletteId; // Store the UUID as a data attribute
  // create a palette title with the class '.name-palette'
  const h3 = document.createElement("h3");
  h3.classList.add("name-palette");
  h3.textContent = palette.title;
  // append h3 to paletteDiv
  paletteDiv.append(h3);

  renderPaletteList(palette, paletteId, paletteDiv);

  // invoke function that renders copyHexButton using local storage palettes.
  renderCopyHexButton(palette, paletteId, paletteDiv);

  // invoke function that creates a delete button.
  createDeleteButton(paletteDiv, paletteId);

  // invoke function that creates a temperature div.
  createTemperatureDiv(paletteDiv, palette);

  // append paletteDiv to #palette-section
  document.querySelector("#palette-section").append(paletteDiv);
};

// make a render temperature banner function.

// Create a new function that loads palettes from local storage and renders them into our page.
export const loadPalettesFromLocalStorage = () => {
  // loop through all keys in local storage.
  for (let i = 0; i < localStorage.length; i++) {
    // store key(i) in a variable.
    const key = localStorage.key(i);
    // store the values associated with that key in a variable.
    const palette = getLocalStorageKey(key);

    // now render the palette to the page
    renderPalette(palette, key);
  }
};

/* 
1. get data from localstorage
2. render the data in local storage
*/
