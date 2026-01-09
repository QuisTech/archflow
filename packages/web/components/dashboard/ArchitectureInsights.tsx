import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface Insight {
    type: string;
    text: string;
    recommendation: string;
}

interface ArchitectureInsightsProps {
    insights: Insight[];
}

export function ArchitectureInsights({ insights }: ArchitectureInsightsProps) {
    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="p-2 rounded-lg bg-gray-800 mb-3">
                <h3 className="text-lg font-bold flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
                    Architecture Insights
                </h3>
                <span className="text-xs text-gray-500">AI + Rules Engine</span>
            </div>
            <div className="space-y-4">
                {insights.map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                        <div className="flex items-start">
                            <div className={`mr-3 mt-1 ${insight.type === 'warning' ? 'text-amber-400' : insight.type === 'success' ? 'text-green-400' : 'text-blue-400'}`}>
                                {insight.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : insight.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                            </div>
                            <div>
                                <p className="text-sm mb-1">{insight.text}</p>
                                <p className="text-xs text-gray-400">Recommendation: {insight.recommendation}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                    AI used only for synthesis; all findings traceable to source code.
                </p>
            </div>
        </div>
    );
}
