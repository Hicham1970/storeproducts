import Rating from "./Rating";

// import ProductList from "./ProductList";
export default function Product({ product }) {
  return (
    <tr>
      {product && (
        <>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td>{product.category}</td>
          <td>
            <img width="250px" src={product.image} alt={product.title} />
          </td>
          <td>
            <Rating rate={product.rating.rate} />
          </td>
        </>
      )}
    </tr>
  );
}
