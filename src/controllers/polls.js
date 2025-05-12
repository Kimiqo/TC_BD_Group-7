import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the path to polls.json relative to controllers/polls.js
const DATA_FILE = path.join(__dirname, '../data/polls.json');

// Helper to read JSON file
async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper to write JSON file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}
