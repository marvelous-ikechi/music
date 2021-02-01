export const getActionName = (actionType) => {
  //   if (typeof actionType !== 'string') {
  //     return null;
  //   }
  return typeof actionType !== 'string'
    ? null
    : actionType.split('_').slice(0, -1).join('_');
};

export const createLoadingActionType = (suffix) => {
  return (actionName) => {
    return `${actionName}_${suffix}`;
  };
};
