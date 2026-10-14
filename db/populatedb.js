#! /usr/bin/env node

const { Client } = require("pg");
const { loadEnvFile } = require("node:process");
if (process.env.NODE_ENV !== "production") {
  loadEnvFile();
}

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  developer VARCHAR ( 255 ),
  genre VARCHAR ( 255 ),
  platforms VARCHAR ( 255 ) [],
  rating DECIMAL
);

INSERT INTO games (name, developer, genre, platforms, rating) 
VALUES
  ('Elden Ring', 'FromSoftware Inc.', 'Soulslike', ARRAY['Playstation', 'PC', 'Nintendo Switch 2', 'Xbox'], 4.9),
  ('Minecraft', 'Mojang', 'Survival', ARRAY['Playstation', 'PC', 'Nintendo Switch 2', 'Xbox'], 5.0);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
