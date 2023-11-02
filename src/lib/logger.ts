export const logger = (message: any) => {
  console.log(message);
};

logger.error = (error: any) => {
  console.error(error);
};
