import { ScrollView, Text, View, VStack, Image, Button } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";
import DetailsContainer from "../../components/detailsContainer";
import DetailsWrapper from "../../components/detailsWrapper";
import { buttonColor, textColor } from "../../constants/color";

const PlantInfoView = () => {
  const { prediction } = useContext(ScreenContext);
  return (
    <View flex={1}>
      <View flex={1} display={"flex"} alignItems={"center"} bgColor={"white"}>
        <Text bold fontSize={20} color={textColor}>
          Description
        </Text>
        <ScrollView>
          <DetailsWrapper pt={10}>
            <Image
              source={require("../../assets/Bayabas-11-transformed.png")}
              alt="image"
              size={100}
              resizeMode={"stretch"}
              background={"transparent"}
              alignSelf={"flex-end"}
              position={"absolute"}
              zIndex={1}
              top={0}
              right={5}
            />
            <DetailsContainer
              title={prediction}
              hasTitle={true}
              hasImage={true}
              subTitle="Botany"
              subTitleContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
          molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
          officia?"
            />
          </DetailsWrapper>
          <DetailsWrapper>
            <DetailsContainer
              hasTitle={false}
              hasImage={false}
              subTitle="Properties"
              subTitleContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
          molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
          officia?"
            />
          </DetailsWrapper>
          <DetailsWrapper>
            <DetailsContainer
              hasTitle={false}
              hasImage={false}
              subTitle="Uses"
              subTitleContent=""
              isSubTitle2={true}
              subTitle2="Folkloric"
              subTitleContent2="Lorem ipsum dolor sit 
            amet consectetur adipisicing elit.  -Explicabo
            dicta quam fuga unde alias? Dolorem -ipsum sit mollitia non et alias
            molestias consectetur beatae. Ab- excepturi veniam nam? Impedit,
            officia?"
              isSubTitle3={true}
              subTitle3="Ointment Preparation"
              subTitleContent3="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            dicta quam fuga unde alias? Dolorem ipsum sit mollitia non et alias
            molestias consectetur beatae. Ab excepturi veniam nam? Impedit,
            officia?"
            />
          </DetailsWrapper>
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
      >
        Close
      </Button>
    </View>
  );
};

export default PlantInfoView;
