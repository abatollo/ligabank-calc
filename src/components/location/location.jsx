
import LocationIcon from "../../img/icon-location.svg";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { YekaterinburgCoordinates, points } from "../../const/coordinates";

const Location = () => {
  return (
    <section className="location container center" id="location">
      <h2 className="location__heading">Отделения Лига Банка</h2>
      <YMaps query={{ load: "package.full" }}>
        <Map
          state={{
            center: YekaterinburgCoordinates,
            zoom: 5,
            controls: ['zoomControl']
          }}
          width="100%"
          height="462px"
        >
          {points.map((point) => (
            <Placemark
              key={point}
              geometry={point}
              options={{
                iconLayout: "default#image",
                iconImageSize: [34, 40],
                iconImageOffset: [-17, -40],
                iconImageHref: LocationIcon
              }}
            />
          ))}
        </Map>
      </YMaps>
    </section>
  );
};

export default Location;
