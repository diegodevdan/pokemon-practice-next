import type {GetStaticProps, NextPage} from 'next'
import {Button, Card, Grid, Row, Text} from "@nextui-org/react";
import Layout from "../components/layouts/Layout";
import {pokeApi} from "../api";
import {PokemonListResponse, SmallPokemon} from "../interfaces";
import PokemonCard from "../components/pokemon/PokemonCard";

interface Props {
    pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {

    return (
        <Layout title="Listado de pokemons">
            <h1>Hello world</h1>
            <Grid.Container gap={2} justify={'flex-start'}>
                {
                    pokemons.map(pokemon => (

                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))
                }
            </Grid.Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemon: SmallPokemon [] = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    }))

    // console.log(pokemon)

    return {
        props: {
            pokemons: pokemon
        }
    }
}

export default HomePage
