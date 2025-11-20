'use client';

// Main Dashboard - Integration Flow Visualizer
// Demonstrates MuleSoft to Spring Boot migration patterns

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Repeat, Send, PlayCircle, RotateCw } from 'lucide-react';
import FlowCard from '@/components/FlowCard';
import FlowDiagram from '@/components/FlowDiagram';
import LogConsole, { LogEntry } from '@/components/LogConsole';
import DataTable from '@/components/DataTable';
import { fetchCustomerWithFallback, CustomerResponse } from '@/lib/api';

type FlowStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [customerId, setCustomerId] = useState('1');
  const [flowStatus, setFlowStatus] = useState<{
    fetch: FlowStatus;
    transform: FlowStatus;
    publish: FlowStatus;
  }>({
    fetch: 'idle',
    transform: 'idle',
    publish: 'idle',
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [customerData, setCustomerData] = useState<CustomerResponse[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (level: LogEntry['level'], message: string, emoji?: string) => {
    const log: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      emoji,
    };
    setLogs((prev) => [...prev, log]);
  };

  const runIntegrationFlow = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setFlowStatus({ fetch: 'idle', transform: 'idle', publish: 'idle' });
    setLogs([]);

    try {
      addLog('info', `🌊 [MuleSoft Flow START] Processing customer ID: ${customerId}`, '🚀');

      // Step 1: Fetch Customer Data (MuleSoft HTTP Connector)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlowStatus((prev) => ({ ...prev, fetch: 'loading' }));
      addLog('info', '📍 [MuleSoft Flow - Step 1] Calling external API...', '🌐');

      const response = await fetchCustomerWithFallback(Number(customerId));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFlowStatus((prev) => ({ ...prev, fetch: 'success' }));
      addLog('success', `✅ [MuleSoft HTTP Connector] Successfully fetched customer: ${response.fullName}`, '✅');

      // Step 2: Transform Data (MuleSoft DataWeave)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlowStatus((prev) => ({ ...prev, transform: 'loading' }));
      addLog('info', '🔄 [MuleSoft Flow - Step 2] Transforming customer data...', '⚙️');
      addLog('info', '🔄 [MuleSoft Transformer] Applying DataWeave transformation...', '📝');

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFlowStatus((prev) => ({ ...prev, transform: 'success' }));
      addLog(
        'success',
        `✅ [MuleSoft Transformer] Transformation complete: ${response.fullName} → loyalty score: ${response.loyaltyScore}`,
        '✅'
      );

      // Step 3: Publish to Kafka (MuleSoft Kafka Publisher)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFlowStatus((prev) => ({ ...prev, publish: 'loading' }));
      addLog('info', '📤 [MuleSoft Flow - Step 3] Publishing to Kafka topic...', '📮');

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFlowStatus((prev) => ({ ...prev, publish: 'success' }));
      addLog('success', '✅ [MuleSoft Kafka Publisher] Message published to topic: customer-events', '✅');
      addLog('success', `✅ [MuleSoft Logger] Successfully processed customer: ${response.fullName}`, '📊');

      // Add to data table
      setCustomerData((prev) => [response, ...prev]);

      // Complete
      addLog('success', `🎉 [MuleSoft Flow END] Completed processing for customer ID: ${customerId}`, '🎉');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog('error', `❌ [MuleSoft Error Handler] Error in flow: ${errorMessage}`, '❌');
      setFlowStatus((prev) => ({
        ...prev,
        fetch: prev.fetch === 'loading' ? 'error' : prev.fetch,
        transform: prev.transform === 'loading' ? 'error' : prev.transform,
        publish: prev.publish === 'loading' ? 'error' : prev.publish,
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const resetFlow = () => {
    setFlowStatus({ fetch: 'idle', transform: 'idle', publish: 'idle' });
    setLogs([]);
    setCustomerData([]);
  };

  const activeStep =
    flowStatus.publish !== 'idle'
      ? 3
      : flowStatus.transform !== 'idle'
        ? 2
        : flowStatus.fetch !== 'idle'
          ? 1
          : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="border-b-2 border-white/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Integration Flow Visualizer
          </h1>
          <p className="mt-2 text-gray-600">
            MuleSoft to Spring Boot Migration Demo • Real-time Flow Monitoring
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-xl border-2 border-white bg-white/80 p-6 shadow-xl backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <label htmlFor="customerId" className="mb-2 block text-sm font-semibold text-gray-700">
                Customer ID
              </label>
              <input
                id="customerId"
                type="number"
                min="1"
                max="10"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                disabled={isRunning}
                className="w-full max-w-xs rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none disabled:opacity-50"
              />
            </div>
            <div className="flex gap-3 pt-6">
              <button
                onClick={runIntegrationFlow}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Running...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-5 w-5" />
                    Run Integration Flow
                  </>
                )}
              </button>
              <button
                onClick={resetFlow}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-all hover:bg-gray-50 disabled:opacity-50"
              >
                <RotateCw className="h-5 w-5" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-xl border-2 border-white bg-white/80 p-6 shadow-xl backdrop-blur-sm"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-800">Integration Flow Steps</h2>
          <FlowDiagram activeStep={activeStep} />
        </motion.div>

        {/* Flow Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <FlowCard
            title="Fetch Customer Data"
            description="HTTP call to external API (MuleSoft HTTP Connector)"
            icon={Database}
            status={flowStatus.fetch}
            delay={0.1}
          >
            <div className="text-xs text-gray-600">
              <p>• Endpoint: /api/customer/{'{id}'}</p>
              <p>• Retry: 3 attempts</p>
              <p>• Timeout: 10s</p>
            </div>
          </FlowCard>

          <FlowCard
            title="Transform Data"
            description="Apply business rules (MuleSoft DataWeave)"
            icon={Repeat}
            status={flowStatus.transform}
            delay={0.2}
          >
            <div className="text-xs text-gray-600">
              <p>• Calculate loyalty score</p>
              <p>• Normalize fields</p>
              <p>• Enrich data</p>
            </div>
          </FlowCard>

          <FlowCard
            title="Publish to Kafka"
            description="Send event to message broker (MuleSoft Kafka Publisher)"
            icon={Send}
            status={flowStatus.publish}
            delay={0.3}
          >
            <div className="text-xs text-gray-600">
              <p>• Topic: customer-events</p>
              <p>• Format: JSON</p>
              <p>• Async delivery</p>
            </div>
          </FlowCard>
        </div>

        {/* Logs and Data */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <LogConsole logs={logs} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="rounded-xl border-2 border-white bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Recent Data</h3>
              <DataTable data={customerData.slice(0, 3)} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t-2 border-white/50 bg-white/80 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          <p>Built with Spring Boot 3.3.5 • Next.js 14 • TypeScript • Tailwind CSS</p>
          <p className="mt-1">Demonstrating MuleSoft → Open Source Migration Patterns</p>
        </div>
      </footer>
    </div>
  );
}
