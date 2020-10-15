# TODO with Firebase

A simple, and yet modern, TODO app written in Javascript and Firebase. This project also includes a tutorial with step-by-step instructions on how to: setup Firebase, create Firebase Functions and test it with Jest / Emulators.

## Features

- Type-checking with Typescript
- Code linting with ESLint
- API description with Swagger
- Data persistence with Firestore
- Unit tests with Jest

## Project Requirements

- OS: MacOs
- Node: >= 10
- Java: ?

## Installation


```bash
npm install -g firebase-tools
```

Note: If you get `EACCES`
```bash
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```

## Usage


```bash
firebase login
```

## Testing


```bash
npm run test
```

```bash
npm run test:watch
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)