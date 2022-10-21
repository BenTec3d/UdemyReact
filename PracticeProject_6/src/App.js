import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartIsVisible = useSelector((state) => state.cart.isVisible)

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      {!cartIsVisible && <Products />}
    </Layout>
  );
}

export default App;
