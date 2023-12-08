## Description
This project contains a set of APIs for user management, address management, and a dynamic home screen for real-time news, as described in the ```Darsoft Assignment - Backend.pdf``` document.

## Technologies used:
* Nodejs
* Nestjs
* MongoDB
* Socket.IO
* JWT Authenctication

## Configuration
Please make sure to set the environment variables in the ```.env.dev``` file before running the server</br>
(The ```.env.dev``` contains the credentials for logging in as an admin)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Endpoints
The Postman collection news-app.postman_collection.json contains requests demonstrating the useage of all endpoints.</br>
For the realtime endpoints, I shared a link to the socket.io collection on [this link](https://dark-crescent-710656.postman.co/workspace/News-App~69e930f4-fc07-4f70-b8b4-7f4545cb78d8/collection/6572df2abbd4b43e3f710788?action=share&creator=7569665) (Because Postman doesn't have a feautre for exporting a WebSocket collections as json file)</br>
I also wrote a swagger docuemtation, you can access from the ```/docs/``` path in the server after you run it