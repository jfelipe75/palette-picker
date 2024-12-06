// import local storage helper functions

// function that creates a list of three items.
export const createPaletteList = (paletteDiv) => {
  // create an unordered list (ul)
  const listOfColors = document.createElement("ul");
  for (let i = 1; i <= 3; i++) {
    const li = document.createElement("li");
    li.classList.add(`palette${i}`);

    // create overlaid div to use as background for all list items. (half black half white)
    const overlaid = document.createElement("div");
    overlaid.classList.add("overlaid");

    // create a div that has a background color equal to user input color-1 value in form
    const userColor = document.createElement("div");
    // assign userColor class of palette-color to set div to the size we want.
    userColor.classList.add("palette-color");
    userColor.id = `color${i}`;
    userColor.name = `color-${i}`;
    userColor.style.backgroundColor = document.querySelector(
      `#color-type${i}`
    ).value;
    // append userColor1 to overlaid div
    overlaid.append(userColor);
    // append div overlaid to list item
    li.append(overlaid);
    // append list items to unordered list
    listOfColors.append(li);
  }
  paletteDiv.append(listOfColors);
  return paletteDiv;
};

// Fix this function that is supposed to add a div for the userColor color hex value
// currently does not even run.
export const createHexButton = (paletteDiv) => {
  // loop through user color inputs in form
  for (let i = 1; i <= 3; i++) {
    // store each user input in a variable
    const colorInput = document.querySelector(`#color-type${i}`).value;
    console.log(colorInput);

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

// create function that creates delete button for each palette that we create
export const createDeleteButton = (paletteDiv) => {
  // create html button and store it in a variable
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.name = "delete";
  deleteButton.textContent = "Delete";

  // add an event listener to deleteButton of event type click
  deleteButton.addEventListener("click", () => {
    // make it so that when deleteButton is clicked, the palette is removed both from page and local storage
    paletteDiv.remove();
  });

  // append deleteButton to paletteDiv
  paletteDiv.append(deleteButton);
};

// create a function that creates a banner displaying the color temperature inputed
// by an user
export const createTemperatureDiv = (paletteDiv) => {
  // create a div html element and store it in a variable
  const temperatureDiv = document.createElement("div");
  // assign a class
  temperatureDiv.classList.add(".temperature-div");
  temperatureDiv.name = "banner";
  // loop through temperature radio buttons using their ids
  for (let i = 1; i <= 3; i++) {
    // retrieve each temperature radio button in a variable
    const radio = document.querySelector(`#temperature${i}`);
    console.log(`radio: ${radio.value}`);
    // check if current button is checked
    if (radio.checked) {
      // if it is checked then set the text content of temperature div  equal to
      // user temperature input
      temperatureDiv.textContent = radio.value;
    }
  }
  paletteDiv.append(temperatureDiv);
};

// create a function that creates a new palettte.
export const addNewPalette = () => {
  // store palette-section in a variable, which is where we'll append our new palette
  const paletteSection = document.querySelector("#palette-section");
  // we need to access the form values so that we can use them to create a new palette.
  const paletteDiv = document.createElement("div");
  paletteDiv.classList.add("palette-container");
  // now that we've created a div to store our new palette, now we must get access to the
  // form values so that we can retrive the user input.
  const paletteTitle = document.querySelector("#palette-title").value;
  // Now that we retrieved the title that the user input in the form, lets create
  // a h3 element with the text title as its text content.
  const h3 = document.createElement("h3");
  h3.textContent = paletteTitle;
  h3.classList.add("name-palette");
  // Now lets append h3 to our paletteDiv.
  paletteDiv.append(h3);

  // invoke function that creates a list when it's code executes.
  createPaletteList(paletteDiv);

  // invoke function that creates copyHexButton.
  createHexButton(paletteDiv);

  // invoke function that creates a delete button.
  createDeleteButton(paletteDiv);

  // invoke function that creates a temperature div.
  createTemperatureDiv(paletteDiv);

  // append our new palette to paletteSection so that we can see it on the page
  paletteSection.append(paletteDiv);

  return paletteDiv;
};
