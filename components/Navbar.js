import Link from "next/link"

const Navbar = () => (
    <div>
        <>
            <p><Link href={"/"}><a>Ebony Memo Logo</a></Link></p>
        </>
        <>
            <ul>
                <li><Link href="/browse"><a>Browse</a></Link></li>
                <li><Link href="/manifesto"><a>Manifesto</a></Link></li>
                <li><Link href="/faq"><a>FAQ</a></Link></li>
            </ul>
        </>
    </div>
)

export default Navbar
