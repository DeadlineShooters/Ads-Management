import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const danApp = express();
const canBoApp = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// danApp.engine('ejs', ejs);
canBoApp.set('view engine', 'ejs');
canBoApp.set('views', path.join(__dirname, 'views'));


danApp.get('/', (req, res) => {
    res.send('Đây là dân');
})
canBoApp.get('/', (req, res) => {
    res.render('so/quanly');
})


danApp.listen(3000, () => {
    console.log('Serving on port 3000');
})
canBoApp.listen(3001, () => {
    console.log('Serving on port 3001');
})