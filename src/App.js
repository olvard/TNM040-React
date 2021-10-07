import './App.css';
import countries from 'world-countries';
import CountryInfo from './CountryInfo.js';
import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//console.log(countries);
countries.sort((a, b) => b.area - a.area);
//console.log(countries);
const LargeCountries = countries.slice(0, 16);
const LargeCountriesFiltered = LargeCountries.filter(aq => aq.name.common != "Antarctica");
//console.log(LargeCountriesFiltered);
//console.log(searchString);

function App() {

return(

  <Router>
      <div>
        <Switch>
                        //route path med id cca3
          <Route path="/country:cca3" component={CountryDetails}/>

          <Route path="/">

            <CountryList/>
          </Route>
        </Switch>
      </div>
    </Router>);

}


function CountryList(event) {

  //searchString kan ändras med hjälp av setSearchString, useState lämnas tomt
  //ingen utgångsvariabel

  const [searchString, setSearchString] = useState("");

  //laddar om search-string

  let Input = event => {
    setSearchString(event.target.value);
  }

  const matchText = props => {

  let word = props.name.common;
  const lowerCaseWord = word.toLowerCase();
  const lowerCaseSearchString = searchString.toLowerCase();

  return lowerCaseWord.indexOf(lowerCaseSearchString) === 0;

 }

  const SearchedWords = countries.filter(matchText);
  const SearchedCountries = (SearchedWords.slice(0,6)).filter(an => an.name.common != "Antarctica");


  return (<div className="App">
    <input className="searchBar" type="text" placeholder="Search for a country" onChange={Input}></input>

    {SearchedCountries.map((country, index) => (<CountryInfo key={country.cca3} data={country} detailed={index < 5}/>))}
  </div>);

  }


//child

function CountryDetails({match}){

// hämtar nuvarande parametrerar för det landet man klickat på
//value blir det landet
  const thisCountry = getCca3(match.params.cca3);

  const borderCountries = thisCountry.borders.map(border => getCca3(border));
  const SortedBorderCountries = borderCountries.sort((a,b) => b.area - a.area);

return(
  <div>

    <div>
      <a href="/country/">
        <span className="back"> Back </span>
        </a>
        <hr></hr>
        <h1> {thisCountry.name.common} </h1>
    </div>

    <div className="App">
      <h4> Border countries: </h4>
      {SortedBorderCountries.map(country => <CountryInfo key={country.cca3} detailed={true} data={country}> </CountryInfo>)}
    </div>


  </div>);

}

const getCca3 = props => {
  let CountryCca3 = countries.find(found => found.cca3 === props);
  return CountryCca3
}


export default App;
