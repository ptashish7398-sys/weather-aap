const API_KEY = "c97f55ae794944da80483058261209";

const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const city = document.getElementById("city");
const country = document.getElementById("country");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uv = document.getElementById("uv");

const updated = document.getElementById("updated");

async function getWeather(location) {
    try {
        errorMessage.textContent = "";
        searchBtn.textContent = "Loading...";
        searchBtn.disabled = true;

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Unable to get weather data");
        }

        city.textContent = data.location.name;
        country.textContent = `${data.location.region}, ${data.location.country}`;

        temperature.textContent = data.current.temp_c;
        condition.textContent = data.current.condition.text;

        weatherIcon.src = `https:${data.current.condition.icon}`;
        weatherIcon.alt = data.current.condition.text;

        feelsLike.textContent = `${data.current.feelslike_c}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph} km/h`;
        uv.textContent = data.current.uv;

        updated.textContent = data.current.last_updated;

        weatherCard.style.display = "block";
    } catch (error) {
        weatherCard.style.display = "none";
        errorMessage.textContent = `❌ ${error.message}`;
    } finally {
        searchBtn.textContent = "Search";
        searchBtn.disabled = false;
    }
}

searchBtn.addEventListener("click", function () {
    const location = locationInput.value.trim();

    if (location === "") {
        errorMessage.textContent = "Please enter a city name.";
        weatherCard.style.display = "none";
        return;
    }

    getWeather(location);
});

locationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

getWeather("London");

