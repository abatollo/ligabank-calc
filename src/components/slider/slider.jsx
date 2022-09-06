import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

const Slider = ({ 
  currentSlide, 
  onCurrentSlideSet 
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (currentSlide < 3) {
        onCurrentSlideSet(currentSlide + 1);
      } else {
        onCurrentSlideSet(1);
      }
    }, 4000);
  });

  return (
    <section className="slider">
      <h2 className="visually-hidden">Услуги</h2>
      {currentSlide === 1 &&
        <div className="slider__content slider__content--1">
          <div className="container center">
            <h2 className="slider__heading">Лига Банк</h2>
            <h3 className="slider__subheading">Кредиты на любой случай</h3>
            <a className="slider__link" href="#credit-calculator">Рассчитать кредит</a>
          </div>
        </div>
      }
      {currentSlide === 2 &&
        <div className="slider__content slider__content--2">
          <div className="container center">
            <h2 className="slider__heading">Лига Банк</h2>
            <h3 className="slider__subheading">Ваша уверенность в завтрашнем дне</h3>
          </div>
        </div>
      }
      {currentSlide === 3 &&
        <div className="slider__content slider__content--3">
          <div className="container center">
            <h2 className="slider__heading">Лига Банк</h2>
            <h3 className="slider__subheading">Всегда рядом</h3>
            <a className="slider__link" href="#location">Найти отделения</a>
          </div>
        </div>
      }
      <ul className="slider__list">
        <li>
          <input className="slider__input visually-hidden" type="radio" name="slider" value="slider-1" id="slider-1" onChange={() => {onCurrentSlideSet(1)}} checked={currentSlide === 1} />
          <label className="slider__label slider__label--1" htmlFor="slider-1">
            Первый слайд
          </label>
        </li>
        <li>
          <input className="slider__input visually-hidden" type="radio" name="slider" value="slider-2" id="slider-2" onChange={() => {onCurrentSlideSet(2)}} checked={currentSlide === 2} />
          <label className="slider__label slider__label--2" htmlFor="slider-2">
            Второй слайд
          </label>
        </li>
        <li>
          <input className="slider__input visually-hidden" type="radio" name="slider" value="slider-3" id="slider-3" onChange={() => {onCurrentSlideSet(3)}} checked={currentSlide === 3} />
          <label className="slider__label slider__label--3" htmlFor="slider-3">
            Третий слайд
          </label>
        </li>
      </ul>
    </section>
  );
};

Slider.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  onCurrentSlideSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentSlide: state.currentSlide
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCurrentSlideSet(slideNumber) {
    dispatch(ActionCreator.onCurrentSlideSet(slideNumber));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
