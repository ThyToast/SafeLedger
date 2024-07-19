export const getTransaction = async () => {
  const response = await fetch(
    "https://mocki.io/v1/471d6588-f7ca-4d4c-b523-cdf96199a947"
  );

  return response;
};
