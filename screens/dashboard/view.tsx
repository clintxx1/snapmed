import React, { useContext } from "react";
import {
  Box,
  ScrollView,
  Text,
  Icon,
  Input,
  View,
} from "native-base";
import {
  MaterialIcons,
} from "react-native-vector-icons";
import { ScreenContext } from "../../providers/context";
import CustomCard from "../../components/card";
import { buttonColor } from "../../constants/color";
import Carousel from "react-native-reanimated-carousel";
import CustomSlide from "../../components/slide";

const DashboardView = () => {
  const {
    sampleData,
    width,
    searchPlants,
    plants,
  } = useContext(ScreenContext);

  return (
    <Box flex={1} bg={"white"}>
      <Box flex={0.9} bg={"white"}>
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
          />
        </Box>
        <ScrollView>
          <View>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={sampleData}
              scrollAnimationDuration={3000}
              // onSnapToItem={(index: any) => console.log("current index:", index)}
              renderItem={({ index }: any) => (
                <View
                  justifyContent={"center"}
                  borderRadius={"md"}
                  borderWidth={"1"}
                  borderColor={"gray.300"}
                  h={"80%"}
                  m={"2"}
                  key={index}
                >
                  <Text textAlign={"center"}>{sampleData[index].text}</Text>
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
              }}
            >
              {plants &&
                plants.map((item: any) => {
                  return (
                    <CustomCard
                      key={item.id}
                      borderRadius={"md"}
                      m={"3"}
                      w={200}
                      bg={"amber.100"}
                      text={item.text}
                      image={item.image}
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
