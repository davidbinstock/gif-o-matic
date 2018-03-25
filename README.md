# gif-o-matic

### This app utilizes the GIPHY api to generate gifs of your favorite things! (i.e. muppets)


### Instructions:
* click on the buttons to view GIFs of that topic
* click on the images to play the animation; click on the image again to pause
* add new muppets (or any other topic) by typing into the text box and clicking submit (or hit enter). This will generate a new button with that topic. You can then click the button to generate the GIFs
* to delete topic buttons, hover the mouse to the left of the button and click on the "x"
* now get clikcing and check out those GIFs!!

### Notes
* there is currently no way to clear the GIFs without refreshing the page. A button to clear the GIFs could be added, though its is not entirely necessary
* the app works by sending a query with the selected topic to the GIPHY api and displaying the search results. The GIPHY app apears to return the same GIFs for each search instance, so clicking the smae button twice does not generate new GIFs. Also sometimes the GIPHY api returns multiples of the same GIF; it is unclear why this happens
* the app is currently set to limit the search results to 10 GIFs. This is hardcoded in, though it could be changed. Also funcit=onality could be added so the user could change this value.

