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