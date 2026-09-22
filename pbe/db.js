const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.connect()
  .then(() => console.log('✅ Neon DB connected'))
  .catch(err => console.error('❌ DB error:', err.message));

pool.on('connect', (client) => {
  client.query('SET search_path TO public');
});

pool.on('error', (err) => {
  // Neon serverless drops idle connections — log and continue, don't crash
  console.error('⚠️  DB pool error (will reconnect):', err.message);
});

// List of non-fatal transient errors from Neon/pg — never crash on these
const TRANSIENT_ERRORS = [
  'Connection terminated',
  'Connection terminated unexpectedly',
  'connection terminated',
  'ECONNRESET',
  'read ECONNRESET',
  'write ECONNRESET',
  'socket hang up',
  'EPIPE',
  'write EPIPE',
  'unexpected',
];

const isTransient = (msg = '') =>
  TRANSIENT_ERRORS.some(e => msg.includes(e));

process.on('unhandledRejection', (reason) => {
  const msg = reason?.message || String(reason);
  if (!isTransient(msg)) {
    console.error('⚠️  Unhandled rejection:', reason);
  }
});

process.on('uncaughtException', (err) => {
  if (isTransient(err.message)) {
    console.warn('⚠️  Transient DB disconnect (server stays alive):', err.message);
    return; // don't crash
  }
  console.error('💥 Fatal uncaught exception:', err);
  process.exit(1);
});

module.exports = pool;
