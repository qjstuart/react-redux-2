import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Akai S900 Manual",
    description:
      "Learn the Akai S900, one of the best rack samplers of the 1990s!",
  },
  {
    id: "p2",
    price: 6,
    title: "Akai S950 Manual",
    description:
      "Learn the Akai S950, one of the best rack samplers of the 1990s!",
  },
  {
    id: "p3",
    price: 6,
    title: "Akai S1000 Manual",
    description:
      "Learn the Akai S1000, one of the best rack samplers of the 1990s!",
  },
  {
    id: "p4",
    price: 6,
    title: "Akai S1100 Manual",
    description:
      "Learn the Akai S1100, one of the best rack samplers of the 1990s!",
  },
  {
    id: "p5",
    price: 6,
    title: "Akai S2800 Manual",
    description:
      "Learn the Akai S2800, one of the best rack samplers of the 1990s!",
  },
  {
    id: "p6",
    price: 6,
    title: "Akai S3000 Manual",
    description:
      "Learn the Akai S3000, one of the best rack samplers of the 1990s!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
