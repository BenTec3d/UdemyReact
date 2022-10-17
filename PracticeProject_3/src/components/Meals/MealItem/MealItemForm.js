import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmountString = amountInputRef.current.value;
        const enteredAmount = +enteredAmountString;

        if(enteredAmountString.trim().length === 0 || enteredAmount < 1 || enteredAmount > 9){
            setAmountIsValid(false);
            return;
        }

        setAmountIsValid(true);
        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "9",
                    step: "1",
                    defaultValue: "1"
                }} />
            <button>Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-9).</p>}
        </form>
    );
};

export default MealItemForm;