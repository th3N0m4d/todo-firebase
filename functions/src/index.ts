import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

export const addTask = functions.https.onRequest(async (req, res) => {
  const {
    name,
    completed,
    dueDate,
  } = req.body;

  try {
    const result = await admin.firestore().collection('tasks').add({
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
