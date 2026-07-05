const mongoose = require('mongoose');

const StrokeSchema = new mongoose.Schema(
  {
    x0: Number,
    y0: Number,
    x1: Number,
    y1: Number,
    color: { type: String, default: '#000000' },
    width: { type: Number, default: 2 },
    t: { type: Date, default: Date.now }
  },
  { _id: false }
);

// Use string _id so we can map boardId directly
const BoardSchema = new mongoose.Schema(
  {
    _id: { type: String }, // boardId
    name: { type: String, default: '' },
    strokes: { type: [StrokeSchema], default: [] }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Board', BoardSchema);
