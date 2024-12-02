import { loadEnv, defineConfig } from "vite";
import { ngrok } from "vite-plugin-ngrok";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      ngrok({
        domain: env.VITE_NGROK_DOMAIN,
        compression: true,
        authtoken: env.VITE_NGROK_AUTH_TOKEN,
      }),
    ],
    define: {
      "process.env": env || {}, // fallback to empty object
      global: {},
    },
    server: {
      // Optional port configuration
      // port: env.VITE_PORT ? Number(env.VITE_PORT) : 3000,
    },
  };
});
