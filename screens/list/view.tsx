import {
  Box,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Spinner,
  View,
} from "native-base";
import React, { useContext } from "react";
import ItemList from "../../components/itemList";
import { buttonColor } from "../../constants/color";
import { PLANT_INFO } from "../../constants/screen-names";
import { ScreenContext } from "../../providers/context";
import { MaterialIcons } from "react-native-vector-icons";

const ListView = () => {
  const { loading, plants, handleItemClick, searchPlants, searchText } =
    useContext(ScreenContext);
  return (
    <View bgColor={"white"} h={"full"}>
      {!loading ? (
        <ScrollView>
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
          {plants &&
            plants.map((value: any, index: any) => {
              return (
                <ItemList
                  key={value?.id}
                  image={value?.image}
                  title={value?.name}
                  scientificName={value?.scientificName}
                  onPress={() => handleItemClick(index)}
                />
              );
            })}
        </ScrollView>
      ) : (
        <HStack space={2} justifyContent="center" top={"50%"}>
          <Spinner color={"emerald.500"} />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      )}
    </View>
  );
};

export default ListView;
