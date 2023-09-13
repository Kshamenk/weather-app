import { useEffect, useState } from "react";
import WeatherForm from "../Form/weatherForm";
import WeatherMainInfo from "../MainInfo/weatherMainInfo";


export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(()=>{
        loadInfo()
    },[])

    useEffect(()=>{
        document.title = `Weather | ${weather?.location.name ?? ''}  `
    },[weather])


    async function loadInfo(city = 'Villa Carlos Paz'){
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);
            const json = await request.json();
            setWeather(json)
            
        } catch (error) {
            throw error.message
        }
    }

function handleChangeCity(city){
    setWeather(null);
    loadInfo(city)
}

    return(
        <div>
           <WeatherForm onChangeCity={handleChangeCity} />
            <WeatherMainInfo weather= {weather} />
        </div>
    )
}