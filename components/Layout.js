import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PageTransition } from "next-page-transitions"
import { useRouter } from "next/router";

export default function Layout ({children}) {
    const router = useRouter
    return (
        <div>
            <Head>
                <title>Ebony Memo</title>
            </Head>
            <Navbar/>
            {/* <TransitionGroup> */}
                <PageTransition key={router.pathname} timeout={1000}  classNames="page-transition">
                    {children}
                </PageTransition>
            {/* </TransitionGroup> */}
            <Footer/>
        </div>
    )
}