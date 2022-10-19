import { useState, useEffect } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [mealsList, setMealsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://udemyreact-1714c-default-rtdb.europe-west1.firebasedatabase.app/meals.json");

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

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

        const tryFetchMeals = async () => {
            try {
                setIsLoading(true);
                await fetchMeals();
            } catch (error) {
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        tryFetchMeals();
    }, []);

    return (
        <section className={classes.meals}>
            <Card>
                {httpError && <p className={classes.errorStatus}>{httpError}</p>}
                {isLoading && <p className={classes.loadingStatus}>Loading meals...</p>}
                {!isLoading && <ul>{mealsList}</ul>}
            </Card>
        </section>
    );
};

export default AvailableMeals;