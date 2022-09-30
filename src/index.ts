import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
import dbInit from './db/dbInit';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { CommonRoutesConfig } from './helper/CommonRoutesConfig';
import { NoteRoute } from './routes/note.route';
import { UserRoute } from './routes/user.route';
import { CategoryRoute } from './routes/category.route';
import googleAuth from './helper/googleAuth';
import jwtStrategy from './helper/JwtStrategy';

dbInit.connectDb(process.env.DB_CNN as string);
const PORT: number = parseInt(process.env.PORT as string, 10);
const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];
googleAuth.passportConf();
jwtStrategy.verifyJwt();

app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(express.json());

routes.push(new NoteRoute(app));
routes.push(new UserRoute(app));
routes.push(new CategoryRoute(app));
app.use('*', (req: Request, res: Response) => {
    res.status(400).json({
        ok: false,
        msg: 'Ohh you are lost, read the API documentation to find your way back home'
    });
})

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
});