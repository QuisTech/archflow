import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ArchFlow API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Simple analysis demo endpoint
app.post('/api/analyze', (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  // SIMPLE DEMO RESPONSE - we'll enhance this later
  res.json({
    success: true,
    message: 'Analysis started',
    data: {
      repoUrl,
      analysisId: 'demo-' + Date.now(),
      status: 'queued',
      estimatedCompletion: '30 seconds'
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ ArchFlow API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: curl http://localhost:${PORT}/api/health`);
});
