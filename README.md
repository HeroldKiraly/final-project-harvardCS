# TimePieceBrokerage
### Description:
    This site is supposed to be a high end watch dealer storefront. I went with this idea because I personally like business websites and watches so I decided to see what I would be able to come up with by mixing the two. I decided to go with a very modern front-end tech stack which includes React JS, Vite, Tailwind CSS and then I went with a bit simpler back-end using Python Flask. I decided to use this stack to be able to create a site which dynamically updated instead of having to reload everytime new information has to be loaded and I knew that React would be the primary contributer for making that possible.

    These new technologies took a bit of time getting used to especially Tailwind CSS but it was definitely a worth while investment I understand why a good CSS framework would increase productivity in the long run. I have also done a bit of React before but never this extensively so it was a fun journey to figure out how React Routers work and how components can interact with each other using props and Reacts useEffect/useStates feature. Most if not all components contain props from another parent component that is sending information.

    Everytime anything happens on the front end from creating a user or adding items to the users cart all of that information is being fetched from the server or being sent to the server for processing which runs seperately on a Python Flask server. I spent majority of my time figuring out how I can make the users browser remember that he is logged in even after he refreshes the page. I did a bit of research and found that the python library ‘flask_jwt_extended’ is a fairly easy to set up user authentication library for Flask specifically. Most server side routes are authentication required using the @jwt_required header so that the user has to create an account before adding items to cart, removing items, etc.

# Directories, Files, File contents and purpose
## Backend
### backend > static
    The static file folder within the backend directory is primary used to store images in the use case of my website but it can store gifs, svgs, etc. Any file or document that does not really get altered.
### backend > venv
	The venv folder contains all the files for the virtual enviroment in which the python scripts and the python flask server will be running in. Typically before you can run the server you should start up the virtual enviroment by navigating to the backend directory and typing '.\venv\Scripts\activate' within the console. This cmd would then run the activate executable inside that venv file path which starts the VE.
### backend > database.db
    The database.db file is where all the user information and website data is being stored and called upon from, its a pretty basic database file created using SQLITE3.
    
    DB Schema:
    CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, hash TEXT NOT NULL);
    CREATE TABLE sqlite_sequence(name,seq);
    CREATE TABLE carts(id INTEGER, itemID INTEGER);
    CREATE TABLE catalog(id INTEGER, name TEXT, sku TEXT, price INTEGER, imagePath TEXT);
### backend > requirements.txt
	The requirements.txt file is where all the required python dependencies are located and it can be called upon from the console to quickly install everything that is within the txt file.
### backend > server.py
	The server.py file is where the logic of the server happens, it is the primary code for the servers functionality. The first 22 lines of code are all the required imports and dependencies. Most of is taken up by 'flask_jwt_extended' which is the system behind the user authentication and cookies.

    The following functions are the servers route functions which log users in and register users, add items to cart, remove items from carts, and so on. The functions themselves are not too complex in my opinion its just getting data from the client and if the data is good to process the request with the function will throw a '200' success and do the changes to the DB file using cs50's database execution functions.

    All functions work with POST requests only and the reason why I decided to go with this approach is because the way I made the front-end there arent any web routes taking the user to different pages for a GET request to make sense. So I decided to just POST all requests so it doesnt populate the url with information.

    I have created two functions within the server that can only be accessed using sites like Postman or making an entirely different JS file and running it that way, the reasoning behind this is that I wanted a fast and easy way to test and add new catalog items without having to edit the SQL database every single time and instead I just send a JSON raw data to the function and it populates the database with said data or removes it if using the '/removeitem' route.

## Client
### client > node_modules
    The first folder which is the node_modules folder is a folder created by NPM which keeps track of all the modules and dependencies that are installed on locally for the project. Its not something I messed around with myself but its good to know what it is used for and why JavaScript projects need it.
### client > public
    I did not touch the public folder and its contents but I do know that whatever file(s) that exist within this folder do not get altered by a webpack or in simpler terms they just get copied as is to the production build from the development build.
### client > src
	The source folder is very similar to the public folder only key difference is that it primarily used to contain script files that will be used by a webpack. It also contains some primary files such as the 'index.css', 'main.jsx', 'Router.jsx'. 
    
    The index.css file is the main CSS document for the entire site which has some custom styles that I have made but it is mainly edited by Tailwinds framework which is what I used for majority of the CSS throughout the project.

    The main.jsx file is what loads and renders the Router file which contains all the components of the application in a tree like Parent/Child order.

    The Router.jsx file however has majority of the applications front-end functionality even though the main.jsx is what renders the Router itself, the Router.jsx with all of its imported components is what makes the application function. 

    Within the Router file I have a Router function which has some of the functions imported for the authentication process and also has a counter useEffect which rerenders the cart component whenever an item gets added to cart or removed from cart.
### client > src > assets
    In the src assets directory I just have the logo svg for the site but you can store anything that the site requires in terms of images/media.
### client > src > components
	Since I used React for this project this folder contains all the React JSX components that get imported to the Router.jsx file.

    Most of these components are fairly straightforward and all they really do is take in a couple of props from their parent components and use it in the return render.

    The ones that really took my time to figure out would have to be the register and login components because of the authentication functionality. One of the things I struggled with was that I had constant bugs with the fetch functions and I eventually ended up solving my problems by researching 'CORS' and headers and everything that goes into a fetch request.

    Another challenge I faced was getting the user cart to update with the proper information and I also wanted the data to update in real time using Reacts component re-render capability. I decided to go with a solution where I just have a counter and I prop the value of that counter useEffect to the child components that either add or remove cart items, and I made it so that everytime you add or remove an item it would increase the counter by 1 which would reload the cart component, resulting in the accurate data being shown.
### client > src > components > auth
    In the auth folder it is similar to the scripts folder except I wanted to seperate the two so that I know this focuses strictly on the authentication process.

    This script essentially loads the authentication token from the localStorage or if not present it updates the authToken stored everytime that the server responds with a new token. But this is just one part of the authentication code the rest is done within the Login.jsx component which fetches the username/password information to the server and if everything is correct the server should respond with an authentication token which is then grabbed by this function and put inside of localStorage to remember which user is logged in.

### client > src > components > scripts
	The scripts folder only contains one JSX which is just a fairly small script I wrote to manage the functionality of the header buttons, making them disappear and reappear upon click and also if one of them is open and you open the other it will close all currently open windows.

# Final thoughts and conclusions
    As an aspiring Front-End Web Developer I really wanted to make something that utilizes the most popular web frameworks like React JS and Tailwind CSS for styling because I think they are essential tools to learn for what I want to do. 

    The project does not have proper online commerce store functionality because you cannot go past the cart and finalize a purchase. And I knew if I would start a project like this that a fully functional payment processor is something that would require lots more time to complete which is why my next goal is to finish CS50W to get a stronger understanding of the logic and code behind those types of systems.

    With that being said I focused heavily on trying to learn React and I had no idea where to even begin but I am very satisfied with the final product, and looking forward to creating better and more fuller projects using React. Its truly a really fun framework to build with.