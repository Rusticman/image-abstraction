# Image Abstraction Layer


##User Stories

* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
* I can paginate through the responses by adding a ?offset=2 parameter to the URL.
* I can get a list of the most recently submitted search strings.
 


##Example request for images:

https://img_abstraction-rustic.herokuapp.com/api/imagesearch/tiger%20shark?offset=10



##Example output

```[ { "url": "http://upload.wikimedia.org/wikipedia/commons/3/39/Tiger_shark.jpg", "snippet": "File:Tiger shark.jpg - Wikipedia, the free encyclopedia", "context": "http://en.wikipedia.org/wiki/File:Tiger_shark.jpg", "thumbnail": "http://ts4.mm.bing.net/th?id=OIP.Mf7d678da828bd1aad9b299a50bd3ab9aH0&pid=15.1" }, { "url": "http://www.floridasportsman.com/files/2012/10/TigerShark-LR.jpg", "snippet": "Tiger Shark Food", "context": "http://infotigershark.blogspot.com/", "thumbnail": "http://ts4.mm.bing.net/th?id=OIP.M341e9b3b4bd8b0fef202070757acab22H0&pid=15.1" }, { "url": "http://cdn.coresites.factorymedia.com/surfeurope_new/wp-content/uploads/2014/12/Tiger-shark1.jpg", "snippet": "Giant Tiger Shark Caught On Lay Day At Quik Pro Contest Site - Surf ...", "context": "https://surfeuropemag.com/features/news/3-4m-tiger-shark-caught-lay-day-quik-pro-contest-site.html", "thumbnail": "http://ts3.mm.bing.net/th?id=OIP.Mb50542fadf357b39e2f44c60fa60a500o0&pid=15.1" }, { "url": "http://www.southernleytetimes.com/images/tiger_shark.jpg", "snippet": "17. Tiger Shark", "context": "https://www.shughal.com/the-20-largest-animals-in-the-world/", "thumbnail": "http://ts1.mm.bing.net/th?id=OIP.Mfa7d9af03fce870d5bd3a07123824f77H0&pid=15.1" }, { "url": "http://www.bluespheremedia.com/wp-content/uploads/2014/06/20140606-115409-20140606-115409-0B4V0394-HF.jpg", "snippet": "Hannah Fraser face-to-face with a 15 foot tiger shark", "context": "http://www.bluespheremedia.com/2014/06/tigress-shark-world-first-woman-dances-with-tiger-sharks/", "thumbnail": "http://ts1.mm.bing.net/th?id=OIP.M04b14a585c511eea206561005f7a9e30H0&pid=15.1" }]```



##Example request for latest image search data:

https://img_abstraction-rustic.herokuapp.com/api/latest/imagesearch

#Example output

```[ { "term": "economics", "when": "4-September-2016 11:28:55" }, { "term": "movies", "when": "4-September-2016 11:30:37" }, { "term": "music", "when": "4-September-2016 11:38:1" }, { "term": "ocean", "when": "4-September-2016 11:44:56" }, { "term": "fun", "when": "4-September-2016 12:8:36" }]```
