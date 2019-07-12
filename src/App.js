
import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';
import loadingsvg from './loading.svg';




function App() {


  const APP_ID="e408ce92";
const APP_KEY="73c6143a77077806213ff9f879809513";

const CORS= "https://cors-anywhere.herokuapp.com/";

// const exm_req=`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

const [recipes, setRecipes] = useState([]);//set state of api

const [search, setSearch] = useState("");

const [query, setQuery] = useState("");

const[loading,setLoading]= useState(true);//set state of the loading svg










useEffect(()=>{

console.log("effect has been run");
   getRecipes();

},[query]);

const getRecipes = async()=>{

  try {
    const response= await fetch(`${CORS}https://www.food2fork.com/api/search?key=e1ad4f01ff7d0da10b55129943935a14&q=${query}`);
    setLoading(false);
    const data= await response.json();

    setRecipes(data.recipes)
    console.log(data);
    
      } catch (error) {
       console.log(error);
     }

    }

    const updateSearch = e=>{
        setSearch(e.target.value)


        console.log(search)
    }

    const updateQuery= e=>{
      e.preventDefault();
      setQuery(search)
      setSearch("")

      console.log(search)
  }

 

  return (

    
    <div className="App">
      {loading ? (<img  className="loading" src={loadingsvg} alt='loading'/>
  
  ) :(

   <div>

<form onSubmit={updateQuery} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/> 
        <button className="search-button" value="">Search</button>
    </form>
    <div className="recipes">
              {recipes.map(recipe=>(
                
              <Recipe
                key={recipe.title} title={recipe.title} 
                publisher={recipe.publisher}
                image={recipe.image_url}
                />  ))}
    </div>
   </div>)}
      
      
     
    </div>

   
  );
}

export default App;
