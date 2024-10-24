const apiKey = "9f3bc7f88fd72aab6401de0da2cf1c4c";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const backgroundImg = document.getElementById("background");

    backgroundImg.style.backgroundImage = "url('img/bg1.png')";

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Check if data.weather exists and has at least one element
            if (data.weather && data.weather.length > 0) {
                const weatherMain = data.weather[0].main;

                if (weatherMain == "Clouds") {
                    weatherIcon.src = "img/clouds.png";
                    backgroundImg.style.backgroundImage = "url('img/cloudy.gif')";
                } else if (weatherMain == "Clear") {
                    weatherIcon.src = "img/sun1.png";
                    backgroundImg.style.backgroundImage = "url('img/sunny.gif')";
                } else if (weatherMain == "Rain") {
                    weatherIcon.src = "img/rain.png";
                    backgroundImg.style.backgroundImage = "url('img/rain.gif')";
                } else if (weatherMain == "Drizzle") {
                    weatherIcon.src = "img/drizzle.png";
                    backgroundImg.style.backgroundImage = "url('img/dri.gif')";
                } else {
                    backgroundImg.style.backgroundImage = "url('img/sunny.gif')";
                }
            } else {
                // Fallback to default background if weather data is incomplete
                backgroundImg.style.backgroundImage = "url('img/bg1.png')";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }

    }

    searchButton.addEventListener("click", () => {
        checkWeather(searchBox.value);
    })