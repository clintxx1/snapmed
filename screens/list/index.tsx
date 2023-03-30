import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { DASHBOARD, PLANT_INFO } from "../../constants/screen-names";
import { getPlantDetails } from "../../lib/helper";
import { ScreenContext } from "../../providers/context";
import ListView from "./view";

const List = ({ navigation }: any) => {
  const [plants, setPlants] = useState(getPlantDetails());
  const [searchText, setSearchText] = useState<string>("");

  const searchPlants = (e: string) => {
    if (e) {
      setSearchText(e);
    } else {
      setSearchText("");
    }
  };

  const handleItemClick = (index: number) => {
    setSearchText("");
    navigation.navigate(PLANT_INFO, {
      prediction: index,
    });
  };

  useEffect(() => {
    if (searchText) {
      const newPlants = plants.filter((f: any) =>
        f.name.toLowerCase().match(searchText.toLowerCase())
      );
      setPlants(newPlants);
    } else {
      setPlants(getPlantDetails());
    }
  }, [searchText]);

  useEffect(() => {
    const backAction = () => {
      setSearchText("");
      navigation.navigate(DASHBOARD, { keyState: 0 });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const values = {
    navigation,
    plants,
    searchPlants,
    searchText,
    handleItemClick,
  };
  return (
    <ScreenContext.Provider value={values}>
      <ListView />
    </ScreenContext.Provider>
  );
};

export default List;
