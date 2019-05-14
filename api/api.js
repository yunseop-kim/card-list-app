import express from 'express';
import config from '../config/config.api.json';
import applyRoutes from './routes';
import db from './db';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
applyRoutes(app);

db.initDB(true)
  .then(() => {
    return db.createDummy();
  })
  .then(() => {
    app.listen(config.port, config.host, () => {
      console.log(`Listening on ${config.host}:${config.port}`);
    });
  });
