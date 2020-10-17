import httpMocks from 'node-mocks-http';
import {addTask} from '../index';

const test = require('firebase-functions-test')();

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn().mockImplementation(()=> ({
    collection: jest.fn().mockImplementation(()=> ({
      add: jest.fn().mockResolvedValue({id: 'XYZ'}),
    })),
  })),
}));

describe('addTask', () => {
  afterAll(()=> {
    test.cleanup();
  });

  it('should add new task to collection', async () => {
    const mockTask = {
      name: 'Read books',
      completed: false,
      dueDate: '2021-01-11T23:00:00.000Z',
    };
    const req = httpMocks.createRequest({
      body: mockTask,
    });
    const res = httpMocks.createResponse();

    res.send = jest.fn().mockImplementation((response)=> {
      expect(res.statusCode).toBe(201);
      expect(response).toBe('XYZ');
    });

    await addTask(req, res);
  });
});
