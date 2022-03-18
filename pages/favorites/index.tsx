import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import Layout from "../../components/layouts/Layout";
import NoFavorites from "../../components/ui/NoFavorites";
import {localFavorites} from "../../utils";
import {Card, Grid} from "@nextui-org/react";
import FavoritePokemon from "../../components/ui/FavoritePokemons";

const FavoritesPage: NextPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number []>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons);
    }, []);


    return (
        <Layout title='Favorites pokemons'>
            {
                !favoritePokemons.length
                    ? (<NoFavorites/>)
                    : (<FavoritePokemon pokemons={favoritePokemons} />)
            }
        </Layout>
    );
};

export default FavoritesPage;
