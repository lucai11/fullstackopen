import React, {useEffect, useState} from 'react';
import axios from 'axios'
const API_KEY = process.env.WEATHER_API_KEY

const Weather = ({capital}) => {
  
  const [weather, setWeather] = useState()
  const weatherHook = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then((response) => {
        let newObj = response.data
        console.log(response.data)
        setWeather(newObj)
       
      })
  }
  useEffect(weatherHook,[])
  if(weather !== undefined){
    
    return(
      <>
        <p>temperature: {weather.weather[0].main}<br/>
        description: {weather.main.temp}
        </p>
        
      </>
    )
  }else{return <p>loading weather...</p>}
  
}

const ShowCountry = ({countryName, updateSearch}) => {
  return (
    <button onClick={() => updateSearch(countryName)}>Show</button> 
  )
}
const Countries = ({countries, filter, updateSearch}) =>{
  if(countries[0] === 'loading'){
    return <p>Loading</p>
  }else if(filter === ''){
    return <p>Enter Search String</p>
  }else{
    const filteredCountries = countries.filter(country => country.name.indexOf(filter) !== -1)
    console.log(filteredCountries.length)
    if(filteredCountries.length > 10){
      return <p>Be more specific, too many results</p>
    }else if(filteredCountries.length < 10 && filteredCountries.length > 1){
      return(
        <ul>
          {filteredCountries.map(country => 
            <div key={country.name}>
              <li>{country.name}   <ShowCountry countryName={country.name} updateSearch={updateSearch}/></li>
            </div>
          )}
        </ul>
      )
    }else if(filteredCountries.length === 1){
      return(
        <>
          {filteredCountries.map(country => 
            <div key={country.name}>
              <h4>{country.name}</h4>
              <p>Capitol: {country.capital} <br/>Population: {country.population}</p>
              <h5>Languages</h5>
              <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
              <img style = {{width: "200px"}} src = {country.flag} />
              <Weather capital = {country.capital}/>
            </div>
            
          )}
        </>
        
      )
    }else{return <p>No country found</p>}
   
  }
  
}

const App = () => {
  
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(["loading"])
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const updateSearch = (countryName) => {
    setFilter(countryName)
  }
  return (
    <>
      <h3>Search</h3>
      <input id='filter' value = {filter} onChange={handleChange}/>
      <Countries countries = {countries} filter = {filter} updateSearch={updateSearch}/>
    </>
  );
};

export default App;