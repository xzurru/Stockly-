/****************************************************
 * Übersetzungen - UI-Texte (DE, EN, RU)
 ****************************************************/
const translations = {
    de: {
      title: "Erweitertes Aktien Dashboard",
      searchPlaceholder: "Suche...",
      langLabel: "Sprache:",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      thSymbol: "Symbol",
      thName: "Name",
      thPrice: "Preis",
      thMcap: "Marktkap.",
      thChange: "Veränd. %",
      chartTitle: "Preisverlauf",
      analysisTitle: "Analyse",
      analysisContent:
        "Hier könnte eine Analyse der Fundamentaldaten, Kennzahlen und Marktentwicklungen stehen. Anpassbar nach Bedarf.",
      calcTitle: "Rendite-Rechner",
      calcInvestLabel: "Investitionsbetrag:",
      calcGrowthLabel: "Wachstum (% p.a.):",
      calcBtn: "Berechnen",
      calcResultText: (years, finalAmount) =>
        `Nach ${years} Jahren könnte Ihr Investment etwa ${finalAmount.toFixed(
          2
        )} € wert sein (vereinfachte Schätzung).`,
    },
    en: {
      title: "Advanced Stock Dashboard",
      searchPlaceholder: "Search...",
      langLabel: "Language:",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      thSymbol: "Symbol",
      thName: "Name",
      thPrice: "Price",
      thMcap: "Market Cap",
      thChange: "Change %",
      chartTitle: "Price Chart",
      analysisTitle: "Analysis",
      analysisContent:
        "A fundamental analysis, ratio evaluation, and market trends could be displayed here. Customize as needed.",
      calcTitle: "Return Calculator",
      calcInvestLabel: "Investment:",
      calcGrowthLabel: "Growth (% p.a.):",
      calcBtn: "Calculate",
      calcResultText: (years, finalAmount) =>
        `After ${years} years, your investment might be worth around ${finalAmount.toFixed(
          2
        )} (simplified estimate).`,
    },
    ru: {
      title: "Расширенная панель акций",
      searchPlaceholder: "Поиск...",
      langLabel: "Язык:",
      themeDark: "Тёмная тема",
      themeLight: "Светлая тема",
      thSymbol: "Символ",
      thName: "Название",
      thPrice: "Цена",
      thMcap: "Рыночная кап.",
      thChange: "Изм. %",
      chartTitle: "График цены",
      analysisTitle: "Анализ",
      analysisContent:
        "Здесь может быть представлен фундаментальный анализ, ключевые показатели и рыночные тренды. Можно настроить под нужды.",
      calcTitle: "Калькулятор доходности",
      calcInvestLabel: "Инвестиции:",
      calcGrowthLabel: "Рост (% в год):",
      calcBtn: "Рассчитать",
      calcResultText: (years, finalAmount) =>
        `Через ${years} лет ваша инвестиция может стоить примерно ${finalAmount.toFixed(
          2
        )} (упрощённая оценка).`,
    },
  };
  
  // UI-Elemente referenzieren
  const titleEl = document.getElementById("title");
  const searchEl = document.getElementById("search");
  const langLabel = document.getElementById("lang-label");
  const langSelectEl = document.getElementById("lang-select");
  const themeToggle = document.getElementById("theme-toggle");
  const thSymbol = document.getElementById("th-symbol");
  const thName = document.getElementById("th-name");
  const thPrice = document.getElementById("th-price");
  const thMcap = document.getElementById("th-mcap");
  const thChange = document.getElementById("th-change");
  
  // Modal-Elemente
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close");
  const detailSymbolEl = document.getElementById("detail-symbol");
  const detailNameEl = document.getElementById("detail-name");
  const chartTitleEl = document.getElementById("chart-title");
  const analysisTitleEl = document.getElementById("analysis-title");
  const analysisContentEl = document.getElementById("analysis-content");
  const calcTitleEl = document.getElementById("calc-title");
  const calcInvestLabelEl = document.getElementById("calc-invest-label");
  const calcGrowthLabelEl = document.getElementById("calc-growth-label");
  const calcBtnEl = document.getElementById("calc-btn");
  const calcInvestEl = document.getElementById("calc-invest");
  const calcGrowthEl = document.getElementById("calc-growth");
  const calcResultEl = document.getElementById("calc-result");
  
  // Tabelle
  const stockListEl = document.getElementById("stock-list");
  
  /****************************************************
   * Funktion: Sprache umschalten
   ****************************************************/
  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
  
    titleEl.textContent = t.title;
    searchEl.placeholder = t.searchPlaceholder;
    langLabel.textContent = t.langLabel;
  
    // Theme-Button anpassen
    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = t.themeLight;
    } else {
      themeToggle.textContent = t.themeDark;
    }
  
    thSymbol.textContent = t.thSymbol;
    thName.textContent = t.thName;
    thPrice.textContent = t.thPrice;
    thMcap.textContent = t.thMcap;
    thChange.textContent = t.thChange;
    chartTitleEl.textContent = t.chartTitle;
    analysisTitleEl.textContent = t.analysisTitle;
    analysisContentEl.textContent = t.analysisContent;
    calcTitleEl.textContent = t.calcTitle;
    calcInvestLabelEl.textContent = t.calcInvestLabel;
    calcGrowthLabelEl.textContent = t.calcGrowthLabel;
    calcBtnEl.textContent = t.calcBtn;
  }
  
  // Startsprache Deutsch
  applyLanguage("de");
  
  /****************************************************
   * Sprachwechsel-Event
   ****************************************************/
  langSelectEl.addEventListener("change", () => {
    applyLanguage(langSelectEl.value);
  });
  
  /****************************************************
   * Dark-/Light-Mode Toggle
   ****************************************************/
  themeToggle.addEventListener("click", () => {
    // Wir toggeln die Klasse 'dark' auf <body>
    document.body.classList.toggle("dark");
  
    const currentLang = langSelectEl.value;
    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = translations[currentLang].themeLight;
    } else {
      themeToggle.textContent = translations[currentLang].themeDark;
    }
  });
  
  /****************************************************
   * Aktien-Liste laden (FinancialModelingPrep)
   ****************************************************/
  const FMP_API_KEY = "H3vHo4vy7cWr8il4zq4kaEkn1VrlJGL9"; // Eigener Key
  // 20 US-Symbole
  const symbols = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA",
    "NVDA", "BRK.B", "META", "JPM", "V",
    "JNJ", "WMT", "PG", "MA", "DIS",
    "BAC", "HD", "XOM", "PFE", "KO"
  ];
  const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbols.join()}?apikey=${FMP_API_KEY}`;
  
  // Daten holen und Tabelle füllen
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("API hat kein Array zurückgegeben.");
      }
  
      data.forEach((stock) => {
        const row = document.createElement("tr");
        // Basis-Tailwind-Klassen
        row.className = "border-b border-gray-300 dark:border-gray-700";
  
        const price = stock.price ? stock.price.toFixed(2) : "-";
        let change =
          stock.changesPercentage ? parseFloat(stock.changesPercentage).toFixed(2) : "0.00";
  
        row.innerHTML = `
          <td class="py-2 px-3">${stock.symbol || "-"}</td>
          <td class="py-2 px-3">${stock.name || "-"}</td>
          <td class="py-2 px-3">${price}</td>
          <td class="py-2 px-3">${stock.marketCap ? stock.marketCap.toLocaleString() : "-"}</td>
          <td class="py-2 px-3">${change}%</td>
        `;
  
        // Positive / Negative färben
        const changeVal = parseFloat(change);
        const changeCell = row.lastElementChild;
        if (!isNaN(changeVal)) {
          if (changeVal > 0) {
            // z. B. Neon-Grün
            changeCell.classList.add("text-green-400", "font-bold");
          } else if (changeVal < 0) {
            changeCell.classList.add("text-pink-400", "font-bold");
          }
        }
  
        // Klick-Event -> Detail-Modal
        row.addEventListener("click", () => {
          openDetailModal(stock);
        });
  
        stockListEl.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Aktien-Daten:", err);
    });
  
  /****************************************************
   * Suchfunktion
   ****************************************************/
  searchEl.addEventListener("input", () => {
    const q = searchEl.value.toLowerCase();
    const rows = stockListEl.querySelectorAll("tr");
    rows.forEach((row) => {
      const symbol = row.cells[0].textContent.toLowerCase();
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = symbol.includes(q) || name.includes(q) ? "" : "none";
    });
  });
  
  /****************************************************
   * MODAL / DETAIL-ANSICHT
   ****************************************************/
  let currentChart = null;
  
  function openDetailModal(stock) {
    // Symbol + Name
    detailSymbolEl.textContent = "Symbol: " + (stock.symbol || "-");
    detailNameEl.textContent = stock.name || "-";
  
    // Beispielhafte (statische) Daten für Chart
    const labels = ["Mo", "Di", "Mi", "Do", "Fr"];
    const exampleData = [
      stock.price ? stock.price - 5 : 10,
      stock.price ? stock.price - 2 : 13,
      stock.price ? stock.price : 18,
      stock.price ? stock.price + 2 : 20,
      stock.price ? stock.price + 1 : 15,
    ];
  
    if (currentChart) {
      currentChart.destroy();
    }
    const ctx = document.getElementById("chartCanvas").getContext("2d");
    currentChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: stock.symbol || "Kursverlauf",
            data: exampleData,
            borderWidth: 2,
            borderColor: "#ff9fee",
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false },
        },
      },
    });
  
    // Modal anzeigen
    modalBackdrop.classList.remove("hidden");
    modalBackdrop.style.display = "flex";
  }
  
  // Schließen
  modalCloseBtn.addEventListener("click", () => {
    modalBackdrop.style.display = "none";
  });
  
  // Klick auf dunklen Hintergrund schließt
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.style.display = "none";
    }
  });
  
  /****************************************************
   * Calculator (Rendite-Rechner)
   ****************************************************/
  calcBtnEl.addEventListener("click", () => {
    const invest = parseFloat(calcInvestEl.value) || 0;
    const growth = parseFloat(calcGrowthEl.value) / 100 || 0;
    const years = 5;
    const finalAmount = invest * Math.pow(1 + growth, years);
  
    const lang = langSelectEl.value;
    calcResultEl.textContent = translations[lang].calcResultText(years, finalAmount);
  });
  