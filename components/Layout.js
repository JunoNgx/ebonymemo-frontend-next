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