
import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';
import loadingsvg from './loading.svg';
import orange  from './img/oranges.jpg';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans:300,400,700', 'sans-serif']
  }
});





function App() {


  const APP_ID="b5130093";
const APP_KEY="af0e12055d61cb6d1c039f7f699c321f	";

const CORS= "https://cors-anywhere.herokuapp.com/";

 //const exm_req=`${CORS}https://api.edamam.com/search?q=&app_id=${APP_ID}&app_key=${APP_KEY}`;

const [recipe, setRecipes] = useState([]);//set state of api

const [search, setSearch] = useState("");

const [query, setQuery] = useState("lemons");

const[loading,setLoading]= useState(true);//set state of the loading svg










useEffect(()=>{

console.log("effect has been run");
   getRecipes().then(data=>console.log(data));

},[query]);



const getRecipes = async()=>{

  try {
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    console.log(response)

    setLoading(false);
    setRecipes([])
    const data= await response.json();
    
    setRecipes(data.hits)
    return data


    
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

    
    <div className="App" style={{backgroundImage:`url(${orange})`,backgroundSize: "cover"}}>
      {loading ? (<img  className="loading" src={loadingsvg} alt='loading'/>
  
  ) :(

   <div>

<form onSubmit={updateQuery} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/> 
        <button className="search-button" value="">Search</button>
    </form>
    <div className="recipes">
              {recipe.map(recipe=>(
                
    
            <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            publisher={recipe.recipe.ingredientLines}
            image={recipe.recipe.image}
            time={recipe.recipe.totalTime}
            serving={recipe.recipe.yield}
            calories={recipe.recipe.calories}



            />

                
                  ))
                
                
                }
    </div>
   </div>)}
      
      
     
    </div>

   
  );
}

export default App;
