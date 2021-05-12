import express from 'express';
import push from '../db/push_data.js';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('You have hit the API endpoint for Pings backend');
});

router.get('/pushtest', async (_req, res) => {
  res.send(await push());
});

export default router;
