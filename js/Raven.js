/**
 * Error tracking enabled with Sentry
 *
 */
const sentry_key = 'd86963bdc35f4b5c83cc38844fe43c06';
const sentry_app = '236902';
const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

Raven.config(sentry_url, {
  logger: 'javascript',
  environment: 'production'
}).install();
