import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PageTransition } from "next-page-transitions"
// import { useRouter } from "next/router";

export default function Layout ({children}) {
    // const router = useRouter
    return (
        <div>
            <Head>
                <title>Ebony Memo</title>
            </Head>
            <Navbar/>
            <PageTransition timeout={500} classNames="page-transition">
                <AnimatedPortion children={children}/>
            </PageTransition>
        </div>
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