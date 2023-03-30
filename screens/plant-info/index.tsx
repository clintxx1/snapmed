import React, { useEffect, useState } from "react";
import { DASHBOARD } from "../../constants/screen-names";
import { getPlantDetails } from "../../lib/helper";
import { ScreenContext } from "../../providers/context";
import PlantInfoView from "./view";

const PlantInfo = ({ navigation, route }: any) => {
  const { prediction, percentage } = route?.params ?? "";
  const [plantInfo, setPlantInfo] = useState<object>({});
  useEffect(() => {
    if (route.params) {
      console.log("trigger", route?.params);
      setPlantInfo(getPlantDetails()[Number(prediction)]);
    }
  }, [route]);

  const handleBackPress = () => {
    navigation.navigate(DASHBOARD, { keyState: 0 });
  };

  const values = {
    prediction,
    handleBackPress,
    plantInfo,
  };
  return (
    <ScreenContext.Provider value={values}>
      <PlantInfoView />
    </ScreenContext.Provider>
  );
};

export default PlantInfo;
