export function validateNonEmpty(value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  return !!value;
}
