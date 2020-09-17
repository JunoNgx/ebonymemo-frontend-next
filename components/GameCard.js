import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import { STRINGS } from './Strings'

export default function GameCard({game, parentTagFilter}) {

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

    function handleTagClick(tagName) {
        // Will only run when specified by parent component
        if (parentTagFilter) {
            parentTagFilter(tagName)
        }
    }

    let android, ios, other, tooltipClass

    if (game.android) {
        android = (game.android === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted card--has-tooltip" title={STRINGS.DELISTED_ANDROID} onClick={(e)=>controlTooltipDisplay(STRINGS.DELISTED_ANDROID)}>And</p>
            : <p className="card__footer__links__link" title={STRINGS.ALT_ANDROID}><a href={game.android} rel="noopener" target="_blank">And</a></p>
    } else {
        android = ''
    }

    if (game.ios) {
        ios = (game.ios === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted card--has-tooltip" title={STRINGS.DELISTED_IOS} onClick={(e)=>controlTooltipDisplay(STRINGS.DELISTED_IOS)}>iOS</p>
            : <p className="card__footer__links__link" title={STRINGS.ALT_IOS}><a href={game.ios} rel="noopener" target="_blank">iOS</a></p>
    } else {
        ios = ''
    }

    other = (game.other)
        ? <p className="card__footer__links__link card--has-tooltip" title={STRINGS.OTHER} onClick={(e)=>controlTooltipDisplay(STRINGS.OTHER)}>alt</p>
        : ''

    tooltipClass = "card__tooltip"
    if (isTooltipShown) tooltipClass += " card__tooltip--show"

    return (
        <div className="card" ref={cardRef}>
            <div className="card__cover">
                {(game.featured)
                    ? <div className="card__cover__featured-badge card--has-tooltip" title={STRINGS.FEATURED_BADGE} onClick={(e)=>controlTooltipDisplay(STRINGS.FEATURED_BADGE)}></div>
                    : ''
                }
                <img className="card__cover__img" src={game.coverUrl} alt={`Illustrative screenshot of the game ${game.name}`}/>
            </div>
            <p className="card__title">{game.name}</p>
            <p className="card__subtitle">{game.releaseYear} {game.developer.name}</p>
            {(game.tags) && <div className="card__tags">
                {game.tags.map(tag => <p className="card__tags__tag" key={tag.name} onClick={() => handleTagClick(tag.name)}>{tag.name}</p>)}
            </div>}
            <div className="card__footer">
                <div className="card__footer__links">
                    {android}
                    {ios}
                    {other}
                </div>
                <p className="card__footer__cta"><Link href={`/browse/${game.gameId}`}><a>Read more</a></Link></p>
            </div>
            <div className={tooltipClass}>
                <p className="card__tooltip__content">{tooltipContent}</p>
            </div>
        </div>
    )
}
