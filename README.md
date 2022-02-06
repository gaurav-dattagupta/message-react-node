# Message App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project was created by Gaurav Dattagupta as part of the self assignment.

The core technology stack for this project include React, NodeJS, Typescript.

The project folder comprises of both the Backend and Frontend code for the Messaging application.
./src/backend
./src/frontend

The backend node server runs on Port 3002
The frontend react app is hosted on Port 3000

The application frontend calls the APIs using the http://localhost:3002/api/ base URL.

## Pre-Requisites

The node version for this codebase was selected as v14.17.6
The npm version assciated with the development enviroment was v6.14.15
The yarn version for the code scripts was v1.22.11

The codebase also has individual package.jon files within the ./src/backend, ./src/frontend and the ./ paths of this codebase.
We would need to run either yarn or npm install on each of these folders to fetch the dependencies required by the application codebase.

## Launch local servers

Once the dependencies has been downloaded within each folder mentioned in the step above, the application backedn and frontend servers can be started from the root directory of the application.
Navigate to ./ folder of this application.
Run either `yarn start-local` or `npm run start-local` from the terminal.

This will first use tsc to prepare the typescript rules and publish the compiled code to the ./public/ folder which is the default distribution directory.
Then it will use concurrently to invoke simultaneously the node server of the backend and the appliction frontend server.

The application will open in the default browser of the machine on [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.\
You will also see any lint errors in the console.
## Additional Scripts

In the project directory, you can run:

### `yarn lint`

Validates the entire project with the eslint rules defined in ./eslintrc.json file.

### `yarn pretty`

Uses prettier to run the check on the entire project and repair the formatting of the typescript code uniformly.
The overriding rules are defined in .prettierrc.json file kept within ./src/backedn and ./src/frontend files.
