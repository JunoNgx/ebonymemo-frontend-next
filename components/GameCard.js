import Link from 'next/link'

export default function GameCard({game}) {

    let android, ios, other

    if (game.android) {
        android = (game.android === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted" title="This Android release of this game has unfortunately been delisted">And</p>
            : <p className="card__footer__links__link" title="Click to access the Android release of this game on the Google Play Store"><a href={game.android} target="_blank">And</a></p>
    } else {
        android = ''
    }

    if (game.ios) {
        ios = (game.ios === "delisted")
            ? <p className="card__footer__links__link card__footer__links__link--delisted" title="The iOS release of this game has unfortunately been delisted">iOS</p>
            : <p className="card__footer__links__link" title="Click to access the iOS release of this game on the Apple App Store"><a href={game.ios} target="_blank">iOS</a></p>
    } else {
        ios = ''
    }

    other = (game.other)
        ? <p className="card__footer__links__link" title="This game has at least one release outside of Apple App Store and Google Play Store">oth</p>
        : ''

    return (
        <div className="card">
            <div className="card__cover">
                {(game.featured)
                    ? <div className="card__cover__featured-badge" title="This game is currently featured as an Editor's Choice"></div>
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
        </div>
    )
}
