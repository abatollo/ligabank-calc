import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

import { calcValues } from '../../const/calc-values';
import { formatPrice } from '../../utils/format';

const Price = ({
  lendingType,
  mortgagePrice,
  carPrice,
  onMortgagePriceSet,
  onMortgageDownPaymentSet,
  onCarPriceSet,
  onCarDownPaymentSet
}) => {
  const [isMortgagePriceFocused, setIsMortgagePriceFocused] = useState(false);
  const [isCarPriceFocused, setIsCarPriceFocused] = useState(false);

  const getOverallPriceLabel = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? `недвижимости` : `автомобиля`;
  };

  const getIsDecrementDisabled = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgagePrice <= calcValues.MINIMUM_MORTGAGE_PRICE : carPrice <= calcValues.MINIMUM_CAR_PRICE;
  };

  const getIsIncrementDisabled = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgagePrice >= calcValues.MAXIMUM_MORTGAGE_PRICE : carPrice >= calcValues.MAXIMUM_CAR_PRICE;
  };

  const handleCalcOverallPriceDecrementClick = () => {
    if (lendingType === `calc-lending-mortgage`) {
      onMortgagePriceSet(mortgagePrice - calcValues.DEFAULT_MORTGAGE_PRICE_STEP);
      onMortgageDownPaymentSet((mortgagePrice - calcValues.DEFAULT_MORTGAGE_PRICE_STEP) * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
    } else {
      onCarPriceSet(carPrice - calcValues.DEFAULT_CAR_PRICE_STEP);
      onCarDownPaymentSet((carPrice - calcValues.DEFAULT_CAR_PRICE_STEP) * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
    }
  };

  const getFormattedCalcOverallPrice = (lendingType) => {
    let formattedOverallPrice = 0;
    if (lendingType === `calc-lending-mortgage`) {
      formattedOverallPrice = isMortgagePriceFocused ? mortgagePrice : `${formatPrice(mortgagePrice)} рублей`;
    } else {
      formattedOverallPrice = isCarPriceFocused ? carPrice : `${formatPrice(carPrice)} рублей`;
    }
    return formattedOverallPrice;
  };

  const handleCalcOverallPriceChange = (evt) => {
    if (lendingType === `calc-lending-mortgage`) {
      onMortgagePriceSet(Number(evt.target.value));
      onMortgageDownPaymentSet(Number(evt.target.value) * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
    } else {
      onCarPriceSet(Number(evt.target.value));
      onCarDownPaymentSet(Number(evt.target.value) * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
    }
  };

  const handleCalcOverallPriceFocus = () => {
    lendingType === `calc-lending-mortgage` ? setIsMortgagePriceFocused((prevState) => !prevState) : setIsCarPriceFocused((prevState) => !prevState);
  };

  const handleCalcOverallPriceBlur = () => {
    if (lendingType === `calc-lending-mortgage`) {
      setIsMortgagePriceFocused((prevState) => !prevState);
      if (mortgagePrice < calcValues.MINIMUM_MORTGAGE_PRICE) {
        onMortgagePriceSet(calcValues.MINIMUM_MORTGAGE_PRICE);
        onMortgageDownPaymentSet(calcValues.MINIMUM_MORTGAGE_PRICE * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
      } 
      if (mortgagePrice > calcValues.MAXIMUM_MORTGAGE_PRICE) {
        onMortgagePriceSet(calcValues.MAXIMUM_MORTGAGE_PRICE);
        onMortgageDownPaymentSet(calcValues.MAXIMUM_MORTGAGE_PRICE * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
      } 
    } else {
      setIsCarPriceFocused((prevState) => !prevState);
      if (carPrice < calcValues.MINIMUM_CAR_PRICE) {
        onCarPriceSet(calcValues.MINIMUM_CAR_PRICE);
        onCarDownPaymentSet(calcValues.MINIMUM_CAR_PRICE * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
      } 
      if (carPrice > calcValues.MAXIMUM_CAR_PRICE) {
        onCarPriceSet(calcValues.MAXIMUM_CAR_PRICE);
        onCarDownPaymentSet(calcValues.MAXIMUM_CAR_PRICE * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
      } 
    }
  };

  const handleCalcOverallPriceIncrementClick = () => {
    if (lendingType === `calc-lending-mortgage`) {
      onMortgagePriceSet(mortgagePrice + calcValues.DEFAULT_MORTGAGE_PRICE_STEP);
      onMortgageDownPaymentSet((mortgagePrice + calcValues.DEFAULT_MORTGAGE_PRICE_STEP) * calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
    } else {
      onCarPriceSet(carPrice + calcValues.DEFAULT_CAR_PRICE_STEP);
      onCarDownPaymentSet((carPrice + calcValues.DEFAULT_CAR_PRICE_STEP) * calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
    }
  };

  const getOverallPriceHintFrom = (lendingType) => {
    return formatPrice(lendingType === `calc-lending-mortgage` ? calcValues.MINIMUM_MORTGAGE_PRICE : calcValues.MINIMUM_CAR_PRICE);
  };

  const getOverallPriceHintTo = (lendingType) => {
    return formatPrice(lendingType === `calc-lending-mortgage` ? calcValues.MAXIMUM_MORTGAGE_PRICE : calcValues.MAXIMUM_CAR_PRICE);
  };

  return (
    <>
      <label className="calc__label" htmlFor="calc-overall-price">
        Стоимость {getOverallPriceLabel(lendingType)}
      </label>
      <div className="calc__input-wrapper">
        <input className="calc__decrement" type="button" onClick={handleCalcOverallPriceDecrementClick} disabled={getIsDecrementDisabled(lendingType)} />
        <input 
          className="calc__input" 
          type="text" 
          id="calc-overall-price" 
          name="calc-overall-price" 
          value={getFormattedCalcOverallPrice(lendingType)} 
          onChange={handleCalcOverallPriceChange} 
          onFocus={handleCalcOverallPriceFocus} 
          onBlur={handleCalcOverallPriceBlur} 
        />
        <input className="calc__increment" type="button" onClick={handleCalcOverallPriceIncrementClick} disabled={getIsIncrementDisabled(lendingType)} />
      </div>
      <p className="calc__hint">
        От {getOverallPriceHintFrom(lendingType)} до {getOverallPriceHintTo(lendingType)} рублей
      </p>
    </>
  );
};

Price.propTypes = {
  lendingType: PropTypes.string.isRequired,
  mortgagePrice: PropTypes.number.isRequired,
  carPrice: PropTypes.number.isRequired,
  onMortgagePriceSet: PropTypes.func.isRequired,
  onCarPriceSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    mortgagePrice: state.mortgagePrice,
    carPrice: state.carPrice
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMortgagePriceSet(newState) {
    dispatch(ActionCreator.onMortgagePriceSet(newState));
  },
  onMortgageDownPaymentSet(newState) {
    dispatch(ActionCreator.onMortgageDownPaymentSet(newState));
  },
  onCarPriceSet(newState) {
    dispatch(ActionCreator.onCarPriceSet(newState));
  },
  onCarDownPaymentSet(newState) {
    dispatch(ActionCreator.onCarDownPaymentSet(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Price);
