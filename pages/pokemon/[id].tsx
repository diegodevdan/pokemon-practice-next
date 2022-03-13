import React from 'react';
import Layout from "../../components/layouts/Layout";
import {GetStaticProps, NextPage, GetStaticPaths} from "next";
import {pokeApi} from "../../api";
import {Pokemon, PokemonListResponse, SmallPokemon} from "../../interfaces";
import {Button, Card, Container, Grid, Image, Link, Text} from "@nextui-org/react";
import NextLink from 'next/link'

interface Props {
    pokemon: Pokemon
}

const pokemonPage: NextPage<Props> = ({pokemon}) => {

    console.log(pokemon.name)

    return (
        <Layout title='Algun pokemon'>
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

                            <NextLink href='/favorites' passHref>
                                <Link>
                                    <Button
                                        color={"gradient"}
                                        ghost
                                    >
                                        Save on favorites
                                    </Button>
                                </Link>
                            </NextLink>

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

        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {

    const {id} = params as { id: string };
    const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

    return {
        props: {
            pokemon: data
        }
    }
}

export default pokemonPage;
