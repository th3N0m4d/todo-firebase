import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const COLLECTION_PATH = 'task';
const taskRef = admin.firestore().collection(COLLECTION_PATH);

export const signUpUser = functions.https.onRequest(async (req, res) => {
  const {
    email,
    password,
    displayName,
  } = req.body;

  try {
    const userSnapshot = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).send(userSnapshot.uid);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});

export const createTask = functions.https.onRequest(async (req, res) => {
  const {
    name,
    completed,
    dueDate,
  } = req.body;

  try {
    const result = await taskRef.add({name, completed, dueDate});

    res.status(201).send(result.id);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});

export const removeTask = functions.https.onRequest(async (req, res) => {
  const {
    taskId,
  } = req.body;

  try {
    await taskRef.doc(taskId).delete();

    res.send(`Task ${taskId} successfully deleted`);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});

export const updateTask = functions.https.onRequest(async (req, res) => {
  const {
    id,
    name,
    completed,
    dueDate,
  } = req.body;

  try {
    await taskRef.
        doc(id).
        set({
          name,
          completed,
          dueDate,
        });

    res.status(204).send();
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});

export const getTaskById = functions.https.onRequest(async (req, res) => {
  const taskId = <string>req.query.taskId || '';

  try {
    const task = await taskRef.doc(taskId).get();

    res.status(200).send(task);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});

export const getTasks = functions.https.onRequest(async (req, res) => {
  try {
    const taskSnapshot = await taskRef.get();
    const result: any[] = [];

    taskSnapshot.forEach((doc) => result.push({
      uuid: doc.id,
      ...doc.data(),
    }));

    res.status(200).send(result);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).send(error.message);
  }
});
