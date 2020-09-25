import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

    const [stateIsExpanded, setStateIsExpanded] = useState(false)

    function toggleExpand() {
        setStateIsExpanded(isExpanded => !isExpanded)
    }

    let navbarClassName = "navbar"
    let mBtnClassName = "navbar__mbtn"
    let linksClassName = "navbar__links"
    if (stateIsExpanded) {
        navbarClassName += " navbar--expanded"
        mBtnClassName += " navbar__mbtn--expanded"
        linksClassName += " navbar__links--expanded"
    }

    return (
        <div className={navbarClassName}>
            <p className="navbar__brand"><Link href={"/browse"}><a>{"{Ebony Memo}"}</a></Link></p>
            {/* Expand button is only displayed in mobile layout, set by CSS */}
            <p className={mBtnClassName} onClick={toggleExpand}/>
            <ul className={linksClassName}>
                <li className="navbar__links__link"><Link href="/"><a>Front page</a></Link></li>
                <li className="navbar__links__link"><Link href="/browse"><a>Browse</a></Link></li>
                <li className="navbar__links__link"><Link href="/manifesto"><a>Manifesto</a></Link></li>
                <li className="navbar__links__link"><Link href="/faq"><a>FAQ</a></Link></li>
            </ul>
        </div>
    )
}
