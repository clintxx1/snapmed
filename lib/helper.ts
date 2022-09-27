export const GetErrorMessage = (value: string) => {
  let errorMessage = "";

  switch (value) {
    case "NON_EXISTING_USER":
      errorMessage =
        "The username you entered is not yet registered to any account.";
      break;
    default:
      errorMessage = "Something went wrong. Please try again later.";
      break;
  }
  return errorMessage;
};
