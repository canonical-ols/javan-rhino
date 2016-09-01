const INITIATE_LOGIN = 'auth/INITIATE_LOGIN';
const COMPLETE_LOGIN = 'auth/COMPLETE_LOGIN';
const FAIL_LOGIN = 'auth/FAIL_LOGIN';

const initialState = {
  loggedIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case INITIATE_LOGIN:
      return state;
    case COMPLETE_LOGIN:
      return {
        ...state,
        loggedIn: true
      };
    case FAIL_LOGIN:
      return state;
    default:
      return state;
  }
}

export function login() {
  // TODO: Auth implementation
  return {
    type: COMPLETE_LOGIN
  };
}
