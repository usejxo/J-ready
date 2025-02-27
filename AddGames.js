// Fetch games from JSON URL
async function fetchGames() {
    try {
        const response = await fetch("https://usejxo.netlify.app/J-ready/games.json");
        if (!response.ok) throw new Error(`Failed to fetch games. Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// Create an SVG element
function createSvgElement(tag, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
}

// Create the game UI elements
function createGameElement(game, coinCost, gameId) {
    const rewardsContainer = document.querySelector("#mystuff_layout > div.css-6qj24k-Box.eny8iue0 > div.node_modules--cainc-cauliflower-src-components-layout-___Layout__layout-grid.css-1mcqq32-Layout.evuck0s0");
    if (!rewardsContainer) return console.error("Rewards container not found.");

    const gameWrapper = document.createElement("span");
    gameWrapper.classList.add("audiowrapper", "css-t85nq0-StyledSpan", "ecwdchm0");
    gameWrapper.id = `AW-${game.title.replace(/\s+/g, "_")}`;

    const gameButton = document.createElement("button");
    gameButton.type = "button";
    gameButton.id = `game_button${gameId}`;
    gameButton.setAttribute("audiostate", "STOPPED");
    gameButton.classList.add("embu0a00", "btn", "btn-link", "enabled");
    gameButton.setAttribute("aria-label", `${game.title} game ${coinCost} Coins`);

    const gameBox = document.createElement("div");
    gameBox.classList.add("css-6qj24k-Box", "eny8iue0");
    gameBox.style.flex = "1 1 0%";

    const gameCard = document.createElement("div");
    gameCard.id = `${game.title.replace(/\s+/g, "")}_card`;
    gameCard.classList.add("e506b522", "embu0a00", "css-9b9fe5-createComponent-GameCard", "bg-default");

    const cardHeader = document.createElement("header");
    cardHeader.classList.add("e506b522-card-header", "embu0a00", "css-j9yfu-createComponent-GameCard", "card-header");

    const headerText = document.createElement("div");
    headerText.classList.add("css-1vpki9y-Typography", "enj526p0");
    headerText.textContent = game.title;

    const gameContent = document.createElement("div");
    gameContent.classList.add("css-9z0vgd-GameCardContent", "e506b521");

    const coinsDiv = document.createElement("div");
    coinsDiv.classList.add("css-9fpcke-Coins", "e506b523");
    coinsDiv.appendChild(createCoinSvg());
    coinsDiv.append(` ${coinCost}`);

    cardHeader.appendChild(headerText);
    gameContent.appendChild(coinsDiv);
    gameCard.append(cardHeader, gameContent);
    gameBox.appendChild(gameCard);
    gameButton.appendChild(gameBox);
    gameWrapper.appendChild(gameButton);
    rewardsContainer.appendChild(gameWrapper);

    gameButton.addEventListener("click", () => purchaseGame(game.link, 90)); // 90 seconds
}

// Create Coin SVG
function createCoinSvg() {
    const coinSvg = createSvgElement("svg", { "aria-hidden": "true", width: "30", height: "30", viewBox: "0 0 30 30" });
    coinSvg.append(
        createSvgElement("circle", { cx: "14.99", cy: "15.05", r: "11.99", fill: "#f4d7a4" }),
        createSvgElement("path", { d: "M18.19,6.26A12,12,0,0,0,8.26,25,12,12,0,0,0,24.92,8.32,12,12,0,0,0,18.19,6.26Z", fill: "#f2c32c" }),
        createSvgElement("circle", { cx: "14.99", cy: "15.05", r: "8.4", fill: "none", stroke: "#d29a00", "stroke-miterlimit": "10", "stroke-width": "1.6" }),
        createSvgElement("circle", { cx: "15.01", cy: "14.95", r: "11.99", fill: "none", stroke: "#505050", "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
    return coinSvg;
}

// Handle game purchase and timer
function purchaseGame(gameLink, durationSeconds) {
    window.open(gameLink, "_blank");
    let timeLeft = durationSeconds;

    const timerDisplay = document.createElement("div");
    timerDisplay.id = "gameTimer";
    timerDisplay.textContent = `Game time remaining: ${timeLeft} seconds`;
    document.body.appendChild(timerDisplay);

    const timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Game time remaining: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerDisplay.remove();
            window.focus();
        }
    }, 1000);
}

// Load and display games
async function loadGames() {
    const games = await fetchGames();
    games.forEach((game, index) => createGameElement(game, 50, index + 6)); // Assuming games start at ID 6
}

// Start loading games when the script runs
loadGames();
