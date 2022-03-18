import React, {FC} from 'react';
import {Card, Grid} from "@nextui-org/react";
import {useRouter} from "next/router";

interface Props {
    id: number
}

const CardPokemon:FC<Props> = ({id}) => {

    const router = useRouter();
    const onFavoriteClick = () => {
        router.push(`/pokemon/${id}`)
    }

    return (
        <Grid key={id} xs={6} sm={3} md={2} xl={1}>
            <Card
                hoverable
                clickable
                css={{padding: 10}}
                onClick={onFavoriteClick}
            >
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    );
};

export default CardPokemon;
