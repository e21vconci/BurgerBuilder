import React from 'react';
//import { withRouter } from 'react-router-dom';
 
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    console.log(props);
    let transformedIngredients = Object.keys( props.ingredients ) // estrae le chiavi di un dato oggetto e lo trasforma in un array, quindi fornisce un array di chiavi.
    .map( igKey => {
        return [...Array( props.ingredients[igKey] )].map(( _, i ) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []); // trasforma l'array in modo che se viene passato un array vuoto, la sua lunghezza sarà zero.
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    //console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

//export default withRouter(burger); in modo da poter passare anche i parametri nella route
export default burger;