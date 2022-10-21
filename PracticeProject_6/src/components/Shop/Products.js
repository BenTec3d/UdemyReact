import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummyProducts = [
  {
    id: "p1",
    title: "RTX 4090",
    price: 2200,
    description: "Expensive!"
  }, {
    id: "p2",
    title: "i9 13900k",
    price: 650,
    description: "Hot!"
  },
];

const productItems = dummyProducts.map(item =>
  <ProductItem
    id={item.id}
    key={item.id}
    title={item.title}
    price={item.price}
    description={item.description} />
);

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems}
      </ul>
    </section>
  );
};

export default Products;
