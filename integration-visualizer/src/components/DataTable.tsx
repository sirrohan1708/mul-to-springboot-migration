'use client';

// DataTable - Display published customer data
// Maps to: Data visualization and reporting

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building2, Award } from 'lucide-react';
import { CustomerResponse } from '@/lib/api';

interface DataTableProps {
  data: CustomerResponse[];
  loading?: boolean;
}

const loyaltyColors = {
  Bronze: 'bg-orange-100 text-orange-700 border-orange-300',
  Silver: 'bg-gray-100 text-gray-700 border-gray-300',
  Gold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  Platinum: 'bg-purple-100 text-purple-700 border-purple-300',
};

export default function DataTable({ data, loading }: DataTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <span className="ml-3 text-gray-600">Loading data...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center text-gray-500">
          <User className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p>No customer data yet.</p>
          <p className="mt-1 text-sm">
            Run an integration flow to see published data here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-800">
          Published Customer Data
        </h3>
        <p className="text-sm text-gray-600">
          {data.length} record{data.length !== 1 ? 's' : ''} processed
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Loyalty
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((customer, index) => (
              <motion.tr
                key={customer.customerId + '-' + customer.timestamp}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition-colors hover:bg-gray-50"
              >
                {/* ID */}
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    #{customer.customerId}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.fullName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{customer.emailAddress}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{customer.phoneNumber}</span>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{customer.city}</span>
                  </div>
                </td>

                {/* Company */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Building2 className="h-3 w-3" />
                    <span>{customer.companyName}</span>
                  </div>
                </td>

                {/* Loyalty */}
                <td className="px-6 py-4">
                  <span
                    className={`
                      inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold
                      ${loyaltyColors[customer.loyaltyScore as keyof typeof loyaltyColors] || 'bg-gray-100 text-gray-700 border-gray-300'}
                    `}
                  >
                    <Award className="h-3 w-3" />
                    {customer.loyaltyScore}
                  </span>
                </td>

                {/* Timestamp */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(customer.timestamp).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
