export function validateNonEmpty(value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  return !!value;
}

/* global Stripe */
// use global Stripe from Stripe.js for validation in browser
export const validateCardNumber = (number) => Stripe.card.validateCardNumber(number);
export const validateExpiry = (date) => Stripe.card.validateExpiry(date);
export const validateCVC = (cvc) => Stripe.card.validateCVC(cvc);
