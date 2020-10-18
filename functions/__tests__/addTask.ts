import httpMocks from 'node-mocks-http';
import {addTask} from '../src/index';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn().mockImplementation(()=> ({
    collection: jest.fn().mockImplementation(()=> ({
      add: jest.fn().mockResolvedValue({id: 'XYZ'}),
    })),
  })),
}));

describe('addTask', () => {
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

    res.send = jest.fn();

    await addTask(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.send).toBeCalledWith('XYZ');
  });
});
