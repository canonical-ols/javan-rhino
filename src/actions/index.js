export const COMPLETE_LOGIN = 'COMPLETE_LOGIN';

// FIXME do we need this?
export function authenticateUser(isAuthenticated, isDev, name) {
  return {
    type: COMPLETE_LOGIN,
    isAuthenticated,
    isDev,
    name
  };
}
