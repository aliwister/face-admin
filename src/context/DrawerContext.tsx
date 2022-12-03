import React, { useReducer, createContext } from 'react';

interface ContextProps {
  drawerDispatch: Function,
  drawerState: any
}

const initialState = {
  isOpen: false,
  drawerComponent: null,
  data: null,
};
type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        isOpen: true,
        drawerComponent: action.drawerComponent,
        data: action.data,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        isOpen: false,
        drawerComponent: null,
        data: null,
      };
    default:
      return state;
  }
}

export const DrawerContext = createContext({} as ContextProps);

export const DrawerProvider = (props: any) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DrawerContext.Provider
      value={{
        drawerDispatch: dispatch,
        drawerState: state
      }}
    >
      {props.children}
    </DrawerContext.Provider>
  );

}

/*
const [useDrawerState, useDrawerDispatch, DrawerProvider] = useCreateContext(
  initialState,
  reducer
);
*/

//export { useDrawerState, useDrawerDispatch, DrawerProvider };
