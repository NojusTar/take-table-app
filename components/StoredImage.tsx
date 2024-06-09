import { Image } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabase";

type StoredImageProps = {
  path?: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const StoredImage = ({ path, ...imageProps }: StoredImageProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage("");
      const { data, error } = await supabase.storage
        .from("images")
        .download(path);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image source={{ uri: image || "null" }} {...imageProps} />;
};

export default StoredImage;
