import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';

  return {
    base: isGitHubPagesBuild ? '/brighter-smiles/' : '/',
    plugins: [react()]
  };
});
