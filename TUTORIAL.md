---
marp: true
theme: gaia
size: 3:3
---

# INTRODUCTION

Firebase is a relatively new company, being founded in May 2012. After launching its first product (Realtime Database), the company established themselves as a Mobile-Backend-as-a-Service (MBaaS) and two years later, in October 2014, Google acquired the company as its offering for app development.

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

# Login
Once you've successfully installed the firebase-cli, you need to grant access to your Firebase projects:

```bash
$ firebase login
```

This command will open a web page requesting you to authorize Firebase to access your account and connect your cli to the Cloud.

---

# Creating a Firebase project with the CLI

```bash
$ firebase init
```
This command will essentially ask you a few questions regarding your project setup. 

Note: Initially, the CLI will associate your project directory with a Firebase project. You can add multiple projects later on with `firebase use --add`.

---

# Working with HTTP functions

The CLI generates a default function we can use to test our project. 
Head on to functions/src/index.ts, uncomment the commented code and run the following commands:
```bash
$ npm run build
$ npm run serve
$ curl http://localhost:5001/ts-todo-app/us-central1/helloWorld
```

---

# Persisting data to a Firestore collection

---

# Working with Background functions

---

# Documenting API with Swagger

---

# E2E testing with Postman

---

# Unit testing with Jest



