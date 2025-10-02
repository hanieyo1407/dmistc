import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        host: '0.0.0.0', // Allow external connections
        port: 5173, // Default Vite port (adjust if needed)
        hmr: {
          host: 'localhost'
        },
        allowedHosts: ['beac9d274f4f.ngrok-free.app'],
        cors: {
          origin: ['https://beac9d274f4f.ngrok-free.app'],
          credentials: true
        }
      }
    };
});
