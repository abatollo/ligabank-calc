import { useState } from 'react';
import { connect } from 'react-redux';

import { calcValues } from '../../const/calc-values';
import { formatPrice } from '../../utils/format-price';

const Calc = () => {
  const [isCalcDetailsOpened, setIsCalcDetailsOpened] = useState(false);
  const [lendingType, setLendingType] = useState(`select-lending`);

  const [overallPrice, setOverallPrice] = useState(calcValues.DEFAULT_OVERALL_PRICE);
  const [isMaternityCapitalApplied, setIsMaternityCapitalApplied] = useState(true);

  const [name, setName] = useState(localStorage.getItem(`name`) || ``);
  const [phone, setPhone] = useState(localStorage.getItem(`phone`) || ``);
  const [email, setEmail] = useState(localStorage.getItem(`email`) || ``);

  const getLendingTypeValue = (lendingType) => {
    let lendingTypeValue = `Выберите цель кредита`;

    switch (lendingType) {
      case `calc-lending-default`: {
        lendingTypeValue = `Выберите цель кредита`;
        break;
      }
      case `calc-lending-mortgage`: {
        lendingTypeValue = `Ипотечное кредитование`;
        break;
      }
      case `calc-lending-car`: {
        lendingTypeValue = `Автомобильное кредитование`;
        break;
      }
      default: {
        lendingTypeValue = `Выберите цель кредита`;
        break;
      }
    }

    return lendingTypeValue;
  };

  const handleLendingTypeChange = (evt) => {
    setLendingType(evt.target.value);
    setIsCalcDetailsOpened((prevState) => !prevState);
  };

  const handleCalcOverallPriceChange = (evt) => {
    setOverallPrice(evt.target.value);
  };

  const getFormattedCalcOverallPrice = () => {
    let formattedOverallPrice = `${formatPrice(overallPrice)} рублей`;

    return formattedOverallPrice;
  };

  const handleCalcOverallPriceDecrementClick = () => {
    setOverallPrice(overallPrice - calcValues.DEFAULT_OVERALL_PRICE_STEP);
  };

  const handleCalcOverallPriceIncrementClick = () => {
    setOverallPrice(overallPrice + calcValues.DEFAULT_OVERALL_PRICE_STEP);
  };

  const handleCalcMaternityCapitalClick = () => {
    setIsMaternityCapitalApplied(prevState => !prevState);
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

  return (
    <section className="calc container center">
      <h2 className="calc__heading">Кредитный калькулятор</h2>
      <form className="calc__form" action="http://echo.htmlacademy.ru" method="POST">
        <fieldset className="calc__fieldset">
          <legend className="calc__legend calc__legend--type">
            Шаг 1. Цель кредита
          </legend>
          <div className={`calc__options ${isCalcDetailsOpened && `calc__options--opened`}`} onClick={handleLendingTypeChange} tabIndex="0">
            {getLendingTypeValue(lendingType)}
          </div>
          <ul className={`calc__select-list ${!isCalcDetailsOpened && `calc__select-list--closed`}`}>
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
        </fieldset>
        <fieldset className="calc__fieldset calc__fieldset--options">
          <legend className="calc__legend">
            Шаг 2. Введите параметры кредита
          </legend>
          <label className="calc__label" htmlFor="calc-overall-price">
            Стоимость недвижимости
          </label>
          <div className="calc__input-wrapper">
            <input className="calc__decrement" type="button" onClick={handleCalcOverallPriceDecrementClick} />
            <input className="calc__input" type="text" id="calc-overall-price" name="calc-overall-price" value={getFormattedCalcOverallPrice()} onChange={handleCalcOverallPriceChange} />
            <input className="calc__increment" type="button" onClick={handleCalcOverallPriceIncrementClick} />
          </div>
          <p className="calc__hint">
            От 1 200 000  до 25 000 000 рублей
          </p>
          <label className="calc__label" htmlFor="calc-down-payment">
            Первоначальный взнос
          </label>
          <input className="calc__input" type="text" id="calc-down-payment" name="calc-down-payment" value="200 000 рублей" onChange={() => {console.log(`handleCalcDownPaymentChange`)}} />
          <input className="calc__range" type="range" id="calc-loan-term-range" name="calc-loan-term-range" min="5" max="30" step="5" />
          <p className="calc__hint">
            10%
          </p>
          <label className="calc__label" htmlFor="calc-loan-term">
            Срок кредитования
          </label>
          <input className="calc__input" type="text" id="calc-loan-term" name="calc-loan-term" value="5 лет" onChange={() => {console.log(`handleCalcLoatTermChange`)}} />
          <input className="calc__range" type="range" id="calc-loan-term-range" name="calc-loan-term-range" min="5" max="30" />
          <p className="calc__hint calc__hint--range">
            <span>
              5 лет
            </span>
            <span>
              30 лет
            </span>
          </p>
          <input className="calc__checkbox visually-hidden" type="checkbox" id="calc-maternity-capital" name="calc-maternity-capital" checked={isMaternityCapitalApplied} onChange={handleCalcMaternityCapitalClick} />
          <label className="calc__label calc__label--checkbox" htmlFor="calc-maternity-capital">
            Использовать материнский капитал
          </label>
        </fieldset>
        <fieldset className="calc__fieldset calc__fieldset--offer">
          <legend className="calc__legend">
            Наше предложение
          </legend>
          <ul className="calc__list">
            <li>
              <p className="calc__offer-value">1 330 000 рублей</p>
              <p className="calc__offer-hint">Сумма ипотеки</p>
            </li>
            <li>
              <p className="calc__offer-value">9,40%</p>
              <p className="calc__offer-hint">Процентная ставка</p>
            </li>
            <li>
              <p className="calc__offer-value">27 868 рублей</p>
              <p className="calc__offer-hint">Ежемесячный платеж</p>
            </li>
            <li>
              <p className="calc__offer-value">61 929 рублей</p>
              <p className="calc__offer-hint">Необходимый доход</p>
            </li>
          </ul>
          <input className="calc__button" type="submit" value="Оформить заявку" onClick={() => {console.log(``)}} />
        </fieldset>
        <fieldset className="calc__fieldset calc__fieldset--check-out">
          <legend className="calc__legend">
            Шаг 3. Оформление заявки
          </legend>
          <div className="calc__point">
            Номер заявки
          </div>
          <div className="calc__value">
            № 0010
          </div>
          <div className="calc__point">
            Цель кредита
          </div>
          <div className="calc__value">
            Ипотека
          </div>
          <div className="calc__point">
            Стоимость недвижимости
          </div>
          <div className="calc__value">
            2 000 000 рублей
          </div>
          <div className="calc__point">
            Первоначальный взнос
          </div>
          <div className="calc__value">
            200 000 рублей
          </div>
          <div className="calc__point">
            Срок кредитования
          </div>
          <div className="calc__value">
            5 лет
          </div>
          <input className="calc__input calc__input--small calc__input--name" type="text" name="calc-name" id="calc-name" placeholder="ФИО" value={name} onChange={handleCalcInputNameChange} />
          <input className="calc__input calc__input--small calc__input--phone" type="text" name="calc-phone" id="calc-phone" placeholder="Телефон" value={phone} onChange={handleCalcInputPhoneChange} />
          <input className="calc__input calc__input--small calc__input--email" type="text" name="calc-email" id="calc-email" placeholder="E-mail" value={email} onChange={handleCalcInputEmailChange} />
          <input className="calc__button calc__input--submit" type="submit" name="" id="" value="Отправить" />
        </fieldset>
      </form>
    </section>
  );
};

export default connect(null, null)(Calc);
