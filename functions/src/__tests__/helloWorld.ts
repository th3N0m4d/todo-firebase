import httpMocks from 'node-mocks-http';
import {helloWorld} from '../index';

describe('helloWorld', () => {
  it('should get a greeting from API', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    res.send = jest.fn().mockImplementation((response)=> {
      expect(res.statusCode).toBe(200);
      expect(response).toBe('Hello from Firebase!');
    });

    await helloWorld(req, res);
  });
});
