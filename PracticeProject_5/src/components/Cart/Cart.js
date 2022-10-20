import { useContext, useState } from "react";

import CartItem from "./CartItem";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const formattedTotalAmount = `${Math.abs(cartCtx.totalAmount).toFixed(2)} €`;
    const cartHasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = item => {
        cartCtx.removeItem({ ...item, amount: 1 });
    };

    const orderHandler = event => {
        setShowCheckout(true);
    };

    const onOrderSubmit = userData => {
        fetch("https://udemyreact-1714c-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: "Post",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        cartCtx.clearCart();
        props.onClose();
    };

    const cartItems = (
        <ul className={classes.cartItems}>
            {cartCtx.items.map(item => <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={() => cartItemAddHandler(item)}
                onRemove={() => cartItemRemoveHandler(item)}
            />)}
        </ul>
    );

    const modalActions = (
        < div className={classes.actions}>
            <button className={classes.button__alt} onClick={props.onClose}>Close</button>
            {cartHasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{formattedTotalAmount}</span>
            </div>
            {showCheckout && <Checkout onClose={props.onClose} onSubmit={onOrderSubmit}/>}
            {!showCheckout && modalActions}
        </Modal >
    );
};

export default Cart;