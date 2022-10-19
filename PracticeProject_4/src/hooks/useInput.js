//Solution 1 using useState

// import { useState } from "react";

// const useInput = (validation) => {
//     const [enteredValue, setEnteredValue] = useState('');
//     const [isBlurred, setIsBlurred] = useState(false);

//     const isValid = validation(enteredValue);
//     const hasError = !isValid && isBlurred;

//     const valueChangedHandler = (event) => {
//         setIsBlurred(false);
//         setEnteredValue(event.target.value);
//     };
//     const blurChangedHandler = () => {
//         setIsBlurred(true);
//     };
//     const reset = () => {
//         setEnteredValue("");
//         setIsBlurred(false);
//     };

//     return {
//         value: enteredValue,
//         isValid,
//         hasError,
//         valueChangedHandler,
//         blurChangedHandler,
//         reset
//     }
// };

//export default useInput;


//Solution 2 using useReducer

import { useReducer } from "react";

const defaultState = {
    value: "",
    isBlurred: false
};

const reducer = (state, action) => {
    switch(action.type){
        case "VALUE":
            return {value: action.value, isBlurred: false};
        case "BLUR":
            return {value: state.value, isBlurred: true};
        case "RESET":
            return {value: "", isBlurred: false};
        default:
            return defaultState;
    }
}

const useInput = (validation) => {
    const [inputState, dispatch] = useReducer(reducer, defaultState);

    const isValid = validation(inputState.value);
    const hasError = !isValid && inputState.isBlurred;

    const valueChangedHandler = (event) => {
        dispatch({type: "VALUE", value: event.target.value});
    };
    const blurChangedHandler = () => {
        dispatch({type: "BLUR"});
    };
    const reset = () => {
        dispatch({type: "RESET"});
    };

    return {
        value: inputState.value,
        isValid,
        hasError,
        valueChangedHandler,
        blurChangedHandler,
        reset
    }
};

export default useInput;