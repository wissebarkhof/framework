var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/framework';

module.exports = connectionString;