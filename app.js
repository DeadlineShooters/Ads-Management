import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import danRoutes from './routes/dan.js';
import phuongRoutes from './routes/phuong.js';
import quanRoutes from './routes/quan.js';
import soRoutes from './routes/so.js';

const danApp = express();
const canBoApp = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
canBoApp.set('view engine', 'ejs');
canBoApp.set('views', path.join(__dirname, 'views'));
console.log(__dirname);


danApp.use('/', danRoutes);


canBoApp.get('/', (req, res) => {
    res.render('dan/index.ejs'); // trang chủ của dân xài chung cho bên cán bộ
})

canBoApp.use('/phuong', phuongRoutes);
canBoApp.use('/quan', quanRoutes);
canBoApp.use('/so', soRoutes);



danApp.listen(3000, () => {
    console.log('Serving on port 3000');
})
canBoApp.listen(3001, () => {
    console.log('Serving on port 3001');
})