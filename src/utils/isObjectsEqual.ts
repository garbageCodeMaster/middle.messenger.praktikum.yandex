interface LooseObject {
  [key: string]: any;
}

export function isObjectsEqual(object1: LooseObject, object2: LooseObject): LooseObject {
  const propsUpdated = {} as LooseObject;

  for (const key2 in object2) {
    if (!object1[key2] || (object1[key2] !== object2[key2] && typeof object1[key2] !== 'function')) {
      propsUpdated[key2] = object2[key2];
    }
  }

  return propsUpdated;
}
