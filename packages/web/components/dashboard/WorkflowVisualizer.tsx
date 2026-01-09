import { CheckCircle, Workflow } from 'lucide-react';

interface WorkflowStep {
    step: string;
    name: string;
    description: string;
    type: string;
}

interface WorkflowVisualizerProps {
    steps: WorkflowStep[];
}

export function WorkflowVisualizer({ steps }: WorkflowVisualizerProps) {
    return (
        <div className="mb-8 p-6 bg-gray-900/30 border border-gray-800 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                    <Workflow className="h-5 w-5 mr-2 text-blue-400" />
                    Analysis Pipeline
                </h2>
                <div className="text-sm text-gray-400">
                    Last workflow run: <span className="text-green-400">5 min ago</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                {steps.map((step, idx) => (
                    <div key={step.step} className="flex flex-col items-center mb-4 md:mb-0 relative w-full">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 z-10 ${step.type === 'ai' ? 'bg-purple-900/50 border border-purple-700' : 'bg-gray-800 border border-gray-700'}`}>
                            <span className="font-bold">{step.step}</span>
                        </div>
                        <div className="text-center">
                            <div className="font-medium text-sm">{step.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{step.description}</div>
                            <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${step.type === 'ai' ? 'bg-purple-900/30 text-purple-300' : 'bg-gray-800 text-gray-300'}`}>
                                {step.type === 'ai' ? 'AI Synthesis' : 'Deterministic'}
                            </div>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-700 -z-0" style={{ left: '50%', width: '100%' }}></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                    <p className="text-sm text-gray-300">
                        <span className="font-medium">Traceable workflow:</span> AI applied only where needed; all steps observable and auditable.
                    </p>
                </div>
            </div>
        </div>
    );
}
