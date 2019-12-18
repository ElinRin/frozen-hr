import React from "react";

import map from "../../images/office-map.jpeg";
import { WorkplaceMapSeat } from "..";

import "./WorkplaceMap.css";

export const WorkplaceMap = ({ listToDisplay }) => {
  return (
    <div className="wrapper">
      <div className="map">
        <img className="map-image" src={map} alt="" />
        {listToDisplay.map((item, i) => (
          <WorkplaceMapSeat
            id={item.id}
            x={item.x}
            y={item.y}
            color={item.userId === undefined ? "#1c7430" : "#e20074"}
            uid={item.userId}
            key={`${item.x}${item.y}`}
          />
        ))}
      </div>
    </div>
  );
};
