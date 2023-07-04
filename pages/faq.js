import Head from "next/head"
import ReactMarkdown from "react-markdown"
import { PageTransition } from "next-page-transitions"

import Layout from "../components/Layout"

const PAGE_TITLE = "Ebony Memo | FAQs"
const CONTENT =
`
## Frequently asked questions

**What does "And", "iOS", and "alt" on the game card mean?**

These refer to the releases of the game. "And" and "iOS" are hyperlinked to the Google Play Store and Apple App Store, respectively. If you see "alt", it means that the game has at least a release outside of the two aforementioned store fronts (a fantastic thing!), which is usually Itch.io, web, Steam, Humble Store, or other console releases. You can find out more about this by clicking on the "Read More" button and reading from game description. If you see "And" or "iOS" being striken-through, the release has been delisted.

For information on delisted releases, see the question below.

----

**Why are some games delisted from the App Store/Play Store?**

It is not easy to generalise a common phenomenon. While making this website, I found [this thread on reddit](https://www.reddit.com/r/AndroidGaming/comments/cn4oa5/list_of_games_removed_from_playstore/) that looked quite terrifying, and the worse part is, I knew for sure, the list was incomplete. As far as I have observed, this happens more often on Android than iOS. As someone who has several apps on the Play Store, I am aware that Google makes quite frequent changes in their app requirements and delist a large amount of apps with each change (with notice), until intervened by the developer.

This, coupled with the frequent reports that Android sales are abysmal, leads me to believe that this is a calculated negligence. My educated guess that most developers find the cost of Android app maintenance not justifying the potential sale they can get, effectively "unpublish" their games on Android.

(As a side note, I am first-hand guilty of this. I cancelled my Apple developer membership out of poor value I got from it (it wasn't cheap, either), and that's how my game was delisted from the iOS App Store.)

This sadly becomes another problem in the field of history preservation. Mobile applications are extremely centralised, with pretty much one single app store for everything on each platform. While Android allows app sideloading and there are other options for Android apps, the amount is minusculy negligible. It is worse on iOS, with absolutely no such option. Generally, when a game is delisted, it disappears forever, without any way of legitimately accessing it again. The console side of the gaming industry also has been facing a similar problem, with **Hideo Kojima's PT** being one of the more high-profile cases.

If a game has been delisted on your platform, please reach out to the developer and express your interest. And if that fails, let's just put it out that **piracy** is a potential solution that **I do not advocate** for.

----

**Did the developer pay for their games to be listed on this website?**

No.

----

**Do you accept payment to list my game on this website?**

This is not an advertising website and I do not accept any payment for any listing here.

It does not matter whether you are a developer, if you think a particular game can fit in right here, do give me a tweet with the hashtag *#EbonyMemoTry*.

----

**What are the criteria for a game to be added to this site?**

It runs on a smartphone, and I like it.

The inclusion criteria is something I have been considering for a long time, and I have decided not to specify any. If I think it belongs here, I'll put it here.

----

**How is this website monetized and generating revenue?**

This website doesn't make any money (at the moment). I made it for my web development portfolio. I pay for the domain and hope the traffic doesn't break the free tier.

----

**I am a developer whose game is listed and I am not comfortable with the way me/my game is being presented here. What should I do?**

Please send me a private message or an email and let me know what I should do about it.

----

**Is there a similar website to this for other platforms?**

If you are on Steam, then curators are your best bet.

If you are into weird indie games, then this website is partially inspired by [Warp Door](http://warpdoor.com/) and [forest ambassador](https://forestambassador.com/) (which is sadly no longer active, but you should be able to find interesting things there still).

While making this website, I discovered [@vladimir.knight](https://www.instagram.com/vladimir.knight), who had a very similar pursuit to mine, with an Instagram account. It is fantastically curated.

If you have a niche interest, then that's our of my expertise. Discoverability is a big issue these days, and even this site is just attempt to deal with it.

----

**I have noticed inaccurate information/spelling error/grammatical mistakes on this website. What should I do?**

I would appreciate if I can be notified via tweet/private message/email regarding the errors.

----

**What data is being collected from this website? Where is the privacy policy?**

This website is hosted by [Netlify](https://www.netlify.com/) and it collects whatever Netlify collects, even if it's behind my back.

I don't collect a damn. I am neither a data freak nor am I have time to comptemplate what to do with them.

----

**How was this website made?**

The front-end you are seeing is built with [Vercel's NextJS](https://nextjs.org/). I use a custom content management system with a back-end powered by NodeJS/Express and another web interface built with ReactJS for content editing. The source codes for this system are open and available on my GitHub account.

----

**Who created the artwork for this website?**

The front page artwork animation was created by [Linh Ha](https://fuulin.github.io/), a creative designer, and also a contributor to this site.
`

export default function Faq() { 
    
    return (
        <Layout>
            <Head>
                <title>{PAGE_TITLE}</title>
                <meta property="og:title" content={PAGE_TITLE} key="title"/>
            </Head>
            <PageTransition timeout={500} classNames="page-transition">
                <>
                    <div className="text-page">
                        <div className="text-page__content">
                            <ReactMarkdown children={CONTENT}/>
                        </div>
                    </div>
                </>
            </PageTransition>
        </Layout>
    )
}