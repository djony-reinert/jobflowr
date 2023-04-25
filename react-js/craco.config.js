const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@reactjs": path.resolve(__dirname, "src"),
    },
  },
};