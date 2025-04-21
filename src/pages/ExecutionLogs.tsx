import React, { useEffect, useState } from 'react';

export default function ExecutionLogs() {
  const [logs, setLogs] = useState<{ name: string; path: string }[]>([]);
  const [selectedLog, setSelectedLog] = useState<string>('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logs`)
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📜 Execution Logs</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ul className="space-y-2">
            {logs.map(log => (
              <li key={log.name}>
                <button className="text-blue-600 underline" onClick={() => {
                  fetch(`${import.meta.env.VITE_API_BASE_URL}${log.path}`)
                    .then(res => res.text())
                    .then(setSelectedLog);
                }}>
                  {log.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded border overflow-auto h-[500px] whitespace-pre-wrap">
          {selectedLog || 'Select a log to view output...'}
        </div>
      </div>
    </div>
  );
}
