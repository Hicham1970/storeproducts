import { useState, useEffect } from "react";

export default function MoviesList() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function fetchMovies() {
      setIsLoading(true);
      fetch("https://dummyapi.online/api/movies")
        .then((res) => {
          if (!res.ok) throw new Error("Problème de chargement des données");
          return res.json();
        })
        .then((data) => {
          setMovieList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
    fetchMovies();
  }, []);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <form>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Search</label>
          </div>
          <div className="col-auto">
            <input type="text" id="search" className="form-control" />
          </div>
          <div className="col-auto">
            <input className="btn btn-primary" type="submit" value="Search" />
          </div>
        </div>
      </form>
      <h1>Films :</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#id</th>
            <th>Movie</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.movie}</td>
              <td>{movie.rating}</td>
              <td>{movie.image}</td>
              <td>{movie.imdb_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
