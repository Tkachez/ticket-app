## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser, it also runs server on http://localhost:5000 which was only used for uploading data to firebase

Deployed version can be found at https://awesome-project-545d4.web.app/

You admin credentials:
- email: natasha@lyte.com
- pass: secret123

What is working so far:
- singup
- login/logout
- reset password
- editing user at '/profile'
- uploading profile photo  
- editing event at '/event/:eventId' (you need to be admin to do that , common user will only be able to buy or add to wishlist)

Not working: 
- buying ticket
- adding event to wishlist
- didn't have much time to  

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.