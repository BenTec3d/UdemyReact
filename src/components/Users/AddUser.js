import React, { useState } from "react";

import classes from "./AddUser.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";

const AddUser = props => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredAge, setEnteredAge] = useState("");

    const addUserHandler = event => {
        event.preventDefault();

        if (enteredName.trim().length === 0) {
            props.onError("Invalid Name!", "Names can not be empty or whitespace only.")
            return;
        }

        if (enteredAge < 18 || enteredAge > 99) {
            props.onError("Invalid Age!", "Please enter an age between 18 and 99.")
            return;
        }

        props.onAddUser({ name: enteredName.trim(), age: enteredAge, id: props.nextId });
        setEnteredName("");
        setEnteredAge("");
    };

    const nameChangeHandler = event => {
        setEnteredName(event.target.value);
    }

    const ageChangeHandler = event => {
        setEnteredAge(event.target.value);
    }

    return (
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="name">Name</label>
                <input value={enteredName} id="name" type="text" onChange={nameChangeHandler}></input>
                <label htmlFor="age">Age</label>
                <input value={enteredAge} id="age" type="number" onChange={ageChangeHandler}></input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    )
};

export default AddUser;