import React, { useContext, useState } from "react";

import CartItem from "./CartItem";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [httpError, setHttpError] = useState();
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

    const closeModalTimer = () => {
        setTimeout(() => {
            props.onClose();
        }, 3000);
    };

    const onOrderSubmit = async (userData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("https://udemyreact-1714c-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
                method: "Post",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            setSubmitSuccess(true);
            cartCtx.clearCart();
            closeModalTimer();

        } catch (error) {
            setHttpError(error.message);
        } finally {
            setIsSubmitting(false);
        }
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

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{formattedTotalAmount}</span>
            </div>
            {showCheckout && <Checkout onClose={props.onClose} onSubmit={onOrderSubmit} />}
            {!showCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const submitSuccessModalContent = <p>Successfully sent the order!</p>;

    const errorModalContent = <p>{httpError}</p>;

    return (
        <Modal onClose={props.onClose}>
            {httpError && errorModalContent}
            {!httpError && !isSubmitting && !submitSuccess && cartModalContent}
            {!httpError && isSubmitting && isSubmittingModalContent}
            {!httpError && !isSubmitting && submitSuccess && submitSuccessModalContent}
        </Modal >
    );
};

export default Cart;