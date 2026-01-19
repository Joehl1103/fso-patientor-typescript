export function exhaustiveTypeGuard(_: never): never {
  throw new Error(`${_} is not a valid type.`);
};
