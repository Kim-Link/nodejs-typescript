import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import * as bcrypt from 'bcrypt';

dotenv.config(); //asterlisk
import { Request, Response, NextFunction, Application } from 'express'
const app = express();
const prod : boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065 )

if(prod){
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('conbined'));
    app.use(cors({
        origin : /nodebird\.com$/,
        credentials : true,
    }))
} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin : true,
        credentials : true,
    }))
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET!, //dotenv로 가져오는것은 타입스크립트가 확신을 못한다. 하지만 우리는 설정을 이미 했기때문에 우리가 타입스크립트에게 확신을 줘야 한다 => !
    cookie : {
        httpOnly : true,
        secure : false, // https 쓸때는 true
        domain : prod ? '.nodebird.com' : undefined,
    },
    name : 'rnbck',
}))

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req : Request, res : Response, next : NextFunction) => {
    res.send( 'react nodebird 백엔드 정상 동작!');
})

app.listen(app.get('port'), () => {
    console.log(`sever is running on ${process.env.PORT}`, prod);
});