import * as ActionTypes from '../actions/stripe';

export function stripe(state = {
  isFetching: false,
  error: null,
  token: null,
  formCardData: null,
  validatedCardData: null
}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_STRIPE_TOKEN:
      return {
        ...state,
        isFetching: true,
        formCardData: action.formCardData
      };
    case ActionTypes.SAVE_VALIDATED_CARD_DATA:
      return {
        ...state,
        validatedCardData: action.validatedCardData
      };
    case ActionTypes.CREATE_STRIPE_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.token
      };
    case ActionTypes.CREATE_STRIPE_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
