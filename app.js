import express from 'express';
const app = express();
const __dirname = import.meta.dirname;
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });
import mysql from 'mysql2/promise';

async function main() {
    // MySQLの接続設定
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));


    app.get('/', (req, res) => {
        res.render('../home');
    });

    app.listen(3000, () => {
        console.log('ポート3000でリクエストを待ち受け中...');
    });
}

main().catch(console.error);