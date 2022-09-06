import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

const CheckboxGroup = ({
  lendingType, 
  isMaternityCapitalApplied, 
  isOptionalInsuranceApplied, 
  isLifeInsuranceApplied,
  onIsMaternityCapitalAppliedChange,
  onIsOptionalInsuranceAppliedChange,
  onIsLifeInsuranceAppliedChange
}) => {
  const handleCalcMaternityCapitalClick = () => {
    onIsMaternityCapitalAppliedChange(!isMaternityCapitalApplied);
  };

  const handleOptionalInsuranceClick = () => {
    onIsOptionalInsuranceAppliedChange(!isOptionalInsuranceApplied);
  };

  const handleLifeInsuranceClick = () => {
    onIsLifeInsuranceAppliedChange(!isLifeInsuranceApplied);
  };

  return (
    <>
      {lendingType === `calc-lending-mortgage` &&
        <>
          <input 
            className="calc__checkbox visually-hidden" 
            type="checkbox" 
            id="calc-maternity-capital" 
            name="calc-maternity-capital" 
            onChange={handleCalcMaternityCapitalClick}
            checked={isMaternityCapitalApplied} 
          />
          <label className="calc__label calc__label--checkbox" htmlFor="calc-maternity-capital">
            Использовать материнский капитал
          </label>
        </>
      }
      {lendingType === `calc-lending-car` &&
        <>
          <input 
            className="calc__checkbox visually-hidden" 
            type="checkbox" 
            id="calc-optional-insurance" 
            name="calc-optional-insurance" 
            onChange={handleOptionalInsuranceClick}
            checked={isOptionalInsuranceApplied} 
          />
          <label className="calc__label calc__label--checkbox" htmlFor="calc-optional-insurance">
            Оформить КАСКО в нашем банке
          </label>
          <input 
            className="calc__checkbox visually-hidden" 
            type="checkbox" 
            id="calc-life-insurance" 
            name="calc-life-insurance" 
            onChange={handleLifeInsuranceClick}
            checked={isLifeInsuranceApplied} 
          />
          <label className="calc__label calc__label--checkbox" htmlFor="calc-life-insurance">
            Оформить Страхование жизни в нашем банке
          </label>
        </>
      }
    </>
  );
};

CheckboxGroup.propTypes = {
  isMaternityCapitalApplied: PropTypes.bool.isRequired,
  isOptionalInsuranceApplied: PropTypes.bool.isRequired,
  isLifeInsuranceApplied: PropTypes.bool.isRequired,
  onIsMaternityCapitalAppliedChange: PropTypes.func.isRequired,
  onIsOptionalInsuranceAppliedChange: PropTypes.func.isRequired,
  onIsLifeInsuranceAppliedChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isMaternityCapitalApplied: state.isMaternityCapitalApplied,
    isOptionalInsuranceApplied: state.isOptionalInsuranceApplied,
    isLifeInsuranceApplied: state.isLifeInsuranceApplied
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIsMaternityCapitalAppliedChange(newState) {
    dispatch(ActionCreator.onIsMaternityCapitalAppliedChange(newState));
  },
  onIsOptionalInsuranceAppliedChange(newState) {
    dispatch(ActionCreator.onIsOptionalInsuranceAppliedChange(newState));
  },
  onIsLifeInsuranceAppliedChange(newState) {
    dispatch(ActionCreator.onIsLifeInsuranceAppliedChange(newState))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxGroup);
