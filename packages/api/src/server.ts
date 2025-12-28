import express from 'express';
import cors from 'cors';
import { analyzeRepository } from './analyzer';
import { authMiddleware } from './utils/jwt';
import { AuthService } from './services/auth.service';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'ArchFlow API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const result = await AuthService.register({ email, password, name });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const result = await AuthService.login({ email, password });
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req: any, res) => {
  try {
    const user = await AuthService.getUser(req.userEmail);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analyze', authMiddleware, (req, res) => {
  const { repoUrl } = req.body;
  
  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

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
  console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/register`);
});
