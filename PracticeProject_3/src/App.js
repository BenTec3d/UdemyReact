import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals"

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const openCartHandler = () => {
    setShowCart(true);
  };

  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <React.Fragment>
      {showCart && <Cart onClose={closeCartHandler} />}
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
};

export default App;
