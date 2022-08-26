import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../store/action';

const Tabs = ({ currentTab, onCurrentTabSet }) => {
  return (
    <section className="tabs container center">
      <h2 className="visually-hidden">Подробности об услугах</h2>
      <ul className="tabs__list">
        <li>
          <input className="tabs__input visually-hidden" type="radio" name="tab" value="services-tab-deposits" id="services-tab-deposits" onChange={() => {onCurrentTabSet(`services-tab-deposits`)}} checked={currentTab === `services-tab-deposits`} />
          <label className="tabs__label tabs__label--deposits" htmlFor="services-tab-deposits">
            Вклады
          </label>
        </li>
        <li>
          <input className="tabs__input visually-hidden" type="radio" name="tab" value="services-tab-credits" id="services-tab-credits" onChange={() => {onCurrentTabSet(`services-tab-credits`)}} checked={currentTab === `services-tab-credits`} />
          <label className="tabs__label tabs__label--credits" htmlFor="services-tab-credits">
            Кредиты
          </label>
        </li>
        <li>
          <input className="tabs__input visually-hidden" type="radio" name="tab" value="services-tab-insurance" id="services-tab-insurance" onChange={() => {onCurrentTabSet(`services-tab-insurance`)}} checked={currentTab === `services-tab-insurance`} />
          <label className="tabs__label tabs__label--insurance" htmlFor="services-tab-insurance">
            Страхование
          </label>
        </li>
        <li>
          <input className="tabs__input visually-hidden" type="radio" name="tab" value="services-tab-online-services" id="services-tab-online-services" onChange={() => {onCurrentTabSet(`services-tab-online-services`)}} checked={currentTab === `services-tab-online-services`} />
          <label className="tabs__label tabs__label--online-services" htmlFor="services-tab-online-services">
            Онлайн-сервисы
          </label>
        </li>
      </ul>
      {currentTab === `services-tab-deposits` && 
        <div className="tabs__wrapper tabs__wrapper--deposits">
          <h3 className="tabs__heading">Вклады Лига Банка – это выгодная инвестиция в свое будущее</h3>
          <ul className="tabs__item-list">
            <li>Проценты по вкладам до 7%</li>
            <li>Разнообразные условия</li>
            <li>Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
          </ul>
          <a className="tabs__link" href="/deposits">Узнать подробнее</a>
        </div>
      }
      {currentTab === `services-tab-credits` && 
        <div className="tabs__wrapper tabs__wrapper--credits">
          <h3 className="tabs__heading">Лига Банк выдает кредиты под любые цели</h3>
          <ul className="tabs__item-list">
            <li>Ипотечный кредит</li>
            <li>Автокредит</li>
            <li>Потребительский кредит</li>
          </ul>
          <p>
            Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим <a className="tabs__link-text" href="/credits">кредитным калькулятором</a>
          </p>
        </div>
      }
      {currentTab === `services-tab-insurance` && 
        <div className="tabs__wrapper tabs__wrapper--insurance">
          <h3 className="tabs__heading">Лига Страхование — застрахуем все что захотите</h3>
          <ul className="tabs__item-list">
            <li>Автомобильное страхование</li>
            <li>Страхование жизни и здоровья</li>
            <li>Страхование недвижимости</li>
          </ul>
          <a className="tabs__link" href="/deposits">Узнать подробнее</a>
        </div>
      }
      {currentTab === `services-tab-online-services` && 
        <div className="tabs__wrapper tabs__wrapper--online-services">
          <h3 className="tabs__heading">Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</h3>
          <ul className="tabs__item-list">
            <li>Мобильный банк, который всегда под рукой</li>
            <li>Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</li>
          </ul>
          <a className="tabs__link" href="/deposits">Узнать подробнее</a>
        </div>
      }
    </section>
  );
};

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onCurrentTabSet: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCurrentTabSet(currentTab) {
    dispatch(ActionCreator.onCurrentTabSet(currentTab));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
