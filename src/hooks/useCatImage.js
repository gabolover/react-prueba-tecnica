import { useEffect, useState } from "react";

export const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ", 3).join(" ");

    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`)
      .then((res) => res.url)
      .then((response) => {
        setImageUrl(response);
      });
  }, [fact]);

  return { imageUrl };
};
