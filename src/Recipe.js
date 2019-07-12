import React from 'react';
import style from './recipe.module.css';



const Recipe=({title,publisher,image})=>{

    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>{publisher}</p>
            <img src={image} alt=""/>
        </div>


    );

}

export default Recipe;

