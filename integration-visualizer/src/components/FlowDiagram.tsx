'use client';

// FlowDiagram - Visual connection between flow steps
// Maps to: MuleSoft Flow visual representation

import { motion } from 'framer-motion';

interface FlowDiagramProps {
  activeStep: number; // 0 = idle, 1 = fetch, 2 = transform, 3 = publish
}

export default function FlowDiagram({ activeStep }: FlowDiagramProps) {
  return (
    <div className="relative flex items-center justify-center gap-4 py-8">
      {/* Step 1: Fetch */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: activeStep >= 1 ? 1.2 : 1,
            boxShadow:
              activeStep >= 1
                ? '0 0 20px rgba(59, 130, 246, 0.5)'
                : '0 0 0px rgba(0, 0, 0, 0)',
          }}
          className={`
            flex h-16 w-16 items-center justify-center rounded-full
            border-4 font-bold transition-colors duration-300
            ${
              activeStep >= 1
                ? 'border-blue-500 bg-blue-100 text-blue-700'
                : 'border-gray-300 bg-gray-100 text-gray-500'
            }
          `}
        >
          1
        </motion.div>
        <span className="mt-2 text-xs font-medium text-gray-600">Fetch</span>
      </div>

      {/* Arrow 1 → 2 */}
      <div className="relative h-1 w-24">
        <div className="absolute inset-0 rounded bg-gray-300" />
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: activeStep >= 2 ? '100%' : '0%' }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded bg-gradient-to-r from-blue-500 to-purple-500"
        />
        {/* Animated dots */}
        {activeStep >= 2 && (
          <>
            <motion.div
              animate={{ x: [0, 96, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
            />
          </>
        )}
      </div>

      {/* Step 2: Transform */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: activeStep >= 2 ? 1.2 : 1,
            boxShadow:
              activeStep >= 2
                ? '0 0 20px rgba(168, 85, 247, 0.5)'
                : '0 0 0px rgba(0, 0, 0, 0)',
          }}
          className={`
            flex h-16 w-16 items-center justify-center rounded-full
            border-4 font-bold transition-colors duration-300
            ${
              activeStep >= 2
                ? 'border-purple-500 bg-purple-100 text-purple-700'
                : 'border-gray-300 bg-gray-100 text-gray-500'
            }
          `}
        >
          2
        </motion.div>
        <span className="mt-2 text-xs font-medium text-gray-600">
          Transform
        </span>
      </div>

      {/* Arrow 2 → 3 */}
      <div className="relative h-1 w-24">
        <div className="absolute inset-0 rounded bg-gray-300" />
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: activeStep >= 3 ? '100%' : '0%' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute inset-0 rounded bg-gradient-to-r from-purple-500 to-green-500"
        />
        {/* Animated dots */}
        {activeStep >= 3 && (
          <motion.div
            animate={{ x: [0, 96, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
          />
        )}
      </div>

      {/* Step 3: Publish */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: activeStep >= 3 ? 1.2 : 1,
            boxShadow:
              activeStep >= 3
                ? '0 0 20px rgba(34, 197, 94, 0.5)'
                : '0 0 0px rgba(0, 0, 0, 0)',
          }}
          className={`
            flex h-16 w-16 items-center justify-center rounded-full
            border-4 font-bold transition-colors duration-300
            ${
              activeStep >= 3
                ? 'border-green-500 bg-green-100 text-green-700'
                : 'border-gray-300 bg-gray-100 text-gray-500'
            }
          `}
        >
          3
        </motion.div>
        <span className="mt-2 text-xs font-medium text-gray-600">Publish</span>
      </div>
    </div>
  );
}
