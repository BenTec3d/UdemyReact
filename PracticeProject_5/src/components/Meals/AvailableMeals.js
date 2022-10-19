import { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [mealsList, setMealsList] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://udemyreact-1714c-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
            const responseData = await response.json();

            const fetchedMeals = [];

            for (const key in responseData) {
                fetchedMeals.push({
                    id: key,
                    ...responseData[key]
                });
            }

            setMealsList(fetchedMeals.map(meal =>
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price} />
            ));
        }

        fetchMeals();
    }, []);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;