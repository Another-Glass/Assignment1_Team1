import mongoose from 'mongoose';
import * as configs from '../configs';
import logger from '../utils/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(configs.db.dbURL, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });

    logger.log("Mongoose Connected ...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

export default connectDB;