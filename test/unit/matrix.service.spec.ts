import MatrixService from '../../src/services/matrix.service';
import * as fs from 'fs';

describe('MatrixService', () => {

  beforeEach(async () => {
    jest.setTimeout(60000);
  });
  afterEach(() => { });
  afterAll(() => { });


  it('should return a matrix string : echo', async () => {
    const path = __dirname + '/../matrix.csv';
    const testFile = __dirname + '/../../tmp/csv/temp-matrix.csv';
    fs.copyFile(path, testFile, () => { });
    const result = await MatrixService.echo(testFile);
    expect(result).toEqual(`1,2,3\n4,5,6\n7,8,9\n`);
  });

  it('should return an empty string : echo', async () => {
    const path = __dirname + '/../matrix-empty.csv';
    const testFile = __dirname + '/../../tmp/csv/temp-matrix.csv';
    fs.copyFile(path, testFile, () => { });
    const result = await MatrixService.echo(testFile);
    expect(result).toEqual(``);
  });

  it('should return an inverted matrix string : invert', async () => {
    const path = __dirname + '/../matrix.csv';
    const testFile = __dirname + '/../../tmp/csv/temp-matrix.csv';
    fs.copyFile(path, testFile, () => { });
    const result = await MatrixService.invert(testFile);
    expect(result).toEqual(`1,4,7\n2,5,8\n3,6,9\n`);
  });

  it('should return an empty string : invert', async () => {
    const path = __dirname + '/../matrix-empty.csv';
    const testFile = __dirname + '/../../tmp/csv/temp-matrix.csv';
    fs.copyFile(path, testFile, () => { });
    const result = await MatrixService.invert(testFile);
    expect(result).toEqual(``);
  });
});