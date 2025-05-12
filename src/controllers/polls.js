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

// Create a poll
export async function createPoll(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { question, options } = req.body;
  const poll = {
    id: uuidv4(),
    question,
    options: options.map(opt => ({ id: uuidv4(), text: opt.text, votes: 0 })),
    createdAt: new Date().toISOString(),
  };

  const data = await readData();
  data.polls.push(poll);
  await writeData(data);

  res.status(201).json(poll);
}

// Get all polls
export async function getPolls(req, res) {
  const data = await readData();
  res.json(data.polls);
}

// Get a single poll
export async function getPoll(req, res) {
  const { id } = req.params;
  const data = await readData();
  const poll = data.polls.find(p => p.id === id);
  if (!poll) return res.status(404).json({ error: 'Poll not found' });
  res.json(poll);
}

// Vote on a poll
export async function vote(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { optionId } = req.body;

  const data = await readData();
  const poll = data.polls.find(p => p.id === id);
  if (!poll) return res.status(404).json({ error: 'Poll not found' });

  const option = poll.options.find(opt => opt.id === optionId);
  if (!option) return res.status(404).json({ error: 'Option not found' });

  option.votes += 1;
  await writeData(data);

  res.json(poll);
}