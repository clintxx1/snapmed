import { Stagger, Image } from "native-base";
import React, { useEffect, useState } from "react";

const CustomSlide = ( {images}: any) => {
    const [file, setFile] = useState<any>(images[0] || []);
    useEffect(() => {
        let ctr = 0;
        if(images.length > 0){
            setTimeout(() => {
                setFile(images[ctr])
            }, 2000);
            ctr++;
            // return () => clearInterval(interval);
        }
    }, [file]);

    useEffect(() => {
      if(file){
        console.log(file, "ppp");
        
      }
    }, [file])
    

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
      <Image
        source={{uri:file}}
        alt="image"
        size={250}
        resizeMode={"contain"}
        background="white"
        alignSelf={"center"}
      />
    </Stagger>
  );
};

export default CustomSlide;
