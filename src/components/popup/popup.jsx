import { useState, useEffect, useRef } from 'react';
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

  const handlePopupEscapeKeydown = () => {
    onIsPopupOpenedChange(false);
  };

  const handlePopupPasswordClick = (evt) => {
    evt.preventDefault();
    if (passwordInput.current.type === `text`) {
      passwordInput.current.type = `password`;
    } else {
      passwordInput.current.type = `text`;
    }
  };

  const keydownHandlers = new Map([
    [keyCodes.ESCAPE, handlePopupEscapeKeydown], 
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
        <h2 className="visually-hidden">??????????????????????</h2>
        <img className="popup__logo" src={LogoForm} width="151" height="31" alt="???????? ????????" />
        <form className="popup__form" action="http://echo.htmlacademy.ru" method="POST">
          <label className="popup__label" htmlFor="username">??????????</label>
          <input className="popup__input" type="text" autoComplete="username" id="username" name="username" value={username} onChange={handleUsernameChange} />
          <label className="popup__label" htmlFor="password">????????????</label>
          <input className="popup__input" ref={passwordInput} type="password" autoComplete="current-password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          <button className="popup__password" onClick={handlePopupPasswordClick}>?????????????????????? ????????????</button>
          <a className="popup__link-restore" href="/password-restore">???????????? ?????????????</a>
          <input type="submit" className="popup__button" onClick={handlePopupButtonClick} value="??????????" />
        </form>
        <button className="popup__close" onClick={handlePopupCloseClick}>??????????????</button>
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
