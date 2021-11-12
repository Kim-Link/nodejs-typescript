import * as express from 'express';
import { preProcessFile } from 'typescript';

const app = express();
const prod = process.env.NODE_ENV === 'production';

app.get('/', (req, res) => {
    res.send( 'react nodebird 백엔드 정상 동작!');
})

app.listen(prod ? process.env.PORT : 3065, () => {
    console.log(`sever is running on ${process.env.PROT}`);
});