import { useContext } from "react";

import CartItem from "./CartItem";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const formattedTotalAmount = `${cartCtx.totalAmount.toFixed(2)} €`;
    const cartHasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = item => {
        cartCtx.removeItem({...item, amount:1});
    };

    const cartItems =
        <ul className={classes.cartItems}>
            {cartCtx.items.map(item => <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={() => cartItemAddHandler(item)}
                onRemove={() => cartItemRemoveHandler(item)}
            />)}
        </ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{formattedTotalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes.button__alt} onClick={props.onClose}>Close</button>
                {cartHasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;