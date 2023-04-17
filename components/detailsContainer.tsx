import React from "react";
import { Card, Text, VStack, HStack } from "native-base";
import { containerColor, fadeText, textColor } from "../constants/color";

const DetailsContainer = (props: any) => {
  const {
    title = "Lorem",
    scientificName = "Ipsum",
    hasPercentage,
    percentage,
    hasTitle,
    subTitle,
    subTitleContent,
    isSubTitle2 = false,
    subTitle2,
    subTitleContent2,
    isSubTitle3 = false,
    subTitle3,
    subTitleContent3,
  } = props;

  const titleContextSplitter = (value: string) => {
    if (!value) return null;
    const contentArray = value.split("-");

    if (contentArray && contentArray.length > 1) {
      return contentArray.map((item: string) => {
        return <Text color={textColor}> - {item}</Text>;
      });
    } else {
      return <Text color={textColor}>{value}</Text>;
    }
  };

  return (
    <Card
      flex={1}
      backgroundColor={containerColor}
      w={"full"}
      borderRadius={16}
      justifyContent={"space-between"}
      {...props}
    >
      {hasTitle && (
        <HStack>
          <VStack>
            <Text color={textColor} bold fontSize={18}>
              {title}
            </Text>
            {hasPercentage && (
              <Text
                color={textColor}
                italic
                fontSize={12}
                underline
              >{`Accuracy: (${percentage}%)`}</Text>
            )}
            <Text color={fadeText} italic>
              {scientificName}
            </Text>
          </VStack>
        </HStack>
      )}
      <VStack mt={2}>
        <Text color={textColor} underline bold>
          {subTitle}
        </Text>
        {titleContextSplitter(subTitleContent)}
      </VStack>
      {isSubTitle2 && (
        <VStack mt={2}>
          <Text color={textColor} underline bold>
            {subTitle2}
          </Text>
          {titleContextSplitter(subTitleContent2)}
        </VStack>
      )}
      {isSubTitle3 && (
        <VStack mt={2}>
          <Text color={textColor} underline bold>
            {subTitle3}
          </Text>
          {titleContextSplitter(subTitleContent3)}
        </VStack>
      )}
    </Card>
  );
};

export default DetailsContainer;
