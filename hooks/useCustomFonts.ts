import { useFonts } from "expo-font";
import {
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_900Black
  } from "@expo-google-fonts/nunito";



export default function useCustomFonts() {
let [fontsLoaded, error] = useFonts({
    ExtraLight: Nunito_200ExtraLight,
    Light: Nunito_300Light,
    Regular: Nunito_400Regular,
    Medium: Nunito_600SemiBold,
    Bold: Nunito_700Bold,
    ExtraBold: Nunito_900Black 
    });

    return fontsLoaded;
}
