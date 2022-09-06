import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Range } from 'react-range';

import { ActionCreator } from '../../store/action';

import { calcValues } from '../../const/calc-values';
import { formatPrice } from '../../utils/format';

const DownPayment = ({
  lendingType,
  mortgageDownPayment,
  carDownPayment,
  mortgagePrice,
  carPrice,
  onMortgageDownPaymentSet,
  onCarDownPaymentSet
}) => {
  const [isMortgageDownPaymentFocused, setIsMortgageDownPaymentFocused] = useState(false);
  const [isCarDownPaymentFocused, setIsCarDownPaymentFocused] = useState(false);

  const getFormattedCalcDownPayment = (lendingType) => {
    let formattedDownPayment = 0;
    if (lendingType === `calc-lending-mortgage`) {
      formattedDownPayment = isMortgageDownPaymentFocused ? mortgageDownPayment : `${formatPrice(mortgageDownPayment)} рублей`;
    } else {
      formattedDownPayment = isCarDownPaymentFocused ? carDownPayment : `${formatPrice(carDownPayment)} рублей`;
    }
    return formattedDownPayment;
  };

  const handleCalcDownPaymentChange = (evt) => {
    lendingType === `calc-lending-mortgage` ? onMortgageDownPaymentSet(Number(evt.target.value)) : onCarDownPaymentSet(Number(evt.target.value));
  };

  const handleCalcDownPaymentFocus = () => {
    lendingType === `calc-lending-mortgage` ? setIsMortgageDownPaymentFocused((prevState) => !prevState) : setIsCarDownPaymentFocused((prevState) => !prevState);
  };

  const handleCalcDownPaymentBlur = () => {
    if (lendingType === `calc-lending-mortgage`) {
      setIsMortgageDownPaymentFocused((prevState) => !prevState);
      if (mortgageDownPayment < mortgagePrice * calcValues.MINIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100) {
        onMortgageDownPaymentSet(mortgagePrice * calcValues.MINIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
      }
      if (mortgageDownPayment > mortgagePrice * calcValues.MAXIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100) {
        onMortgageDownPaymentSet(mortgagePrice * calcValues.MAXIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE / 100);
      }
    } else {
      setIsCarDownPaymentFocused((prevState) => !prevState);
      if (carDownPayment < carPrice * calcValues.MINIMUM_CAR_DOWN_PAYMENT_PERCENTAGE / 100) {
        onMortgageDownPaymentSet(carPrice * calcValues.MINIMUM_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
      }
      if (carDownPayment > carPrice * calcValues.MAXIMUM_CAR_DOWN_PAYMENT_PERCENTAGE / 100) {
        onMortgageDownPaymentSet(carPrice * calcValues.MAXIMUM_CAR_DOWN_PAYMENT_PERCENTAGE / 100);
      }
    }
  };

  const getCalcDownPaymentRangeValue = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgageDownPayment / (mortgagePrice / 100) : carDownPayment / (carPrice / 100);
  };

  const getMinimumDownPayment = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.MINIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE : calcValues.MINIMUM_CAR_DOWN_PAYMENT_PERCENTAGE;
  };

  const getMaximumDownPayment = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.MAXIMUM_MORTGAGE_DOWN_PAYMENT_PERCENTAGE : calcValues.MAXIMUM_CAR_DOWN_PAYMENT_PERCENTAGE;
  };

  const getDownPaymentStep = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.DEFAULT_MORTGAGE_DOWN_PAYMENT_PERCENTAGE_STEP : calcValues.DEFAULT_CAR_DOWN_PAYMENT_PERCENTAGE_STEP;
  };

  const handleLendingYearsRangeChange = (value) => {
    lendingType === `calc-lending-mortgage` ?  onMortgageDownPaymentSet(value / 100 * mortgagePrice) : onCarDownPaymentSet(value / 100 * carPrice);
  };

  return (
    <>
      <label className="calc__label" htmlFor="calc-down-payment">
        Первоначальный взнос
      </label>
      <input 
        className="calc__input" 
        type="text" 
        id="calc-down-payment" 
        name="calc-down-payment" 
        value={getFormattedCalcDownPayment(lendingType)} 
        onChange={handleCalcDownPaymentChange} 
        onFocus={handleCalcDownPaymentFocus}
        onBlur={handleCalcDownPaymentBlur}
      />
      <Range
        step={getDownPaymentStep(lendingType)}
        min={getMinimumDownPayment(lendingType)}
        max={getMaximumDownPayment(lendingType)}
        values={[getCalcDownPaymentRangeValue(lendingType)]}
        onChange={(values) => {
          handleLendingYearsRangeChange(values[0]);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="calc__range-track"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="calc__range-thumb"
          />
        )}
      />
      <p className="calc__hint">
       {getMinimumDownPayment(lendingType)}%
      </p>
    </>
  );
};

DownPayment.propTypes = {
  lendingType: PropTypes.string.isRequired,
  mortgageDownPayment: PropTypes.number.isRequired,
  carDownPayment: PropTypes.number.isRequired,
  mortgagePrice: PropTypes.number.isRequired,
  carPrice: PropTypes.number.isRequired,
  onMortgageDownPaymentSet: PropTypes.func.isRequired,
  onCarDownPaymentSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    mortgageDownPayment: state.mortgageDownPayment,
    carDownPayment: state.carDownPayment,
    mortgagePrice: state.mortgagePrice,
    carPrice: state.carPrice
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMortgageDownPaymentSet(newState) {
    dispatch(ActionCreator.onMortgageDownPaymentSet(newState));
  },
  onCarDownPaymentSet(newState) {
    dispatch(ActionCreator.onCarDownPaymentSet(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownPayment);
