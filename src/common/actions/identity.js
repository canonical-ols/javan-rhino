export const COMPLETE_LOGIN = 'COMPLETE_LOGIN';

export function authenticateUser(isAuthenticated, name, email) {
  return {
    type: COMPLETE_LOGIN,
    isAuthenticated,
    name,
    email
  };
}
