import { Stagger, Image } from "native-base";
import React, { useEffect, useState } from "react";

const CustomSlide = ({children}:any) => {
    return (
    <Stagger
      visible={true}
      initial={{
        opacity: 0,
        scale: 0,
        translateY: 34,
      }}
      animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          mass: 0.8,
          stagger: {
            offset: 30,
            reverse: true,
          },
        },
      }}
      exit={{
        translateY: 34,
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 100,
          stagger: {
            offset: 30,
            reverse: true,
          },
        },
      }}
    >
      {children}
    </Stagger>
  );
};

export default CustomSlide;
