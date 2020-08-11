import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const Layout = (props) => (
    <div>
        <Head>
            <title>Ebony Memo</title>
        </Head>
        <Navbar/>
        {props.children}
        <Footer/>
    </div>
)

export default Layout