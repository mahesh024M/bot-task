const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const client = new Client({
   // connectionString:"use your database connection string" connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
});

const app = express();

app.use(express.json());
app.use(cors());

// Connect to the database when the server starts
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    const data = result.rows;
    res.json({ data });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
