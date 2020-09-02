import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function GameCard({game}) {

    const TOOLTIP_DELISTED_ANDROID = "The Android release of this game has unfortunately been delisted."
    const TOOLTIP_DELISTED_IOS = "The iOS release of this game has unfortunately been delisted."
    const TOOLTIP_DELISTED_OTHER = "This game has at least one release outside of Apple App Store and Google Play Store. Please read more from the game's description for more information."
    const TOOLTIP_FEATURED_BADGE = "This game is currently featured as an Editor's Choice."

    const [tooltipContent, setTooltipContent] = useState('')
    const [isTooltipShown, setIsTooltipShown] = useState(false)

    const cardRef = useRef(null)

    useEffect(()=>{
        function handleOutsideClick(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsTooltipShown(false)
                // Wait for css transition for a less jarring experience
                // TODO rewrite transition with JS and use a proper callback
                setTimeout(() => setTooltipContent(''), 300)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return function cleanup() {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [cardRef])

    function controlTooltipDisplay(content) {
        setIsTooltipShown(true)
        setTooltipContent(content)
    }

    let android, ios, other, tooltipClass

    if (game.android) {
        android = (game.android === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted card--has-tooltip" title={TOOLTIP_DELISTED_ANDROID} onClick={(e)=>controlTooltipDisplay(TOOLTIP_DELISTED_ANDROID)}>And</p>
            : <p className="card__footer__links__link" title="Click to access the Android release of this game on the Google Play Store"><a href={game.android} target="_blank">And</a></p>
    } else {
        android = ''
    }

    if (game.ios) {
        ios = (game.ios === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted card--has-tooltip" title={TOOLTIP_DELISTED_IOS} onClick={(e)=>controlTooltipDisplay(TOOLTIP_DELISTED_IOS)}>iOS</p>
            : <p className="card__footer__links__link" title="Click to access the iOS release of this game on the Apple App Store"><a href={game.ios} target="_blank">iOS</a></p>
    } else {
        ios = ''
    }

    other = (game.other)
        ? <p className="card__footer__links__link card--has-tooltip" title={TOOLTIP_DELISTED_OTHER} onClick={(e)=>controlTooltipDisplay(TOOLTIP_DELISTED_OTHER)}>alt</p>
        : ''

    tooltipClass = "card__tooltip"
    if (isTooltipShown) tooltipClass += " card__tooltip--show"

    return (
        <div className="card" ref={cardRef}>
            <div className="card__cover">
                {(game.featured)
                    ? <div className="card__cover__featured-badge card--has-tooltip" title={TOOLTIP_FEATURED_BADGE} onClick={(e)=>controlTooltipDisplay(TOOLTIP_FEATURED_BADGE)}></div>
                    : ''
                }
                <img className="card__cover__img" src={game.coverUrl}/>
            </div>
            <p className="card__title">{game.name}</p>
            <p className="card__subtitle">{game.releaseYear} {game.developer.name}</p>
            <div className="card__footer">
                <div className="card__footer__links">
                    {android}
                    {ios}
                    {other}
                </div>
                <p className="card__footer__cta"><Link href={`/browse/${game.gameId}`}><a>Read more</a></Link></p>
            </div>
            <div className={tooltipClass}>
                <p>{tooltipContent}</p>
            </div>
        </div>
    )
}
