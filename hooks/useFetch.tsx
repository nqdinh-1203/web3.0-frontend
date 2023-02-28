import { useEffect, useState } from "react";
// import * as dotenv from 'dotenv';
// dotenv.config();

const APIKEY = process.env.NEXT_GIPHY_API;

const useFetch = ({ keyword }: { keyword: string }) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            // const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
            // const { data } = await response.json();

            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        } catch (error) {
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
    };

    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
};

export default useFetch;