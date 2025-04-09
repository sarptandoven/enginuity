declare namespace NodeJS {
  interface ProcessEnv {
    // Add your environment variables here
  }
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
} 