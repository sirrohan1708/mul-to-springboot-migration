'use client';

// HealthCard - System health status indicator
// Maps to: MuleSoft API monitoring and health checks

import { motion } from 'framer-motion';
import { Activity, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export interface HealthCardProps {
  name: string;
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  details?: string;
  metric?: string;
  delay?: number;
}

const statusConfig = {
  UP: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Healthy',
  },
  DOWN: {
    icon: XCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Unavailable',
  },
  UNKNOWN: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    label: 'Unknown',
  },
};

export default function HealthCard({
  name,
  status,
  details,
  metric,
  delay = 0,
}: HealthCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`
        rounded-lg border-2 p-4 shadow-md
        transition-all duration-300 hover:shadow-lg
        ${config.bg} ${config.border}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Service name */}
          <h4 className="text-sm font-semibold text-gray-700">{name}</h4>

          {/* Status label */}
          <div className="mt-1 flex items-center gap-2">
            <Icon className={`h-4 w-4 ${config.color}`} />
            <span className={`text-xs font-medium ${config.color}`}>
              {config.label}
            </span>
          </div>

          {/* Details */}
          {details && (
            <p className="mt-2 text-xs text-gray-600">{details}</p>
          )}

          {/* Metric */}
          {metric && (
            <p className="mt-1 text-xs font-mono text-gray-500">{metric}</p>
          )}
        </div>

        {/* Pulse indicator */}
        {status === 'UP' && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative h-3 w-3"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
