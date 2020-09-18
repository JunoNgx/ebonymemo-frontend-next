import { STRINGS } from './Strings'

const Footer = () => (
    <div className="footer">
        <p className="footer__content">twitter: <a className="footer__content--anchor" href={`https://twitter.com/${STRINGS.TWITTER}`} rel="noopener" target={"_blank"}>@{STRINGS.TWITTER}</a><br/>made with love by <a className="footer__content--anchor" href={"http://junongx.com/"} rel="noopener" target={"_blank"}>Juno Nguyen</a></p>
    </div>
)

export default Footer