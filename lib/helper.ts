import { ACCOUNT, DASHBOARD, FAVORITE, LIST } from "../constants/screen-names";

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
    case "NOT_LOGIN":
      errorMessage = "Please login to see your saved plants.";
      break;
    default:
      errorMessage = "Something went wrong. Please try again later.";
      break;
  }
  return errorMessage;
};

export const privateScreenToggle = (index: number) => {
  const screens = [
    {
      key: 0,
      title: DASHBOARD,
    },
    {
      key: 1,
      title: FAVORITE,
    },
    {
      key: 2,
      title: LIST,
    },
    {
      key: 3,
      title: ACCOUNT,
    },
  ];
  return screens[index].title;
};
