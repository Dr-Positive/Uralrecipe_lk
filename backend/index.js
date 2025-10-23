import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './db.js';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import { Alert } from "./models/models.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
