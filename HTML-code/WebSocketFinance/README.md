# FinanceStream - Real-Time Financial Dashboard

A real-time financial application built with **Node.js**, **Express**, and **Socket.IO** that provides live updates for stock prices, currency exchange rates, and market indices.

![WebSocket Financial Dashboard](https://img.shields.io/badge/WebSocket-Real--time-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7+-red)

## 🚀 Features

### Real-Time Data Updates
- **Live Stock Prices**: Real-time updates for major stocks (AAPL, GOOGL, TSLA, AMZN, MSFT, NVDA)
- **Currency Exchange Rates**: Live forex rates (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD)
- **Market Indices**: Real-time tracking of S&P 500, NASDAQ, and DOW

### Interactive Dashboard
- **Professional UI**: Modern, responsive design with gradient backgrounds and animations
- **Live Updates Feed**: Real-time activity feed showing all market movements
- **Connection Status**: Live connection monitoring with client count
- **Latency Monitoring**: Real-time ping measurement and display
- **Stock Subscriptions**: Subscribe to specific stocks for targeted updates

### WebSocket Features
- **Bi-directional Communication**: Real-time data flow between server and clients
- **Auto-reconnection**: Automatic reconnection handling for network interruptions
- **Broadcasting**: Server broadcasts updates to all connected clients
- **Room Management**: Selective stock subscription system

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **WebSocket**: Socket.IO for real-time communication
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with gradients, animations, and responsive design
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Roboto)

## 📦 Installation

1. **Clone or download** the project files to your directory
2. **Navigate to the project directory**:
   ```bash
   cd 071_WebSocket
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm start
```
or
```bash
node server.js
```

### Development with Auto-reload
```bash
npm run dev
```
(Requires nodemon - install with `npm install -g nodemon`)

The server will start on **http://localhost:3000**

## 🌐 Usage

1. **Start the server** using one of the commands above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Watch real-time updates** as stock prices, currency rates, and market indices change
4. **Subscribe to specific stocks** using the subscription panel
5. **Monitor connection status** and latency in the header

## 📁 Project Structure

```
071_WebSocket/
├── server.js                 # Main server file with Socket.IO setup
├── package.json             # Project dependencies and scripts
├── public/                  # Static files served to clients
│   ├── index.html          # Main dashboard HTML
│   ├── css/
│   │   └── style.css       # Complete styling and responsive design
│   └── js/
│       └── app.js          # Client-side Socket.IO implementation
└── README.md               # This file
```

## 🔧 Server Configuration

The server includes several configurable aspects:

### Port Configuration
```javascript
const PORT = process.env.PORT || 3000;
```

### Update Frequency
- Stock updates: Every 2-5 seconds (randomized)
- Currency updates: Every 2-5 seconds (randomized)
- Market indices: Every 2-5 seconds (randomized)
- Latency monitoring: Every 5 seconds

### Mock Data Ranges
- **Stock price changes**: ±2% per update
- **Currency rate changes**: ±0.5% per update
- **Market index changes**: ±1% per update

## 📊 WebSocket Events

### Client → Server Events
- `connect`: Client connection established
- `disconnect`: Client disconnection
- `subscribeToStock`: Subscribe to specific stock updates
- `unsubscribeFromStock`: Unsubscribe from stock updates
- `requestStockData`: Request current stock data
- `refreshCurrencies`: Request currency data refresh
- `ping`: Latency measurement

### Server → Client Events
- `initialData`: Send complete dataset on connection
- `financialUpdate`: Real-time price/rate updates
- `clientCount`: Number of connected users
- `stockData`: Specific stock data response
- `pong`: Latency measurement response

## 🎨 UI Components

### Dashboard Widgets
1. **Market Overview**: Display major market indices
2. **Live Stock Prices**: Real-time stock ticker with price changes
3. **Currency Exchange**: Forex rates with change indicators
4. **Live Updates Feed**: Chronological list of all market movements
5. **Market Statistics**: Connection stats, update count, latency

### Visual Features
- **Color-coded changes**: Green for gains, red for losses
- **Animation effects**: Flash animations for real-time updates
- **Responsive design**: Mobile-friendly layout
- **Professional styling**: Financial industry-inspired color scheme

## 🔄 Real-Time Features

### Data Simulation
The application includes a sophisticated financial data generator that:
- Simulates realistic market movements
- Maintains price continuity
- Generates percentage-based changes
- Provides timestamp information

### Connection Management
- **Auto-reconnection**: Handles network interruptions gracefully
- **Connection status**: Visual indicators for connection state
- **Client counting**: Shows number of concurrent users
- **Latency monitoring**: Real-time ping/pong measurement

## 🎯 Use Cases

This application demonstrates:

1. **Real-time Data Broadcasting**: Server pushes data to multiple clients
2. **Interactive Subscriptions**: Clients can selectively receive data
3. **Connection Management**: Robust handling of connections/disconnections
4. **Financial Data Visualization**: Professional presentation of market data
5. **WebSocket Communication**: Bi-directional client-server communication

## 🚦 Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Responsive design supported

## 📱 Mobile Support

The dashboard is fully responsive and optimized for:
- Smartphones (320px and up)
- Tablets (768px and up)
- Desktop displays (1024px and up)

## 🛡️ Error Handling

The application includes comprehensive error handling for:
- WebSocket connection failures
- Server disconnections
- Network interruptions
- Invalid data scenarios

## 🔧 Customization

### Adding New Stocks
Edit the `stocks` object in `server.js`:
```javascript
this.stocks = {
    'YOUR_SYMBOL': { price: 100.00, change: 0 },
    // ... existing stocks
};
```

### Modifying Update Frequency
Adjust the timing in `broadcastFinancialData()`:
```javascript
const nextUpdate = Math.random() * 3000 + 2000; // 2-5 seconds
```

### Styling Customization
Modify `public/css/style.css` to change:
- Color schemes
- Layout arrangements
- Animation effects
- Responsive breakpoints

## 📈 Performance Considerations

- **Memory efficient**: Maintains minimal server state
- **Scalable architecture**: Can handle multiple concurrent connections
- **Optimized updates**: Only sends changed data
- **Client-side caching**: Reduces redundant data transfer

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   - Change the PORT in server.js or use: `PORT=3001 npm start`

2. **WebSocket connection failed**:
   - Check if server is running
   - Verify firewall settings
   - Ensure browser supports WebSockets

3. **Updates not appearing**:
   - Check browser console for errors
   - Verify JavaScript is enabled
   - Refresh the page to reconnect

## 📝 Development Notes

- The application uses mock data for demonstration
- Production deployment would require real financial data APIs
- Consider rate limiting for production use
- Add authentication for secure environments

## 🤝 Contributing

Feel free to fork this project and submit improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

---

**Built with ❤️ using Node.js and Socket.IO**

For questions or support, please check the code comments or create an issue in the repository.