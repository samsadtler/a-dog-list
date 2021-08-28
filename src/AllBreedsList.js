import { useMemo } from "react";
import { Link } from "react-router-dom";

const AllBreedsList = ({ breeds }) => {
  const breedKeys = useMemo(() => (breeds ? Object.keys(breeds) : ""), [
    breeds
  ]);
  return (
    <ul style={{ listStyle: "none" }}>
      {breedKeys
        ? breedKeys.map((breed) => {
            return (
              <li>
                <Link key={breeds[breed]} to={`/${breed}`}>
                  {breeds[breed].length > 0
                    ? `${breed} ${breeds[breed]} `
                    : breed}
                </Link>
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export { AllBreedsList };
