import React, { createContext, useReducer, useContext } from 'react'
import reducer, { initialState } from './reducer'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)
export const useAppDispatch = () => useContext(AppDispatchContext)