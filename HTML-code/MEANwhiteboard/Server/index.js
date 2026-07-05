require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Board = require('./models/Board');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/meanwhiteboard';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch((e) => console.error('Mongo error', e));

// Helpers
async function getOrCreateBoard(boardId, name = '') {
  let board = await Board.findById(boardId).lean();
  if (!board) {
    await Board.create({ _id: boardId, name, strokes: [] });
    board = await Board.findById(boardId).lean();
  }
  return board;
}

function genId(len = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// API
app.get('/api/boards/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const board = await getOrCreateBoard(id);
    res.json(board);
  } catch (e) {
    res.status(500).json({ error: 'failed_to_get_board' });
  }
});

app.post('/api/boards', async (req, res) => {
  try {
    const { id = genId(), name = '' } = req.body || {};
    const existing = await Board.findById(id).lean();
    if (existing) return res.status(409).json({ error: 'board_exists', id });
    await Board.create({ _id: id, name, strokes: [] });
    res.status(201).json({ id, name });
  } catch (e) {
    res.status(500).json({ error: 'failed_to_create_board' });
  }
});

app.post('/api/boards/:id/clear', async (req, res) => {
  try {
    const id = req.params.id;
    await Board.updateOne({ _id: id }, { $set: { strokes: [] } }, { upsert: true });
    io.to(id).emit('clear');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'failed_to_clear' });
  }
});

app.post('/api/boards/:id/undo', async (req, res) => {
  try {
    const id = req.params.id;
    const board = await getOrCreateBoard(id);
    if (board.strokes.length > 0) {
      await Board.updateOne({ _id: id }, { $pop: { strokes: 1 } });
      io.to(id).emit('undo-last');
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'failed_to_undo' });
  }
});

// Static client
const clientDir = path.join(__dirname, '..', 'client');
app.use(express.static(clientDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

// Sockets
io.on('connection', (socket) => {
  let currentBoard = null;

  socket.on('join', async (boardId) => {
    if (currentBoard) socket.leave(currentBoard);
    currentBoard = boardId || 'default';
    await getOrCreateBoard(currentBoard);
    socket.join(currentBoard);
    socket.emit('joined', { boardId: currentBoard });
  });

  socket.on('draw-line', async (payload) => {
    const { boardId, line } = payload || {};
    if (!boardId || !line) return;
    await Board.updateOne(
      { _id: boardId },
      {
        $push: {
          strokes: {
            x0: line.x0,
            y0: line.y0,
            x1: line.x1,
            y1: line.y1,
            color: line.color || '#000000',
            width: Math.max(1, Math.min(50, Number(line.width) || 2)),
            t: new Date()
          }
        }
      },
      { upsert: true }
    );
    socket.to(boardId).emit('draw-line', { line });
  });

  socket.on('clear', async ({ boardId }) => {
    if (!boardId) return;
    await Board.updateOne({ _id: boardId }, { $set: { strokes: [] } }, { upsert: true });
    io.to(boardId).emit('clear');
  });

  socket.on('undo-last', async ({ boardId }) => {
    if (!boardId) return;
    await Board.updateOne({ _id: boardId }, { $pop: { strokes: 1 } });
    io.to(boardId).emit('undo-last');
  });
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
