
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'jgqltkrqascfop',
  host: 'ec2-18-204-142-254.compute-1.amazonaws.com',
  database: 'd4sa4hsge472jd',
  password: 'c505b58781f82a110be0a1e6b6a8405acaa40187f2cee91e40144456b35c71d9',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
}
});
pool.connect();
const getPokemons = (request, response) => {
  pool.query('SELECT * FROM pokemons ORDER BY id ASC', (error, results) => {
    
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPokemonsById = (request, response) => {
  var id = parseInt(request.params.id) ;

  pool.query('SELECT * FROM pokemons WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPokemons = (request, response) => {
  const { name, image, attack, defense } = request.body;

  pool.query(
    'INSERT INTO pokemons ( name, image, attack, defense) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, image, attack, defense],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Pokemons added with ID: ${results.rows[0].id}`);
    }
  );
};

const updatePokemons = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, image, attack, defense } = request.body;

  pool.query(
    'UPDATE pokemons SET name = $1, image = $2, attack=$3, defense=$4 WHERE id = $5',
    [name, image, attack, defense, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Pokemons modified with ID: ${id}`);
    }
  );
};

const deletePokemons = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM pokemons WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Pokemons deleted with ID: ${id}`);
  });
};

module.exports = {
  getPokemons,
  getPokemonsById,
  createPokemons,
  updatePokemons,
  deletePokemons,
};
