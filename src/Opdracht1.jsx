import './App.css';
import axios from "axios";
import {useState} from "react";
import './Opdracht1.css'


function Opdracht1() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(true);

    async function HandleClick() {
        try {
            setLoading(true);
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population');
            setCountries(result.data);
            setShowButton(false);
        } catch (e) {
            console.error("Fout bij het ophalen van alle landen", e);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <header>
                <img src="src/assets/world_map.png" alt="World Map"/>
                <h1>World Regions</h1>
            </header>
            <main className="main">
                {showButton && <button onClick={HandleClick}>Toon alle landen</button>}
                {loading && <p>Bezig met laden</p>}
                <ul className="countries-list">
                    {countries
                        .sort((a, b) => a.population - b.population)
                        .map((country, index) => (
                            <li key={index}>
                                <div className="country-name">
                                    <img
                                        src={country.flags.svg}
                                        alt={`Vlag van ${country.name.common}`}
                                    />
                                    <h3>{country.name.common}</h3>
                                </div>
                                <p>Has a population of {country.population}</p>
                            </li>
                        ))}
                </ul>
            </main>

        </>
    )
}

export default Opdracht1;