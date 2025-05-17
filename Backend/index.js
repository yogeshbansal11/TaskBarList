import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './Routes/authRoute.js';
import ListRoute from './Routes/ListRoute.js';
import taskRoute from './Routes/taskRoute.js';
import settingRoute from './Routes/settingRoute.js';
dotenv.config(); 

const app = express();

const port = process.env.PORT || 3000;
const MONGOURL = process.env.MONGOURL;

// const corsOptions = {
//   origin: 'https://task-board-7e8t.vercel.app/', 
//   methods: 'GET,POST,PUT,PATCH,DELETE',
//   optionsSuccessStatus: 204,
// };
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/list', ListRoute);
app.use('/task', taskRoute);
app.use('/setting', settingRoute);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
