/**Libraries */
import { NativeBaseProvider } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';

/**Components */
import MainNavigation from "../router";

/**Hooks */
import useCustomFonts from "../hooks/useCustomFonts";

/**Context */
import { AuthProvider } from "../providers/context";

const AppContainer = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(true);
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  
  if(!appIsReady && !fontsLoaded){
    return null
  }
  return (
    <NativeBaseProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default AppContainer;
