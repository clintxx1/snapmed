import React from "react";
import { ScreenContext } from "../../providers/context";
import ListView from "./view";

const List = () => {
  return (
    <ScreenContext.Provider value={{text: "List Screen"}}>
      <ListView />
    </ScreenContext.Provider>
  );
};

export default List;
