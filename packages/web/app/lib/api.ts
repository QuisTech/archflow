// ArchFlow API Client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

export async function startAnalysis(repoUrl: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl }),
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}
