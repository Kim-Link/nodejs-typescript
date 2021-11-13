import * as express from 'express';
import { Request, Response, NextFunction, Application } from 'express'

const app = express();
const prod : boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065 )
app.get('/', (req : Request, res : Response, next : NextFunction) => {
    res.send( 'react nodebird 백엔드 정상 동작!');
})

app.listen(app.get('port'), () => {
    console.log(`sever is running on ${process.env.PORT}`);
});