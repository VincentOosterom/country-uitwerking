import axios from "axios";
import {useState} from "react";
import './Opdracht2.css'

function Opdracht2() {
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // HELPERSFUNCTIE inwoners afronden tot miljoen

    function formatPopulation(population) {
        return Math.round(population / 100000)
    }

    async function searchCountry(e) {
        e.preventDefault();
        if (!query) return

        try {
            setLoading(true);
            setError("")
            const response = await axios.get(`https://restcountries.com/v3.1/name/${query}?fullText=true`
            );
            console.log(response);
            setCountry(response.data[0])
            setQuery("")
        } catch (e) {
            console.log(e)
            setError("Fout bij het laden van deze informatie");
        } finally {
            setLoading(false);
        }
    }

    return (
        <header className="app-header">
            <h1>Search Country Information</h1>
            <img src="src/assets/world_map.png" alt=""/>
            <form onSubmit={searchCountry} className="search-country-form">
                <input
                    placeholder="Welke land zoekt u? "
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Zoek het land</button>
            </form>

            {loading && <p>Bezig met ophalen van de juiste gegevens</p>}
            {error && <p>{error}</p>}

            {country && (
                <article className="country-article">
                    <div className="country-info">
                        <img src={country.flags.svg} alt={`${country.name.common}`}/>
                        <h3>{country.name.common}</h3>
                    </div>
                    <p>{country.name.common} is situated in {country.subregion} and the capital is {country.capital}. It
                        has a population of {formatPopulation(country.population)} million people and it borders
                        with {country.borders ? country.borders.length : 0} neighboring countries.</p>
                </article>
            )}
        </header>
    )
}

export default Opdracht2;