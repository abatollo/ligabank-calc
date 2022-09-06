import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Price from '../price/price';
import DownPayment from '../down-payment/down-payment';
import Type from '../type/type';
import Offer from '../offer/offer';
import CheckOut from '../check-out/check-out';
import CheckboxGroup from '../checkbox-group/checkbox-group';
import Years from '../years/years';

const Calc = ({
  lendingType,
  isCheckoutOpened
}) => {
  return (
    <section className="calc container center" id="credit-calculator">
      <h2 className="calc__heading">Кредитный калькулятор</h2>
      <form className="calc__form" action="http://echo.htmlacademy.ru" method="POST">
        <Type />
        {(lendingType !== `calc-lending-default` &&
          <>
            <fieldset className="calc__fieldset calc__fieldset--options">
              <legend className="calc__legend">
                Шаг 2. Введите параметры кредита
              </legend>
              <Price />
              <DownPayment />
              <Years />
              <CheckboxGroup lendingType={lendingType} />
            </fieldset>
            <Offer />
          </>
        )}
        {isCheckoutOpened && <CheckOut />}
      </form>
    </section>
  );
};

Calc.propTypes = {
  lendingType: PropTypes.string.isRequired,
  isCheckoutOpened: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    lendingType: state.lendingType,
    isCheckoutOpened: state.isCheckoutOpened
  };
};

export default connect(mapStateToProps, null)(Calc);
