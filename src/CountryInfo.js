import React from "react";
import countries from 'world-countries';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const CountryInfo = ({ data, detailed }) => {


let ratio = data.area/countries[0].area;
let finalWidth = (ratio * 98) + "%";

let path = "/country" + data.cca3;


  return(

    <Link to = {path}>

    <div className="cards">

    <p>
    <span className="countrynames">{data.name.common}</span>
    <span className="countryarea"> {(Math.ceil(data.area/1000000))}</span> million km <sup>2</sup>

    </p>

    {detailed &&
        <p className="capitalRegion">
        {data.region}
        <br></br>
        {data.capital}
        <br></br><br></br>
        </p>
      }

      <div className="bar" style={{width:finalWidth}}>

      </div>



    </div>

    </Link>
  );
};

export default CountryInfo;
