import { Text } from 'native-base'
import React, { useContext } from 'react'
import { ScreenContext } from '../../providers/context'

const PlantInfoView = () => {
  const { prediction } = useContext(ScreenContext);
  return (
    <Text>Ang prediksyon nako is {prediction}</Text>
  )
}

export default PlantInfoView