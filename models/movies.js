import mysql from 'mysql2/promise';
// .envはapp.jsで読み込み済み

export async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}

export function dbShutdown(connection) {
  process.on('SIGINT', async () => {
    await connection.end();
    process.exit();
  });
}

export async function createTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      rating FLOAT,
      watched BOOLEAN
    )
  `);
}

export async function insertMovie(connection, title, rating, watched) {
  await connection.query(
    'INSERT INTO movies (title, rating, watched) VALUES (?, ?, ?)', [title, rating, watched]
  );
}

export async function getAllMovies(connection) {
  const [rows] = await connection.query('SELECT * FROM movies');
  return rows;
}

export async function updateMovie(connection, id, title, rating, watched) {
  await connection.query(
    'UPDATE movies SET title = ?, rating = ?, watched = ? WHERE id = ?', [title, rating, watched, id]
  );
}

export async function deleteMovie(connection, id) {
  await connection.query(
    'DELETE FROM movies WHERE id = ?', [id]
  );
}