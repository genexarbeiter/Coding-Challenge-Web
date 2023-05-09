import * as http from 'http';
import express from 'express';
import cors from 'cors';
import * as fs from "fs";
import {Message} from "../types/message";

const app = express();

app.use(cors());
app.use(express.json());

let database: Message[] = readDataBase();

/**
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     description: Retrieve a list of messages from the local database file.
 */
app.get('/messages', (_: express.Request, response: express.Response) => {
  response.send(database);
});

/**
 * /messages:
 *   post:
 *     summary: Save an incoming message
 *     description: Save an incoming message to the local database file.
 */
app.post('/messages', (request: express.Request, response: express.Response) => {
  if (!request.headers['x-api-key']) {
    return response.sendStatus(403);
  }
  database.push(request.body);
  response.sendStatus(201);
});

http.createServer(app);


const port = process.env.PORT || 1337;

app.listen(port);

console.log(`Running on port ${port}`);

/**
 * Read the database file and decode it from base64.
 */
function readDataBase() {
  const encoded = fs.readFileSync('./data/gibberish.enc', 'utf8');
  const decoded = atob(encoded);
  let messages: Message[] = JSON.parse(decoded);
  messages.sort((a, b) => a.sentAt < b.sentAt ? -1 : 1);
  return messages;
}
