import * as csv from 'fast-csv';
import * as fs from 'fs';

export default class MatrixService {

  public static echo(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let result = '';
        // open uploaded file
        csv.parseFile(path)
          .on("data", function (data) {
            result += data.join(',') + '\n';
          })
          .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            resolve(result);
          });
      } catch (e) {
        reject('');
      }
    })
  }
}