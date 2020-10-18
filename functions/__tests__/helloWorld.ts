import httpMocks from 'node-mocks-http';
import {helloWorld} from '../src/index';

describe('helloWorld', () => {
  it('should get a greeting from API', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    res.send = jest.fn();

    await helloWorld(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.send).toHaveBeenCalledWith('Hello from Firebase!');
  });
});
