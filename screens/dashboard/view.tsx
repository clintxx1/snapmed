import React, { useContext } from "react";
import { Box, ScrollView, Text, Icon, Input, View, Image } from "native-base";
import { MaterialIcons } from "react-native-vector-icons";
import { ScreenContext } from "../../providers/context";
import CustomCard from "../../components/card";
import { buttonColor, containerColor, textColor } from "../../constants/color";
import Carousel from "react-native-reanimated-carousel";
import CustomSlide from "../../components/slide";
import { getPlantDetails } from "../../lib/helper";

const DashboardView = () => {
  const { carouselData, width, searchPlants, plants, handlePlantClick, searchText } = useContext(ScreenContext);

  return (
    <Box flex={1} bg={"white"}>
      <Box flex={1} bg={"white"}>
        <Text fontSize={32} color={buttonColor} w={180} ml={"5"}>
          Let's find your plants!
        </Text>
        <Box alignItems={"center"} w={"full"} px={2} mt={5}>
          <Input
            placeholder="Search"
            placeholderTextColor={"gray.500"}
            InputLeftElement={
              <Icon
                m="2"
                as={<MaterialIcons name="search" />}
                color="gray.500"
                size="sm"
              />
            }
            onChangeText={searchPlants}
            _focus={{
              borderColor: buttonColor,
            }}
            variant="outline"
            borderStyle={"solid"}
            value={searchText}
          />
        </Box>
        <ScrollView>
          <View>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={carouselData}
              scrollAnimationDuration={3000}
              // onSnapToItem={(index: any) => console.log("current index:", index)}
              renderItem={({ index }: any) => (
                <View
                  flex={1}
                  flexDir={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"md"}
                  borderWidth={"1"}
                  borderColor={"gray.300"}
                  h={"80%"}
                  m={"2"}
                  key={index}
                >
                  <Image
                  source={carouselData[index].image}
                  alt="image"
                  size={150}
                  resizeMode={"contain"}
                  background={"transparent"}
                  alignSelf={"center"}
                  mr={10}
                />
                  <Text textAlign={"center"} w={110} color={textColor} fontWeight={200} fontSize={20}>{carouselData[index].text}</Text>
                </View>
              )}
            />
          </View>
          <CustomSlide>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 5
              }}
            >
              {plants &&
                plants.map((item: any, index: number) => {
                  return (
                    <CustomCard
                      key={item.id}
                      text={item.name}
                      image={item.image}
                      onPress={() => handlePlantClick(index)}
                      // borderRadius={"md"}
                      // m={"3"}
                      // w={200}
                      // bg={containerColor}
                    />
                  );
                })}
            </ScrollView>
          </CustomSlide>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default DashboardView;
