import Link from 'next/link'

export default function GameCard({game}) {

    let android, ios, other

    if (game.android) {
        android = (game.android === "delisted")
            ? <p className="game-card__card__footer__links__link game-card__card__footer__links__link--delisted" alt="This release has been delisted">And</p>
            : <p className="game-card__card__footer__links__link"><a href={game.android} target="_blank">And</a></p>
    } else {
        android = ''
    }

    if (game.ios) {
        ios = (game.ios === "delisted")
            ? <p className="game-card__card__footer__links__link game-card__card__footer__links__link--delisted" alt="This release has been delisted">iOS</p>
            : <p className="game-card__card__footer__links__link"><a href={game.ios} target="_blank">iOS</a></p>
    } else {
        ios = ''
    }

    other = (game.other)
        ? <p className="game-card__card__footer__links__link" alt="This release has a release outside of Apple App Store and Google Play Store">oth</p>
        : ''


    return (
        <div className="game-card__card">
            {/* <p key={game.gameId}><Link href={`/browse/${game.gameId}`}><a>{game.name}</a></Link> is made by {game.developer.name}</p> */}
            <img className="game-card__card__cover" src={game.coverUrl}/>
            <p className="game-card__card__title">{game.name}</p>
            <p className="game-card__card__subtitle">{game.releaseYear} {game.developer.name}</p>
            <div className="game-card__card__footer">
                <div className="game-card__card__footer__links">
                    {android}
                    {ios}
                    {other}
                </div>
                <p className="game-card__card__footer__cta"><Link href={`/browse/${game.gameId}`}><a>Read more</a></Link></p>
            </div>
        </div>
    )
}
