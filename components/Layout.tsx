import { GlobalStyles } from '@mui/styled-engine';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import theme from 'src/theme';

const Layout = ({title,description,children}:{title:string,description:string,children:ReactNode}) => {
    return (
        <div style={{backgroundColor:theme.palette.primary.main,color:theme.palette.secondary.main}}>
            <Head>
                <title>{title} | Portland Finder 🧙‍♂️</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content="Portland Maine Finder" />
                <meta property="og:image" content={"/favicon.ico"} />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="theme-color" content={theme.palette.primary.main} />
                <meta name="robots" content="index, follow"/>
                <link rel="icon" href="/favicon.ico" />
                <GlobalStyles 
                    styles={{
                        "html, body": { padding: 0, margin: 0 },
                        "*": {
                            boxSizing: "border-box"
                        },
                        "#__next": {
                            height: "100vh",
                            width: "100vw"
                        },
                        main : {
                            height: "100%",
                            width: "100%",
                            minHeight: "100vh"
                        },
                        footer: {
                            padding: "0.5rem 1rem"
                        }
                    }}
                />
            </Head>
            <main>
                {children}
            </main>
            <footer>
                ©{new Date().getFullYear()} Portland Finder 🧙‍♂️
            </footer>
        </div>
       
    );
};

export default Layout;