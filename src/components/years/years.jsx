import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Range } from 'react-range';

import { ActionCreator } from '../../store/action';

import { calcValues } from '../../const/calc-values';

const Years = ({
  lendingType,
  mortgageYears,
  carYears,
  onMortgageYearsSet,
  onCarYearsSet
}) => {
  const [isMortgageYearsFocused, setIsMortgageYearsFocused] = useState(false);
  const [isCarYearsFocused, setIsCarYearsFocused] = useState(false);

  const getYearsLabel = (number) => {
    let label = `лет`;
    if ((number === 1) || (number >= 20 && number % 10 === 1)) {
      label = `год`;
    }
    if ((number >= 2 && number <= 4) || (number >= 20 && number % 10 >= 2 && number % 10 <= 4)) {
      label = `года`;
    }
    return label;
  };

  const getFormattedLendingYears = (lendingType) => {
    let formattedLendingYears = 0;
    if (lendingType === `calc-lending-mortgage`) {
      formattedLendingYears = isMortgageYearsFocused ? mortgageYears : `${mortgageYears} ${getYearsLabel(mortgageYears)}`;
    } else {
      formattedLendingYears = isCarYearsFocused ? carYears : `${carYears} ${getYearsLabel(carYears)}`;
    }
    return formattedLendingYears;
  };

  const handleLendingYearsChange = (evt) => {
    lendingType === `calc-lending-mortgage` ? onMortgageYearsSet(Number(evt.target.value)) : onCarYearsSet(Number(evt.target.value));
  };

  const handleLendingYearsFocus = () => {
    lendingType === `calc-lending-mortgage` ? setIsMortgageYearsFocused((prevState) => !prevState) : setIsCarYearsFocused((prevState) => !prevState);
  };

  const handleLendingYearsBlur = () => {
    if (lendingType === `calc-lending-mortgage`) {
      setIsMortgageYearsFocused((prevState) => !prevState);
      if (mortgageYears < calcValues.MINIMUM_MORTGAGE_YEARS) {
        onMortgageYearsSet(calcValues.MINIMUM_MORTGAGE_YEARS);
      } 
      if (mortgageYears > calcValues.MAXIMUM_MORTGAGE_YEARS) {
        onMortgageYearsSet(calcValues.MAXIMUM_MORTGAGE_YEARS);
      } 
    } else {
      setIsCarYearsFocused((prevState) => !prevState);
      if (carYears < calcValues.MINIMUM_CAR_YEARS) {
        onCarYearsSet(calcValues.MINIMUM_CAR_YEARS);
      } 
      if (carYears > calcValues.MAXIMUM_CAR_YEARS) {
        onCarYearsSet(calcValues.MAXIMUM_CAR_YEARS);
      } 
    }
  };

  const getMinimumLendingYears = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.MINIMUM_MORTGAGE_YEARS : calcValues.MINIMUM_CAR_YEARS;
  };

  const getMaximumLendingYears = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.MAXIMUM_MORTGAGE_YEARS : calcValues.MAXIMUM_CAR_YEARS;
  };

  const getLendingYears = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgageYears : carYears;
  };

  const handleLendingYearsRangeChange = (value) => {
    lendingType === `calc-lending-mortgage` ?  onMortgageYearsSet(value) : onCarYearsSet(value);
  };

  return (
    <>
      <label className="calc__label" htmlFor="calc-loan-years">
        Срок кредитования
      </label>
      <input 
        className="calc__input" 
        type="text" 
        id="calc-loan-years" 
        name="calc-loan-years" 
        value={getFormattedLendingYears(lendingType)}
        onChange={handleLendingYearsChange} 
        onFocus={handleLendingYearsFocus} 
        onBlur={handleLendingYearsBlur} 
      />
      <Range
        min={getMinimumLendingYears(lendingType)}
        max={getMaximumLendingYears(lendingType)}
        values={[getLendingYears(lendingType)]}
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
      <p className="calc__hint calc__hint--range">
        <span>
          {getMinimumLendingYears(lendingType)} {getYearsLabel(getMinimumLendingYears(lendingType))}
        </span>
        <span>
          {getMaximumLendingYears(lendingType)} {getYearsLabel(getMaximumLendingYears(lendingType))}
        </span>
      </p>
    </>
  );
};

Years.propTypes = {
  lendingType: PropTypes.string.isRequired,
  mortgageYears: PropTypes.number.isRequired,
  carYears: PropTypes.number.isRequired,
  onMortgageYearsSet: PropTypes.func.isRequired,
  onCarYearsSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    mortgageYears: state.mortgageYears,
    carYears: state.carYears
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMortgageYearsSet(newState) {
    dispatch(ActionCreator.onMortgageYearsSet(newState));
  },
  onCarYearsSet(newState) {
    dispatch(ActionCreator.onCarYearsSet(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Years);
