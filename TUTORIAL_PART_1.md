---
marp: true
theme: gaia
size: 3:3
---

# INTRODUCTION

Firebase was founded in May 2012 as an independent company. The company established itself by offering Mobile-Backend-as-a-Service (MBaaS) products, such as authentication, analytics, and real-time database. 

Two years later, in October 2014, Google acquired the company as its offering for app development.

---

# FIREBASE-CLI

Install the firebase-cli globally via npm:
```bash
$ npm install -g firebase-tools
```

Note: If you get `EACCES` on Mac, execute the scripts below:
```bash
$ sudo chown -R `whoami` ~/.npm
$ sudo chown -R `whoami` /usr/local/lib/node_modules
```

---

# LOGIN
Once you've successfully installed the firebase-cli, you need to grant access to your Firebase projects:

```bash
$ firebase login
```

This command will open a web page requesting you to authorize Firebase to access your account and connect the CLI to the Cloud.

---

# CREATING A FIREBASE PROJECT

```bash
$ firebase init
```
This command will essentially ask you a few questions regarding your project setup. 

Note: Initially, the CLI will associate your project directory with a Firebase project. You can add multiple projects later on with `firebase use --add`.

---

# RUNNING THE APP LOCALLY

The CLI generates a default function we can use to test our project. 
Head on to functions/src/index.ts, uncomment the commented code and run the following commands:
```bash
$ npm run serve
$ curl http://localhost:5001/YOUR-PROJECT-ID/us-central1/helloWorld
```

Note: Replace `YOUR-PROJECT-ID` with project id you created earlier on the Firebase control panel.

---

# SUMMARY

In this first part of the tutorial, we learned a bit about Firebase, how to set it up and how to initialize a Firebase project via the Firebase CLI. We also tested our very first Cloud Function. 

In the next part of the tutorial, we'll learn basic CRUD (Create, Read, Update and Delete) operations with Cloud Functions and Firestore.




