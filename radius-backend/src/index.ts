import express from 'express';
import cors from 'cors';
import workspaceRouter from './routes/workspace';
import sourcesRouter from './routes/sources';
import cacheRouter from './routes/cache';
import demoRouter from './routes/demo';

const app = express();
const port = process.env.PORT || 3001;

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const FORCE_DEMO = process.env.FORCE_DEMO === 'true';

app.use(cors({
  origin: [FRONTEND_ORIGIN, 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Middleware to inject FORCE_DEMO into requests if needed
app.use((req, res, next) => {
  if (FORCE_DEMO && req.path.includes('workspace-radius')) {
    return res.redirect('/api/demo-radius');
  }
  next();
});

// Routes
app.use('/api', workspaceRouter);
app.use('/api/sources', sourcesRouter);
app.use('/api/cache', cacheRouter);
app.use('/api', demoRouter);

app.post('/api/items/:id/action', (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  console.log(`[action] Item ${id} performed action: ${action}`);
  res.json({ success: true, message: `Action ${action} executed successfully on ${id}.` });
});


app.listen(port, () => {
  console.log(`Radius backend listening at http://localhost:${port}`);
});
