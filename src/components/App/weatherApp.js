import { useEffect, useState } from "react";
import WeatherForm from "../Form/weatherForm";
import WeatherMainInfo from "../MainInfo/weatherMainInfo";
import styles from "./weatherApp.module.css"
import Loading from "../Loading/Loading";

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
            setTimeout(()=>{
                setWeather({...json})
            },2000)
            
            
        } catch (error) {
            throw error.message
        }
    }

function handleChangeCity(city){
    setWeather(null);
    loadInfo(city)
}

    return(
        <div className={styles.weatherContainer} >
           <WeatherForm onChangeCity={handleChangeCity} />
           {weather?  <WeatherMainInfo weather= {weather} />: <Loading/>}
           
        </div>
    )
}