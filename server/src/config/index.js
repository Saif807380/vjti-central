const config = {
  port: process.env.PORT || 8000,
  privateKey: process.env.JWT_SECRET || "VJTI Central"
};

module.exports = config;
