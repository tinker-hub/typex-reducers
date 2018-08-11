import { IReducerStorage, IActionStorage } from "../interface/";

const reducerStorage: IReducerStorage[] = [];
const actionReducerStorage: IActionStorage[] = [];

export const TypexStorage = () => {
  return {
    reducerStorage: Proxied(reducerStorage, 'key'),
    actionReducerStorage: Proxied(actionReducerStorage, 'key')
  }
}

function Proxied (target, propertyKey): any[] {
  return new Proxy(target, proxyUniqueHandler(propertyKey));
}

function proxyUniqueHandler (propertyKey) {
  const excludedProperties = ['length'];
  return {
    set: (target: any, property: any, value: any, receiver) => {
      if (excludedProperties.indexOf(property) > -1) return true;
      if (!propertyKey || typeof propertyKey !== 'string') {
        console.error(`Storage expects the property key to be a string. Received property key = ${propertyKey}`);
        return false;
      }
      if (!value.hasOwnProperty(propertyKey)) {
        console.error(`Storage expects a value to be an object and has a property ${propertyKey}`);
        return false;
      }
      const isItemExisting = target.find((targetItem) => 
        targetItem[propertyKey].toLowerCase() === value[propertyKey].toLowerCase());
      if (isItemExisting) {
        console.error(`Value ${value[propertyKey]} is already existing in the storage`);
        return false;
      }
      target[property] = value;
      return true;
    }
  }
}
