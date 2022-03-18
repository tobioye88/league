import MatrixService from '../../src/services/matrix.service';
import * as fs from 'fs';

describe('MatrixService', () => {

  beforeEach(async () => { });
  afterEach(() => { });
  afterAll(() => { });


  it('should return a matrix string : echo', async () => {
    const path = __dirname + '/../../matrix.csv';
    const testFile = __dirname + '/../../tmp/csv/temp-matrix.csv';
    fs.copyFile(path, testFile, () => { });
    const result = await MatrixService.echo(testFile);
    expect(result).toEqual(`1,2,3\n4,5,6\n7,8,9\n`);
  });
});