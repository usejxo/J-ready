(function () {
  // Apply saved colors from localStorage
  function applySavedColors() {
    const savedBarColor = localStorage.getItem("customBarColor");
    if (savedBarColor) {
      document.body.style.backgroundColor = savedBarColor;
      const barPreview = document.getElementById("customBarColorPreview");
      if (barPreview) {
        barPreview.style.backgroundColor = savedBarColor;
      }
    }
    const savedTextColor = localStorage.getItem("customTextColor");
    if (savedTextColor) {
      document.body.style.color = savedTextColor;
      const textPreview = document.getElementById("customTextColorPreview");
      if (textPreview) {
        textPreview.style.backgroundColor = savedTextColor;
      }
    }
    const savedBackgroundImage = localStorage.getItem("customBackgroundImage");
    if (savedBackgroundImage) {
      const imgTag = document.getElementById("background-image");
      if (imgTag) {
        imgTag.src = savedBackgroundImage;
      }
    }
  }

  // Function to convert a color to Base64 image
  function convertColorToBase64(color, callback) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1;
    canvas.height = 1;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    callback(canvas.toDataURL()); // Base64 image
  }

  // Function to apply the Base64 image as the background
  function applyBackgroundImage(base64Image) {
    const imgTag = document.getElementById("background-image");
    if (imgTag) {
      imgTag.src = base64Image; // Set the src of the background image to the Base64 data URL
      localStorage.setItem("customBackgroundImage", base64Image); // Store it in localStorage
    }
  }

  // Function to inject the custom buttons into the Themes grid
  function insertCustomButtons() {
    const themeLayoutWrapper = document.getElementById("ThemeLayoutWrapper");
    if (!themeLayoutWrapper) return false; // Themes section not loaded yet.

    // -------------------------------
    // Inject Bar Color Picker Button if not already present.
    if (!document.getElementById("customBarColorButton")) {
      const barSpan = document.createElement("span");
      barSpan.setAttribute("type", "grid");

      const barContainer = document.createElement("div");
      barContainer.style.textAlign = "center";

      const barLabel = document.createElement("strong");
      barLabel.textContent = "Bar Color picker";
      barContainer.appendChild(barLabel);
      barContainer.appendChild(document.createElement("br"));

      const barButton = document.createElement("button");
      barButton.id = "customBarColorButton";
      barButton.tabIndex = 0;
      barButton.setAttribute("aria-label", "Custom Bar Color");
      barButton.setAttribute("aria-current", "false");
      barButton.className = "rounded-btn large-btn"; // Add class for rounded edges and large button

      const barPreview = document.createElement("div");
      barPreview.id = "customBarColorPreview";
      barPreview.style.width = "100%";
      barPreview.style.height = "100%";
      barPreview.style.backgroundColor = localStorage.getItem("customBarColor") || "#ffffff";

      barButton.appendChild(barPreview);
      barContainer.appendChild(barButton);
      barSpan.appendChild(barContainer);
      themeLayoutWrapper.appendChild(barSpan);

      // Create a hidden input for the bar color
      const barColorInput = document.createElement("input");
      barColorInput.type = "color";
      barColorInput.id = "customBarColorPicker";
      barColorInput.style.display = "none";
      document.body.appendChild(barColorInput);

      barButton.addEventListener("click", function () {
        barColorInput.click();
      });
      barColorInput.addEventListener("input", function () {
        const selectedColor = barColorInput.value;
        barPreview.style.backgroundColor = selectedColor;
        document.body.style.backgroundColor = selectedColor;
        localStorage.setItem("customBarColor", selectedColor);
      });
    }

    // -------------------------------
    // Inject Text Color Picker Button if not already present.
    if (!document.getElementById("customTextColorButton")) {
      const textSpan = document.createElement("span");
      textSpan.setAttribute("type", "grid");

      const textContainer = document.createElement("div");
      textContainer.style.textAlign = "center";

      const textLabel = document.createElement("strong");
      textLabel.textContent = "Text Color picker";
      textContainer.appendChild(textLabel);
      textContainer.appendChild(document.createElement("br"));

      const textButton = document.createElement("button");
      textButton.id = "customTextColorButton";
      textButton.tabIndex = 0;
      textButton.setAttribute("aria-label", "Custom Text Color");
      textButton.setAttribute("aria-current", "false");
      textButton.className = "rounded-btn large-btn"; // Add class for rounded edges and large button

      const textPreview = document.createElement("div");
      textPreview.id = "customTextColorPreview";
      textPreview.style.width = "100%";
      textPreview.style.height = "100%";
      textPreview.style.backgroundColor = localStorage.getItem("customTextColor") || "#000000";

      textButton.appendChild(textPreview);
      textContainer.appendChild(textButton);
      textSpan.appendChild(textContainer);
      themeLayoutWrapper.appendChild(textSpan);

      // Create a hidden input for the text color
      const textColorInput = document.createElement("input");
      textColorInput.type = "color";
      textColorInput.id = "customTextColorPicker";
      textColorInput.style.display = "none";
      document.body.appendChild(textColorInput);

      textButton.addEventListener("click", function () {
        textColorInput.click();
      });
      textColorInput.addEventListener("input", function () {
        const selectedColor = textColorInput.value;
        textPreview.style.backgroundColor = selectedColor;
        document.body.style.color = selectedColor;
        localStorage.setItem("customTextColor", selectedColor);
      });
    }

    // -------------------------------
    // Inject Background Color Button if not already present.
    if (!document.getElementById("customBackgroundColorButton")) {
      const bgColorSpan = document.createElement("span");
      bgColorSpan.setAttribute("type", "grid");

      const bgColorContainer = document.createElement("div");
      bgColorContainer.style.textAlign = "center";

      const bgColorLabel = document.createElement("strong");
      bgColorLabel.textContent = "Background Color picker";
      bgColorContainer.appendChild(bgColorLabel);
      bgColorContainer.appendChild(document.createElement("br"));

      const bgColorButton = document.createElement("button");
      bgColorButton.id = "customBackgroundColorButton";
      bgColorButton.tabIndex = 0;
      bgColorButton.setAttribute("aria-label", "Custom Background Color");
      bgColorButton.setAttribute("aria-current", "false");
      bgColorButton.className = "rounded-btn large-btn"; // Add class for rounded edges and large button

      const bgColorPreview = document.createElement("div");
      bgColorPreview.id = "customBackgroundColorPreview";
      bgColorPreview.style.width = "100%";
      bgColorPreview.style.height = "100%";
      bgColorPreview.style.backgroundColor = "#f0f0f0"; // Default color

      bgColorButton.appendChild(bgColorPreview);
      bgColorContainer.appendChild(bgColorButton);
      bgColorSpan.appendChild(bgColorContainer);
      themeLayoutWrapper.appendChild(bgColorSpan);

      // Create a hidden input for the background color
      const bgColorInput = document.createElement("input");
      bgColorInput.type = "color";
      bgColorInput.id = "customBackgroundColorPicker";
      bgColorInput.style.display = "none";
      document.body.appendChild(bgColorInput);

      bgColorButton.addEventListener("click", function () {
        bgColorInput.click();
      });
      bgColorInput.addEventListener("input", function () {
        const selectedColor = bgColorInput.value;
        bgColorPreview.style.backgroundColor = selectedColor;
        convertColorToBase64(selectedColor, function (base64Image) {
          applyBackgroundImage(base64Image); // Apply the Base64 image
        });
      });
    }

    // -------------------------------
    // Inject Background Image Button if not already present.
    if (!document.getElementById("customBackgroundImageButton")) {
      const bgImageSpan = document.createElement("span");
      bgImageSpan.setAttribute("type", "grid");

      const bgImageContainer = document.createElement("div");
      bgImageContainer.style.textAlign = "center";

      const bgImageLabel = document.createElement("strong");
      bgImageLabel.textContent = "Background Image";
      bgImageContainer.appendChild(bgImageLabel);
      bgImageContainer.appendChild(document.createElement("br"));

      const bgImageButton = document.createElement("button");
      bgImageButton.id = "customBackgroundImageButton";
      bgImageButton.tabIndex = 0;
      bgImageButton.setAttribute("aria-label", "Custom Background Image");
      bgImageButton.setAttribute("aria-current", "false");
      bgImageButton.className = "rounded-btn large-btn"; // Add class for rounded edges and large button

      bgImageContainer.appendChild(bgImageButton);
      bgImageSpan.appendChild(bgImageContainer);
      themeLayoutWrapper.appendChild(bgImageSpan);

      bgImageButton.addEventListener("click", function () {
        const imgInput = document.createElement("input");
        imgInput.type = "file";
        imgInput.accept = "image/*";
        imgInput.addEventListener("change", function () {
          const reader = new FileReader();
          reader.onload = function (e) {
            const base64Image = e.target.result;
            applyBackgroundImage(base64Image); // Apply the Base64 image
            localStorage.setItem("customBackgroundImage", base64Image); // Save the image to localStorage
          };
          reader.readAsDataURL(imgInput.files[0]);
        });
        imgInput.click();
      });
    }

    // Apply any saved colors and images.
    applySavedColors();
    return true;
  }

  // Use a MutationObserver to continuously check for the Themes section.
  function observeForThemeSection() {
    const observer = new MutationObserver((mutations, obs) => {
      insertCustomButtons(); // This will re-inject missing buttons if ThemeLayoutWrapper is reloaded.
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Add CSS for the rounded buttons and larger size
  const style = document.createElement("style");
  style.innerHTML = `
    .rounded-btn {
      border-radius: 12px; /* More rounded edges */
      padding: 15px;
      background-color: #f0f0f0;
      border: 2px solid #ccc;
      cursor: pointer;
    }
    .rounded-btn:hover {
      background-color: #e0e0e0;
    }
    .large-btn {
      width: 150px; /* Larger button */
      height: 100px; /* Larger button */
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeForThemeSection);
  } else {
    observeForThemeSection();
  }
})();
