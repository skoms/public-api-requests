# Public API Requests - Project

### Languages
* JavaScript 
* HTML 
* CSS

## Introduction
This project makes a website employee directory, where it will be showed listed on the page, as well as additional information about the certain employee. The information gets pulled from an online API and processed to display the elements. Also will pop up a modal window with even more info about the selected employee, with navigation buttons to navigate through the directory. You can also search for employees using the real-time updating search-bar at the top.

## Note-worthy Modifications
* #1 I opted in to use classes on the 'modal windows' and the cards to change the state of visibility through interaction with the site. These classes are 'hide' and 'show'. You can also find the short CSS styling for these in '/css/styles.css/' on line 134 and 138. 
* #2 Changed out the submit type input for the search-bar to the unicode symbol for the magnifying glass, seen in '/js/script.js/' on line 81 . I did this because the button is not needed with the real-time update of the search results. This means I also removed the correlated css rules.
* #3 Added a hovering card effect on the gallery cards using box-shadow and scale, as seen in '/css/styles.css/' on line 89.
* #4 Changed background to a fixed image, as seen in '/css/styles.css/' on line 19.
* #5 Changed styling of the header h1 to white and added a text-shadow, plus some extra weight, as seen in '/css/styles.css/' on line 40.