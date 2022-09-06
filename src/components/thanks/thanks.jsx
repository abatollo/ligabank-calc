import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { keyCodes } from '../../const/key-codes';

import { ActionCreator } from '../../store/action';

const Thanks = ({
  isThanksOpened,
  onIsThanksOpenedChange
}) => {
  const refThanks = useRef(null);

  const handleThanksCloseClick = (evt) => {
    evt.preventDefault();
    onIsThanksOpenedChange(false);
  };

  const handleThanksTabOrShiftAndTabKeydown = (evt) => {
    if (evt.keyCode === keyCodes.TAB) {
      const focusablePopupElements = refThanks.current.querySelectorAll(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);

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

  const handleThanksEscapeKeydown = () => {
    onIsThanksOpenedChange(false);
  };

  const keydownHandlers = new Map([
    [keyCodes.ESCAPE, handleThanksEscapeKeydown], 
    [keyCodes.TAB, handleThanksTabOrShiftAndTabKeydown]
  ]);

  const handleThanksKeydown = (evt) => {
    const handleThanksKeydownProper = keydownHandlers.get(evt.keyCode);

    if (handleThanksKeydownProper) {
      handleThanksKeydownProper(evt);
    }
  };

  useEffect(() => {
    document.addEventListener(`keydown`, handleThanksKeydown);
    return () => { document.removeEventListener(`keydown`, handleThanksKeydown) };
  });

  useEffect(() => {
    if (refThanks.current) {
      const focusablePopupElement = refThanks.current.querySelector(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);
      focusablePopupElement.focus();
    }
  }, [isThanksOpened]);

  const handleThanksClick = (evt) => {
    if (evt.target === refThanks.current) {
      onIsThanksOpenedChange(false);
    }
  };

  useEffect(() => {
    let scrollbarWidth = window.innerWidth - document.body.clientWidth;
    if (isThanksOpened) { 
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = ``;
      document.body.style.paddingRight = ``;
    };
  }, [isThanksOpened]);

  return (
    <section className="thanks" ref={refThanks} onClick={handleThanksClick}>
      <div className="thanks__wrapper">
        <h2 className="thanks__heading">Спасибо за обращение в наш банк.</h2>
        <p className="thanks__note">Наш менеджер скоро свяжется с вами по указанному номеру телефона.</p>
        <button className="thanks__close" onClick={handleThanksCloseClick}>Закрыть</button>
      </div>
    </section>
  );
};

Thanks.propTypes = {
  isThanksOpened: PropTypes.bool.isRequired,
  onIsThanksOpenedChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isThanksOpened: state.isThanksOpened
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIsThanksOpenedChange(newState) {
    dispatch(ActionCreator.onIsThanksOpenedChange(newState));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Thanks);
