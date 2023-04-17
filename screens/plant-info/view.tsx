import { ScrollView, Text, View, Button } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";
import DetailsContainer from "../../components/detailsContainer";
import DetailsWrapper from "../../components/detailsWrapper";
import { buttonColor, textColor } from "../../constants/color";
import { Image } from "react-native";

const PlantInfoView = () => {
  const { handleBackPress, plantInfo } = useContext(ScreenContext);
  return (
    <View flex={1}>
      <View flex={1} display={"flex"} alignItems={"center"} bgColor={"white"}>
        <Text bold fontSize={20} color={textColor}>
          Description
        </Text>
        <ScrollView>
          <DetailsWrapper pt={10}>
            <Image
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
              hasTitle={true}
              hasImage={true}
              hasPercentage={plantInfo?.percentage ? true : false}
              percentage={plantInfo?.percentage}
              subTitle="Botany"
              subTitleContent={plantInfo?.botany}
            />
          </DetailsWrapper>
          <DetailsWrapper>
            <DetailsContainer
              key={2}
              hasTitle={false}
              hasImage={false}
              subTitle="Properties"
              subTitleContent={plantInfo?.properties}
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
              isSubTitle3={true}
              subTitle3="Ointment Preparation"
              subTitleContent3={plantInfo?.ointment}
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
        bottom={0}
        mb={12}
        alignSelf={"center"}
        onPress={handleBackPress}
      >
        Close
      </Button>
    </View>
  );
};

export default PlantInfoView;
