import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

// TODO: Prevent tasks with same name to be created
export const addTask = functions.https.onRequest(async (req, res) => {
  const {
    name,
    completed,
    dueDate
  } = req.body

  try {
      const result = await admin.firestore().collection('tasks').add({
          name,
          completed,
          dueDate
      })
    
      res.json(`Task created with ID ${result.id} `)      
  } catch (error) {
      res.status(500).send(error.message)
  }

});
