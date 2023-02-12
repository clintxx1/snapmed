import React, { useEffect } from "react";
import { ScreenContext } from "../../providers/context";
import PlantInfoView from "./view";

const PlantInfo = ({ navigation, route }: any) => {
  const { prediction, id } = route?.params ?? "";
  useEffect(() => {
    if (route.params) {
      console.log("trigger", route?.params);
    }
  }, [route]);
  const values = {
    prediction,
  };
  return (
    <ScreenContext.Provider value={values}>
      <PlantInfoView />
    </ScreenContext.Provider>
  );
};

export default PlantInfo;
