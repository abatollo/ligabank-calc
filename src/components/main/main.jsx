import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from '../slider/slider';
import Tabs from '../tabs/tabs';
import Calc from '../calc/calc';
import Map from '../map/map';
import Popup from '../popup/popup';

const Main = ({ isPopupOpened }) => {
  return (
    <main>
      <Slider />
      <Tabs />
      <Calc />
      <Map />
      {isPopupOpened && <Popup />}
    </main>
  );
};

Main.propTypes = {
  isPopupOpened: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isPopupOpened: state.isPopupOpened
  };
};

export default connect(mapStateToProps)(Main);
