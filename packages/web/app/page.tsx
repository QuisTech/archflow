"use client";

import { BarChart3, GitBranch, Shield, Zap, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { checkBackendHealth, startAnalysis, type HealthResponse } from './lib/api';
import { useAuth } from './contexts/auth.context';
import { AuthModal } from './components/auth/auth-modal';
import { StatCard } from '../components/dashboard/StatCard';
import { RepoList } from '../components/dashboard/RepoList';
import { ArchitectureInsights } from '../components/dashboard/ArchitectureInsights';
import { WorkflowVisualizer } from '../components/dashboard/WorkflowVisualizer';

export default function Home() {
  const { user, logout } = useAuth();
  const [backendStatus, setBackendStatus] = useState<HealthResponse | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [apiDemoResult, setApiDemoResult] = useState<any>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const checkApi = async () => {
      setIsChecking(true);
      const status = await checkBackendHealth();
      setBackendStatus(status);
      setIsChecking(false);
    };
    checkApi();
  }, []);

  const runDemoAnalysis = async () => {
    if (!user) {
      setAuthDefaultTab('login');
      setShowAuthModal(true);
      return;
    }

    setDemoError(null);
    setApiDemoResult(null);

    try {
      const result = await startAnalysis('https://github.com/QuisTech/archflow');
      setApiDemoResult(result);
    } catch (error) {
      setDemoError(error instanceof Error ? error.message : 'Analysis failed');
    }
  };

  const stats = [
    { label: 'Repos Analyzed', value: '42', icon: <GitBranch className="h-5 w-5" />, color: 'text-blue-400' },
    { label: 'Tech Debt Score', value: '78/100', icon: <BarChart3 className="h-5 w-5" />, color: 'text-green-400' },
    { label: 'Security Issues', value: '12', icon: <Shield className="h-5 w-5" />, color: 'text-amber-400' },
    { label: 'Performance Score', value: '94%', icon: <Zap className="h-5 w-5" />, color: 'text-purple-400' },
  ];

  const recentAnalyses = [
    { name: 'acme/backend', issues: 12, lastScan: '2 hours ago', language: 'Python' },
    { name: 'startup/frontend', issues: 3, lastScan: '5 minutes ago', language: 'TypeScript' },
    { name: 'corp/auth-service', issues: 8, lastScan: '1 day ago', language: 'Go' },
    { name: 'mobile/app-v2', issues: 5, lastScan: '3 hours ago', language: 'Kotlin' },
  ];

  const architectureInsights = [
    {
      type: 'warning',
      text: 'Auth-service is a central dependency (risk: cascading failures)',
      recommendation: 'Implement circuit breaker pattern'
    },
    {
      type: 'success',
      text: 'Frontend is well-isolated from backend changes',
      recommendation: 'Continue with current microservice boundaries'
    },
    {
      type: 'suggestion',
      text: 'Consider event-driven messaging for payment-service (latency hotspot)',
      recommendation: 'Evaluate Kafka vs RabbitMQ for async processing'
    },
  ];

  const workflowSteps = [
    { step: '1', name: 'Code Ingest', description: 'GitHub sync + parsing', type: 'deterministic' },
    { step: '2', name: 'Static Analysis', description: 'Dependency mapping', type: 'deterministic' },
    { step: '3', name: 'AI Reasoning', description: 'Pattern recognition', type: 'ai' },
    { step: '4', name: 'Rule Validation', description: 'Compliance checks', type: 'deterministic' },
    { step: '5', name: 'Output Generation', description: 'Reports + tickets', type: 'deterministic' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold">ArchFlow</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full border border-blue-700">
                    Beta
                  </span>
                  <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full border border-green-700 flex items-center">
                    <Shield className="h-3 w-3 mr-1" /> Compliance Mode
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-300 hidden md:inline">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthDefaultTab('register');
                      setShowAuthModal(true);
                    }}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Architecture Decision Platform</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mb-2">
            Automate documentation, detect tech debt, and visualize dependencies across your entire codebase.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl">
            <span className="text-blue-400">AI-driven recommendations with rationale, trade-offs, and historical context.</span>
            {' '}Built for engineering teams at scale.
          </p>
        </div>

        <div className="mb-10 p-6 bg-gray-900/40 border border-gray-800 rounded-2xl">
          <div className="p-2 rounded-lg bg-gray-800 mb-3 w-fit">
            <h2 className="text-xl font-bold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              Full-Stack Backend API
            </h2>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            {isChecking ? (
              <span className="text-sm text-gray-400">Checking connection...</span>
            ) : backendStatus ? (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-400">
                  Connected (v{backendStatus.version})
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-red-400">
                  Backend offline
                </span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-400 mb-4">
            Your architecture analysis platform is running and ready to process repositories.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={runDemoAnalysis}
              disabled={!backendStatus}
              className={`px-4 py-3 rounded-lg font-medium transition ${backendStatus
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90'
                  : 'bg-gray-800 cursor-not-allowed'
                }`}
            >
              Test Hybrid Analysis API
            </button>

            <button
              onClick={() => checkBackendHealth().then(setBackendStatus)}
              className="px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
            >
              Re-check Connection
            </button>
          </div>

          {demoError && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
              <p className="text-red-300">Error: {demoError}</p>
            </div>
          )}

          {apiDemoResult && (
            <div className="mt-4 p-4 bg-green-900/10 border border-green-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-green-400">✅ Analysis Started Successfully</h4>
                <span className="text-xs text-gray-400">ID: {apiDemoResult.data.analysisId}</span>
              </div>
              <pre className="text-sm text-gray-300 bg-gray-900/50 p-3 rounded overflow-x-auto">
                {JSON.stringify(apiDemoResult, null, 2)}
              </pre>
              <div className="mt-2 text-xs text-gray-400">
                <p>Provider: {apiDemoResult.data.ai_insights?.provider || 'Unknown'}</p>
                <p>Confidence: {apiDemoResult.data.ai_insights?.confidence}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <ArchitectureInsights insights={architectureInsights} />
        </div>

        <WorkflowVisualizer steps={workflowSteps} />

        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Repository Analysis Dashboard</h2>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">Connected to GitHub • Audit logs enabled</span>
            </div>
          </div>

          <RepoList repos={recentAnalyses} />

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-800/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to analyze your codebase?</h3>
                <p className="text-sm text-gray-400">Connect your GitHub account to start your first architecture analysis.</p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition">
                Connect GitHub
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Automated Documentation', desc: 'Generate architecture docs from code analysis', color: 'from-blue-500 to-cyan-500' },
            { title: 'Tech Debt Detection', desc: 'Identify and prioritize technical debt automatically', color: 'from-amber-500 to-orange-500' },
            { title: 'Dependency Graphs', desc: 'Visualize service dependencies and relationships', color: 'from-purple-500 to-pink-500' },
          ].map((feature) => (
            <div key={feature.title} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>ArchFlow • AI-powered architecture decision platform •
            <a href="https://github.com/QuisTech/archflow" className="text-blue-400 hover:text-blue-300 ml-1">
              View on GitHub
            </a>
          </p>
          <p className="mt-2 text-gray-600">Data residency: EU/US • SOC2 compliant • Audit logs enabled</p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authDefaultTab}
      />
    </div>
  );
}
