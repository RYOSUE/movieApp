import express from 'express';
const app = express();
const __dirname = import.meta.dirname;
import path from 'path';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req,res) => {
    res.render('../home');
});

app.listen(3000, () => {
    console.log('ポート3000でリクエストを待ち受け中...');
});