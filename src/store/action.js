const ActionType = {
  ON_IS_POPUP_OPENED_CHANGE: `ON_IS_POPUP_OPENED_CHANGE`,
  ON_CURRENT_SLIDE_SET: `ON_CURRENT_SLIDE_SET`,
  ON_CURRENT_TAB_SET: `ON_CURRENT_TAB_SET`,
  ON_LENDING_TYPE_SET: `ON_LENDING_TYPE_SET`,
  ON_MORTGAGE_SET: `ON_MORTGAGE_SET`,
  ON_MORTGAGE_DOWN_PAYMENT_SET: `ON_MORTGAGE_DOWN_PAYMENT_SET`,
  ON_MORTGAGE_YEARS_SET: `ON_MORTGAGE_YEARS_SET`,
  ON_CAR_PRICE: `ON_CAR_PRICE`,
  ON_CAR_DOWN_PAYMENT_SET: `ON_CAR_DOWN_PAYMENT_SET`,
  ON_CAR_YEARS_SET: `ON_CAR_YEARS_SET`,
  ON_IS_MATERNITY_CAPITAL_APPLIED_CHANGE: `ON_IS_MATERNITY_CAPITAL_APPLIED_CHANGE`,
  ON_IS_OPTIONAL_INSURANCE_APPLIED_CHANGE: `ON_IS_OPTIONAL_INSURANCE_APPLIED_CHANGE`,
  ON_IS_LIFE_INSURANCE_APPLIED_CHANGE: `ON_IS_LIFE_INSURANCE_APPLIED_CHANGE`,
  ON_IS_CHECKOUT_OPENED_CHANGE: `ON_IS_CHECKOUT_OPENED_CHANGE`,
  ON_IS_ORDER_PLACED_CHANGE: `ON_IS_ORDER_PLACED_CHANGE`,
  ON_IS_THANKS_OPENED_CHANGE: `ON_IS_THANKS_OPENED_CHANGE`
};

const ActionCreator = {
  onIsPopupOpenedChange: (payload) => ({
    type: ActionType.ON_IS_POPUP_OPENED_CHANGE,
    payload
  }),
  onCurrentSlideSet: (payload) => ({
    type: ActionType.ON_CURRENT_SLIDE_SET,
    payload
  }),
  onCurrentTabSet: (payload) => ({
    type: ActionType.ON_CURRENT_TAB_SET,
    payload
  }),
  onLendingTypeSet: (payload) => ({
    type: ActionType.ON_LENDING_TYPE_SET,
    payload
  }),
  onMortgagePriceSet: (payload) => ({
    type: ActionType.ON_MORTGAGE_SET,
    payload
  }),
  onMortgageDownPaymentSet: (payload) => ({
    type: ActionType.ON_MORTGAGE_DOWN_PAYMENT_SET,
    payload
  }),
  onMortgageYearsSet: (payload) => ({
    type: ActionType.ON_MORTGAGE_YEARS_SET,
    payload
  }),
  onCarPriceSet: (payload) => ({
    type: ActionType.ON_CAR_PRICE,
    payload
  }),
  onCarDownPaymentSet: (payload) => ({
    type: ActionType.ON_CAR_DOWN_PAYMENT_SET,
    payload
  }),
  onCarYearsSet: (payload) => ({
    type: ActionType.ON_CAR_YEARS_SET,
    payload
  }),
  onIsMaternityCapitalAppliedChange: (payload) => ({
    type: ActionType.ON_IS_MATERNITY_CAPITAL_APPLIED_CHANGE,
    payload
  }),
  onIsOptionalInsuranceAppliedChange: (payload) => ({
    type: ActionType.ON_IS_OPTIONAL_INSURANCE_APPLIED_CHANGE,
    payload
  }),
  onIsLifeInsuranceAppliedChange: (payload) => ({
    type: ActionType.ON_IS_LIFE_INSURANCE_APPLIED_CHANGE,
    payload
  }),
  onIsCheckoutOpenedChange: (payload) => ({
    type: ActionType.ON_IS_CHECKOUT_OPENED_CHANGE,
    payload
  }),
  onIsOrderPlacedChange: (payload) => ({
    type: ActionType.ON_IS_ORDER_PLACED_CHANGE,
    payload
  }),
  onIsThanksOpenedChange: (payload) => ({
    type: ActionType.ON_IS_THANKS_OPENED_CHANGE,
    payload
  })
};

export { ActionType, ActionCreator };
