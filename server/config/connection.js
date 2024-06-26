const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || 'development';
    let mongoURI;

    switch (env) {
      case 'development':
        mongoURI = process.env.MONGO_URI_DEV;
        break;
      case 'testing':
        mongoURI = process.env.MONGO_URI_TEST;
        break;
      case 'production':
        mongoURI = process.env.MONGO_URI_PROD;
        break;
      default:
        throw new Error('Unknown environment: ' + env);
    }

    if (!mongoURI) {
      throw new Error('Mongo URI is not defined');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host} (${env})`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

