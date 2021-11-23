/* eslint-disable import/prefer-default-export */

export const formatDate = (timeStamp) => {
  const date = timeStamp?.toDate().toLocaleString();
  return date;
};
