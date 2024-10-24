// import ProductList from "./ProductList";
export default function Movies({ movie }) {
  return (
    <tr>
      <>
        <table>
          <tbody>
            <tr>
              <td>movie_id</td>
              <td>original_title</td>
              <td>overview</td>
              <td>poster_path</td>
              <td>release_date</td>
              <td>Actors</td>
              <td>infos</td>
            </tr>
          </tbody>
        </table>
      </>
    </tr>
  );
}
