import React from 'react'
import { ScreenContext } from '../../providers/context'
import PlantInfoView from './view'

const PlantInfo = ({navigation, route}:any) => {
  const { prediction } = route.params;

  const values = {
    prediction
  }
  return (
    <ScreenContext.Provider value={values}>
        <PlantInfoView />
    </ScreenContext.Provider>
  )
}

export default PlantInfo