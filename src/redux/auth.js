const COMPLETE_LOGIN = 'auth/COMPLETE_LOGIN';

const initialState = {
  loggedIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case COMPLETE_LOGIN:
      return {
        ...state,
        loggedIn: true
      };
    default:
      return { ...state };
  }
}

export function login() {
  // TODO: Auth implementation
  return {
    type: COMPLETE_LOGIN
  };
}
