import Navbar from "./Navbar"
import Footer from "./Footer"
import Head from "next/head"
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PageTransition } from "next-page-transitions"
// import { useRouter } from "next/router";

const PAGE_TITLE = "Ebony Memo"

export default function Layout ({children}) {
    // const router = useRouter
    return (
        <>
            <Head>
                <title>{PAGE_TITLE}</title>
                <meta property="og:title" content={PAGE_TITLE} key="title"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#00aba9"/>
                <meta name="theme-color" content="#ffffff"/>
            </Head>
            <Navbar/>
            {/* <PageTransition timeout={500} classNames="page-transition"> */}
                {/* <AnimatedPortion children={children}/> */}
                <>
                    {children}
                    <Footer/>
                </>
            {/* </PageTransition> */}
        </>
    )
}

// Workaround
// Only one child allowed within PageTransition?
const AnimatedPortion = ({children}) => (
    <>
        {children}
        <Footer/>
    </>
)