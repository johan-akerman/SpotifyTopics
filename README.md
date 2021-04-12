# Spotify Topics
During the summer of 2020 I participated in Spotify's summer hackathon. The challenge was to develop something with their API. As a big fan of podcasts, I chose to develop a new way to consume them. 

My idea was to introduce "topics", a new way of indexing a podcast episode so that the user could easily get an overview of the topics disussed in each episode. Dividing the content of a podcast into topics could also enable a more accurate podcast recommendation algoritm that does not only recommend interesting podcast episodes, but also interesting topics. The tool also provides a convenient way to fastforward to specific timestamps where certain topics are being discussed. This is done either by clicking on the new customized progressbar in the player or on the desired topic in the sidebar (see screenshots below). 

## Technologies used
React JS, the Spotify Web API and Bootstrap. 

## Screenshots
<img src="/discover.png" alt="discover"
	title="Dashboard preview" width="600" /> 
	<br />
Dicovery page that greets the user after they have logged in with their Spotify credentials.
	<br />
		<br />
<img src="/episode.png" alt="episode"
	title="Episode preview" width="600" />
		<br />
Seperate page for a specific podcast episode. A "timestamp divided podcast player" and episode description on the left. A "table of content" of topics discussed in the episode on the right.
