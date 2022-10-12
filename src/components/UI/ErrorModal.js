import React from "react";
import ReactDOM from "react-dom";

import classes from "./ErrorModal.module.css";
import Card from "./Card";
import Button from "./Button";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = props => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onClick}>Close</Button>
            </footer>
        </Card>
    );
};

const ErrorModal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClose} />,
                document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClose} title={props.title} message={props.message} />,
                document.getElementById("overlay-root"))}
        </React.Fragment>
    )
};

export default ErrorModal;