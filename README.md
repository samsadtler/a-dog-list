# a-dog-list

### Notes 
- originally created using codesandbox.io which is why there is basically no commit history (what you should expect from production project)
- styling is none existant
- the app is in three parts parent component (App.js) for shared state, AllBreedsList for a list of all breeds, and BreedPage for breed specific images and page to page nav
- used react and react-router for data handling and routing
- nav and page loading is not working when switching to new dogs though data, breed, and routes update
- moved API logic for fetching images into custom hook, currently these calls are in the BreedPage component to reduce page rerenders, but the hooks should really be called from the parent at time of navigation because the child is turning around and passing state to the parent (which causes a re-render). 
- no tests :'(

### Getting started

`npm install`

### Getting up-and-running

`npm start`
