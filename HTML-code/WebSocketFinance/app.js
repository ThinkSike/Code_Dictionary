// Initialize Socket.IO connection
const socket = io();

// Application state
let appState = {
    connected: false,
    updatesCount: 0,
    subscribedStocks: new Set(),
    lastPing: null,
    latency: 0
};

// DOM Elements
const elements = {
    connectionStatus: document.getElementById('connectionStatus'),
    clientCount: document.getElementById('clientCount'),
    stocksList: document.getElementById('stocksList'),
    currenciesList: document.getElementById('currenciesList'),
    updatesFeed: document.getElementById('updatesFeed'),
    marketIndices: document.getElementById('marketIndices'),
    updatesCount: document.getElementById('updatesCount'),
    lastUpdate: document.getElementById('lastUpdate'),
    serverStatus: document.getElementById('serverStatus'),
    latency: document.getElementById('latency'),
    stockSelect: document.getElementById('stockSelect'),
    subscribedStocks: document.getElementById('subscribedStocks')
};

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to server');
    appState.connected = true;
    updateConnectionStatus(true);
    measureLatency();
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    appState.connected = false;
    updateConnectionStatus(false);
});

socket.on('reconnect', () => {
    console.log('Reconnected to server');
    appState.connected = true;
    updateConnectionStatus(true);
    measureLatency();
});

socket.on('clientCount', (count) => {
    elements.clientCount.textContent = count;
});

socket.on('initialData', (data) => {
    console.log('Received initial data:', data);
    populateInitialData(data);
});

socket.on('financialUpdate', (update) => {
    console.log('Received financial update:', update);
    handleFinancialUpdate(update);
});

socket.on('stockData', (data) => {
    console.log('Received stock data:', data);
    updateStockDisplay(data);
});

// Connection status management
function updateConnectionStatus(connected) {
    const statusDot = elements.connectionStatus.querySelector('.status-dot');
    const statusText = elements.connectionStatus.querySelector('.status-text');
    
    if (connected) {
        statusDot.className = 'status-dot connected';
        statusText.textContent = 'Connected';
        elements.serverStatus.textContent = 'Connected';
        elements.serverStatus.className = 'stat-value connected';
    } else {
        statusDot.className = 'status-dot disconnected';
        statusText.textContent = 'Disconnected';
        elements.serverStatus.textContent = 'Disconnected';
        elements.serverStatus.className = 'stat-value disconnected';
    }
}

// Latency measurement
function measureLatency() {
    appState.lastPing = Date.now();
    socket.emit('ping');
}

socket.on('pong', () => {
    if (appState.lastPing) {
        appState.latency = Date.now() - appState.lastPing;
        elements.latency.textContent = `${appState.latency} ms`;
    }
});

// Populate initial data on page load
function populateInitialData(data) {
    // Populate stocks
    populateStocks(data.stocks);
    
    // Populate currencies
    populateCurrencies(data.currencies);
    
    // Populate market indices
    populateMarketIndices(data.marketIndex);
}

// Populate stocks list
function populateStocks(stocks) {
    elements.stocksList.innerHTML = '';
    
    for (const [symbol, data] of Object.entries(stocks)) {
        const stockItem = createStockItem(symbol, data);
        elements.stocksList.appendChild(stockItem);
    }
}

// Create stock item HTML
function createStockItem(symbol, data) {
    const item = document.createElement('div');
    item.className = 'stock-item';
    item.id = `stock-${symbol}`;
    
    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const changeIcon = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    
    item.innerHTML = `
        <div class="stock-info">
            <span class="stock-symbol">${symbol}</span>
            <span class="stock-price">$${data.price.toFixed(2)}</span>
        </div>
        <div class="stock-change ${changeClass}">
            <i class="fas ${changeIcon}"></i>
            <span>${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}</span>
        </div>
    `;
    
    return item;
}

// Populate currencies list
function populateCurrencies(currencies) {
    elements.currenciesList.innerHTML = '';
    
    for (const [pair, data] of Object.entries(currencies)) {
        const currencyItem = createCurrencyItem(pair, data);
        elements.currenciesList.appendChild(currencyItem);
    }
}

// Create currency item HTML
function createCurrencyItem(pair, data) {
    const item = document.createElement('div');
    item.className = 'currency-item';
    item.id = `currency-${pair.replace('/', '-')}`;
    
    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const changeIcon = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    
    item.innerHTML = `
        <div class="currency-info">
            <span class="currency-pair">${pair}</span>
            <span class="currency-rate">${data.rate.toFixed(4)}</span>
        </div>
        <div class="currency-change ${changeClass}">
            <i class="fas ${changeIcon}"></i>
            <span>${data.change >= 0 ? '+' : ''}${data.change.toFixed(4)}</span>
        </div>
    `;
    
    return item;
}

// Populate market indices
function populateMarketIndices(indices) {
    elements.marketIndices.innerHTML = '';
    
    for (const [name, data] of Object.entries(indices)) {
        const indexItem = createMarketIndexItem(name, data);
        elements.marketIndices.appendChild(indexItem);
    }
}

// Create market index item HTML
function createMarketIndexItem(name, data) {
    const item = document.createElement('div');
    item.className = 'index-item';
    item.id = `index-${name.replace(/[^a-zA-Z0-9]/g, '-')}`;
    
    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const changeIcon = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    
    item.innerHTML = `
        <div class="index-name">${name}</div>
        <div class="index-value">${data.value.toFixed(2)}</div>
        <div class="index-change ${changeClass}">
            <i class="fas ${changeIcon}"></i>
            <span>${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}</span>
        </div>
    `;
    
    return item;
}

// Handle incoming financial updates
function handleFinancialUpdate(update) {
    appState.updatesCount++;
    elements.updatesCount.textContent = appState.updatesCount;
    elements.lastUpdate.textContent = update.timestamp;
    
    // Update the corresponding display
    switch (update.type) {
        case 'stock':
            updateStockDisplay(update);
            break;
        case 'currency':
            updateCurrencyDisplay(update);
            break;
        case 'index':
            updateMarketIndexDisplay(update);
            break;
    }
    
    // Add to live updates feed
    addToUpdatesFeed(update);
}

// Update stock display
function updateStockDisplay(update) {
    const stockElement = document.getElementById(`stock-${update.symbol}`);
    if (stockElement) {
        const priceElement = stockElement.querySelector('.stock-price');
        const changeElement = stockElement.querySelector('.stock-change');
        const changeIcon = changeElement.querySelector('i');
        const changeText = changeElement.querySelector('span');
        
        // Update price
        priceElement.textContent = `$${update.price.toFixed(2)}`;
        
        // Update change styling and values
        const changeClass = update.change >= 0 ? 'positive' : 'negative';
        const changeIconClass = update.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        changeElement.className = `stock-change ${changeClass}`;
        changeIcon.className = `fas ${changeIconClass}`;
        changeText.textContent = `${update.change >= 0 ? '+' : ''}${update.change.toFixed(2)}`;
        
        // Add flash animation
        stockElement.classList.add('flash-update');
        setTimeout(() => stockElement.classList.remove('flash-update'), 1000);
    }
}

// Update currency display
function updateCurrencyDisplay(update) {
    const currencyElement = document.getElementById(`currency-${update.pair.replace('/', '-')}`);
    if (currencyElement) {
        const rateElement = currencyElement.querySelector('.currency-rate');
        const changeElement = currencyElement.querySelector('.currency-change');
        const changeIcon = changeElement.querySelector('i');
        const changeText = changeElement.querySelector('span');
        
        // Update rate
        rateElement.textContent = update.rate.toFixed(4);
        
        // Update change styling and values
        const changeClass = update.change >= 0 ? 'positive' : 'negative';
        const changeIconClass = update.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        changeElement.className = `currency-change ${changeClass}`;
        changeIcon.className = `fas ${changeIconClass}`;
        changeText.textContent = `${update.change >= 0 ? '+' : ''}${update.change.toFixed(4)}`;
        
        // Add flash animation
        currencyElement.classList.add('flash-update');
        setTimeout(() => currencyElement.classList.remove('flash-update'), 1000);
    }
}

// Update market index display
function updateMarketIndexDisplay(update) {
    const indexElement = document.getElementById(`index-${update.name.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (indexElement) {
        const valueElement = indexElement.querySelector('.index-value');
        const changeElement = indexElement.querySelector('.index-change');
        const changeIcon = changeElement.querySelector('i');
        const changeText = changeElement.querySelector('span');
        
        // Update value
        valueElement.textContent = update.value.toFixed(2);
        
        // Update change styling and values
        const changeClass = update.change >= 0 ? 'positive' : 'negative';
        const changeIconClass = update.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        changeElement.className = `index-change ${changeClass}`;
        changeIcon.className = `fas ${changeIconClass}`;
        changeText.textContent = `${update.change >= 0 ? '+' : ''}${update.change.toFixed(2)}`;
        
        // Add flash animation
        indexElement.classList.add('flash-update');
        setTimeout(() => indexElement.classList.remove('flash-update'), 1000);
    }
}

// Add update to live feed
function addToUpdatesFeed(update) {
    // Remove "no updates" message if it exists
    const noUpdates = elements.updatesFeed.querySelector('.no-updates');
    if (noUpdates) {
        noUpdates.remove();
    }
    
    const updateItem = document.createElement('div');
    updateItem.className = 'update-item';
    
    let description = '';
    let iconClass = '';
    let changeClass = update.change >= 0 ? 'positive' : 'negative';
    
    switch (update.type) {
        case 'stock':
            iconClass = 'fa-chart-line';
            description = `${update.symbol}: $${update.price.toFixed(2)} (${update.changePercent >= 0 ? '+' : ''}${update.changePercent.toFixed(2)}%)`;
            break;
        case 'currency':
            iconClass = 'fa-exchange-alt';
            description = `${update.pair}: ${update.rate.toFixed(4)} (${update.changePercent >= 0 ? '+' : ''}${update.changePercent.toFixed(3)}%)`;
            break;
        case 'index':
            iconClass = 'fa-chart-bar';
            description = `${update.name}: ${update.value.toFixed(2)} (${update.changePercent >= 0 ? '+' : ''}${update.changePercent.toFixed(2)}%)`;
            break;
    }
    
    updateItem.innerHTML = `
        <div class="update-icon ${changeClass}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="update-content">
            <div class="update-description">${description}</div>
            <div class="update-time">${update.timestamp}</div>
        </div>
    `;
    
    elements.updatesFeed.insertBefore(updateItem, elements.updatesFeed.firstChild);
    
    // Limit to 20 updates
    const updates = elements.updatesFeed.querySelectorAll('.update-item');
    if (updates.length > 20) {
        updates[updates.length - 1].remove();
    }
}

// Utility functions
function refreshStocks() {
    console.log('Refreshing stocks...');
    // Request fresh stock data
    socket.emit('requestStockData', 'all');
}

function refreshCurrencies() {
    console.log('Refreshing currencies...');
    // Emit refresh event
    socket.emit('refreshCurrencies');
}

function clearUpdates() {
    elements.updatesFeed.innerHTML = `
        <div class="no-updates">
            <i class="fas fa-clock"></i>
            <p>Waiting for live updates...</p>
        </div>
    `;
    appState.updatesCount = 0;
    elements.updatesCount.textContent = '0';
}

// Stock subscription functions
function subscribeToStock() {
    const selectedStock = elements.stockSelect.value;
    if (selectedStock && !appState.subscribedStocks.has(selectedStock)) {
        appState.subscribedStocks.add(selectedStock);
        socket.emit('subscribeToStock', selectedStock);
        updateSubscribedStocksDisplay();
        elements.stockSelect.value = '';
    }
}

function unsubscribeFromStock(symbol) {
    if (appState.subscribedStocks.has(symbol)) {
        appState.subscribedStocks.delete(symbol);
        socket.emit('unsubscribeFromStock', symbol);
        updateSubscribedStocksDisplay();
    }
}

function updateSubscribedStocksDisplay() {
    if (appState.subscribedStocks.size === 0) {
        elements.subscribedStocks.innerHTML = `
            <div class="no-subscriptions">
                <i class="fas fa-info-circle"></i>
                <p>No stock subscriptions yet. Select a stock above to get started.</p>
            </div>
        `;
        return;
    }
    
    elements.subscribedStocks.innerHTML = '';
    appState.subscribedStocks.forEach(symbol => {
        const subItem = document.createElement('div');
        subItem.className = 'subscription-item';
        subItem.innerHTML = `
            <span class="sub-symbol">${symbol}</span>
            <button class="unsub-btn" onclick="unsubscribeFromStock('${symbol}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        elements.subscribedStocks.appendChild(subItem);
    });
}

// Initialize latency monitoring
setInterval(() => {
    if (appState.connected) {
        measureLatency();
    }
}, 5000);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Financial Dashboard loaded');
    updateConnectionStatus(false);
});