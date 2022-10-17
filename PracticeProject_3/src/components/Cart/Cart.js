import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = props => {
    const cartItems =
        <ul className={classes.cartItems}>
            {[{
                id: "c1",
                name: "Sushi",
                amount: 2,
                price: 12.99
            },
            {
                id: "c2",
                name: "Sake",
                amount: 1,
                price: 4.99
            }].map(item => <li>{item.name}</li>)}
        </ul>;

    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>42.95</span>
            </div>
            <div className={classes.actions}>
                <button className={classes.button__alt}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;