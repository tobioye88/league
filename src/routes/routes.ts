import { Express, Request, Response } from 'express';

const Routes = (app: Express) => {
  // register routes
  app.get("/echo", async function (req: Request, res: Response) {
    res.json({ message: 'Hello world!' });
  });

}
export default Routes;