const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getGames(name) {
  const { rows } = await pool.query(
    "SELECT * FROM games WHERE lower(name) LIKE $1",
    [`%${name}%`],
  );
  return rows;
}

async function insertGame(name, developer, genre, platforms, rating) {
  await pool.query(
    "INSERT INTO games (name, developer, genre, platforms, rating) VALUES ($1, $2, $3, $4, $5)",
    [name, developer, genre, platforms, rating],
  );
}

async function updateGame(name, developer, genre, platforms, rating, id) {
  await pool.query(
    "UPDATE games SET name=$1, developer=$2, genre=$3, platforms=$4, rating=$5 WHERE id=$6",
    [name, developer, genre, platforms, rating, id],
  );
}

async function deleteGame(id) {
  await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

async function deleteAllgames() {
  await pool.query("DELETE FROM games");
}

module.exports = {
  getAllGames,
  getGames,
  insertGame,
  updateGame,
  deleteGame,
  deleteAllgames,
};
