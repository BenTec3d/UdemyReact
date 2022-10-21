import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='RTX 4090'
          price={2200}
          description='Expensive!'
        />
        <ProductItem
          title='i9 13900k'
          price={650}
          description='Hot!'
        />
      </ul>
    </section>
  );
};

export default Products;
