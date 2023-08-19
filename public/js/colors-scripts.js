let colorsDivs = window.colors.map(
  (color) => `<button
           data-v="${color}"
           class="colorSelector"
           style="
             border: none;
             outline: none;
             width: 40px;
             height: 40px;
             background-color: ${color};
             display: inline-block;
           "
         ></button>`
);

function hideColorPicker() {
  let popContainers = document.querySelectorAll(`.ppop-color-container`);
  popContainers.forEach((el) => (el.style.display = "none"));
  let clickAwayContainer = document.querySelector(`.clickaway-container`);
  clickAwayContainer.style.display = "none";
}

function toggleColorPicker(selector) {
  let clickAwayContainer = document.querySelector(`.clickaway-container`);
  let popContainer = document.querySelector(`.ppop-color-container`);
  if (clickAwayContainer != null) {
    if (clickAwayContainer.style.display == "none") {
      clickAwayContainer.style.display = "block";
    } else {
      clickAwayContainer.style.display = "none";
    }
  }
  if (popContainer != null) {
    window.inputSelectorForColorPicker = selector;
    let element = document.querySelector("button" + selector);
    if (element != null) {
      const dem = element.getBoundingClientRect();
      if (popContainer.style.display == "none") {
        console.log(popContainer.style);
        console.log(dem);
        popContainer.style.position = "fixed";
        popContainer.style.left = `${dem.x - 65}px`;
        popContainer.style.top = `${dem.y + dem.height}px`;
        console.log(popContainer.style);
        popContainer.style.display = "block";
      } else {
        popContainer.style.display = "none";
      }
    }
  }
}

function setColorPickerButtonBg(value, name) {
  let button = document.querySelector(`.${name}-container .cpick`);
  if (button != null) {
    button.style.backgroundColor = value;
  }
}

function listenAndSetToInput() {
  document.querySelectorAll(`.colorSelector`).forEach((el) =>
    el.addEventListener("click", () => {
      const name = window.inputSelectorForColorPicker;
      console.log(name);
      if (name != undefined) {
        let input = document.querySelector(
          `input[name=${name.replace(".", "")}]`
        );
        if (input != null) input.value = el.dataset["v"];
        toggleColorPicker(name);
        setColorPickerButtonBg(el.dataset["v"], name.replace(".", ""));
      }
    })
  );
}

function modalOverlay() {
  if (document.querySelector(`.clickaway-container`) == null) {
    const container = document.createElement("div");
    container.classList = `clickaway-container`;
    container.addEventListener("click", () => hideColorPicker());
    container.setAttribute(
      "style",
      "display: none;width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 6000"
    );
    document.body.appendChild(container);
  }
}

function setColorPickerTemplate() {
  if (document.querySelector(".ppop-color-container") == null) {
    const popContainer = document.createElement("div");
    popContainer.classList = "ppop light border break ppop-color-container";
    popContainer.setAttribute("style", "display: none; z-index: 20000");
    const pop = document.createElement("div");
    pop.setAttribute(
      "style",
      "width: 260px; height: 200px; line-height: 0px !important"
    );
    pop.classList = "break colors-container";
    popContainer.appendChild(pop);
    document.body.appendChild(popContainer);
    $(".colors-container").append(colorsDivs);
  }
}

setColorPickerTemplate();
modalOverlay();
listenAndSetToInput();
