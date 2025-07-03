import express from 'express';
const app = express();
import path from 'path';
const __dirname = import.meta.dirname;
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });
import * as moviesModel from './models/movies.js';

async function main() {
    // MySQLの接続設定
    const connection = await moviesModel.getConnection();

    // サーバー終了時にDB接続を閉じる
    moviesModel.dbShutdown(connection);

    // moviesテーブルの作成
    await moviesModel.createMoviesTable(connection);

    moviesModel.insertInitialMovies(connection)
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));


    app.get('/', (req, res) => {
        res.render('../home');
    });

    app.get('/movies', async (req, res) => {
        const movies = await moviesModel.getAllMovies(connection);
        // res.send(movies);
        res.render('index', { movies });
    });

    app.listen(3000, () => {
        console.log('ポート3000でリクエストを待ち受け中...');
    });
}

main().catch(console.error);