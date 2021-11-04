import dotenv from 'dotenv';

dotenv.config();

export default {
  secretKey: process.env.JWT_SECERT,
  options: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: '7d',
    issuer: 'const'
  },
  refreshOptions: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: '14d',
    issuer: 'const'
  }
};
