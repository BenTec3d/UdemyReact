import classes from "./Checkout.module.css";

const Checkout = props => {

    const formSubmitHandler = event => {
        event.preventDefault();
    }

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name"></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street"></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal"></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city"></input>
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Close</button>
                <button className={classes.submit} type="submit" >Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;