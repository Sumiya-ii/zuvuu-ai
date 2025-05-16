export default ({ config }) => ({
  ...config,
  extra: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    LAUNCHDARKLY_CLIENT_ID: process.env.LAUNCHDARKLY_CLIENT_ID,
    // Add more environment variables as needed
  },
}); 