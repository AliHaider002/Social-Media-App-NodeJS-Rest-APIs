import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes.js';
import UserRoute from './Routes/UserRoutes.js';
import PostRoute from './Routes/PostRoutes.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    app.listen(PORT, () => console.log(`Server is on PORT: ${PORT}`))).catch((Err) => console.log(Err));

app.use('/auth', AuthRoutes);
app.use('/user', UserRoute);
app.use('/post', PostRoute);