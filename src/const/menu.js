import facebookSocialIcon from '../img/icon-social-facebook.svg';
import instagramSocialIcon from '../img/icon-social-instagram.svg';
import twitterSocialIcon from '../img/icon-social-twitter.svg';
import youtubeSocialIcon from '../img/icon-social-youtube.svg';

const HeaderMenu = [
  {
    url: `/services`,
    label: `Услуги`
  },
  {
    url: `/credit-calculator`,
    label: `Рассчитать кредит`
  },
  {
    url: `/currency-converter`,
    label: `Конвертер валют`
  },
  {
    url: `/contact-information`,
    label: `Контакты`
  },
  {
    url: `/feedback`,
    label: `Задать вопрос`
  },
];

const FooterMenu = [
  {
    url: `/services`,
    label: `Услуги`
  },
  {
    url: `/credit-calculator`,
    label: `Рассчитать кредит`
  },
  {
    url: `/contact-information`,
    label: `Контакты`
  },
  {
    url: `/feedback`,
    label: `Задать вопрос`
  }
];

const SocialMenu = [
  {
    url: `https://www.facebook.com/`,
    icon: facebookSocialIcon,
    label: `Логотип Facebook`,
    width: 9,
    height: 16
  },
  {
    url: `https://www.instagram.com/`,
    icon: instagramSocialIcon,
    label: `Логотип Instagram`,
    width: 16,
    height: 16
  },
  {
    url: `https://twitter.com/`,
    icon: twitterSocialIcon,
    label: `Логотип Twitter`,
    width: 16,
    height: 13
  },
  {
    url: `https://www.youtube.com/`,
    icon: youtubeSocialIcon,
    label: `Логотип YouTube`,
    width: 16,
    height: 13
  },
];

export { 
  HeaderMenu,
  FooterMenu, 
  SocialMenu 
};
