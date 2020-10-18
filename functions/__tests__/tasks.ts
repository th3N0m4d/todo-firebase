import httpMocks from 'node-mocks-http';
import {
  createTask,
  getTaskById,
  removeTask,
  updateTask,
} from '../src/index';

const EMPTY = undefined;
const TASK_ID = 'XYZ';
const mockTask = {
  name: 'Read books',
  completed: false,
  dueDate: '2021-01-11T23:00:00.000Z',
};

// TODO: Move this file to __mocks__
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn().mockImplementation(()=> ({
    collection: jest.fn().mockImplementation(()=> ({
      add: jest.fn().mockResolvedValue({id: TASK_ID}),
      doc: jest.fn().mockImplementation(()=> ({
        delete: jest.fn().mockResolvedValue(EMPTY),
        set: jest.fn().mockResolvedValue(EMPTY),
        get: jest.fn().mockResolvedValue(mockTask),
      })),
    })),
  })),
}));

describe('tasks', () => {
  it('should add new task to collection', async () => {
    const req = httpMocks.createRequest({
      body: mockTask,
    });
    const res = httpMocks.createResponse();

    res.send = jest.fn();

    await createTask(req, res);

    expect(res.statusCode).toBe(201);
    expect(res.send).toBeCalledWith(TASK_ID);
  });

  it('should delete existing task from collection', async () => {
    const taskId = TASK_ID;

    const req = httpMocks.createRequest({
      body: {taskId},
    });
    const res = httpMocks.createResponse();

    res.send = jest.fn();

    await removeTask(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.send).toBeCalledWith(`Task ${taskId} successfully deleted`);
  });

  it('should update existing task', async () => {
    const req = httpMocks.createRequest({
      body: mockTask,
    });
    const res = httpMocks.createResponse();

    res.send = jest.fn();

    await updateTask(req, res);

    expect(res.statusCode).toBe(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should get task by id', async () => {
    const req = httpMocks.createRequest({
      url: `getTaskById&taskId=${TASK_ID}`,
    });
    const res = httpMocks.createResponse();

    res.send = jest.fn();

    await getTaskById(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.send).toHaveBeenCalledWith(mockTask);
  });
});
