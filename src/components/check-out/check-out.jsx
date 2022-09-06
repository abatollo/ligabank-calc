import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { keyCodes } from '../../const/key-codes';

import { ActionCreator } from '../../store/action';

import { formatPrice } from '../../utils/format';

const CheckOut = ({  
  lendingType,
  mortgagePrice,
  mortgageDownPayment,
  mortgageYears,
  carPrice,
  carDownPayment,
  carYears,
  orderNumber,
  onIsCheckoutOpenedChange,
  onIsOrderPlacedChange,
  onIsThanksOpenedChange,
  isCheckoutOpened
}) => {
  const refCheckOut = useRef(null);
  const refName = useRef(null);
  const refPhone = useRef(null);
  const refEmail = useRef(null);

  const [isAnimationActive, setIsAnimationActive] = useState(false)

  const [name, setName] = useState(localStorage.getItem(`name`) || ``);
  const [phone, setPhone] = useState(localStorage.getItem(`phone`) || ``);
  const [email, setEmail] = useState(localStorage.getItem(`email`) || ``);

  const getCheckOutLabel = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? `Ипотека` : `Автокредит`;
  };

  const getCheckOutPriceLabel = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? `недвижимости` : `автомобиля`;
  };

  const getFormattedPrice = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? formatPrice(mortgagePrice) : formatPrice(carPrice);
  };

  const getFormattedDownPayment = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? formatPrice(mortgageDownPayment) : formatPrice(carDownPayment);
  };

  const getYears = (lendingType) => {
    return lendingType === `calc-lending-mortgage` ? mortgageYears : carYears;
  };

  const handleCalcInputNameChange = (evt) => {
    setName(evt.target.value);
    localStorage.setItem(`name`, evt.target.value);
  };

  const handleCalcInputPhoneChange = (evt) => {
    setPhone(evt.target.value);
    localStorage.setItem(`phone`, evt.target.value);
  };

  const handleCalcInputEmailChange = (evt) => {
    setEmail(evt.target.value);
    localStorage.setItem(`email`, evt.target.value);
  };

  const onCalcSubmit = (evt) => {
    if (getIsSubmitEnabled()) {
      onIsCheckoutOpenedChange(false);
      onIsOrderPlacedChange(orderNumber + 1);
      onIsThanksOpenedChange(true);
      evt.preventDefault();
    } else {
      setIsAnimationActive(true);
      setTimeout(() => {
        setIsAnimationActive(false);
      }, 1000);
    }
  };

  const getIsSubmitEnabled = () => {
    return refName.current?.validity.valid && refPhone.current?.validity.valid && refEmail.current?.validity.valid;
  };

  const handlePopupTabOrShiftAndTabKeydown = (evt) => {
    if (evt.keyCode === keyCodes.TAB) {
      const focusablePopupElements = refCheckOut.current.querySelectorAll(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);

      const firstElement = focusablePopupElements[0];
      const lastElement = focusablePopupElements[focusablePopupElements.length - 1];

      if (document.activeElement === firstElement && evt.shiftKey) {
        evt.preventDefault();
        lastElement.focus();
      } else if (document.activeElement === lastElement && !evt.shiftKey) {
        evt.preventDefault();
        firstElement.focus();
      }
    }
  };

  const keydownHandlers = new Map([
    [keyCodes.TAB, handlePopupTabOrShiftAndTabKeydown]
  ]);

  const handlePopupKeydown = (evt) => {
    const handlePopupKeydownProper = keydownHandlers.get(evt.keyCode);

    if (handlePopupKeydownProper) {
      handlePopupKeydownProper(evt);
    }
  };

  useEffect(() => {
    document.addEventListener(`keydown`, handlePopupKeydown);
    return () => { document.removeEventListener(`keydown`, handlePopupKeydown) };
  });

  useEffect(() => {
    if (refCheckOut.current) {
      const focusablePopupElement = refCheckOut.current.querySelector(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);
      focusablePopupElement.focus();
    }
  }, [isCheckoutOpened]);

  useEffect(() => {
    let scrollbarWidth = window.innerWidth - document.body.clientWidth;
    if (isCheckoutOpened) { 
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = ``;
      document.body.style.paddingRight = ``;
    };
  }, [isCheckoutOpened]);

  return (
    <div className="calc__wrapper" ref={refCheckOut}>
      <fieldset className={`calc__fieldset calc__fieldset--check-out ${isAnimationActive && `calc__fieldset--error`}`}>
        <legend className="calc__legend">
          Шаг 3. Оформление заявки
        </legend>
        <div className="calc__point">
          Номер заявки
        </div>
        <div className="calc__value">
          № {orderNumber}
        </div>
        <div className="calc__point">
          Цель кредита
        </div>
        <div className="calc__value">
          {getCheckOutLabel(lendingType)}
        </div>
        <div className="calc__point">
          Стоимость {getCheckOutPriceLabel(lendingType)}
        </div>
        <div className="calc__value">
          {getFormattedPrice(lendingType)} рублей
        </div>
        <div className="calc__point">
          Первоначальный взнос
        </div>
        <div className="calc__value">
          {getFormattedDownPayment(lendingType)} рублей
        </div>
        <div className="calc__point">
          Срок кредитования
        </div>
        <div className="calc__value">
          {getYears(lendingType)} лет
        </div>
        <input 
          className="calc__input calc__input--small calc__input--name"
          ref={refName}
          type="text" 
          name="calc-name" 
          id="calc-name" 
          placeholder="ФИО" 
          value={name} 
          onChange={handleCalcInputNameChange} 
          required
        />
        <input 
          className="calc__input calc__input--small calc__input--phone"
          ref={refPhone}
          type="tel" 
          name="calc-phone" 
          id="calc-phone" 
          placeholder="Телефон" 
          value={phone} 
          onChange={handleCalcInputPhoneChange} 
          pattern="^(\+7|8)[0-9]{10}$" 
          maxLength="12"
          required
        />
        <input 
          className="calc__input calc__input--small calc__input--email"
          ref={refEmail}
          type="email" 
          name="calc-email" 
          id="calc-email" 
          placeholder="E-mail" 
          value={email} 
          onChange={handleCalcInputEmailChange} 
          required
        />
        <input 
          className="calc__button calc__input--submit" 
          type="submit" 
          name="submit" 
          id="submit" 
          value="Отправить" 
          onSubmit={onCalcSubmit}
          onClick={onCalcSubmit}
        />
      </fieldset>
    </div>
  );
};

CheckOut.propTypes = {
  lendingType: PropTypes.string.isRequired,
  mortgagePrice: PropTypes.number.isRequired,
  mortgageDownPayment: PropTypes.number.isRequired,
  mortgageYears: PropTypes.number.isRequired,
  carPrice: PropTypes.number.isRequired,
  carDownPayment: PropTypes.number.isRequired,
  carYears: PropTypes.number.isRequired,
  orderNumber: PropTypes.number.isRequired,
  onIsCheckoutOpenedChange: PropTypes.func.isRequired,
  onIsOrderPlacedChange: PropTypes.func.isRequired,
  onIsThanksOpenedChange: PropTypes.func.isRequired,
  isCheckoutOpened: PropTypes.bool.isRequired
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
    orderNumber: state.orderNumber,
    isCheckoutOpened: state.isCheckoutOpened
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIsOrderPlacedChange(newState) {
    dispatch(ActionCreator.onIsOrderPlacedChange(newState));
  },
  onIsCheckoutOpenedChange(newState) {
    dispatch(ActionCreator.onIsCheckoutOpenedChange(newState));
  },
  onIsThanksOpenedChange(newState) {
    dispatch(ActionCreator.onIsThanksOpenedChange(newState));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
