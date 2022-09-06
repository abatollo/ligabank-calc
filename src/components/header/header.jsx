import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ActionCreator } from '../../store/action';

import logo from '../../img/logo.svg';

const Header = ({ 
  onIsPopupOpenedChange 
}) => {
  const onHeaderMenuLinkLoginClick = (evt) => {
    evt.preventDefault(); 
    onIsPopupOpenedChange(true);
  };

  return(
    <header className="header">
      <div className="container center">
        <nav className="header__navigation">
          <a className="header__logo-link" href="/">
            <img className="header__logo-image" src={logo} alt="Логотип «ЛИГА Банк»"/>
          </a>
          <ul className="header__menu">
            <li className="header__menu-item">
              <a className="header__menu-link" href="/services">
                Услуги
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="/credit-calculator">
                Рассчитать кредит
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link header__menu-link--active" href="/currency-converter">
                Конвертер валют
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="/contact-information">
                Контакты
              </a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="/feedback">
                Задать вопрос
              </a>
            </li>
          </ul>
          <a className="header__menu-link header__menu-link--login" href="/login" onClick={onHeaderMenuLinkLoginClick}>
            Войти в Интернет-банк
          </a>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  onIsPopupOpenedChange: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onIsPopupOpenedChange(isPopupOpened) {
    dispatch(ActionCreator.onIsPopupOpenedChange(isPopupOpened));
  }
});

export default connect(null, mapDispatchToProps)(Header);
