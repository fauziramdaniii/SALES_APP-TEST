const express = require('express');
const db = require('./models'); // Mengimpor file index.js di folder models
const productTypeRoutes = require('./routes/productTypeRoutes');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const detailTransactionRoutes = require('./routes/detailTransactionRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', productTypeRoutes);
app.use('/api', productRoutes);
app.use('/api', transactionRoutes);
app.use('/api', detailTransactionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Menghubungkan ke database
db.sequelize.sync().then(() => {
  console.log('Database connected!');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
