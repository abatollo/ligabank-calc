import logo from '../../img/logo.svg';

import { FooterMenu, SocialMenu } from '../../const/menu';

const Footer = () => {
  return(
    <footer className="footer">
      <div className="footer__container container center">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo-image" src={logo} width="150" height="27" alt="Логотип «ЛИГА Банк»"/>
        </a>
        <address className="footer__address">
          150015, г. Москва, ул. Московская, д. 32
          Генеральная лицензия Банка России №1050
          &copy; Лига Банк, 2019
        </address>
        <ul className="footer__menu">
          {FooterMenu.map((footerItem, footerItemIndex) => 
            <li className="footer__menu-item" key={footerItemIndex}>
              <a className="footer__menu-link" href={footerItem.url}>
                {footerItem.label}
              </a>
            </li>
          )}
        </ul>
        <div className="footer__tel-container footer__tel-container--celluar">
          <a className="footer__tel-link" href="tel:*0904">*0904</a>
          <div className="footer__tel-text">Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</div>
        </div>
        <div className="footer__tel-container footer__tel-container--federal">
          <a className="footer__tel-link" href="tel:88001112233">8 800 111 22 33</a>
          <div className="footer__tel-text">Бесплатный для всех городов России</div>
        </div>
        <ul className="footer__social-menu">
          {SocialMenu.map((socialItem, socialItemIndex) => 
            <li className="footer__social-menu-item" key={socialItemIndex}>
              <a className="footer__social-menu-link" href={socialItem.url}>
                <img className="footer__social-menu-icon" src={socialItem.icon} width={socialItem.width} height={socialItem.height} alt={socialItem.label} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
