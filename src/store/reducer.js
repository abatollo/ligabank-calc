import { ActionType } from './action';

const initialState = {
  isPopupOpened: false,
  currentSlide: 1,
  currentTab: `services-tab-deposits`
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
    default:
      return state;
  }
};

export { reducer };
