/** General-purpose, side-effect-free helpers. */

function generateUUID() {
  return Utilities.getUuid();
}

function generateTrackingCode() {
  return 'LP-' + generateUUID().replace(/-/g, '').slice(0, 10).toUpperCase();
}

function generateSlug(value) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

function now() {
  return new Date();
}

function today() {
  return Utilities.formatDate(now(), CMS_CONFIG.timezone, 'yyyy-MM-dd');
}

function toISO(value) {
  return Utilities.formatDate(new Date(value), CMS_CONFIG.timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function sanitizeText(value) {
  return String(value === null || value === undefined ? '' : value).replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
}

function normalizePhone(value) {
  const digits = String(value === null || value === undefined ? '' : value).replace(/\D/g, '');
  if (digits.indexOf('62') === 0) return digits;
  if (digits.indexOf('0') === 0) return '62' + digits.slice(1);
  return digits;
}
