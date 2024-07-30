document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');

    const API_KEY = 'cbb570b77b15e731727e3f853089f4a1'; // Replace with your OpenWeatherMap API key

    weatherForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            try {
                const weatherData = await getWeatherData(city);
                displayWeatherData(weatherData);
            } catch (error) {
                weatherResult.innerHTML = `<p>City not found</p>`;
            }
        }
    });

    async function getWeatherData(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('City not found');
        }
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <p>${weather[0].description}</p>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
        `;
    }
});