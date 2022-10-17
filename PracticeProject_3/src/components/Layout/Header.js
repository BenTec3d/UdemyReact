import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";


const Header = () => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton>Cart</HeaderCartButton>
            </header>
            <div className={classes.mainImage}>
                <img src={mealsImage} alt="A table full of food."></img>
            </div>
        </React.Fragment>
    );
};

export default Header;