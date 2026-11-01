const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = {
  plugins: [react()],
  server: {
    host: true,
  },
};
