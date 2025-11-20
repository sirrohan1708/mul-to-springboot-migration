'use client';

// LogConsole - Real-time log viewer component
// Maps to: MuleSoft Logger component visualization

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  emoji?: string;
}

interface LogConsoleProps {
  logs: LogEntry[];
  title?: string;
  maxHeight?: string;
}

const levelColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

const levelBg = {
  info: 'bg-blue-900/30',
  success: 'bg-green-900/30',
  warning: 'bg-yellow-900/30',
  error: 'bg-red-900/30',
};

export default function LogConsole({
  logs,
  title = 'Integration Flow Logs',
  maxHeight = '400px',
}: LogConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl border-2 border-gray-700 bg-gray-900 p-4 shadow-2xl">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-gray-700 pb-3">
        <Terminal className="h-5 w-5 text-green-400" />
        <h3 className="font-mono text-sm font-bold text-green-400">{title}</h3>
        <div className="ml-auto flex gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Console content */}
      <div
        ref={consoleRef}
        className="space-y-1 overflow-y-auto font-mono text-sm"
        style={{ maxHeight }}
      >
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`rounded p-2 ${levelBg[log.level]}`}
            >
              <div className="flex items-start gap-2">
                {/* Timestamp */}
                <span className="text-gray-500">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>

                {/* Level badge */}
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${levelColors[log.level]}`}
                >
                  {log.level.toUpperCase()}
                </span>

                {/* Emoji */}
                {log.emoji && <span>{log.emoji}</span>}

                {/* Message */}
                <span className="flex-1 text-gray-200">{log.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {logs.length === 0 && (
          <div className="flex h-32 items-center justify-center text-gray-500">
            <div className="text-center">
              <Terminal className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>No logs yet. Start an integration flow to see activity.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-700 pt-3 text-xs text-gray-500">
        <span>{logs.length} log entries</span>
        <span className="animate-pulse">● LIVE</span>
      </div>
    </div>
  );
}
