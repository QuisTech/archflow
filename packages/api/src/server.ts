import express from 'express';
import cors from 'cors';
import { analyzeRepository } from './analyzer';
import { authMiddleware } from './utils/jwt';
import { AuthService } from './services/auth.service';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Flexible CORS for development and specific production origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://archflow-sigma.vercel.app',
  'https://archflow.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ArchFlow API',
    environment: process.env.NODE_ENV || 'development',
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

app.post('/api/analyze', authMiddleware, async (req, res) => {
  const { repoUrl } = req.body;
  const customGeminiKey = req.header('X-Gemini-API-Key');

  console.log(`[API] Analysis request for: ${repoUrl}`);
  if (customGeminiKey) {
    console.log('[API] Using user-provided Gemini API Key');
  }

  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  try {
    const report = await analyzeRepository(repoUrl, customGeminiKey);
    res.json({
      success: true,
      message: 'Analysis completed',
      data: report
    });
  } catch (error: any) {
    console.error(`[API] Analysis failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 ArchFlow API (v4) running on port ${PORT}`);
  console.log(`📊 Health: https://archflow-api.onrender.com/api/health`);
});