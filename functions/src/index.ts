import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const COLLECTION_PATH = 'task';

export const createTask = functions.https.onRequest(async (req, res) => {
  const {
    name,
    completed,
    dueDate,
  } = req.body;

  try {
    const result = await db.collection(COLLECTION_PATH).
        add({
          name,
          completed,
          dueDate,
        });

    res.status(201).send(result.id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export const removeTask = functions.https.onRequest(async (req, res) => {
  const {
    taskId,
  } = req.body;

  try {
    await db.collection(COLLECTION_PATH).
        doc(taskId).
        delete();

    res.send(`Task ${taskId} successfully deleted`);
  } catch (error) {
    console.log(error);
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
    await db.collection(COLLECTION_PATH).
        doc(id).
        set({
          name,
          completed,
          dueDate,
        });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export const getTaskById = functions.https.onRequest(async (req, res) => {
  const taskId = <string>req.query.taskId || '';

  console.log(taskId);

  try {
    const task = await db.collection(COLLECTION_PATH).
        doc(taskId).
        get();

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
