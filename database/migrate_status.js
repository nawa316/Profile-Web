const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
let dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

if (dbUrl) {
  // Unescape escaped dollar signs
  dbUrl = dbUrl.replace(/\\(\$)/g, '$1');
}

async function migrate() {
  if (!dbUrl) {
    console.error('DATABASE_URL not found in .env');
    return;
  }
  
  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database.');
    
    const alterQuery = `
      ALTER TABLE blogs 
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published' 
      CHECK (status IN ('draft', 'published'));
    `;
    
    console.log('Executing status column migration...');
    await client.query(alterQuery);
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
