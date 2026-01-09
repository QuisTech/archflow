interface Repository {
    name: string;
    issues: number;
    lastScan: string;
    language: string;
}

interface RepoListProps {
    repos: Repository[];
}

export function RepoList({ repos }: RepoListProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-800">
            <div className="grid grid-cols-4 bg-gray-900/80 p-4 font-medium text-gray-300 border-b border-gray-800">
                <div>Repository</div>
                <div>Language</div>
                <div>Issues Found</div>
                <div>Last Scan</div>
            </div>
            {repos.map((repo) => (
                <div key={repo.name} className="grid grid-cols-4 p-4 hover:bg-gray-900/50 border-b border-gray-800 last:border-0">
                    <div className="font-medium">{repo.name}</div>
                    <div>
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                            {repo.language}
                        </span>
                    </div>
                    <div>
                        <span className={`px-3 py-1 rounded-full text-sm ${repo.issues > 10 ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
                            {repo.issues} issue{repo.issues !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="text-sm text-gray-400">{repo.lastScan}</div>
                </div>
            ))}
        </div>
    );
}
