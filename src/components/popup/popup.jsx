import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { keyCodes } from '../../const/key-codes';

import { ActionCreator } from '../../store/action';

import LogoForm from "../../img/logo-form.svg";

const Popup = ({ isPopupOpened, onIsPopupOpenedChange }) => {
  const refPopup = useRef(null);
  const passwordInput = useRef(null);

  const [username, setUsername] = useState(localStorage.getItem(`username`) || ``);
  const [password, setPassword] = useState(localStorage.getItem(`password`) || ``);

  const handlePopupCloseClick = (evt) => {
    evt.preventDefault();
    onIsPopupOpenedChange(false);
  };

  const handlePopupButtonClick = (evt) => {
    evt.preventDefault();
    onIsPopupOpenedChange(false);
  };

  const handlePopupTabOrShiftAndTabKeydown = (evt) => {
    if (evt.keyCode === keyCodes.TAB) {
      const focusablePopupElements = refPopup.current.querySelectorAll(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);

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

  const handlePopupEscapeKeydown = useCallback(() => {
    onIsPopupOpenedChange(false);
  }, [onIsPopupOpenedChange]);

  const handlePopupPasswordClick = (evt) => {
    evt.preventDefault();
    if (passwordInput.current.type === `text`) {
      passwordInput.current.type = `password`;
    } else {
      passwordInput.current.type = `text`;
    }
  };

  const keydownHandlers = useMemo(() => new Map([
    [keyCodes.ESCAPE, handlePopupEscapeKeydown], 
    [keyCodes.TAB, handlePopupTabOrShiftAndTabKeydown]
  ]), [handlePopupEscapeKeydown]);

  const handlePopupKeydown = useCallback((evt) => {
    const handlePopupKeydownProper = keydownHandlers.get(evt.keyCode);

    if (handlePopupKeydownProper) {
      handlePopupKeydownProper(evt);
    }
  }, [keydownHandlers]);

  useEffect(() => {
    document.addEventListener(`keydown`, handlePopupKeydown);
    return () => { document.removeEventListener(`keydown`, handlePopupKeydown) };
  }, [handlePopupKeydown]);

  useEffect(() => {
    if (refPopup.current) {
      const focusablePopupElement = refPopup.current.querySelector(`a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select`);
      focusablePopupElement.focus();
    }
  }, [isPopupOpened]);

  const handlePopupClick = (evt) => {
    if (evt.target === refPopup.current) {
      onIsPopupOpenedChange(false);
    }
  };

  useEffect(() => {
    let scrollbarWidth = window.innerWidth - document.body.clientWidth;
    if (isPopupOpened) { 
      document.body.style.overflow = `hidden`;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = ``;
      document.body.style.paddingRight = ``;
    };
  }, [isPopupOpened]);

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
    localStorage.setItem(`username`, evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    localStorage.setItem(`password`, evt.target.value);
  };

  return (
    <section className="popup" ref={refPopup} onClick={handlePopupClick}>
      <div className="popup__wrapper">
        <h2 className="visually-hidden">Авторизация</h2>
        <img className="popup__logo" src={LogoForm} width="151" height="31" alt="ЛИГА Банк" />
        <form className="popup__form" action="http://echo.htmlacademy.ru" method="POST">
          <label className="popup__label" htmlFor="username">Логин</label>
          <input className="popup__input" type="text" autoComplete="username" id="username" name="username" value={username} onChange={handleUsernameChange} />
          <label className="popup__label" htmlFor="password">Пароль</label>
          <input className="popup__input" ref={passwordInput} type="password" autoComplete="current-password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          <button className="popup__password" onClick={handlePopupPasswordClick}>Отображение пароля</button>
          <a className="popup__link-restore" href="/password-restore">Забыли пароль?</a>
          <input type="submit" className="popup__button" onClick={handlePopupButtonClick} value="Войти" />
        </form>
        <button className="popup__close" onClick={handlePopupCloseClick}>Закрыть</button>
      </div>
    </section>
  );
};

Popup.propTypes = {
  isPopupOpened: PropTypes.bool.isRequired,
  onIsPopupOpenedChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    isPopupOpened: state.isPopupOpened
  };
};

const mapDispatchToProps = (dispatch) => ({
  onIsPopupOpenedChange(isPopupOpened) {
    dispatch(ActionCreator.onIsPopupOpenedChange(isPopupOpened));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
