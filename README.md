# Card Collect
URL for access
http://3.233.223.34:8080/CardCollect/

## Description

Card collect is an application that allows for the tracking of a collection of sports cards. Although it is currently only being used to track my baseball card collection, the main database tables, entities, repositories, services, and controllers are general enough that this application could later be used to track any sports card collection with small adjustments to the URI mapping in the CardController. This application currently utilizes REST, Spring Data JPA, and MySQL workbench to form the connection from the MySQL database through Spring Tool Suite Java-coded entities which are then deployed into the AWS cloud with an EC2 instance. 

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

 The card controller connects the main logic for the application, the CRUD done to all sports cards, and all the query methods that will be used later with the front end. Earlier I mentioned that a minor fix could be done to make this application more intuitive for all sports card collections and it has to do with the URIs in this controller. The main CRUD methods are mapped to "baseballcards" along with {cardId} expression language in the delete, update, and getCard methods. This could later be changed to simply say cards instead of baseballcards. 

 In the getCard, update, and delete methods, a path variable is used to link information coming from the client side to the server side with the services. This path variable is crucial to ensuring that the correct data in the database is acted upon because it provides the path to access that specific data in the API from the client side of the application.

 The create and update methods include a request body annotation. This functions similarly to the command object used by the Controllers in previous projects. The annotation maps the HttpRequest body (the information from the client side) to the entity associated with the annotation. Once the data is mapped to the object a new instance of the object is created and stored in the database. This happens the same way for both the create Post mapping and update put mapping. The only difference is that the create method uses a generated Id to create an entirely new entity in the database, while the update method simply replaces the old entity entirely. 

 The query methods all occur similarly and can be broken down into two categories lists and counts. The lists return all the card instances that have the field that is specified. For example, findCardsByPlayerName returns a list of cards found by using the player's name in the database. This is mapped by "baseballcards/search/playerName/{playerName}". This URI pattern is the same for each method where a list of cards is retrieved from the database. 

 The count queries return a long that displays how many of each card in the database is associated with the requested field. For example, cardCountByPlayerName returns the number of cards that are associated with that player's name in the database. The mapping for this method is "baseballcards/search/nameCardCount/{playerName}". This pattern is also the same for each count method in the rest of the controller. 

 ## Technologies Used
* Java
* Spring Tool Suite
* Spring Data JPA
* REST
* Spring Boot

## Lessons Learned

* One of the main lessons I learned from this is the overall flow of the REST API. It was helpful to see how the data moves from the controller to the services, how the queries and predetermined methods occur in the repository, then to the database, and to the client directly as JSON. 

* I also got a lot of hands-on with Postman during this application. It is quite a useful tool when testing mappings and how the Http bodies from the client side will interact with the server-side services and controller. 

* I also learned a hard lesson about using SQL keywords in my database tables. This mistake  causes an SQL syntax error that cannot be uncovered unless you think to look for a problem with the word itself and not the query coming from hibernate. 



