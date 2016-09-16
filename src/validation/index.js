export function validateNonEmpty(value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  return !!value;
}

// use global Stripe from Stripe.js if available in the browser
// or mock it empty if
const Stripe = (typeof window !== 'undefined' && window.Stripe) ? window.Stripe : {
  card: {
    validateCardNumber: () => true,
    validateExpiry: () => true,
    validateCVC: () => true
  }
};

export const validateCardNumber = Stripe.card.validateCardNumber;
export const validateExpiry = Stripe.card.validateExpiry;
export const validateCVC = Stripe.card.validateCVC;
