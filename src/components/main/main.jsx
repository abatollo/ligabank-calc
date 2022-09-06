import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from '../slider/slider';
import Tabs from '../tabs/tabs';
import Calc from '../calc/calc';
import Location from '../location/location';
import Popup from '../popup/popup';
import Thanks from '../thanks/thanks';

const Main = ({ 
  isPopupOpened,
  isThanksOpened
}) => {
  return (
    <main>
      <Slider />
      <Tabs />
      <Calc />
      <Location />
      {isPopupOpened && <Popup />}
      {isThanksOpened && <Thanks />}
    </main>
  );
};

Main.propTypes = {
  isPopupOpened: PropTypes.bool.isRequired,
  isThanksOpened: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isPopupOpened: state.isPopupOpened,
    isThanksOpened: state.isThanksOpened
  };
};

export default connect(mapStateToProps)(Main);
