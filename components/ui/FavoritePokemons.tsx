import React, {FC} from 'react';
import {Grid} from "@nextui-org/react";
import CardPokemon from "./CardPokemon";

interface Props {
    pokemons: number[]
}

const FavoritePokemon:FC<Props> = ({pokemons}) => {

    return (
        <Grid.Container
            gap={2}
            direction='row'
            justify='flex-start'
        >
            {
                pokemons.map(id => (<CardPokemon key={id} id={id}/>))
            }
        </Grid.Container>
    );
};

export default FavoritePokemon;
