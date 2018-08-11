import 'reflect-metadata';

import { TypexStorage } from '../storage/storage';
import { METADATA_KEY } from '../enums/metadata-keys.enum';

export const ActionReducer = (actionTypeName: string) => {
  return (target: any, targetKey: string, descriptor: PropertyDescriptor) => {
    const methodFunction = target[targetKey];
    TypexStorage().actionReducerStorage.push({
      target: methodFunction,
      key: actionTypeName,
      metadataKey: METADATA_KEY.ACTION
    });
    Reflect.defineMetadata(METADATA_KEY.ACTION, actionTypeName, methodFunction);
  }
}