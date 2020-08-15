import Link from 'next/link'

export default function GameCard({game}) {

    let android, ios, other

    if (game.android) {
        android = (game.android === "delisted")
            ? <p className="browse-page__cards__card__footer__links__link browse-page__cards__cards__card__footer__links__link--delisted" title="This Android release of this game has unfortunately been delisted">And</p>
            : <p className="browse-page__cards__card__footer__links__link" title="Click to access the Android release of this game on the Google Play Store"><a href={game.android} target="_blank">And</a></p>
    } else {
        android = ''
    }

    if (game.ios) {
        ios = (game.ios === "delisted")
            ? <p className="browse-page__cards__card__footer__links__link browse-page__cards__card__footer__links__link--delisted" title="The iOS release of this game has unfortunately been delisted">iOS</p>
            : <p className="browse-page__cards__card__footer__links__link" title="Click to access the iOS release of this game on the Apple App Store"><a href={game.ios} target="_blank">iOS</a></p>
    } else {
        ios = ''
    }

    other = (game.other)
        ? <p className="browse-page__cards__card__footer__links__link" title="This game has at least one release outside of Apple App Store and Google Play Store">oth</p>
        : ''


    return (
        <div className="browse-page__cards__card">
            <img className="browse-page__cards__card__cover" src={game.coverUrl}/>
            <p className="browse-page__cards__card__title">{game.name}</p>
            <p className="browse-page__cards__card__subtitle">{game.releaseYear} {game.developer.name}</p>
            <div className="browse-page__cards__card__footer">
                <div className="browse-page__cards__card__footer__links">
                    {android}
                    {ios}
                    {other}
                </div>
                <p className="browse-page__cards__card__footer__cta"><Link href={`/browse/${game.gameId}`}><a>Read more</a></Link></p>
            </div>
        </div>
    )
}
