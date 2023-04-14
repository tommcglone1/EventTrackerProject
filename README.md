# Card Collect
URL for access
http://3.233.223.34:8080/CardCollect/

| HTTP Verb | URI                  | Request Body | Response Body |
|-----------|----------------------|--------------|---------------|
| GET       | `/api/cards`      |              | Collection of representations of all _cards_ resources |collection** endpoint |
| GET       | `/api/cards/1`   |              | Representation of _card_ `1` |
| POST      | `/api/cards`      | Representation of a new _card_ resource | Description of the result of the operation | **
| PUT       | `/api/cards/1`   | Representation of a new version of _card_ `1` |
| DELETE    | `/api/cards/1`   |              | |

## Description

Card collect is an application that allows for the tracking of a collection of sports cards. Although it is currently only being used to track my baseball card collection, the main database tables, entities, repositories, services, and controllers are general enough that this application could later be used to track any sports card collection with small adjustments to the package names. This application currently utilizes REST, Spring Data JPA, and MySQL workbench to form the connection from the MySQL database through Spring Tool Suite Java-coded entities which are then deployed into the AWS cloud with an EC2 instance. 

## Database Schema

The Card Collect database currently consists of three tables; card, card_condition, and grade. Card_condition and grade each share a one-to-many relationship with the main card table allowing for further clarification on the condition of a card(Near Mint or Better, Excellent, Very Good, Good, Poor) and the grade a card has received from a licensed and professional grader(10-1) with its accompanying name. The card table itself consists of many if not all of the attributes a sports card could have including the player's name, the number of the card, the team the player is on when the card was made various defining characteristics of parallel versions of the card, and many more. 

I currently have 15 fields in the card table and that could certainly raise. However, at this time those fields do more than enough to describe the card. I also have plans to add more tables to the database schema to add further descriptors to the card. An example of these tables would include a table for the specific grade of an autograph as opposed to simply stating the card is autographed like the application currently does. I would also like to add specific grading companies to the grade table since there are many companies that offer grading services. 

## Entities 

The current entities of the application include Card, CardCondition, and CardGrade. These entities are linked to the boot project using Gradle, and are instantiated as entities using hibernate through documentation in the persistence.xml of the JPA portion of the project. It is important to note that since these entities are bi-directionally linked together there are two instances of JSON ignores in the CardCondition and CardGrade classes. These are used to deal with issues of JSON recursion that occur when entities have a bi-directional relationship. 

## Repositories 

Spring Data JPA repositories provide a great amount of inherent functionality that we did not have access to when working on previous applications. By simply creating an interface that extends the JPARepository and including generics for the entity class name and variable type of the foreign key, we can gain this inherent functionality which in this application includes all major CRUD functionality and database querying methods. With these CRUD methods, we can find specific instances of our data, all instances of the data, as well as create, update, and delete that data from the database. 

The querying methods within the repositories are extremely useful and take the place of the JPQL queries that once happened in DAOImpls. Through specific language written in the methods of the repository, the JpaRepositroy will now write the JPQL queries for us.

Another important aspect of repositories is that Spring will create a bean for each repository that it finds allowing them to be autowired into the serviceImpl classes for later use.  
##### Card Condition and Card grade

The condition and grade repositories are rather plain in this application only including a findById method so as to not have to use the Optional object that this method would normally return. However, these methods are not currently used and were put there by me just in case I needed to autowire them into the cardServiceImpl at some point to attain a currently unknown functionality. 

##### Card 

In comparison, the card repository is extremely busy. It houses the same findById method, as well as many other query methods that I intend to use for the main components of the application. These query methods consist of a multitude of findBy and count queries that I will talk more about in the serviceImpl section, but I will say that there is a findBy and count for almost all of the card fields and there is also one for each of the card fields foreign keys. 

## Service and ServiceImpl

The service interface and the ServiceImpl class provide the implementation of the methods that are defined and predefined by their respective repository. The interface defines the method that must be then carried out by the ServiceImpl, and the ServiceImpl defines the logic of how the CRUD and query methods will be utilized. 

##### Card Condition and Card grade

The condition and grade Service and ServiceImpl consist of only one findAll method. These classes are not given functionality with the application because they do not need it. There should be no point in time where I or a future user needs to create, update, or delete a condition or a grade for a card as they are already predefined in the database. If this needs to occur it will occur in the database itself. The listAll methods are included because I may at one point make an informational page that displays all of the conditions and grades and what constitutes each of them. 

 ##### Card 

 The card Service and ServiceImpl are again busy in comparison to the other two. Included in the interface are all of the CRUD methods and all the query methods from the repository that will be used. Within the ServiceImpl class, all the CRUD operations and query methods are defined. Since the query methods are all only returning information for get methods, most of them occur on one line and are simply returning the queried information for the controller to use. 

 ## Rest Controllers

 Rest Controllers, as they have in the past, connect the backend logic with the front-end information. However, now this is done with more specificity. In the past, we would use the @RequestMapping annotation on all methods and later in that annotation define the type of request. Now we are using specific mappings for @GetMapping and @PostMapping along with new mappings, put and delete, for the updating and deleting of data. We can now also use the @RequestMapping annotation to specify the beginning of each URI. In this instance, I have used "api". The @RestController annotation is used for convience of not having to type @ResponseBody with every method in the controller. With this annotation, the @ReponseBody method is added to every method in the controller.  

 I will mention here that the condition and grade controllers only implement the findAll methods they have in their services, simply displaying all the options for each entity.

 ##### Card Contoller

 The card controller connects the client and server side logic for the application. The CRUD done to all sports cards and all the query methods that will be used later with the front end is stored here. The main CRUD methods are mapped to "cards" along with {cardId} expression language in the delete, update, and getCard methods. This path variable is crucial to ensuring that the correct data in the database is acted upon because it provides the path to access that specific data in the API from the client side of the application.

 The create and update methods include a request body annotation. This functions similarly to the command object used by the Controllers in previous projects. The annotation maps the HttpRequest body (the information from the client side) to the entity associated with the annotation. Once the data is mapped to the object a new instance of the object is created and stored in the database. This happens the same way for both the create Post mapping and update put mapping. The only difference is that the create method uses a generated Id to create an entirely new entity in the database, while the update method simply replaces the old entity entirely. 

 The query methods all occur similarly and can be broken down into two categories lists and counts. The lists return all the card instances that have the field that is specified. For example, findCardsByPlayerName returns a list of cards found by using the player's name in the database. This is mapped by "cards/search/playerName/{playerName}". This URI pattern is the same for each method where a list of cards is retrieved from the database. 

 The count queries return a long that displays how many of each card in the database is associated with the requested field. For example, cardCountByPlayerName returns the number of cards that are associated with that player's name in the database. The mapping for this method is "cards/search/nameCardCount/{playerName}". This pattern is also the same for each count method in the rest of the controller. 


 ## JavaScript and HTML

#### Creating a Card

 HTML and JavaScript(JS) were used in conjunction to build the index page of this project. The HTML file is somewhat plain in the sense that it only contains two forms and a table. The first form shown on the webpage is used to create a new card to be added to the collection and the database. It contains all the input fields necessary to create a card and is directly linked to the JS side of the project via an event listener attached to the button on the form. This connection is established by using the name attribute associated with the create form (newCardForm) and through that accessing it’s create button input via its name (createButton). When the button is clicked the createCard callback function within the JS file is enacted, and the process of persisting the card to the database begins. 

 The first operation that occurs in the createCard function is preventing default. This prevents the webpage from reloading each time the button is pressed which would cause the information from the form to be lost before it could reach the JS file. Next, a form variable is created by using the event object passed to all methods that represent an event call back, the target of the event which is the button that was clicked, and the JS parentElement which in this case is thee create a card form. This means that the form itself is stored in the variable. Then, an object is created using the values of the form. This is done by accessing each input value of the form using the sequence of form.nameOfInput.value. For example, the playerName field of the card object is set using form.playerName.value, playerName being the name attribute attached to the input tag in the HTML file. It is important to note that grade is not included in the original creation of the object and is placed within an if statement. This is because if a grade is not included for a card in the HTML form the grade will pass into the object as null. This is perfectly fine, but if the card object attempts to read the grades id as null, as is done with condition, an error will occur. This if statement allows for a grade object's id to be attached to the object if one is provided in the form, or for the entire grade object to be sset to null. 
 
 #### XMLHttpRequest 

 The card is then sent to the sendCardRequest function for the XMLHttpRequest which will then send the card properties to the controller so they can be persisted into the database through the service and repository methods. I first create a variable to store the new XMLHttpRequest, followed by calling the open method to initialize the request. Within this method call, the HTTP request method verb POST is included to signify what type of request is being created, and the mapping is provided so the data can be sent to  the correct request mapping in the controller. Then, the setRequestHeader method is called which is used to specify the type of request body being sent. Without this, the text returned will not be JSON and will not be useable by JS. Following this, JSON.stringify is called to convert the JS object into a JSON string, and that string is passed into the send method which sends the XMLHttpRequest to the server. The readyState remains at one at this time, but the function now moves into the onreadystatechange function block awaiting the readyState to reach 4.

Xhr.onreadystatechange is used for three of the changes that occur to the readyState (2-4). The readyState property has 5 possible values zero through five,

* 0 - when the client has been created and open has not been called
* 1 - open has been called
* 2 - send method has been called and the request header and the status code are available 
* 3 - The information is being downloaded but only contains part of the data
* 4 - All data has been downloaded and is ready to be used by the browser

If parsing occurs before reaching readyState 4, all of the information for the reponseText will not be present and the application will fail. Once ready state 4 is reached and the server returns the status code as either 200 or 201 the parsing process can begin. This process begins with the capturing of response from the server. The responseText holds the server’s response as text, this can either be parsed into JSON or used to show an error in text format. Assuming that information is returned, it is returned as a Document Object Model string and must be transformed to JSON through the global JSON objects parse method. Once the parsing is complete the newly formed object can be used as a JS object. This process is similar for all CRUD methods with slight variations depending on what type of CRUD must be achieved. Because of this, this section will be referred to throughout the rest of the JS portion of this README.

## Dynamic Table

Below the create a card form on the HTML index page is the table of all the cards currently in the database. Later versions of the project hope to include user authentication so that many users can have many cards, but at the current moment, this is not the case. Regardless, a dynamic JS table is used to display the cards in the database. This  begins with the loadAllCards method which pulls all the cards from the database in a list. This list is sent to the display cards method where the list is iterated over dynamically creating table rows based on how many cards are in the database. Each row is also provided with an event listener which makes them clickable. This is done so a detail div can be displayed underneath the list for each specific card. The rest of the table columns are created by appending td tags to the current row with the textContent of the td being assigned the playerName, team, and boxSet card properties. 

#### Single Card

A single card is displayed in a similar method to loadAllCards using an XMLHttpRequest with the modifier of the cardId being included in the mapping so that the card associated with that id will be shown in the detail div. All the information in the detail div is displayed through JS by dynamically creating an unordered list. Most notably the update and delete buttons. 

When the delete button is clicked, the deleteCard function is called and the current card id is passed as an argument. The deleteCard function works in almost the same way as the getSingleCard function. The id of the spotlighted card is passed in and is used in the mapping however, this time the card is only removed from the database, and since the deleteCard controller method has a void return type, no parsing of responseText is required. 

The updateButton creates a click event that allows the updateCard method to be called with a card passed in as an argument. When this button is clicked, the update form is displayed by switching the updateCardDiv HTML element's visibility to visible. (Note: The page loads with the updateCardDiv in a hidden state.) The passed-in card parameter is used to set the values of every input tag on the HTML form within the JavaScript. This form itself has a button that also has a click event which starts the process of persistence in the database. When the update form's button is clicked, an updateCard object is created using the inputs from the form similar to the create method. The main difference between the two being that the grade property must now be deliberately checked for a value or a null based on the input received from the form. After the object is created, the sendUpdateRequest method is called and the updated card information and the card's id are sent in as arguments. The update process occurs the same as the create process aside from using the card id in as a path variable in the mapping and the back-end rest logic.



 ## Technologies Used
* Java
* Spring Tool Suite
* Spring Data JPA
* REST
* Spring Boot
* HTML
* CSS
* Javascript

## Lessons Learned

###### REST

* One of the main lessons I learned from this is the overall flow of the REST API. It was helpful to see how the data moves from the controller to the services, how the queries and predetermined methods occur in the repository, then to the database, and to the client directly as JSON. 

* Getting a lot of hands-on with Postman during this application was also very beneficial for me. It is quite a useful tool when testing mappings and how the Http bodies from the client side will interact with the server-side services and controller. 

* I also learned a difficult lesson about using SQL keywords in my database tables. This mistake  causes an SQL syntax error that cannot be uncovered unless you think to look for a problem with the word itself and not the query coming from hibernate. 

###### JavaScript

* The relationship between HTML and JavaScript is something that came into focus for me during this project. Specifically, how it is possible to acquire and use any part of the HTML form on the JS side of the project. 

* As a side effect of the JavaScript XMLHttpRequest process, I learned about how to handle nullable foreign keys in a database. These objects must be handled differently than just a simple property of the JS object or even an object that is Not-Nullable. It is important to use correct logic in JS to ensure the correct data is added to the database. 

* Finally, I learned another difficult lesson about a balance between using HTML and JS. In an earlier (not working) version of this project I was creating my update form entirely dynamically, which was a great exercise but was also very tedious and time-consuming. It would have been much more efficient to begin that process the way I ended it with a base HTML table and attaching the values using JS.
