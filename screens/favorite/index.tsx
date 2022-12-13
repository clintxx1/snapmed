import { Text } from "native-base";
import React from "react";
import { ScreenContext } from "../../providers/context";
import FavoriteView from "./view";

const Favorite = () => {

  return (
    <ScreenContext.Provider value={{text: "Favorite Screen"}}>
      <FavoriteView />
    </ScreenContext.Provider>
  );
};

export default Favorite;
