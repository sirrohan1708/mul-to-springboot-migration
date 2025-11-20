// API client for Spring Boot backend integration
// Maps to MuleSoft HTTP Connector concept

import axios from 'axios';

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Create axios instance with defaults
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types matching Spring Boot backend models
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CustomerResponse {
  customerId: number;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  city: string;
  companyName: string;
  loyaltyScore: string; // Bronze, Silver, Gold, Platinum
  website: string;
  timestamp: string;
}

export interface HealthStatus {
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  components?: {
    [key: string]: {
      status: 'UP' | 'DOWN';
      details?: any;
    };
  };
}

export interface AppInfo {
  app?: {
    name?: string;
    description?: string;
    version?: string;
  };
}

// Enhanced mock data with 10 different customers
const mockCustomers: CustomerResponse[] = [
  {
    customerId: 1,
    fullName: 'Alice Johnson',
    emailAddress: 'alice.johnson@techcorp.com',
    phoneNumber: '1-555-0101',
    city: 'New York',
    companyName: 'TechCorp Industries',
    loyaltyScore: 'Platinum',
    website: 'https://techcorp.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 2,
    fullName: 'Bob Smith',
    emailAddress: 'bob.smith@globaltech.com',
    phoneNumber: '1-555-0202',
    city: 'San Francisco',
    companyName: 'GlobalTech Solutions',
    loyaltyScore: 'Gold',
    website: 'https://globaltech.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 3,
    fullName: 'Carol Williams',
    emailAddress: 'carol.w@innovate.com',
    phoneNumber: '1-555-0303',
    city: 'Austin',
    companyName: 'Innovate Labs',
    loyaltyScore: 'Silver',
    website: 'https://innovatelabs.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 4,
    fullName: 'David Brown',
    emailAddress: 'david.brown@cloudnet.com',
    phoneNumber: '1-555-0404',
    city: 'Seattle',
    companyName: 'CloudNet Services',
    loyaltyScore: 'Bronze',
    website: 'https://cloudnet.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 5,
    fullName: 'Emily Davis',
    emailAddress: 'emily.davis@dataflow.com',
    phoneNumber: '1-555-0505',
    city: 'Boston',
    companyName: 'DataFlow Analytics',
    loyaltyScore: 'Platinum',
    website: 'https://dataflow.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 6,
    fullName: 'Frank Miller',
    emailAddress: 'frank.m@synergy.com',
    phoneNumber: '1-555-0606',
    city: 'Chicago',
    companyName: 'Synergy Partners',
    loyaltyScore: 'Gold',
    website: 'https://synergy.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 7,
    fullName: 'Grace Wilson',
    emailAddress: 'grace.wilson@nexgen.com',
    phoneNumber: '1-555-0707',
    city: 'Denver',
    companyName: 'NexGen Technologies',
    loyaltyScore: 'Silver',
    website: 'https://nexgen.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 8,
    fullName: 'Henry Moore',
    emailAddress: 'henry.moore@quantum.com',
    phoneNumber: '1-555-0808',
    city: 'Portland',
    companyName: 'Quantum Systems',
    loyaltyScore: 'Bronze',
    website: 'https://quantum.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 9,
    fullName: 'Iris Taylor',
    emailAddress: 'iris.taylor@vertex.com',
    phoneNumber: '1-555-0909',
    city: 'Miami',
    companyName: 'Vertex Innovations',
    loyaltyScore: 'Platinum',
    website: 'https://vertex.example.com',
    timestamp: new Date().toISOString(),
  },
  {
    customerId: 10,
    fullName: 'Jack Anderson',
    emailAddress: 'jack.a@fusion.com',
    phoneNumber: '1-555-1010',
    city: 'Dallas',
    companyName: 'Fusion Enterprises',
    loyaltyScore: 'Gold',
    website: 'https://fusion.example.com',
    timestamp: new Date().toISOString(),
  },
];

// API Functions

/**
 * Fetch customer data and trigger integration flow
 * Maps to: MuleSoft Flow execution
 */
export const fetchCustomer = async (id: number): Promise<CustomerResponse> => {
  try {
    const response = await api.get<CustomerResponse>(`/api/customer/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log backend error details for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.debug('Backend API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          message: error.response?.data?.message || error.message,
        });
      }
      // Throw a clean error for the fallback handler
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          `Backend returned ${error.response?.status || 'error'}`;
      throw new Error(errorMessage);
    }
    throw error;
  }
};

/**
 * Get application health status
 * Maps to: MuleSoft API monitoring
 */
export const getHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await api.get<HealthStatus>('/actuator/health');
    return response.data;
  } catch (error) {
    return {
      status: 'DOWN',
      components: {
        springBoot: {
          status: 'DOWN',
          details: { error: 'Unable to connect to Spring Boot backend' },
        },
      },
    };
  }
};

/**
 * Get application info
 * Maps to: MuleSoft API metadata
 */
export const getInfo = async (): Promise<AppInfo> => {
  try {
    const response = await api.get<AppInfo>('/actuator/info');
    return response.data;
  } catch (error) {
    return {
      app: {
        name: 'Integration Service',
        description: 'MuleSoft to Spring Boot Migration Demo',
        version: '1.0.0',
      },
    };
  }
};

/**
 * Get mock customer by ID
 * Returns varied data for each ID (1-10)
 */
const getMockCustomer = (id: number): CustomerResponse => {
  // If ID is within range, return specific customer
  if (id >= 1 && id <= 10) {
    const customer = mockCustomers[id - 1];
    return {
      ...customer,
      timestamp: new Date().toISOString(), // Always use current timestamp
    };
  }
  
  // For IDs outside range, generate dynamic data
  return {
    customerId: id,
    fullName: `Customer ${id}`,
    emailAddress: `customer${id}@example.com`,
    phoneNumber: `1-555-${String(id).padStart(4, '0')}`,
    city: ['New York', 'San Francisco', 'Austin', 'Seattle', 'Boston'][id % 5],
    companyName: `Company ${id} Inc`,
    loyaltyScore: ['Bronze', 'Silver', 'Gold', 'Platinum'][id % 4],
    website: `https://company${id}.example.com`,
    timestamp: new Date().toISOString(),
  };
};

// Legacy mock data (kept for backward compatibility)
export const mockCustomerResponse: CustomerResponse = mockCustomers[0];

export const mockHealthStatus: HealthStatus = {
  status: 'UP',
  components: {
    diskSpace: {
      status: 'UP',
      details: { total: 509722439680, free: 355080851456, threshold: 10485760 },
    },
    ping: {
      status: 'UP',
    },
  },
};

/**
 * Fetch customer with intelligent mock fallback
 * Returns different customer data for each ID
 * Useful for demos when backend is unavailable
 */
export const fetchCustomerWithFallback = async (id: number): Promise<CustomerResponse> => {
  try {
    console.log(`🌐 Attempting to fetch customer ${id} from Spring Boot backend...`);
    const result = await fetchCustomer(id);
    console.log(`✅ Successfully fetched customer ${id} from backend:`, result.fullName);
    return result;
  } catch (error) {
    // Clean warning message for fallback behavior
    console.info(`ℹ️ Using mock data for customer ${id} (backend unavailable)`);
    
    // Only show detailed error in development mode
    if (process.env.NODE_ENV === 'development') {
      console.debug('Fallback reason:', error instanceof Error ? error.message : 'Unknown error');
    }
    
    // Add realistic delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData = getMockCustomer(id);
    console.log(`📦 Mock data loaded:`, {
      id: mockData.customerId,
      name: mockData.fullName,
      company: mockData.companyName,
      tier: mockData.loyaltyScore
    });
    return mockData;
  }
};

/**
 * Batch fetch multiple customers (useful for data table)
 */
export const fetchMultipleCustomers = async (ids: number[]): Promise<CustomerResponse[]> => {
  const promises = ids.map(id => fetchCustomerWithFallback(id));
  return Promise.all(promises);
};