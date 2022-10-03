import React, { useState } from "react";
import { ScreenContext } from "../../providers/context";
import DashboardView from "./view";

const Dashboard = () => {
  const [test, setTest] = useState<string>("");

  
  const values = {
    test
  };
  return (
    <ScreenContext.Provider value={values}>
      <DashboardView />
    </ScreenContext.Provider>
  );
};

export default Dashboard;
