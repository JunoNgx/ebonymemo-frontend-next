import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

const Home = () => (
    <Layout>
        <p>Welcome to Ebony Memo.</p>
        <p><Link href="/browse"><a>Click here to browse our catalogue</a></Link></p>
    </Layout>
)

export default Home