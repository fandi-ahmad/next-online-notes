import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  isLoadingScreen: boolean
};

const initialState: typeState = {
  isLoadingScreen: true
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }