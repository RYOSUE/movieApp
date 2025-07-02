import express from 'express';
const app = express();
import path from 'path';
const __dirname = import.meta.dirname;
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });
import { dbShutdown, getConnection } from './models/movies.js';

async function main() {
    // MySQLの接続設定
    const connection = await getConnection();

    // サーバー終了時にDB接続を閉じる
    dbShutdown(connection);

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