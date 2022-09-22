import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if(dotenvResult.error) {
    throw dotenvResult.error;
}
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

const PORT: number = parseInt( process.env.PORT as string, 10);
const app: Application = express();

app.use(helmet);
app.use(cors);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
});