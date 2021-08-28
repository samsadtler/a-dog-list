import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const useFetchImages = (id) => {
  const [images, setImages] = useState({ id: id, message: [] });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (images?.id === id && status === "idle") {
      setStatus("active");
      const response = fetch(`https://dog.ceo/api/breed/${id}/images/random/4`);
      response
        .then((res) => res.json())
        .then(({ ...message }) => {
          setImages(({ id }) => ({ id, ...message }));
          setStatus("complete");
        });
    }
  }, [id]);

  return [images];
};

function BreedPage({ handleImages, breeds }) {
  const { id } = useParams();
  const [images] = useFetchImages(id);
  const { next, before } = breeds[id];
  const [nextImages] = useFetchImages(next);
  const [beforeImages] = useFetchImages(before);

  useEffect(() => {
    if (
      images.message.length > 0 &&
      nextImages.message.length > 0 &&
      beforeImages.message.length > 0 &&
      next &&
      before
    ) {
      handleImages(id, images);
      handleImages(next, nextImages);
      handleImages(before, beforeImages);
    }
  }, [images, nextImages, beforeImages, before, next]);

  return (
    <div>
      <h3>{id}</h3>
      <div>
        <>
          <img src={images?.message[0]} alt={id} width="250px" />
          <img src={images?.message[1]} alt={id} width="250px" />
          <img src={images?.message[2]} alt={id} width="250px" />
          <img src={images?.message[3]} alt={id} width="250px" />
        </>
      </div>
      <div>
        <Link to="/"> Back To All Breeds</Link>
        <Link to={`/${before}`}>Previous {before}</Link>
        <img width="75px" src={beforeImages.message[0]} alt={next} />
        <Link to={`/${next}`}>
          Next {next}
          <img width="75px" src={nextImages.message[0]} alt={next} />
        </Link>
      </div>
    </div>
  );
}

export { BreedPage };
