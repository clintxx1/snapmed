import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { PLANT_INFO } from "../../constants/screen-names";
import { getPlantDetails } from "../../lib/helper";
import { ScreenContext } from "../../providers/context";
import DashboardView from "./view";

var nwssu = require("../../assets/nwssu-transformed.png");
var cameraIcon = require("../../assets/camera-icon.png");
var flowerIcon = require("../../assets/flower-pot.png");
var predictIcon = require("../../assets/predictive-chart.png");

const Dashboard = ({ navigation }: any) => {
  const [selected, setSelected] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const width: number = Dimensions.get("window").width;
  const height: number = Dimensions.get("window").height;
  const [plants, setPlants] = useState<object[]>(getPlantDetails());
  const carouselData = [
    {
      id: 1,
      text: "A thesis project created by BSCS",
      image: nwssu,
    },
    {
      id: 2,
      text: "Capture a plant",
      image: cameraIcon,
    },
    {
      id: 3,
      text: "Predict the result base on the model",
      image: predictIcon,
    },
    {
      id: 4,
      text: "Show results and the medicinal plants info",
      image: flowerIcon,
    },
  ];

  const searchPlants = (plant: string) => {
    if (plant) {
      setSearchText(plant);
    } else {
      setSearchText("");
    }
  };

  const handlePlantClick = (index: number) => {
    setSearchText("");
    navigation.navigate(PLANT_INFO, {
      prediction: index,
    });
  };

  useEffect(() => {
    if (searchText) {
      const newPlants = plants.filter((e: any) =>
        e.name.toLowerCase().match(searchText.toLowerCase())
      );
      setPlants(newPlants);
    } else {
      setPlants(getPlantDetails());
    }
  }, [searchText]);

  // useEffect(() => {
  //   if(selected !== 0){
  //     if(selected === 1 && !currentUser){
  //       Alert.alert("Warning", GetErrorMessage("NOT_LOGIN"), [
  //         {
  //           text: "Login",
  //           onPress: () => navigation.navigate(LOGIN, {currentDisplay: FAVORITE})
  //         },
  //         {
  //           text: "Cancel"
  //         }
  //       ])
  //     }
  //     if(selected === 2 && !currentUser){
  //       Alert.alert("Warning", GetErrorMessage("NOT_LOGIN"), [
  //         {
  //           text: "Login",
  //           onPress: () => navigation.navigate(LOGIN, {currentDisplay: LIST})
  //         },
  //         {
  //           text: "Cancel"
  //         }
  //       ])
  //     }
  //     if(selected === 3 && !currentUser){
  //       Alert.alert("Warning", GetErrorMessage("NOT_LOGIN"), [
  //         {
  //           text: "Login",
  //           onPress: () => navigation.navigate(LOGIN, {currentDisplay: ACCOUNT})
  //         },
  //         {
  //           text: "Cancel"
  //         }
  //       ])
  //     }
  //     navigation.navigate(privateScreenToggle(selected));
  //   }
  // }, [selected]);

  // useEffect(() => {
  //   if(route?.params){
  //     const { keyState }:any = route?.params;
  //     setSelected(keyState);
  //   }
  // }, [route?.params])

  const values = {
    carouselData,
    selected,
    setSelected,
    width,
    height,
    searchPlants,
    plants,
    handlePlantClick,
    searchText,
  };
  return (
    <ScreenContext.Provider value={values}>
      <DashboardView />
    </ScreenContext.Provider>
  );
};

export default Dashboard;
