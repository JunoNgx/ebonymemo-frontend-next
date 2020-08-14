import Layout from "../components/Layout"
import ReactMarkdown from "react-markdown"

const manifesto = 
`
# WHAT

**{Ebony Memo}** is an arthouse videogame curator website exclusively for smartphone titles.

# WHY

### The boundaries of art.

At no point of time has art not been a topic of historical debate. From [rock scratches](http://www.visual-arts-cork.com/earliest-art.htm) to [children's toys](https://www.theguardian.com/artanddesign/jonathanjonesblog/2014/sep/23/is-lego-art-creative-play-sculpture-nathan-sawaya), many media have been subjected to such arguments. The answer to the question "What can be art?" has always been anywhere between "anything" to ever-growing long list of items. Even video games themselves, in their undeniably highest forms, [have had their capability of being art questioned](https://www.rogerebert.com/roger-ebert/video-games-can-never-be-art).

And here I am, making the argument of console/PC gaming vs. mobile gaming.

### Judging a medium by its low(est) common denominators.

A very common argument I have seen over the years is how "most mobile games are freemium time-wasters filled with micro-transactions". While the information being stated is not exactly unfactual, it is undoubtedly a hasty generalisation, judging an entire medium from the surface. If we judge cinema by the Transformers-like that come out a dozen of times every year, perhaps it is ok to call films, including 2001: A Space Odyssey, Citizen, a not-very-intellectual media? Does the terrible literary and sociopolitical quality of "Eleanor and Park" and its neighbours in the "Young Adult" shelf disqualify Cormac McCarthy's The Road from being art? Looking at the amount of micro-transactions in Overwatch and PUBG, maybe console videogames can be summed up by the aforementioned comment above?

### Gatekeeping and supremacism.

Toxicity is well-heard of in the age of internet, but is hardly a newfangled product of culture. Humanity has subjected itself, in the vast majority of history, to bigotry, discrimination, inequality and hate. While that escalates quickly, and the current subject matter is relatively trivial and insignificant, they are not unrelated. This is the very root of the arguments of "true arts" and "true games" mentioned above. Like how many talented and intellectual people never had recognition they deserved, it pains to see many admirable works of art unheard of and untouched by the vast majority of the population.

### Discoverability.

Even though the internet and Google magic have answered the most part of the good old business question "How do I find what I want and need?", some corners remain in the dark. Maybe the interest in "artistic smartphone videogames" is too niche? Maybe there are too more noble and higher hobbies? Perhaps the internet is already overloaded with content from all kinds of platforms? Possibly, the front of page of Google Play Store is good enough of a curation and Fortnite is actually great?

Whatever the reason is behind it, I am not exactly happy, and here is me taking the matter into my own hands.

# HOW

In 2010, being the materialistic and financially irresponsible youngster I was, I dumped a portion of my college fund into a fanciful, semi-expensive gadget I did not exactly needed, called "smartphone", before most of the world had one. For historical context, it was the year Samsung released the Galaxy S (Samsung Galaxy S1, yes, before it had a number) and Apple released the iPhone 4. Having already been a videogame enthusiast, it did not take me long to realise I was in for a new magical world. In retrospect, I do not regret what I did.

As of the time of writing, in August 2020, I have been a smartphone owner for nearly 10 years. Over the decade, I have collected a good amount of interesting videogame bookmarks. Note the word **interesting**. Not all of them are great. Some are not exactly enjoyable. Some are novel ideas, but are executed poorly. Some are just wistful reminders of my artistic endeavours. My sentiment might have changed at the moment, but at some point time, I was undoubtedly fascinated by them.

And this collection is something I would like to share. It will take a while to transcribe them over here and write about them. I also hope it will grow longer over time.

Welcome to my massively over-engineered bookmark.

# YOU

I hope you find something interesting and enjoyable here.

If you think someone could benefit from this website, please share it with them.

If you think there is something I should try and add to the collection, please mention [@EbonyMemoM](https://twitter.com/EbonyMemoM) and/or hashtag [#EbonyMemoTry](https://twitter.com/search?q=%23EbonyMemoTry) on Twitter. Please point out my embarrassing grammatical mistakes and spelling errors, too.

But most of all, I hope you can be a more open-minded person after leaving this website. That there is beauty and art in the media you do not expect. Or at least, be a bit less judgmental when your nephew says he wants to "play some mobile games" in the evening (hopefully he picked up something from here).

And of course, with me having strongly advocated for open-mindedness so far, under no circumstance is my opinion here the absolute truth and fact. We can agree to disagree. If you have been playing Mobile Legends and PUBG and enjoy them, please continue. If you think mobile games are all trash, it is rightfully your entitled opinion. If you think I am pretentitous, you are probably not wrong, either.

Neverthless, I hope you enjoy your visit here.

Juno Nguyen
`

export default function Manifesto() { 
    
    return (
        <Layout>
            <div className="text-page">
                <div className="text-page__content">
                    <ReactMarkdown source={manifesto}/>
                </div>
            </div>
        </Layout>
    )
} 