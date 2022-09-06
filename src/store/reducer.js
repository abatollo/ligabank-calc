import { ActionType } from './action';

import { calcValues } from '../const/calc-values';

const initialState = {
  isPopupOpened: false,
  currentSlide: 1,
  currentTab: `services-tab-deposits`,
  lendingType: `calc-lending-default`,
  mortgagePrice: calcValues.DEFAULT_MORTGAGE_PRICE,
  mortgageDownPayment: calcValues.DEFAULT_MORTGAGE_PRICE * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100,
  mortgageYears: calcValues.DEFAULT_MORTGAGE_YEARS,
  carPrice: calcValues.DEFAULT_CAR_PRICE,
  carDownPayment: calcValues.DEFAULT_CAR_PRICE * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100,
  carYears: calcValues.DEFAULT_CAR_YEARS,
  isMaternityCapitalApplied: true,
  isOptionalInsuranceApplied: false,
  isLifeInsuranceApplied: false,
  isCheckoutOpened: false,
  orderNumber: 0,
  isThanksOpened: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ON_IS_POPUP_OPENED_CHANGE:
      return {
        ...state,
        isPopupOpened: action.payload,
      }
    case ActionType.ON_CURRENT_SLIDE_SET:
      return {
        ...state,
        currentSlide: action.payload,
      }
    case ActionType.ON_CURRENT_TAB_SET:
      return {
        ...state,
        currentTab: action.payload,
      }
    case ActionType.ON_LENDING_TYPE_SET:
      return {
        ...state,
        lendingType: action.payload,
      }
    case ActionType.ON_MORTGAGE_SET:
      return {
        ...state,
        mortgagePrice: action.payload,
      }
    case ActionType.ON_MORTGAGE_DOWN_PAYMENT_SET:
      return {
        ...state,
        mortgageDownPayment: action.payload,
      }
    case ActionType.ON_MORTGAGE_YEARS_SET:
      return {
        ...state,
        mortgageYears: action.payload
      }
    case ActionType.ON_CAR_PRICE:
      return {
        ...state,
        carPrice: action.payload,
      }
    case ActionType.ON_CAR_DOWN_PAYMENT_SET:
      return {
        ...state,
        carDownPayment: action.payload,
      }
    case ActionType.ON_CAR_YEARS_SET:
      return {
        ...state,
        carYears: action.payload
      }
    case ActionType.ON_IS_MATERNITY_CAPITAL_APPLIED_CHANGE:
      return {
        ...state,
        isMaternityCapitalApplied: action.payload,
      }
    case ActionType.ON_IS_OPTIONAL_INSURANCE_APPLIED_CHANGE:
      return {
        ...state,
        isOptionalInsuranceApplied: action.payload,
      }
    case ActionType.ON_IS_LIFE_INSURANCE_APPLIED_CHANGE:
      return {
        ...state,
        isLifeInsuranceApplied: action.payload,
      }
    case ActionType.ON_IS_CHECKOUT_OPENED_CHANGE:
      return {
        ...state,
        isCheckoutOpened: action.payload,
      }
    case ActionType.ON_IS_ORDER_PLACED_CHANGE:
      return {
        ...state,
        orderNumber: action.payload,
      }
    case ActionType.ON_IS_THANKS_OPENED_CHANGE:
      return {
        ...state,
        isThanksOpened: action.payload,
      }
    default:
      return state;
  }
};

export { reducer };
