const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const getEnvVars = () => {
  if (typeof window === 'undefined') {
    return {
      SUPABASE_URL: '',
      SUPABASE_ANON_KEY: ''
    };
  }

  return {
    SUPABASE_URL: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    SUPABASE_ANON_KEY: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  };
}; 