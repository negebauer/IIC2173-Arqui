const ARQUITRAN_TOKEN_DEFAULT = 'd51f6a66-e670-41c4-8187-2149bc46654e'

module.exports = {
  API_URI: process.env.API_URI || 'http://localhost:3000',
  API_QUEUE_SECRET: process.env.API_QUEUE_SECRET || 'apiqueuesecret',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PASS: process.env.REDIS_PASS || '',
  ARQUITRAN_URI: process.env.ARQUITRAN_URI || 'http://arqss16.ing.puc.cl',
  ARQUITRAN_TOKEN: process.env.ARQUITRAN_TOKEN || ARQUITRAN_TOKEN_DEFAULT,
  ARQUITRAN_ID: process.env.ARQUITRAN_ID || 'G1',

  RETRY_DELAY: 1000 * 60 * 30, // 1/2 hour

  QUEUE_EVENTS: {
    COMPLETE: 'complete',
    FAILED_ATTEMPT: 'failed attempt',
    FAILED: 'failed',
  },

  QUEUE_TASKS: {
    PURCHASE: 'purchase',
  },
}
