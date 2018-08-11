import 'reflect-metadata';

import { TypexStorage } from "../storage/storage";
import { METADATA_KEY } from '../enums/metadata-keys.enum';

export const Reducer = (key: string) => {
  return (target: any) => {
    TypexStorage().reducerStorage.push({
      target,
      key,
      metadataKey: METADATA_KEY.REDUCER
    });
    Reflect.defineMetadata(METADATA_KEY.REDUCER, key, target);
  }
}

export const TypexReducers = (initialState: any) => {
  return (state = initialState, action: any) => {
    const reducer = TypexStorage().actionReducerStorage.find(
      (actionReducer) => actionReducer.key.toLowerCase() === action.type.toLowerCase()
    );
    if (!reducer) return state;
    return reducer.target(state, action);
  }
}