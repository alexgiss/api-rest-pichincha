const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/pokemons', db.getPokemons);
app.get('/pokemons/:id', db.getPokemonsById);
app.post('/pokemons', db.createPokemons);
app.put('/pokemons/:id', db.updatePokemons);
app.delete('/pokemons/:id', db.deletePokemons);

app.listen(port, () => {
  console.log(`App running on port ${PORT}.`);
});
