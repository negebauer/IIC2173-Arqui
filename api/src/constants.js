module.exports = {
  API_MAILER_SECRET: process.env.API_MAILER_SECRET || 'apimailersecret',
  API_QUEUE_SECRET: process.env.API_QUEUE_SECRET || 'apiqueuesecret',
  MAILER_URI: process.env.MAILER_URI || 'http://localhost:3001',
  QUEUE_URI: process.env.QUEUE_URI || 'http://localhost:3002',
  ARQUITRAN_URI: process.env.ARQUITRAN_URI || 'http://arqss17.ing.puc.cl:3000',
  MAX_REQUEST_ATTEMPTS: process.env.MAX_REQUEST_ATTEMPTS || 2,
  MAX_REQUEST_TIMEOUT: process.env.MAX_REQUEST_TIMEOUT || 200,
  SETTING_CACHE_TIMEOUT: process.env.SETTING_CACHE_TIMEOUT || 30 * 1000,
}
