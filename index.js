const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

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

// podemos definir parámetros para las rutas usando ":parametro"
app.get("/api/notes/:id", (request, response) => {
  // podemos acceder al parámetro a través de request.params
  const id = Number(request.params.id);
  // buscamos una nota cuyo id corresponda al parámetro
  const note = notes.find((x) => x.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  // map itera a través de cada elemento de notes y almacena las propiedades id en un nuevo array
  // se usa spread syntax (...) para desempaquetar los elementos de ese array
  // para que puedan ser usados como argumentos en Math.max()
  // Esta función será usada al crear una nueva nota
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  // es necesario convertir a number porque el parámetro es un string
  // y el id de la nota que queremos comparar es un number
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
