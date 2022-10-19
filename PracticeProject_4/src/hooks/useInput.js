import { useState } from "react";

const useInput = (validation) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isBlurred, setIsBlurred] = useState(false);

    const isValid = validation(enteredValue);
    const hasError = !isValid && isBlurred;

    const valueChangedHandler = (event) => {
        setIsBlurred(false);
        setEnteredValue(event.target.value);
    };
    const blurChangedHandler = () => {
        setIsBlurred(true);
    };
    const reset = () => {
        setEnteredValue("");
        setIsBlurred(false);
    };

    return {
        value: enteredValue,
        isValid,
        hasError,
        valueChangedHandler,
        blurChangedHandler,
        reset
    }
};

export default useInput;