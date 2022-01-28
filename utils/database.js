const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

console.log(process.env.DB);

const db = new Sequelize({
  //forma de conectarme a la base de datos
  dialect: "postgres", //tipo de bases de datos a la que me quiero conectar
  host: process.env.DB_HOST, //servidor al cual me quiero conectar
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, //contraseña de la base de datos
  database: process.env.DB, //base de datos existentes a la que me quiero conectar esta ya tiene que estar creada
  port: process.env.DB_PORT, //puerto por default
  logging: false, //
});

module.exports = { db };
