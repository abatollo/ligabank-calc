import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

import { calcValues } from '../../const/calc-values';
import { formatPrice, formatPercentage, formatRound } from '../../utils/format';

const Offer = ({ 
  lendingType,
  mortgagePrice,
  mortgageDownPayment,
  mortgageYears,
  carPrice,
  carDownPayment,
  carYears,
  isMaternityCapitalApplied,
  isOptionalInsuranceApplied,
  isLifeInsuranceApplied,
  onIsCheckoutOpenedChange
}) => {
  const getIsWarningShown = (lendingType) => {
    return getFinalPrice(lendingType) < getMinimumFinalPrice(lendingType);
  };

  const getMinimumFinalPrice = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? calcValues.MINIMUM_MORTGAGE_FINAL_PRICE : calcValues.MINIMUM_CAR_FINAL_PRICE;
  };

  const getFormattedMinimumFinalPrice = (lendingType) => {
    return formatPrice(getMinimumFinalPrice(lendingType));
  };

  const getWarningLabel = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? `ипотечные кредиты` : `автокредиты`;
  };

  const getFinalPrice = (lendingType) => {
    let finalPrice = 0;
    if (lendingType === `calc-lending-mortgage`) {
      if (isMaternityCapitalApplied) {
        finalPrice = mortgagePrice - mortgageDownPayment - calcValues.MATERNITY_CAPITAL_AMOUNT
      } else {
        finalPrice = mortgagePrice - mortgageDownPayment;
      }
    } else {
      finalPrice = carPrice - carDownPayment;
    }
    return finalPrice;
  };

  const getFormattedFinalPrice = (lendingType) => {
    return formatPrice(getFinalPrice(lendingType));
  };

  const getOfferHint = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? `Сумма ипотеки` : `Сумма автокредита`;
  };

  const getInterest = (lendingType) => {
    let interest = 0;
    if (lendingType === `calc-lending-mortgage`) {
      if (mortgageDownPayment / mortgagePrice < calcValues.MORTGAGE_INTEREST_DOWN_PAYMENT_THRESHOLD) {
        interest = calcValues.MAXIMUM_MORTGAGE_INTEREST;
      } else {
        interest = calcValues.MINIMUM_MORTGAGE_INTEREST;
      }
    } else {
      if (carPrice >= calcValues.CAR_INTEREST_THRESHOLD) {
        interest = calcValues.MAXIMUM_CAR_INTEREST;
      } else {
        interest = calcValues.MINIMUM_CAR_INTEREST;
      }
      if (isOptionalInsuranceApplied || isLifeInsuranceApplied) {
        interest = calcValues.CAR_INTEREST_WITH_OPTIONAL_OR_LIFE_INSURANCE;
      }
      if (isOptionalInsuranceApplied && isLifeInsuranceApplied) {
        interest = calcValues.CAR_INTEREST_WITH_OPTIONAL_AND_LIFE_INSURANCE;
      }
    }
    return interest;
  };

  const getFormattedInterest = (lendingType) => {
    return formatPercentage(getInterest(lendingType) * 100);
  };

  const getMonthlyInterest = (lendingType) => {
    return getInterest(lendingType) / 12;
  };

  const getMonth = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgageYears * 12 : carYears * 12;
  };

  const getMonthlyPayment = (lendingType) => {
    let monthlyPayment = 0;
    if (lendingType === `calc-lending-mortgage`) {
      if (isMaternityCapitalApplied) {
        monthlyPayment = (mortgagePrice - mortgageDownPayment - calcValues.MATERNITY_CAPITAL_AMOUNT) * (getMonthlyInterest(lendingType) + (getMonthlyInterest(lendingType) / (((1 + getMonthlyInterest(lendingType)) ** getMonth(lendingType)) - 1 )));
      } else {
        monthlyPayment = (mortgagePrice - mortgageDownPayment) * (getMonthlyInterest(lendingType) + (getMonthlyInterest(lendingType) / (((1 + getMonthlyInterest(lendingType)) ** getMonth(lendingType)) - 1 )));
      }
    } else {
      monthlyPayment = (carPrice - carDownPayment) * (getMonthlyInterest(lendingType) + (getMonthlyInterest(lendingType) / (((1 + getMonthlyInterest(lendingType)) ** getMonth(lendingType)) - 1 )));
    }
    return monthlyPayment;
  };

  const getFormattedMonthlyPayment = () => {
    return formatRound(getMonthlyPayment(lendingType));
  };

  const getFormattedIncome = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? formatRound(getMonthlyPayment(lendingType) / calcValues.MORTGAGE_INCOME_THRESHOLD_PERCENTAGE) : formatRound(getMonthlyPayment(lendingType) / calcValues.CAR_INCOME_THRESHOLD_PERCENTAGE);
  };

  const handleOfferButtonClick = () => {
    onIsCheckoutOpenedChange(true);
  };

  return (
    <fieldset className="calc__fieldset calc__fieldset--offer">
      {getIsWarningShown(lendingType) ? (
        <>
          <legend className="calc__legend">
            Наш банк не выдаёт {getWarningLabel(lendingType)} меньше {getFormattedMinimumFinalPrice(lendingType)} рублей.
          </legend>
          <p className="calc__warning">
            Попробуйте использовать другие параметры для расчёта.
          </p>
        </>
      ) : (
        <>
          <legend className="calc__legend">
            Наше предложение
          </legend>
          <ul className="calc__list">
            <li>
              <p className="calc__offer-value">
                {`${getFormattedFinalPrice(lendingType)} рублей`}
              </p>
              <p className="calc__offer-hint">
                {getOfferHint(lendingType)}
              </p>
            </li>
            <li>
              <p className="calc__offer-value">
                {`${getFormattedInterest(lendingType)}%`}
              </p>
              <p className="calc__offer-hint">
                Процентная ставка
              </p>
            </li>
            <li>
              <p className="calc__offer-value">
                {`${getFormattedMonthlyPayment(lendingType)} рублей`}
              </p>
              <p className="calc__offer-hint">
                Ежемесячный платеж
              </p>
            </li>
            <li>
              <p className="calc__offer-value">
                {`${getFormattedIncome(lendingType)} рублей`}
              </p>
              <p className="calc__offer-hint">
                Необходимый доход
              </p>
            </li>
          </ul>
          <input 
            className="calc__button" 
            type="button" 
            value="Оформить заявку" 
            onClick={handleOfferButtonClick}
          />
        </>
      )}
    </fieldset>
  );
};

Offer.propTypes = {
  lendingType: PropTypes.string.isRequired,
  mortgagePrice: PropTypes.number.isRequired,
  mortgageDownPayment: PropTypes.number.isRequired,
  mortgageYears: PropTypes.number.isRequired,
  carPrice: PropTypes.number.isRequired,
  carDownPayment: PropTypes.number.isRequired,
  carYears: PropTypes.number.isRequired,
  isMaternityCapitalApplied: PropTypes.bool.isRequired,
  isOptionalInsuranceApplied: PropTypes.bool.isRequired,
  isLifeInsuranceApplied: PropTypes.bool.isRequired,
  onIsCheckoutOpenedChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    mortgagePrice: state.mortgagePrice,
    mortgageDownPayment: state.mortgageDownPayment,
    mortgageYears: state.mortgageYears,
    carPrice: state.carPrice,
    carDownPayment: state.carDownPayment,
    carYears: state.carYears,
    isMaternityCapitalApplied: state.isMaternityCapitalApplied,
    isOptionalInsuranceApplied: state.isOptionalInsuranceApplied,
    isLifeInsuranceApplied: state.isLifeInsuranceApplied,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIsCheckoutOpenedChange(newState) {
    dispatch(ActionCreator.onIsCheckoutOpenedChange(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
