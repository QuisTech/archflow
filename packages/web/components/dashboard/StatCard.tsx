import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
    // Extract color class from props or default to gray
    // Note: simpler implementation assuming full classes passed or safe-list 
    // For now, we will assume strict passing of classes or handling logic here.

    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className={`p-2 rounded-lg bg-gray-800 ${color} mb-3 w-fit`}>
                {icon}
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-sm text-gray-400">{label}</div>
        </div>
    );
}
