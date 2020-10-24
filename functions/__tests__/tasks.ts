import httpMocks from 'node-mocks-http';
import {
  createTask,
  getTaskById,
  getTasks,
  removeTask,
  updateTask,
} from '../src/index';
import {
  EMPTY,
  TASK_ID,
  ERROR_MESSAGE,
  ERROR,
  mockTask,
} from '../utils/tests';

const addSpy = jest.fn();
const deleteSpy = jest.fn();
const setSpy = jest.fn();
const getSpy = jest.fn();

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn().mockImplementation(()=> ({
    collection: jest.fn().mockImplementation(()=> ({
      add: jest.fn().mockImplementation(()=> addSpy()),
      get: jest.fn().mockImplementation(()=> getSpy()),
      doc: jest.fn().mockImplementation(()=> ({
        delete: deleteSpy,
        set: setSpy,
        get: getSpy,
      })),
    })),
  })),
}));

describe('tasks', () => {
  describe('createTask', () => {
    it('should add new task to collection', async () => {
      addSpy.mockResolvedValue({id: TASK_ID});
      const req = httpMocks.createRequest({
        body: mockTask,
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await createTask(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.send).toBeCalledWith(TASK_ID);
    });

    it('should return 500 status code when trying to add a new task',
        async () => {
          addSpy.mockRejectedValue(ERROR);
          const req = httpMocks.createRequest({
            body: mockTask,
          });
          const res = httpMocks.createResponse();

          res.send = jest.fn();

          await createTask(req, res);

          expect(res.statusCode).toBe(500);
          expect(res.send).toBeCalledWith(ERROR_MESSAGE);
        });
  });

  describe('deleteTask', () => {
    it('should delete existing task from collection', async () => {
      deleteSpy.mockResolvedValue(EMPTY);
      const taskId = TASK_ID;

      const req = httpMocks.createRequest({
        params: {
          '0': taskId,
        },
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await removeTask(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.send).toBeCalledWith(`Task ${taskId} successfully deleted`);
    });

    it('should return 500 status code when operation fails', async () => {
      deleteSpy.mockRejectedValue(ERROR);
      const taskId = TASK_ID;

      const req = httpMocks.createRequest({
        body: {taskId},
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await removeTask(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.send).toBeCalledWith(ERROR_MESSAGE);
    });
  });

  describe('updateTask', () => {
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

    it('should return 500 status code when operation fails', async () => {
      setSpy.mockRejectedValue(ERROR);
      const req = httpMocks.createRequest({
        body: mockTask,
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await updateTask(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    });
  });

  describe('getTaskById', () => {
    it('should get task by id', async () => {
      getSpy.mockResolvedValue(mockTask);
      const req = httpMocks.createRequest({
        url: `getTaskById&taskId=${TASK_ID}`,
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await getTaskById(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.send).toHaveBeenCalledWith(mockTask);
    });

    it('should return 404 when task is not found', async () => {
      getSpy.mockResolvedValue(null);
      const req = httpMocks.createRequest({
        query: {
          taskId: TASK_ID,
        },
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await getTaskById(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.send).toHaveBeenCalledWith(`Task ${TASK_ID} not found`);
    });

    it('should return 500 status code when operation fails', async () => {
      getSpy.mockRejectedValue(ERROR);
      const taskId = TASK_ID;

      const req = httpMocks.createRequest({
        body: {taskId},
      });
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await getTaskById(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.send).toBeCalledWith(ERROR_MESSAGE);
    });
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      const taskSnapshot = [{
        id: TASK_ID,
        data: jest.fn(()=> mockTask),
      }];
      const response = [mockTask];
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      getSpy.mockResolvedValue(taskSnapshot);
      res.send = jest.fn();

      await getTasks(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.send).toHaveBeenCalledWith(response);
    });

    it('should return 500 status code when operation fails', async () => {
      getSpy.mockRejectedValue(ERROR);

      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      res.send = jest.fn();

      await getTasks(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.send).toBeCalledWith(ERROR_MESSAGE);
    });
  });
});
