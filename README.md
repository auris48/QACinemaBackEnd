frontend link
```
https://github.com/auris48/QACinemaFrontEnd
```
# QACinema-Project

# QA Cinema Website by Team Bravo

This project focuses on a movie website that was created with the MERN (MongoDB, Express, React, Node) stack.
Express was used to build the backend by generating multiple API queries. Using axios and fetch in the frontend,
the data for the requests was obtained from a cloud mongo database. Virtual Studios were used to build the frontend.

# Getting Started with Create React App

You can use this guide to set up a local development copy of the project on your computer. For information about
deploying the project on a live system, see deployment.

# Installing for Windows machine

A detailed set of instructions with examples that show you how to set up a development environment.

# Prerequisites

Install the following before you begin:

Choose any other code editor of your choosing, such as Microsoft Visual Studio Code.
To install necessary modules, use Node.js.
It is possible to host MongoDB Server locally or in the cloud using MongoDB Atlas Cloud Database.
Additional resources

To test API calls to and from the database, use Postman.

# Available Scripts

In the project directory, you can run:

# Importing and running QA Cinema website

1) The project must first be imported, which may be done by either downloading it as a zip file or by
using the git command to clone it down:
```
https://github.com/auris48/QACinemaBackEnd
```

```
https://github.com/auris48/QACinemaFrontEnd
```

2) Once its been cloned down you can access the folder through Visual Studio Code as shown below:

![](./READmeimages/finalprojectimage/backend.png)

![](./READmeimages/finalprojectimage/frontend.png)

3) Next, you must launch command windows in the frontend and backend folders and execute the command 

![](./READmeimages/finalprojectimage/backendnpmi.png)

![](./READmeimages/finalprojectimage/frontendnpmi.png)

This should install all the relevant files which is needed to run the QaCinema application from backend to frontend

 
4) after the above step you can start the backend server via running the following:

```
nodemon index.js
```

This will connect to your mongoDB and start the backend server. You will see the following output in your terminal once it is connected:

![](./READmeimages/finalprojectimage/nodemanstart.png)

Then to start the frontend run the following:

```
npm start
```

![](./READmeimages/finalprojectimage/npmstart.png)

This will then start up the website on your localhost at port 3001.

![](./READmeimages/finalprojectimage/homepage.png)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Versioning

We use SemVer for versioning.

# Supporting Documentation

The "Documentation" folder contains all supporting documents, including those from the planning phase and any external documents used in the project.

# API Keys and config file
Api keys used for the frontend for emailjs

```
const config = {
    emailJsId: `your user id`
}
export default config;
```

## Authors

* **Ross morrison** - [rossmorr](https://github.com/rossmorr)
* **Mohammed Ahmed** - [Tufayel98](https://github.com/Tufayel98)
* **Shahan shah** - [shahan306](https://github.com/shahan306)
* **Aurimas pilnikovas** - [auris48](https://github.com/auris48)
* **Jack hulatt** - [jackhulatt](https://github.com/jackhulatt)

## License

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) file for details 

*For help in [Choosing a license](https://choosealicense.com/)*

## Acknowledgments

Thanks you to all the QAC Trainers
