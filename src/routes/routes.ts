import { Express, Request, Response } from 'express';
import * as multer from 'multer';
import MatrixService from '../services/matrix.service';
import * as fs from 'fs';


const upload = multer({ 
  dest: 'tmp/csv/', 
  limits: {
    fileSize: 15_000_000,
  },
});
const whitelist = [
  'text/csv'
]

const Routes = (app: Express) => {
  // register routes
  app.get("/", async function (req: Request, res: Response) {
    res.json({ message: 'Hello world!' });
    return;
  });

  app.post("/echo", upload.single('file'), async (req: Request, res: Response) => {
    try{
      validateFile(req.file);
      const result = await MatrixService.echo(req.file.path);
      res.send(result);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  });

  app.post("/invert", upload.single('file'), async (req: Request, res: Response) => {
    try{
      validateFile(req.file);
      const result = await MatrixService.invert(req.file.path);
      res.send(result);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  });

  app.post("/flatten", upload.single('file'), async (req: Request, res: Response) => {
    try{
      validateFile(req.file);
      const result = await MatrixService.flatten(req.file.path);
      res.send(result);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  });

  app.post("/sum", upload.single('file'), async (req: Request, res: Response) => {
    try{
      validateFile(req.file);
      const result = await MatrixService.sum(req.file.path);
      res.send(result);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  });

  app.post("/multiply", upload.single('file'), async (req: Request, res: Response) => {
    try{
      validateFile(req.file);
      const result = await MatrixService.multiply(req.file.path);
      res.send(result);
    } catch(e) {
      res.status(400).json({ message: e.message });
    }
  });
}

function validateFile(file: Express.Multer.File) {
  if (!file) {
    throw new Error("File not found");
  }
  if(!whitelist.includes(file.mimetype)){
    fs.unlinkSync(file.path);
    throw new Error('File is not allowed');
  }
}
export default Routes;