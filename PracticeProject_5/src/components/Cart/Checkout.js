import useInput from "../../hooks/useInput.js";
import classes from "./Checkout.module.css";

const isNotEmpty = value => value.trim().length > 0;
const isFiveCharacters = value => value.trim().length === 5;

const Checkout = props => {
    const {
        value: nameInputValue,
        isValid: nameInputIsValid,
        hasError: nameInputHasError,
        valueChangedHandler: nameInputValueChangedHandler,
        blurChangedHandler: nameInputBlurChangedHandler,
    } = useInput(isNotEmpty);

    const {
        value: streetInputValue,
        isValid: streetInputIsValid,
        hasError: streetInputHasError,
        valueChangedHandler: streetInputValueChangedHandler,
        blurChangedHandler: streetInputBlurChangedHandler,
    } = useInput(isNotEmpty);

    const {
        value: postalInputValue,
        isValid: postalInputIsValid,
        hasError: postalInputHasError,
        valueChangedHandler: postalInputValueChangedHandler,
        blurChangedHandler: postalInputBlurChangedHandler,
    } = useInput(isFiveCharacters);

    const {
        value: cityInputValue,
        isValid: cityInputIsValid,
        hasError: cityInputHasError,
        valueChangedHandler: cityInputValueChangedHandler,
        blurChangedHandler: cityInputBlurChangedHandler,
    } = useInput(isNotEmpty);

    const nameInputClasses = nameInputHasError ? classes.control + " " + classes.invalid : classes.control;
    const streetInputClasses = streetInputHasError ? classes.control + " " + classes.invalid : classes.control;
    const postalInputClasses = postalInputHasError ? classes.control + " " + classes.invalid : classes.control;
    const cityInputClasses = cityInputHasError ? classes.control + " " + classes.invalid : classes.control;

    const formIsValid = nameInputIsValid && streetInputIsValid && postalInputIsValid && cityInputIsValid;

    const submitFormHandler = event => {
        event.preventDefault();

        nameInputBlurChangedHandler();
        streetInputBlurChangedHandler();
        postalInputBlurChangedHandler();
        cityInputBlurChangedHandler();

        if (!formIsValid) return;

        props.onSubmit({
            name: nameInputValue,
            street: streetInputValue,
            postal: postalInputValue,
            city: cityInputValue
        });
    }

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" value={nameInputValue} onChange={nameInputValueChangedHandler} onBlur={nameInputBlurChangedHandler}></input>
                {nameInputHasError && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" value={streetInputValue} onChange={streetInputValueChangedHandler} onBlur={streetInputBlurChangedHandler}></input>
                {streetInputHasError && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" value={postalInputValue} onChange={postalInputValueChangedHandler} onBlur={postalInputBlurChangedHandler}></input>
                {postalInputHasError && <p>Please enter a valid postal code (5 characters long)!</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={cityInputValue} onChange={cityInputValueChangedHandler} onBlur={cityInputBlurChangedHandler}></input>
                {streetInputHasError && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Close</button>
                <button className={classes.submit} type="submit">Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;