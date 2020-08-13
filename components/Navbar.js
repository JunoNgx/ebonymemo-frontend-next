import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

    const [stateIsExpanded, setStateIsExpanded] = useState(false)

    function toggleExpand() {
        setStateIsExpanded(isExpanded => !isExpanded)
    }

    let mBtnClassName = "navbar__mbtn", linksClassName = "navbar__links"
    if (stateIsExpanded) {
        mBtnClassName += " navbar__mbtn--expanded"
        linksClassName += " navbar__links--expanded"
    }

    return (
        <div className="navbar">
        <div className="navbar__brand">
            <p><Link href={"/"}><a>{"{Ebony Memo}"}</a></Link></p>
        </div>
        {/* Button is only displayed in mobile layout */}
        <p className={mBtnClassName} onClick={toggleExpand}/>
        <ul className={linksClassName}>
            <li className="navbar__links__link"><Link href="/browse"><a>Browse</a></Link></li>
            <li className="navbar__links__link"><Link href="/manifesto"><a>Manifesto</a></Link></li>
            <li className="navbar__links__link"><Link href="/faq"><a>FAQ</a></Link></li>
        </ul>
    </div>
    )
}
