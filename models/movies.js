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

export async function createMoviesTable(connection) {
    const [rows] = await connection.query(
        "SHOW TABLES LIKE 'movies';"
    );
    if (rows.length === 0) {
        await connection.query(`
            CREATE TABLE movies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            rating INT,
            watched BOOLEAN
            );
        `);
        console.log('moviesテーブルを作成しました');
    }
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

export async function insertInitialMovies(connection) {
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM movies');
    if (rows[0].count === 0) {
        await connection.query(
            `INSERT INTO movies (title, rating, watched) VALUES
        ('インセプション', 2, true),
        ('君の名は。', 3, false),
        ('バック・トゥ・ザ・フューチャー', 4, true),
        ('ショーシャンクの空に', 5, false),
        ('千と千尋の神隠し', 5, true)
      `
        );
        console.log('初期データを挿入しました');
    }
}