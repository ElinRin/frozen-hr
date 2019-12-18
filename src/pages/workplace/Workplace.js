import React, { useLayoutEffect, useState, useContext } from "react";

import { WorkplaceFilter, WorkplaceMap, Loader } from "../../components";
import { WorkPlaceInfoContext } from "../../app/Context";
import { fetchWorkPlaceList } from "../../actions/workPlace";
import { ProfileContext } from "../../app/Context";

import "./Workplace.css";

export const Workplace = () => {
  const [workPlaceInfo, workPlaceInfoDispatch] = useContext(
    WorkPlaceInfoContext
  );
  const [profile] = useContext(ProfileContext);

  useLayoutEffect(() => {
    fetchWorkPlaceList(workPlaceInfoDispatch);
  }, [workPlaceInfoDispatch]);

  const workPlaceList = workPlaceInfo.workPlaceList || [];
  const [listToDisplay, setListDisplay] = useState(null);

  return profile.userId && profile.fullName && workPlaceInfo.workPlaceList ? (
    <div>
      <div className="workplace-vertical-divs workplace-down-row">
        <div className="workplace-left-column">
          <WorkplaceFilter
            setListDisplay={setListDisplay}
            workPlaceList={workPlaceList}
          />
        </div>
        <div className="workplace-right-column">
          <WorkplaceMap listToDisplay={listToDisplay || workPlaceList} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
