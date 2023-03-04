import axios from 'axios'
import { useEffect, useState } from 'react'

const PrintWeather = ({country, lat, lon}) => {
  const [weatherInfo, setWeatherInfo] = useState({})
  
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  const weatherhook = () => {
    
    axios.get(apiURL)
      .then(response => {
        setWeatherInfo(response.data)
            }) }

  useEffect(weatherhook, [])
  
  if(Object.keys(weatherInfo).length > 0)
  {
    
    let weatherURL = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
    return(
      <div> 
        <h2>Weather in {weatherInfo.name}</h2>
        <p>Temperature: {weatherInfo.main.temp} Celcius</p>
        <img src={weatherURL} />
        <p>Wind: {weatherInfo.wind.speed} m/s</p>
      </div>)
    
  }

  return(
    <div> 
      <h2>Fetching weather info for you.....</h2>
    </div>
  )
  
}


const PrintCountries = ({filteredCountries, countryInfo, setFilteredCountries}) => {

  const handleChange = (name) => {
    setFilteredCountries(countryInfo.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase())))
  }

  if(filteredCountries.length > 10)
  {
    return(<div>Too many matches, sepcify another filter</div>)
  }

  if(filteredCountries.length > 1)
  {
    return(
      <div>
        {filteredCountries.map(country => <p key={country.name.common}>{country.name.common}<button onClick={() => handleChange(country.name.common)}>show</button></p>)}
      </div>
    )
  }

  if(filteredCountries.length === 1)
  {
    let country = filteredCountries[0]
    let lat = country.latlng[0]
    let lon = country.latlng[1]
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital.map(capital => capital)}</p>
        <p>Area: {country.area}</p>
        <p><b>Languages: </b></p>
        <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} width="200" height="200"/>
        <PrintWeather country={country} lat={lat} lon={lon} />
      </div>
    )
  }

  
  return(
    <div>
      Start using the app by searching for a country
    </div>
  )
}

const SearchBar = ({setFilterText, countryInfo, setFilteredCountries}) => {
  // Component to set text to filter countries.
  

  // Define a function to handle change in the input value by setting it to filterText
  const handleChange = (event) => {
    setFilterText(event.target.value)
    setFilteredCountries(countryInfo.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return(
    <form>
      <label> Find Countries  <input type="text" onChange={handleChange}/></label>
    </form>
  )
}



const App = () => {
  const [countryInfo, setCountryInfo] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  // Use the axios library to fetch country info data and store it in a constant since it will not change over the course of this app.
  const countrieshook = () => {
    
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
            setCountryInfo(response.data)})
            }

  useEffect(countrieshook, [])



  return (
    <div>
      <SearchBar setFilterText={setFilterText} countryInfo={countryInfo} setFilteredCountries={setFilteredCountries} />
      <PrintCountries filteredCountries={filteredCountries} countryInfo={countryInfo} setFilteredCountries={setFilteredCountries}/>
      
    </div>
  );
}

export default App;
