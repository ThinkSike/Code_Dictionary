# Hollywood Movie REST API

A simple RESTful API for managing Hollywood movie data using Node.js and Express, with an in-memory database.

## Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation
1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Install dependencies:
   ```
   npm install
   ```

### Running the Server
Start the server with:
```
node index.js
```
The API will be available at http://localhost:3000

## API Endpoints

### List all movies
```
GET /api/movies
```

### Get a movie by ID
```
GET /api/movies/:id
```

### Add a new movie
```
POST /api/movies
```
Body (JSON):
```
{
  "title": "Titanic",
  "director": "James Cameron",
  "year": 1997
}
```

### Update a movie
```
PUT /api/movies/:id
```
Body (JSON):
```
{
  "title": "Titanic",
  "director": "James Cameron",
  "year": 1997
}
```

### Delete a movie
```
DELETE /api/movies/:id
```

## Example curl Commands

List all movies:
```
curl http://localhost:3000/api/movies
```

Add a new movie:
```
curl -X POST http://localhost:3000/api/movies -H "Content-Type: application/json" -d "{\"title\":\"Titanic\",\"director\":\"James Cameron\",\"year\":1997}"
```

Get a movie by ID:
```
curl http://localhost:3000/api/movies/1
```

Update a movie:
```
curl -X PUT http://localhost:3000/api/movies/1 -H "Content-Type: application/json" -d "{\"title\":\"Titanic\",\"director\":\"James Cameron\",\"year\":1997}"
```

Delete a movie:
```
curl -X DELETE http://localhost:3000/api/movies/1
```

## Stopping the Server
Press `Ctrl+C` in the terminal.

---

Feel free to modify and extend this project!
