import express from 'express';
import { check } from 'express-validator';
import { createPoll, getPolls, getPoll, vote } from '../controllers/polls.js';

const router = express.Router();

//All functions are yet to be created

// Create a poll - createPoll function
router.post(
  '/',
  [
    check('question').notEmpty().trim(),
    check('options').isArray({ min: 2 }).custom(options => options.every(opt => typeof opt.text === 'string' && opt.text.trim())),
  ],
  createPoll
);

// Get all polls - getPolls function
router.get('/', getPolls);

// Get a single poll - getPoll function
router.get('/:id', getPoll);

// Vote on a poll - vote function
router.post('/:id/vote', [check('optionId').notEmpty()], vote);

export default router;
