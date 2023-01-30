import React, { useEffect, useState } from "react";
import { Alert, Dimensions } from "react-native";
import { ACCOUNT, FAVORITE, LIST, LOGIN } from "../../constants/screen-names";
import { GetErrorMessage, privateScreenToggle } from "../../lib/helper";
import { ScreenContext, useAuth } from "../../providers/context";
import DashboardView from "./view";

var akapulko = require("../../assets/akapulks.jpg");
var ampalaya = require("../../assets/ampalaya-data.jpg");
var bayabas = require("../../assets/bayabas-dta.jpg");
var tsaangGubat = require("../../assets/tsaang-gubat-data.jpg");

const Dashboard = ({navigation, route}: any) => {
  const { currentUser } = useAuth();
  const [selected, setSelected] = useState<number>(0);
  const width: number = Dimensions.get("window").width;
  const height: number = Dimensions.get("window").height;
  const sampleData = [
    {
      id: 1,
      text: "Sample",
      image: akapulko,
    },
    {
      id: 2,
      text: "Sample1",
      image: ampalaya,
    },
    {
      id: 3,
      text: "Sample2",
      image: bayabas,
    },
    {
      id: 4,
      text: "Lorem ipsum",
      image: tsaangGubat,
    },
    {
      id: 5,
      text: "dolor sit amet consectetur",
      image: akapulko,
    },
    {
      id: 6,
      text: "adipisicing elit",
      image: ampalaya,
    },
    {
      id: 7,
      text: "Error labore suscipi",
      image: bayabas,
    },
    {
      id: 8,
      text: "Lenim aut eligendi!",
      image: tsaangGubat,
    },
  ];
  const [plants, setPlants] = useState<object[]>(sampleData);

  const searchPlants = (plant: string) => {
    if (plant) {
      const newPlants = sampleData.filter((e: any) =>
        e.text.toLowerCase().match(plant.toLowerCase())
      );
      setPlants(newPlants);
    }
    if (!plant) {
      setPlants(sampleData);
    }
  };

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
    sampleData,
    selected,
    setSelected,
    width,
    height,
    searchPlants,
    plants,
  };
  return (
    <ScreenContext.Provider value={values}>
      <DashboardView />
    </ScreenContext.Provider>
  );
};

export default Dashboard;
