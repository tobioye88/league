import * as express from "express";
import Routes from './routes/routes';

// create and setup express app
const app = express();
app.use(express.json());

Routes(app);

//custom 404 response
app.use((req, res) => {
  res.type('application/json');
  res.status(404);
  res.json({ message: '404 - Not Found' });
})

// custom 500 response
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('application/json');
  res.status(500);
  res.json({ message: '500 - Server Error' });
});

// start express server
app.listen(3000, () => {
  console.log("Express Server Started");
});
