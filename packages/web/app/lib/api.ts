// ArchFlow API Client
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

  // If we are in a browser and no env var is set, try to guess the local API location
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      return `http://${hostname}:10000`;
    }
  }

  return 'https://archflow-api.onrender.com';
};

const API_BASE_URL = getBaseUrl();
console.log('[ArchFlow] Using API_BASE_URL:', API_BASE_URL);

// Get auth token from localStorage (for demo)
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('archflow_token');
  }
  return null;
};

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
  version: string;
}

export interface AnalysisRequest {
  repoUrl: string;
}

export interface AnalysisResponse {
  success: boolean;
  message: string;
  data: {
    repoUrl: string;
    analysisId: string;
    status: string;
    estimatedCompletion: string;
  };
}

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
  token: string;
}

export async function checkBackendHealth(): Promise<HealthResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    return null;
  }
}

// UPDATED: Accept optional token parameter
export async function startAnalysis(repoUrl: string, token?: string): Promise<AnalysisResponse> {
  const authToken = token || getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
      },
      body: JSON.stringify({ repoUrl }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please log in.');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

export async function loginUser(credentials: AuthCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Login failed');
  return await response.json();
}

export async function registerUser(credentials: AuthCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Registration failed');
  return await response.json();
}