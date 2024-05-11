import { createGlobalState } from 'react-hooks-global-state'

interface typeState {
  isLoadingScreen: boolean,
  profilePicture: string,
  currentUsername: string,
  idUser: number,
};

const initialState: typeState = {
  isLoadingScreen: true,
  profilePicture: '',
  currentUsername: '',
  idUser: NaN
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }