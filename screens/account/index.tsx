import React, { useEffect } from 'react'
import { BackHandler } from 'react-native';
import { DASHBOARD } from '../../constants/screen-names';
import { ScreenContext } from '../../providers/context'
import AccountView from './view'

const Account = ({navigation}:any) => {
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
  return (
    <ScreenContext.Provider value={{text: "Account Screen"}}>
      <AccountView />
    </ScreenContext.Provider>
  )
}

export default Account