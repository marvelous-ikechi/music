export default formatDate = (date, time) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };
  
export const formatDateObject = (dates) => {
    const dateObject = new Date(dates)
    return `${dateObject.getDate()}/${dateObject.getMonth() +
      1}/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}`;
  };
  
