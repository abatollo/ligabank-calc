import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ActionCreator } from '../../store/action';

import { HeaderMenu } from '../../const/menu';

import logo from '../../img/logo.svg';

const Header = ({ 
  onIsPopupOpenedChange 
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleHeaderMenuOpenClick = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  const handleHeaderMenuCloseClick = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  const onHeaderMenuLinkLoginClick = (evt) => {
    evt.preventDefault(); 
    onIsPopupOpenedChange(true);
  };

  return(
    <header className="header">
      <nav className="header__navigation container center">
        <button className="header__button-open" onClick={handleHeaderMenuOpenClick}>
          Открыть меню
        </button>
        <a className="header__logo-link" href="/">
          <img className="header__logo-image" src={logo} width="150" height="27" alt="Логотип «ЛИГА Банк»"/>
        </a>
        {isMenuOpened && (
          <button className="header__button-close" onClick={handleHeaderMenuCloseClick}>
            Закрыть меню
          </button>
        )}
        <ul className={cn(`header__menu`, {'header__menu--opened': isMenuOpened})}>
          {HeaderMenu.map((headerItem, headerItemIndex) => 
            <li className="header__menu-item" key={headerItemIndex}>
              <a className="header__menu-link" href={headerItem.url}>
                {headerItem.label}
              </a>
            </li>
          )}
        </ul>
        <a className={cn(`header__menu-link header__menu-link--login`, {'header__menu-link--menu-opened': isMenuOpened})} href="/login" onClick={onHeaderMenuLinkLoginClick}>
          Войти в Интернет-банк
        </a>
      </nav>
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
