import { Express, Request, Response } from 'express';
import * as multer from 'multer';
import MatrixService from '../services/matrix.service';

const upload = multer({ dest: 'tmp/csv/' });

const Routes = (app: Express) => {
  // register routes
  app.get("/", async function (req: Request, res: Response) {
    res.json({ message: 'Hello world!' });
  });

  app.post("/echo", upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: "Invalid file" });
    }
    const result = await MatrixService.echo(req.file.path);
    res.send(result);
  });

  app.post("/invert", upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: "Invalid file" });
    }
    const result = await MatrixService.invert(req.file.path);
    res.send(result);
  });
}
export default Routes;