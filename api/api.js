import express from 'express';
import config from '../config/config.api.json';
import applyRoutes from './routes';
import db from './db';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
applyRoutes(app);

db.initDB()
  // .then(() => {
  //   return db.createDummy();
  // })
  .then(() => {
    app.listen(config.port, config.host, () => {
      console.log(`Listening on ${config.host}:${config.port}`);
    });
  });
