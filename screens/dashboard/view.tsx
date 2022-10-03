import React from "react";
import { Box, Text } from "native-base";
import { useAuth } from "../../providers/context";

const DashboardView = () => {
  const { currentUser } = useAuth();

  return (
    <Box pt={"50%"} bg={"white"}>
      <Text alignSelf={"center"}>Welcome {currentUser.email}!</Text>
      <Text alignSelf={"center"}>App Contents will be uploaded soon...</Text>
    </Box>
  );
};

export default DashboardView;
