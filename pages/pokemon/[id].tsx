import React, {useEffect, useState} from 'react';

import {GetStaticProps, NextPage, GetStaticPaths} from "next";
import {Pokemon, PokemonListResponse, SmallPokemon} from "../../interfaces";
import {Button, Card, Container, Grid, Image, Link, Text} from "@nextui-org/react";
import NextLink from 'next/link'
import confetti from 'canvas-confetti'

import Layout from "../../components/layouts/Layout";
import {getPokemonInfo, localFavorites} from "../../utils";
import {pokeApi} from "../../api";

interface Props {
    pokemon: Pokemon
}

const pokemonPage: NextPage<Props> = ({pokemon}) => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isInFavorites, setIsInFavorites] = useState<boolean>(localFavorites.exitInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        console.log(pokemon.id);
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites)

        if(isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }


    return (
        <Layout title={pokemon.name}>
            <Grid.Container
                css={{marginTop: '5px'}}
                gap={2}
            >
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width={'100%'}
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform={"capitalize"}>{pokemon.name}</Text>

                            <Button
                                color={"gradient"}
                                ghost={!isInFavorites}
                                onClick={onToggleFavorite}
                            >
                                Save on favorites
                            </Button>

                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction={"row"} display={"flex"}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
    // server side
    return {
        // paths: [
        //     {
        //         params: {id: '1',},
        //     },
        //     {
        //         params: {id: '2',},
        //     },
        //     {
        //         params: {id: '3',}
        //     }
        // ],

        paths: pokemon151.map(id => ({
            params: {id}
        })),

        // fallback: false
        fallback: 'blocking' // incremental static generation (ISG)
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {

    const {id} = params as {id: string};

    const pokemon = await getPokemonInfo(id);
    if(!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false //no puedes volver a ingresar a la ruta que visitaste.
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400 // seconds // incremental static regeneration (ISR)
    }
}

export default pokemonPage;
