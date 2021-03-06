import * as request from "supertest";
import app from "../../src/app";

describe('Matrix', () => {

  beforeEach(async () => { });
  afterEach(() => { });
  afterAll(() => { });

  it('should say Hello world!', async () => {
    const response = await request(app).get('/');
    expect(response.body.message).toEqual("Hello world!");
    expect(response.statusCode).toEqual(200);
  });

  it('POST /echo', async () => {
    const buffer = Buffer.from(`1,2,3\n4,5,6\n7,8,9`);

    const response = await request(app)
      .post('/echo')
      .attach('file', buffer, 'matrix.csv');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual(`1,2,3\n4,5,6\n7,8,9\n`);
  });

  it('POST /echo with wrong file format', async () => {
    const buffer = Buffer.from(`1\t2\t3\n4\t5\t6\n7\t8\t9`);

    const response = await request(app)
      .post('/echo')
      .attach('file', buffer, 'matrix.tsv');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File is not allowed');
  });

  it('POST /invert', async () => {
    const buffer = Buffer.from(`1,2,3\n4,5,6\n7,8,9`);

    const response = await request(app)
      .post('/invert')
      .attach('file', buffer, 'matrix.csv');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual(`1,4,7\n2,5,8\n3,6,9\n`);
  });

  it('POST /invert with wrong file format', async () => {
    const buffer = Buffer.from(`1\t2\t3\n4\t5\t6\n7\t8\t9`);

    const response = await request(app)
      .post('/invert')
      .attach('file', buffer, 'matrix.tsv');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File is not allowed');
  });

  it('POST /flatten', async () => {
    const buffer = Buffer.from(`1,2,3\n4,5,6\n7,8,9`);

    const response = await request(app)
      .post('/flatten')
      .attach('file', buffer, 'matrix.csv');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual(`1,2,3,4,5,6,7,8,9`);
  });

  it('POST /flatten with wrong file format', async () => {
    const buffer = Buffer.from(`1\t2\t3\n4\t5\t6\n7\t8\t9`);

    const response = await request(app)
      .post('/flatten')
      .attach('file', buffer, 'matrix.tsv');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File is not allowed');
  });

  it('POST /sum', async () => {
    const buffer = Buffer.from(`1,2,3\n4,5,6\n7,8,9`);

    const response = await request(app)
      .post('/sum')
      .attach('file', buffer, 'matrix.csv');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('45');
  });

  it('POST /sum with wrong file format', async () => {
    const buffer = Buffer.from(`1\t2\t3\n4\t5\t6\n7\t8\t9`);

    const response = await request(app)
      .post('/sum')
      .attach('file', buffer, 'matrix.tsv');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File is not allowed');
  });

  it('POST /multiply', async () => {
    const buffer = Buffer.from(`1,2,3\n4,5,6\n7,8,9`);

    const response = await request(app)
      .post('/multiply')
      .attach('file', buffer, 'matrix.csv');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('362880');
  });

  it('POST /multiply with wrong file format', async () => {
    const buffer = Buffer.from(`1\t2\t3\n4\t5\t6\n7\t8\t9`);

    const response = await request(app)
      .post('/multiply')
      .attach('file', buffer, 'matrix.tsv');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File is not allowed');
  });

  it('POST /multiply with no file', async () => {

    const response = await request(app)
      .post('/multiply')
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('File not found');
  });
});