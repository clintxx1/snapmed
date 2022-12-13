import React, { useContext } from "react";
import {
  Box,
  ScrollView,
  Text,
  HStack,
  Pressable,
  Center,
  Icon,
  Input,
  View,
} from "native-base";
import {
  MaterialCommunityIcons,
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
    selected,
    setSelected,
    width,
    searchPlants,
    plants,
    height,
  } = useContext(ScreenContext);

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
              h={"1/4"}
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
      <Box h={60}>
        <HStack
          bg="white"
          alignItems="center"
          safeAreaBottom
          shadow={9}
          flex={1}
          borderTopRadius={"lg"}
          borderWidth={1}
          borderColor={"gray.300"}
        >
          <Pressable
            key={1}
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => setSelected(0)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="gray.700"
                size="md"
              />
              {/* <Text color="white" fontSize="12">
                Home
              </Text> */}
            </Center>
          </Pressable>
          <Pressable
            key={2}
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(1)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialIcons
                    name={selected === 1 ? "favorite" : "favorite-outline"}
                  />
                }
                color="gray.700"
                size="md"
              />
              {/* <Text color="white" fontSize="12">
                Favorite
              </Text> */}
            </Center>
          </Pressable>
          <Pressable
            key={3}
            cursor="pointer"
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => setSelected(2)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 2 ? "ballot" : "ballot-outline"}
                  />
                }
                color="gray.700"
                size="md"
              />
              {/* <Text color="white" fontSize="12">
                List
              </Text> */}
            </Center>
          </Pressable>
          <Pressable
            key={4}
            cursor="pointer"
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(3)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 3 ? "account" : "account-outline"}
                  />
                }
                color="gray.700"
                size="md"
              />
              {/* <Text color="white" fontSize="12">
                Account
              </Text> */}
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
};

export default DashboardView;
