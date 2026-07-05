const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Financial data simulation - Mock stock and currency data
class FinancialDataGenerator {
    constructor() {
        this.stocks = {
            'AAPL': { price: 175.50, change: 0 },
            'GOOGL': { price: 2850.75, change: 0 },
            'TSLA': { price: 245.30, change: 0 },
            'AMZN': { price: 3420.89, change: 0 },
            'MSFT': { price: 378.25, change: 0 },
            'NVDA': { price: 485.67, change: 0 }
        };

        this.currencies = {
            'EUR/USD': { rate: 1.0850, change: 0 },
            'GBP/USD': { rate: 1.2450, change: 0 },
            'USD/JPY': { rate: 149.75, change: 0 },
            'AUD/USD': { rate: 0.6680, change: 0 },
            'USD/CAD': { rate: 1.3720, change: 0 }
        };

        this.marketIndex = {
            'S&P 500': { value: 4350.65, change: 0 },
            'NASDAQ': { value: 13500.25, change: 0 },
            'DOW': { value: 34200.80, change: 0 }
        };
    }

    // Generate random price changes
    generateStockUpdate() {
        const stockSymbols = Object.keys(this.stocks);
        const randomStock = stockSymbols[Math.floor(Math.random() * stockSymbols.length)];
        
        // Generate price change (-2% to +2%)
        const changePercent = (Math.random() - 0.5) * 0.04;
        const oldPrice = this.stocks[randomStock].price;
        const priceChange = oldPrice * changePercent;
        const newPrice = Number((oldPrice + priceChange).toFixed(2));
        
        this.stocks[randomStock].price = newPrice;
        this.stocks[randomStock].change = Number(priceChange.toFixed(2));

        return {
            type: 'stock',
            symbol: randomStock,
            price: newPrice,
            change: this.stocks[randomStock].change,
            changePercent: Number((changePercent * 100).toFixed(2)),
            timestamp: new Date().toLocaleTimeString()
        };
    }

    generateCurrencyUpdate() {
        const currencyPairs = Object.keys(this.currencies);
        const randomPair = currencyPairs[Math.floor(Math.random() * currencyPairs.length)];
        
        // Generate rate change (-0.5% to +0.5%)
        const changePercent = (Math.random() - 0.5) * 0.01;
        const oldRate = this.currencies[randomPair].rate;
        const rateChange = oldRate * changePercent;
        const newRate = Number((oldRate + rateChange).toFixed(4));
        
        this.currencies[randomPair].rate = newRate;
        this.currencies[randomPair].change = Number(rateChange.toFixed(4));

        return {
            type: 'currency',
            pair: randomPair,
            rate: newRate,
            change: this.currencies[randomPair].change,
            changePercent: Number((changePercent * 100).toFixed(3)),
            timestamp: new Date().toLocaleTimeString()
        };
    }

    generateMarketIndexUpdate() {
        const indices = Object.keys(this.marketIndex);
        const randomIndex = indices[Math.floor(Math.random() * indices.length)];
        
        // Generate index change (-1% to +1%)
        const changePercent = (Math.random() - 0.5) * 0.02;
        const oldValue = this.marketIndex[randomIndex].value;
        const valueChange = oldValue * changePercent;
        const newValue = Number((oldValue + valueChange).toFixed(2));
        
        this.marketIndex[randomIndex].value = newValue;
        this.marketIndex[randomIndex].change = Number(valueChange.toFixed(2));

        return {
            type: 'index',
            name: randomIndex,
            value: newValue,
            change: this.marketIndex[randomIndex].change,
            changePercent: Number((changePercent * 100).toFixed(2)),
            timestamp: new Date().toLocaleTimeString()
        };
    }

    getAllData() {
        return {
            stocks: this.stocks,
            currencies: this.currencies,
            marketIndex: this.marketIndex
        };
    }
}

// Initialize data generator
const dataGenerator = new FinancialDataGenerator();

// Track connected clients
let connectedClients = 0;

// Socket.IO connection handling
io.on('connection', (socket) => {
    connectedClients++;
    console.log(`Client connected. Total clients: ${connectedClients}`);

    // Send initial data to new client
    socket.emit('initialData', dataGenerator.getAllData());
    
    // Broadcast current client count
    io.emit('clientCount', connectedClients);

    // Handle client requests for specific stock data
    socket.on('requestStockData', (symbol) => {
        const stockData = dataGenerator.stocks[symbol];
        if (stockData) {
            socket.emit('stockData', {
                type: 'stock',
                symbol: symbol,
                price: stockData.price,
                change: stockData.change,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        connectedClients--;
        console.log(`Client disconnected. Total clients: ${connectedClients}`);
        io.emit('clientCount', connectedClients);
    });

    // Handle custom events
    socket.on('subscribeToStock', (symbol) => {
        socket.join(`stock_${symbol}`);
        console.log(`Client subscribed to ${symbol}`);
    });

    socket.on('unsubscribeFromStock', (symbol) => {
        socket.leave(`stock_${symbol}`);
        console.log(`Client unsubscribed from ${symbol}`);
    });
});

// Generate and broadcast real-time data updates
function broadcastFinancialData() {
    // Generate random updates every 2-5 seconds
    const updateTypes = ['stock', 'currency', 'index'];
    const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
    
    let update;
    switch (randomType) {
        case 'stock':
            update = dataGenerator.generateStockUpdate();
            break;
        case 'currency':
            update = dataGenerator.generateCurrencyUpdate();
            break;
        case 'index':
            update = dataGenerator.generateMarketIndexUpdate();
            break;
    }

    // Broadcast to all connected clients
    io.emit('financialUpdate', update);

    // Schedule next update
    const nextUpdate = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(broadcastFinancialData, nextUpdate);
}

// Start broadcasting financial data
setTimeout(broadcastFinancialData, 3000); // Start after 3 seconds

// Server configuration
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Financial WebSocket Server running on http://localhost:${PORT}`);
    console.log('Real-time financial data broadcasting started...');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server is shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});