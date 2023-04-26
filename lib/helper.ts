import { ACCOUNT, DASHBOARD, FAVORITE, LIST } from "../constants/screen-names";
import { IconDetails } from "../types";
import plantsDescription from "../assets/plants.json";
var ampalaya = require("../assets/plant-icon/ampalaya-transformed.png");
var bawang = require("../assets/plant-icon/bawang-transformed.png");
var lagundi = require("../assets/plant-icon/lagundi-transformed.png");
var sambong = require("../assets/plant-icon/sambong-transformed.png");
var tsaangGubat = require("../assets/plant-icon/tsaanggubat-transformed.png");
var ulasimangBato = require("../assets/plant-icon/ulasimang-bato-transformed.png");
var yerbaBuena = require("../assets/plant-icon/yerba-buena-transformed.png");

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

export const tabIconHandleChange = (route: any, focused: boolean) => {
  let iconName: IconDetails = {
    iconText: "",
    opacity: 0,
  };
  if (route === DASHBOARD) {
    iconName = {
      iconText: focused ? "home" : "home-outline",
      opacity: focused ? 1 : 0.6,
    };
  } else if (route === FAVORITE) {
    iconName = {
      iconText: focused ? "heart" : "heart-outline",
      opacity: focused ? 1 : 0.6,
    };
  } else if (route === LIST) {
    iconName = {
      iconText: focused ? "ballot" : "ballot-outline",
      opacity: focused ? 1 : 0.6,
    };
  } else if (route === ACCOUNT) {
    iconName = {
      iconText: focused ? "account" : "account-outline",
      opacity: focused ? 1 : 0.6,
    };
  }
  return iconName;
};

export const getPlantDetails = () => {
  const plantImage = [
    ampalaya,
    bawang,
    lagundi,
    sambong,
    tsaangGubat,
    ulasimangBato,
    yerbaBuena,
  ];
  const data = plantsDescription.map((plant, index) => {
    return {
      ...plant,
      image: plantImage[index],
    };
  });

  return data;
};
