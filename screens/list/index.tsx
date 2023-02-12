import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { DASHBOARD } from "../../constants/screen-names";
import { GET_PLANTS_INFO } from "../../lib/query";
import { ScreenContext } from "../../providers/context";
import ListView from "./view";

const List = ({navigation}:any) => {
  const {data, loading, error} = useQuery(GET_PLANTS_INFO);
  const [plants, setPlants] = useState();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(DASHBOARD, {keyState: 0})
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if(data){
      let temp = data.plants_info.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          details: item.details,
        }
      })
      console.log("PLANTS: ", temp);
      setPlants(temp)
    }
    if(error){
      console.log("ERROR: ", error);     
    }
  }, [data, error]);

  const values = {
    plants,
    text: "List Screen",
    loading,
    navigation,
  }

  return (
    <ScreenContext.Provider value={values}>
      <ListView />
    </ScreenContext.Provider>
  );
};

export default List;
