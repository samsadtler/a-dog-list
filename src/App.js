import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams
} from "react-router-dom";

import { AllBreedsList } from "./AllBreedsList";
import { BreedPage } from "./BreedPage";

export default function App() {
  const [breeds, setBreeds] = useState();
  useEffect(() => {
    const response = fetch("https://dog.ceo/api/breeds/list/all");
    response
      .then((res) => res.json())
      .then(({ message }) => {
        let dogObject = Object.keys(message);
        const doog = dogObject.reduce((allDogs, dog, index, array) => {
          if (index === 0) {
            let temp = {
              [dog]: {
                next: array[index + 1],
                before: array[array.length - 1],
                images: []
              }
            };
            return { ...allDogs, ...temp };
          }
          if (index === array.length - 1) {
            let temp = {
              [dog]: { next: array[0], before: array[index - 1], images: [] }
            };
            return { ...allDogs, ...temp };
          } else {
            let temp = {
              [dog]: {
                next: array[index + 1],
                before: array[index - 1],
                images: []
              }
            };
            return {
              ...allDogs,
              ...temp
            };
          }
        }, {});
        setBreeds(doog);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleImages = (id, images) => {
    let breedUpdates = {
      [id]: {
        next: breeds[id].next,
        before: breeds[id].before,
        images: images.message
      }
    };
    setBreeds({ ...breeds, ...breedUpdates });
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <h1>All The Doggos!</h1>
            <h2>Select a breed to learn more</h2>
            <AllBreedsList breeds={breeds} />
          </div>
        </Route>
        <Route path="/:id">
          <BreedPage breeds={breeds} handleImages={handleImages} />
        </Route>
      </Switch>
    </Router>
  );
}
