import React, {FC} from 'react';
import Head from 'next/head'
import Navbar from "../ui/Navbar";

interface props {
    title?: string
}

const Layout: FC<props> = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Diego Herrera"/>
                <meta name="description" content="Información sobres el pokemon"/>
                <meta name="keywords" content="pokemon, pokedex"/>

                <meta property="og:title" content={`Info about ${title}`} />
                <meta property="og:description" content={`Info about ${title}`} />
                {/*<meta property="og:image" content="loca" />*/}

            </Head>

            <Navbar/>

            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
