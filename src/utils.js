export const ApiEndpoint = "http://localhost:5000";

export const FormateData = (date) => {
  if (!date) {
    const newDate = new Date();
    return newDate;
  } else {
    const newDate = date.split("T");
    return newDate[0];
  }
};
