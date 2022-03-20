import * as csv from 'fast-csv';
import * as fs from 'fs';

export default class MatrixService {

  public static echo(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let result = '';
        // open uploaded file
        csv.parseFile(path)
          .on("data", function (data: string[]) {
            result += data.join(',') + '\n';
          })
          .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            resolve(result);
          });
      } catch (e) {
        reject('');
      }
    });
  }

  public static async invert(path: string): Promise<string> {
    const invertMatrix = (data: string[][]): string => {
      if(!data || !data.length) return '';
      const max = data[0].length;
      let i = 0;
      let j = 0;
      while (i < max && j < max) {
        const temp = data[i][j];
        data[i][j] = data[j][i];
        data[j][i] = temp;
        j++;
        if (j == max) {
          j = i + 1;
          i++;
        }
      }
      const result = data.map((row) => row.join(',') + '\n').join('');
      return result;
    };

    return new Promise((resolve, reject) => {
      try {
        let result = [];
        // open uploaded file
        csv.parseFile(path)
          .on("data", function (data: string[]) {
            result.push(data);
          })
          .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            resolve(invertMatrix(result));
          });
      } catch (e) {
        reject('');
      }
    })
  }

  public static async flatten(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let result = [];
        // open uploaded file
        csv.parseFile(path)
          .on("data", function (data: string[]) {
            result.push(data.join(','));
          })
          .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            resolve(result.join(','));
          });
      } catch (e) {
        reject('');
      }
    });
  }

  public static async sum(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let result = 0;
        // open uploaded file
        csv.parseFile(path)
          .on("data", function (data: string[]) {
            result = data.map(el => Number(el)).reduce((total, el) => total + el, result);
          })
          .on("end", function () {
            fs.unlinkSync(path);   // remove temp file
            resolve(result + '');
          });
      } catch (e) {
        reject('0');
      }
    });
  }
}