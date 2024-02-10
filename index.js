const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  // Express establece automáticamente el header "Content-Type": "text/html"
  // cuando el argumento al interior de send() es una string
  response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
  // Express transforma automáticament a formato JSON el contenido dentro de json()
  // además, establece el header "Content-Type": "json/application"
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
