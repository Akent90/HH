require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product');
const client = require('../config/elasticsearch');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const indexProducts = async () => {
  const products = await Product.find();
  const body = products.flatMap(doc => [{ index: { _index: 'products', _id: doc._id } }, doc]);

  await client.bulk({ refresh: true, body });
  console.log('Products indexed');
};

indexProducts().catch(console.log).finally(() => mongoose.connection.close());
