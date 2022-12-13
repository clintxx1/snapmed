import React from 'react'
import { ScreenContext } from '../../providers/context'

const Account = () => {
  return (
    <ScreenContext.Provider value={{text: "Account Screen"}}>
      
    </ScreenContext.Provider>
  )
}

export default Account