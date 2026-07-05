# MEAN Collaborative Whiteboard

Real-time collaborative whiteboard built with:
- Server: Node.js, Express, Socket.IO, Mongoose (MongoDB)
- Client: AngularJS 1.x + HTML5 Canvas

## Prerequisites

- Node.js 18+ and npm
- MongoDB running locally (mongodb://127.0.0.1:27017) or a remote URI
- Open ports: 3000 (app)

## Quick Start

1) Start MongoDB
   - Local default: ensure mongod is running.
   - Or set MONGO_URI in server/.env.

2) Install and run the server
   - cd d:\HTML\071WT\071_MEANwhiteboard\server
   - npm install
   - npm start

3) Open the app
   - http://localhost:3000
   - For a shared board: http://localhost:3000/?board=team1 (share this URL)

## Configuration

Create server/.env (already supported by the server):

```
MONGO_URI=mongodb://127.0.0.1:27017/meanwhiteboard
PORT=3000
```

## Project Structure

- d:\HTML\071WT\071_MEANwhiteboard\
  - server\
    - index.js (Express API + Socket.IO + static hosting)
    - models\Board.js (Mongoose model)
    - package.json
    - .env
  - client\
    - index.html (UI + toolbar + canvas)
    - app.js (AngularJS controller and Socket.IO client)

## How This Application Was Created (steps followed)

1) Initialize Node.js server project
   - Created server/package.json with start script.
   - Installed dependencies: express, socket.io, mongoose, cors, dotenv.

2) Configure environment
   - Added server/.env supporting MONGO_URI and PORT.
   - Loaded env via dotenv in server startup.

3) Connect to MongoDB with Mongoose
   - Connected using process.env.MONGO_URI.
   - Added basic connection logging and error handling.

4) Define data model
   - Created models/Board.js with:
     - Board(_id as boardId, name, strokes[])
     - Stroke schema: x0,y0,x1,y1,color,width,t

5) Build REST API
   - GET /api/boards/:id -> fetch/create board and return strokes.
   - POST /api/boards -> create named board (optional id).
   - POST /api/boards/:id/clear -> clear strokes for a board.
   - POST /api/boards/:id/undo -> pop the last stroke.

6) Add Socket.IO for real-time collaboration
   - Events:
     - join(boardId): join a room by boardId.
     - draw-line({boardId,line}): persist stroke and broadcast to room.
     - clear({boardId}): clear DB and notify room.
     - undo-last({boardId}): pop last stroke and notify room.

7) Serve the client
   - Configured Express to serve static files from ../client.
   - Fallback to client/index.html for all routes.

8) Build the AngularJS client
   - index.html with toolbar (color, size, undo, clear) and canvas.
   - Included Socket.IO client and AngularJS 1.8.3.

9) Implement drawing logic
   - app.js AngularJS controller:
     - Canvas resize with DPR handling.
     - Mouse/touch drawing; emits draw-line as segments.
     - Receives draw-line, clear, undo-last via Socket.IO.
     - Persists and reloads strokes (api.getBoard) on join.
     - Local cache for redraw on resize/undo/clear.

10) Test collaboration
    - Open multiple browser tabs to the same board URL (?board=team1).
    - Verify drawing synchronizes, undo/clear propagate, and strokes persist.

## Usage

- Create/use a board: http://localhost:3000/?board=myteam
- Controls:
  - Color picker and stroke size
  - Undo (last segment)
  - Clear (all strokes)

## API Reference (minimal)

- GET /api/boards/:id
  - Returns board with strokes.
- POST /api/boards
  - Body: { id?: string, name?: string }
  - Returns: { id, name } or 409 if exists.
- POST /api/boards/:id/clear
  - Clears strokes and broadcasts.
- POST /api/boards/:id/undo
  - Pops last stroke and broadcasts.

## Troubleshooting

- Mongo not connected
  - Ensure MongoDB is running and MONGO_URI is correct.
- Nothing renders
  - Check browser console and server logs.
- Latency or missed lines
  - Drawing emits per-segment; network hiccups may drop segments. Consider batching or smoothing for production.

## Next Steps (optional enhancements)

- Group segments into strokes (mousedown->mouseup) to enable smarter undo.
- Per-user cursors and presence.
- Auth and access control.
- Export/import board content (PNG/SVG/JSON).
- Rate limiting and validation.
