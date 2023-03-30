import { ScrollView, Text, View, VStack, Button } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";
import DetailsContainer from "../../components/detailsContainer";
import DetailsWrapper from "../../components/detailsWrapper";
import { buttonColor, textColor } from "../../constants/color";
import { Alert, Image } from "react-native";

const PlantInfoView = () => {
  const { prediction, handleBackPress, plantInfo } = useContext(ScreenContext);
  console.log("IMAGE: ", plantInfo?.image);

  return (
    <View flex={1}>
      <View flex={1} display={"flex"} alignItems={"center"} bgColor={"white"}>
        <Text bold fontSize={20} color={textColor}>
          Description
        </Text>
        <ScrollView>
          <DetailsWrapper pt={10}>
            <Image
              // source={ampalaya}
              // source={require("../../assets/akapulko.png")}
              // alt="image"
              // size={100}
              // background={"transparent"}
              // alignSelf={"flex-end"}
              // position={"absolute"}
              // zIndex={1}
              // top={0}
              // right={5}
              source={plantInfo?.image}
              resizeMode={"stretch"}
              style={{
                position: "absolute",
                zIndex: 1,
                top: -20,
                right: 5,
                backgroundColor: "transparent",
                height: 150,
                width: 150,
              }}
            />
            <DetailsContainer
              key={1}
              title={plantInfo?.name}
              scientificName={plantInfo?.scientificName}
              // title={prediction}
              hasTitle={true}
              hasImage={true}
              subTitle="Botany"
              subTitleContent={plantInfo?.botany}
              //     subTitleContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              // dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
              // molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
              // officia?"
            />
          </DetailsWrapper>
          <DetailsWrapper>
            <DetailsContainer
              key={2}
              hasTitle={false}
              hasImage={false}
              subTitle="Properties"
              subTitleContent={plantInfo?.properties}
              //     subTitleContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              // dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
              // molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
              // officia?"
            />
          </DetailsWrapper>
          <DetailsWrapper>
            <DetailsContainer
              key={3}
              hasTitle={false}
              hasImage={false}
              subTitle="Uses"
              subTitleContent=""
              isSubTitle2={true}
              subTitle2="Folkloric"
              subTitleContent2={plantInfo?.folkloric}
              //   subTitleContent2="Lorem ipsum dolor sit
              // amet consectetur adipisicing elit.  -Explicabo
              // dicta quam fuga unde alias? Dolorem -ipsum sit mollitia non et alias
              // molestias consectetur beatae. Ab- excepturi veniam nam? Impedit,
              // officia?"
              isSubTitle3={true}
              subTitle3="Ointment Preparation"
              subTitleContent3={plantInfo?.ointment}
              //   subTitleContent3="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              // dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
              // molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
              // officia?"
            />
          </DetailsWrapper>
          <View h={"32"}></View>
        </ScrollView>
      </View>
      <View
        bottom={0}
        width={"full"}
        height={"32"}
        position={"absolute"}
        bgColor={"white"}
        alignItems={"center"}
        opacity={0.7}
      />
      <Button
        bgColor={buttonColor}
        my={2}
        px={20}
        minW={270}
        position="absolute"
        bottom={16}
        alignSelf={"center"}
        onPress={() => Alert.alert("Favorites", "Not yet implemented.")}
      >
        Add to Favorite
      </Button>
      <Button
        bgColor={buttonColor}
        my={2}
        px={20}
        minW={270}
        position="absolute"
        bottom={4}
        alignSelf={"center"}
        onPress={handleBackPress}
      >
        Close
      </Button>
    </View>
  );
};

export default PlantInfoView;
