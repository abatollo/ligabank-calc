import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

const Type = ({
  lendingType,
  onLendingTypeSet
}) => {
  const [isCalcDetailsOpened, setIsCalcDetailsOpened] = useState(false);

  const getLendingTypeValue = (lendingType) => {
    let lendingTypeValue = `Выберите цель кредита`;
    if (lendingType === `calc-lending-mortgage`) {
      lendingTypeValue = `Ипотечное кредитование`;
    } 
    if (lendingType === `calc-lending-car`) {
      lendingTypeValue = `Автомобильное кредитование`
    }
    return lendingTypeValue;
  };

  const handleCalcOptionsClick = () => {
    setIsCalcDetailsOpened((prevState) => !prevState);
  };

  const handleLendingTypeChange = (evt) => {
    onLendingTypeSet(evt.target.value);
    setIsCalcDetailsOpened((prevState) => !prevState);
  };

  return (
    <fieldset className="calc__fieldset">
      <legend className="calc__legend calc__legend--type">
        Шаг 1. Цель кредита
      </legend>
      <div className={`calc__options ${isCalcDetailsOpened && `calc__options--opened`}`} onClick={handleCalcOptionsClick} tabIndex="0">
        {getLendingTypeValue(lendingType)}
      </div>
      {isCalcDetailsOpened && (
        <ul className={"calc__select-list"}>
          <li className="calc__select-item">
            <input 
              className="visually-hidden calc__select-input" 
              type="radio" 
              name="calc-lending" 
              value="calc-lending-mortgage" 
              id="calc-mortgage-lending" 
              onChange={handleLendingTypeChange} 
              checked={lendingType === `calc-mortgage-lending`} 
            />
            <label className="calc__select-label" htmlFor="calc-mortgage-lending">
              Ипотечное кредитование
            </label>
          </li>
          <li className="calc__select-item calc__select-input">
            <input 
              className="visually-hidden" 
              type="radio" 
              name="calc-lending" 
              value="calc-lending-car" 
              id="calc-car-lending" 
              onChange={handleLendingTypeChange} 
              checked={lendingType === `calc-car-lending`} 
            />
            <label className="calc__select-label" htmlFor="calc-car-lending">
              Автомобильное кредитование
            </label>
          </li>
        </ul>
      )}
    </fieldset>
  );
};

Type.propTypes = {
  lendingType: PropTypes.string.isRequired,
  onLendingTypeSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    mortgagePrice: state.mortgagePrice,
    mortgageDownPayment: state.mortgageDownPayment,
    isMaternityCapitalApplied: state.isMaternityCapitalApplied
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLendingTypeSet(newState) {
    dispatch(ActionCreator.onLendingTypeSet(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Type);
