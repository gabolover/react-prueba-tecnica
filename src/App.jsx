import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=:size&fontColor=:color`;

export const App = () => {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    const json = await res.json();
    const { fact } = json;
    setFact(fact);
  };

  useEffect(getRandomFact, []);

  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ", 3).join(" ");

    fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red`)
      .then((res) => res.url)
      .then((response) => {
        setImageUrl(response);
      });
  }, [fact]);

  const handleClick = () => {
    getRandomFact();
  };
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>App de gatos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the first word ${fact}`}
        />
      )}
    </main>
  );
};
