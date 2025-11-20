'use client';

// FlowCard - Animated card representing each step in the integration flow
// Maps to: MuleSoft Flow Step visualization

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface FlowCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'idle' | 'loading' | 'success' | 'error';
  delay?: number;
  children?: ReactNode;
}

const statusColors = {
  idle: 'border-gray-300 bg-gray-50',
  loading: 'border-blue-400 bg-blue-50 animate-pulse',
  success: 'border-green-400 bg-green-50',
  error: 'border-red-400 bg-red-50',
};

const iconColors = {
  idle: 'text-gray-400',
  loading: 'text-blue-500',
  success: 'text-green-500',
  error: 'text-red-500',
};

export default function FlowCard({
  title,
  description,
  icon: Icon,
  status,
  delay = 0,
  children,
}: FlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 100,
      }}
      className={`
        relative rounded-xl border-2 p-6 shadow-lg backdrop-blur-sm
        transition-all duration-300
        ${statusColors[status]}
      `}
    >
      {/* Icon */}
      <div className="flex items-start gap-4">
        <div
          className={`
          rounded-lg bg-white p-3 shadow-md
          transition-colors duration-300
          ${iconColors[status]}
        `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>

          {/* Description */}
          <p className="mt-1 text-sm text-gray-600">{description}</p>

          {/* Status indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div
              className={`
              h-2 w-2 rounded-full
              ${status === 'loading' && 'animate-pulse'}
              ${status === 'idle' && 'bg-gray-400'}
              ${status === 'loading' && 'bg-blue-500'}
              ${status === 'success' && 'bg-green-500'}
              ${status === 'error' && 'bg-red-500'}
            `}
            />
            <span className="text-xs font-medium text-gray-700">
              {status === 'idle' && 'Waiting'}
              {status === 'loading' && 'Processing...'}
              {status === 'success' && 'Completed'}
              {status === 'error' && 'Failed'}
            </span>
          </div>

          {/* Additional content */}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>

      {/* Success checkmark animation */}
      {status === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-lg"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Error icon animation */}
      {status === 'error' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-lg"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
