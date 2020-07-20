

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import loadingsvg from './loading.svg';
import Recipe from './Recipe';






const Recipes = () => {
  const APP_ID = "b5130093";
  const APP_KEY = "af0e12055d61cb6d1c039f7f699c321f	";

 // const CORS = "https://cors-anywhere.herokuapp.com/";

  //const exm_req=`${CORS}https://api.edamam.com/search?q=&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipe, setRecipes] = useState([]);//set state of api

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("lemons");

  const [loading, setLoading] = useState(true);//set state of the loading svg




   const newState = useSelector(state => state.auth.token)
  // console.log(newState + "StateHooks");
  // let redirectComp = null;

  let history = useHistory();

    
    
  
    



  useEffect(() => {

    console.log("effect has been run");
    getRecipes().then(data => console.log(data));
    if (newState !== null) {
      setTimeout(()=>{
       console.log(newState)
  
        history.push("/auth")
      },3600 * 1000)
    }



  }, [query]);



  const getRecipes = async () => {

    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      console.log(response)

      setRecipes([])
      const data = await response.json();
      
      setRecipes(data.hits)
      setLoading(false);
      return data



    } catch (error) {
      console.log(error);
    }

  }

  const updateSearch = e => {
    setSearch(e.target.value)



    console.log(search)
  }

  const updateQuery = e => {
    e.preventDefault();
if(search===""){
  return false
}
    setQuery(search)
    setSearch("")
    setLoading(true)




    console.log(search)
  }




return (
  <div>


    {loading ? (<img className="loading" src={loadingsvg} alt='loading' />

    ) : (

        <div>

          <form onSubmit={updateQuery} className="search-form">
            <input className="search-bar" type="text" value={search} onChange={updateSearch} />
            <button className="search-button" value="">Search</button>
          </form>





          <div className="recipes">
            {recipe.map((recipe,i) => (


              <Recipe
                key={i}
                title={recipe.recipe.label}
                publisher={recipe.recipe.ingredientLines}
                image={recipe.recipe.image}
                time={recipe.recipe.totalTime}
                serving={recipe.recipe.yield}
                calories={recipe.recipe.calories}
                shareUrl={recipe.recipe.shareAs}



              />


            ))}
          </div>




        </div>)}
  </div>
);
        }

export default (Recipes);


