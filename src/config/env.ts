// Environment variable configuration
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const getEnvVars = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return {
      // Add any server-side environment variables here
    };
  }

  // Client-side
  return {
    // Add any client-side environment variables here
  };
}; 