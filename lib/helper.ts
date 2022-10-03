export const GetErrorMessage = (value: string) => {
  let errorMessage = "";

  switch (value) {
    case "NON_EXISTING_USER":
      errorMessage =
        "The username you entered is not yet registered to any account.";
      break;
    case "RESET_PASSWORD_CONFIRMATION":
      errorMessage = "Confirmation sent. Please check your email.";
      break;
    case "SOMETHING_WENT_WRONG":
      errorMessage = "Something went wrong. Please reload the page.";
      break;
    case "REGISTER_SUCCESS":
      errorMessage = "Successfully registered. Proceed to login";
      break;
    default:
      errorMessage = "Something went wrong. Please try again later.";
      break;
  }
  return errorMessage;
};
