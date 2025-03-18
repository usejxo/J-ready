<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>J-Ready Injection Helper</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
    #message, #instructions {
      max-width: 600px;
      margin: 50px auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    button {
      background-color: blue;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
      border-radius: 4px;
    }
    textarea {
      width: 100%;
      height: 400px;
      margin-top: 20px;
      font-family: Consolas, monospace;
      font-size: 13px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: none;
    }
    a {
      color: blue;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="message">
    <h2>Before You Begin</h2>
    <p>Please ensure you are logged into I‑Ready.</p>
    <button onclick="showInstructions()">Okay</button>
  </div>

  <div id="instructions" style="display: none;">
    <h2>Injection Instructions</h2>
    <p>
      1. Open the I‑Ready page: <a href="https://login.i-ready.com/student/dashboard/home" target="_blank">I‑Ready Login</a>.<br>
      2. Once the page loads, open Developer Tools by right-clicking (or using a two‑finger tap) and selecting “Inspect,” then switch to the Console tab.<br>
      3. Click inside the code box below, press <strong>Ctrl+A</strong> to select all, then <strong>Ctrl+C</strong> to copy the script.<br>
      4. Paste it into the I‑Ready Console (using <strong>Ctrl+V</strong>) and press Enter.<br>
      5. To toggle the injection status GUI, press <strong>Ctrl+Shift+X</strong> (it is hidden by default).
    </p>
    <textarea readonly id="copyScript">
(function(){
  function createStatusGUI() {
    var gui = document.createElement('div');
    gui.id = 'injectionStatusGUI';
    gui.style.position = 'fixed';
    gui.style.bottom = '10px';
    gui.style.right = '10px';
    gui.style.backgroundColor = 'rgba(0,0,0,0.7)';
    gui.style.color = '#fff';
    gui.style.padding = '10px';
    gui.style.zIndex = '9999';
    gui.style.fontFamily = 'Arial, sans-serif';
    gui.style.fontSize = '14px';
    gui.style.display = 'none'; // Hidden by default
    gui.innerHTML = '<strong>Status:</strong><br>';
    document.body.appendChild(gui);
    return gui;
  }

  function updateStatus(gui) {
    var script1 = document.querySelector('script[data-edit-theme]');
    var status1 = script1 ? 'Injected' : 'Not Injected';
    gui.innerHTML = '<strong>Status:</strong><br>' +
      'EditTheme.js: ' + status1 + '<br>' +
      '<em>Press Ctrl+Shift+X to toggle this GUI</em>';
  }

  var gui = document.getElementById('injectionStatusGUI') || createStatusGUI();
  updateStatus(gui);
  gui.style.display = 'none'; // Ensure it's hidden

  if (!document.querySelector('script[data-edit-theme]')) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-edit-theme', 'true');
    script.textContent = '(function () {\n' +
'  // Apply saved colors from localStorage\n' +
'  function applySavedColors() {\n' +
'    const savedBarColor = localStorage.getItem("customBarColor");\n' +
'    if (savedBarColor) {\n' +
'      document.body.style.backgroundColor = savedBarColor;\n' +
'      const barPreview = document.getElementById("customBarColorPreview");\n' +
'      if (barPreview) {\n' +
'        barPreview.style.backgroundColor = savedBarColor;\n' +
'      }\n' +
'    }\n' +
'    const savedTextColor = localStorage.getItem("customTextColor");\n' +
'    if (savedTextColor) {\n' +
'      document.body.style.color = savedTextColor;\n' +
'      const textPreview = document.getElementById("customTextColorPreview");\n' +
'      if (textPreview) {\n' +
'        textPreview.style.backgroundColor = savedTextColor;\n' +
'      }\n' +
'    }\n' +
'    const savedBackgroundImage = localStorage.getItem("customBackgroundImage");\n' +
'    if (savedBackgroundImage) {\n' +
'      const imgTag = document.getElementById("background-image");\n' +
'      if (imgTag) {\n' +
'        imgTag.src = savedBackgroundImage;\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'\n' +
'  // Function to convert a color to Base64 image\n' +
'  function convertColorToBase64(color, callback) {\n' +
'    const canvas = document.createElement("canvas");\n' +
'    const ctx = canvas.getContext("2d");\n' +
'    canvas.width = 1;\n' +
'    canvas.height = 1;\n' +
'    ctx.fillStyle = color;\n' +
'    ctx.fillRect(0, 0, 1, 1);\n' +
'    callback(canvas.toDataURL());\n' +
'  }\n' +
'\n' +
'  // Function to apply the Base64 image as the background\n' +
'  function applyBackgroundImage(base64Image) {\n' +
'    const imgTag = document.getElementById("background-image");\n' +
'    if (imgTag) {\n' +
'      imgTag.src = base64Image;\n' +
'      localStorage.setItem("customBackgroundImage", base64Image);\n' +
'    }\n' +
'  }\n' +
'\n' +
'  // Function to inject the custom buttons into the Themes grid\n' +
'  function insertCustomButtons() {\n' +
'    const themeLayoutWrapper = document.getElementById("ThemeLayoutWrapper");\n' +
'    if (!themeLayoutWrapper) return false;\n' +
'\n' +
'    if (!document.getElementById("customBarColorButton")) {\n' +
'      const barSpan = document.createElement("span");\n' +
'      barSpan.setAttribute("type", "grid");\n' +
'\n' +
'      const barContainer = document.createElement("div");\n' +
'      barContainer.style.textAlign = "center";\n' +
'\n' +
'      const barLabel = document.createElement("strong");\n' +
'      barLabel.textContent = "Bar Color picker";\n' +
'      barContainer.appendChild(barLabel);\n' +
'      barContainer.appendChild(document.createElement("br"));\n' +
'\n' +
'      const barButton = document.createElement("button");\n' +
'      barButton.id = "customBarColorButton";\n' +
'      barButton.tabIndex = 0;\n' +
'      barButton.setAttribute("aria-label", "Custom Bar Color");\n' +
'      barButton.setAttribute("aria-current", "false");\n' +
'      barButton.className = "rounded-btn large-btn";\n' +
'\n' +
'      const barPreview = document.createElement("div");\n' +
'      barPreview.id = "customBarColorPreview";\n' +
'      barPreview.style.width = "100%";\n' +
'      barPreview.style.height = "100%";\n' +
'      barPreview.style.backgroundColor = localStorage.getItem("customBarColor") || "#ffffff";\n' +
'\n' +
'      barButton.appendChild(barPreview);\n' +
'      barContainer.appendChild(barButton);\n' +
'      barSpan.appendChild(barContainer);\n' +
'      themeLayoutWrapper.appendChild(barSpan);\n' +
'\n' +
'      const barColorInput = document.createElement("input");\n' +
'      barColorInput.type = "color";\n' +
'      barColorInput.id = "customBarColorPicker";\n' +
'      barColorInput.style.display = "none";\n' +
'      document.body.appendChild(barColorInput);\n' +
'\n' +
'      barButton.addEventListener("click", function () {\n' +
'        barColorInput.click();\n' +
'      });\n' +
'      barColorInput.addEventListener("input", function () {\n' +
'        const selectedColor = barColorInput.value;\n' +
'        barPreview.style.backgroundColor = selectedColor;\n' +
'        document.body.style.backgroundColor = selectedColor;\n' +
'        localStorage.setItem("customBarColor", selectedColor);\n' +
'      });\n' +
'    }\n' +
'\n' +
'    if (!document.getElementById("customTextColorButton")) {\n' +
'      const textSpan = document.createElement("span");\n' +
'      textSpan.setAttribute("type", "grid");\n' +
'\n' +
'      const textContainer = document.createElement("div");\n' +
'      textContainer.style.textAlign = "center";\n' +
'\n' +
'      const textLabel = document.createElement("strong");\n' +
'      textLabel.textContent = "Text Color picker";\n' +
'      textContainer.appendChild(textLabel);\n' +
'      textContainer.appendChild(document.createElement("br"));\n' +
'\n' +
'      const textButton = document.createElement("button");\n' +
'      textButton.id = "customTextColorButton";\n' +
'      textButton.tabIndex = 0;\n' +
'      textButton.setAttribute("aria-label", "Custom Text Color");\n' +
'      textButton.setAttribute("aria-current", "false");\n' +
'      textButton.className = "rounded-btn large-btn";\n' +
'\n' +
'      const textPreview = document.createElement("div");\n' +
'      textPreview.id = "customTextColorPreview";\n' +
'      textPreview.style.width = "100%";\n' +
'      textPreview.style.height = "100%";\n' +
'      textPreview.style.backgroundColor = localStorage.getItem("customTextColor") || "#000000";\n' +
'\n' +
'      textButton.appendChild(textPreview);\n' +
'      textContainer.appendChild(textButton);\n' +
'      textSpan.appendChild(textContainer);\n' +
'      themeLayoutWrapper.appendChild(textSpan);\n' +
'\n' +
'      const textColorInput = document.createElement("input");\n' +
'      textColorInput.type = "color";\n' +
'      textColorInput.id = "customTextColorPicker";\n' +
'      textColorInput.style.display = "none";\n' +
'      document.body.appendChild(textColorInput);\n' +
'\n' +
'      textButton.addEventListener("click", function () {\n' +
'        textColorInput.click();\n' +
'      });\n' +
'      textColorInput.addEventListener("input", function () {\n' +
'        const selectedColor = textColorInput.value;\n' +
'        textPreview.style.backgroundColor = selectedColor;\n' +
'        document.body.style.color = selectedColor;\n' +
'        localStorage.setItem("customTextColor", selectedColor);\n' +
'      });\n' +
'    }\n' +
'\n' +
'    if (!document.getElementById("customBackgroundColorButton")) {\n' +
'      const bgColorSpan = document.createElement("span");\n' +
'      bgColorSpan.setAttribute("type", "grid");\n' +
'\n' +
'      const bgColorContainer = document.createElement("div");\n' +
'      bgColorContainer.style.textAlign = "center";\n' +
'\n' +
'      const bgColorLabel = document.createElement("strong");\n' +
'      bgColorLabel.textContent = "Background Color picker";\n' +
'      bgColorContainer.appendChild(bgColorLabel);\n' +
'      bgColorContainer.appendChild(document.createElement("br"));\n' +
'\n' +
'      const bgColorButton = document.createElement("button");\n' +
'      bgColorButton.id = "customBackgroundColorButton";\n' +
'      bgColorButton.tabIndex = 0;\n' +
'      bgColorButton.setAttribute("aria-label", "Custom Background Color");\n' +
'      bgColorButton.setAttribute("aria-current", "false");\n' +
'      bgColorButton.className = "rounded-btn large-btn";\n' +
'\n' +
'      const bgColorPreview = document.createElement("div");\n' +
'      bgColorPreview.id = "customBackgroundColorPreview";\n' +
'      bgColorPreview.style.width = "100%";\n' +
'      bgColorPreview.style.height = "100%";\n' +
'      bgColorPreview.style.backgroundColor = "#f0f0f0";\n' +
'\n' +
'      bgColorButton.appendChild(bgColorPreview);\n' +
'      bgColorContainer.appendChild(bgColorButton);\n' +
'      bgColorSpan.appendChild(bgColorContainer);\n' +
'      themeLayoutWrapper.appendChild(bgColorSpan);\n' +
'\n' +
'      const bgColorInput = document.createElement("input");\n' +
'      bgColorInput.type = "color";\n' +
'      bgColorInput.id = "customBackgroundColorPicker";\n' +
'      bgColorInput.style.display = "none";\n' +
'      document.body.appendChild(bgColorInput);\n' +
'\n' +
'      bgColorButton.addEventListener("click", function () {\n' +
'        bgColorInput.click();\n' +
'      });\n' +
'      bgColorInput.addEventListener("input", function () {\n' +
'        const selectedColor = bgColorInput.value;\n' +
'        bgColorPreview.style.backgroundColor = selectedColor;\n' +
'        convertColorToBase64(selectedColor, function (base64Image) {\n' +
'          applyBackgroundImage(base64Image);\n' +
'        });\n' +
'      });\n' +
'    }\n' +
'\n' +
'    if (!document.getElementById("customBackgroundImageButton")) {\n' +
'      const bgImageSpan = document.createElement("span");\n' +
'      bgImageSpan.setAttribute("type", "grid");\n' +
'\n' +
'      const bgImageContainer = document.createElement("div");\n' +
'      bgImageContainer.style.textAlign = "center";\n' +
'\n' +
'      const bgImageLabel = document.createElement("strong");\n' +
'      bgImageLabel.textContent = "Background Image";\n' +
'      bgImageContainer.appendChild(bgImageLabel);\n' +
'      bgImageContainer.appendChild(document.createElement("br"));\n' +
'\n' +
'      const bgImageButton = document.createElement("button");\n' +
'      bgImageButton.id = "customBackgroundImageButton";\n' +
'      bgImageButton.tabIndex = 0;\n' +
'      bgImageButton.setAttribute("aria-label", "Custom Background Image");\n' +
'      bgImageButton.setAttribute("aria-current", "false");\n' +
'      bgImageButton.className = "rounded-btn large-btn";\n' +
'\n' +
'      bgImageContainer.appendChild(bgImageButton);\n' +
'      bgImageSpan.appendChild(bgImageContainer);\n' +
'      themeLayoutWrapper.appendChild(bgImageSpan);\n' +
'\n' +
'      bgImageButton.addEventListener("click", function () {\n' +
'        const imgInput = document.createElement("input");\n' +
'        imgInput.type = "file";\n' +
'        imgInput.accept = "image/*";\n' +
'        imgInput.addEventListener("change", function () {\n' +
'          const reader = new FileReader();\n' +
'          reader.onload = function (e) {\n' +
'            const base64Image = e.target.result;\n' +
'            applyBackgroundImage(base64Image);\n' +
'            localStorage.setItem("customBackgroundImage", base64Image);\n' +
'          };\n' +
'          reader.readAsDataURL(imgInput.files[0]);\n' +
'        });\n' +
'        imgInput.click();\n' +
'      });\n' +
'    }\n' +
'\n' +
'    applySavedColors();\n' +
'    return true;\n' +
'  }\n' +
'\n' +
'  function observeForThemeSection() {\n' +
'    const observer = new MutationObserver((mutations, obs) => {\n' +
'      insertCustomButtons();\n' +
'    });\n' +
'    observer.observe(document.body, { childList: true, subtree: true });\n' +
'  }\n' +
'\n' +
'  const style = document.createElement("style");\n' +
'  style.innerHTML = "\n    .rounded-btn {\n      border-radius: 12px; /* More rounded edges */\n      padding: 15px;\n      background-color: #f0f0f0;\n      border: 2px solid #ccc;\n      cursor: pointer;\n    }\n    .rounded-btn:hover {\n      background-color: #e0e0e0;\n    }\n    .large-btn {\n      width: 150px; /* Larger button */\n      height: 100px; /* Larger button */\n    }\n  ";\n' +
'  document.head.appendChild(style);\n' +
'\n' +
'  if (document.readyState === "loading") {\n' +
'    document.addEventListener("DOMContentLoaded", observeForThemeSection);\n' +
'  } else {\n' +
'    observeForThemeSection();\n' +
'  }\n' +
'})();';
    document.body.appendChild(script);
  }

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
      gui.style.display = (gui.style.display === 'none') ? 'block' : 'none';
    }
  });
})();
    </textarea>
    <p>Copy the script above, then paste it into the I‑Ready Console and press Enter.</p>
  </div>

  <script>
    function showInstructions() {
      document.getElementById('message').style.display = 'none';
      document.getElementById('instructions').style.display = 'block';
    }
  </script>
</body>
</html>
