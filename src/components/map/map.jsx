import MapImage from "../../img/map@2x.jpg";

const Map = () => {
  return (
    <section className="map container center">
      <h2 className="map__heading">Отделения Лига Банка</h2>
      <img className="map__image" src={MapImage} width="1170" height="462" alt="" />
    </section>
  );
};

export default Map;
