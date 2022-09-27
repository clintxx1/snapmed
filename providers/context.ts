import { createContext } from "react";

const AppContext = createContext<any>({});
const ScreenContext = createContext<any>({});

export { AppContext, ScreenContext, };