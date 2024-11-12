const container= document.querySelector(".container")
const search= document.querySelector(".search-box button")
const weatherBox= document.querySelector(".weather-box")
const weatherDetails= document.querySelector(".weather-details")
const error404= document.querySelector(".not-found")
const cityHide = document.querySelector(".city-hide")
search.addEventListener("click", ()=>{
    const APIKey = '66f217ff153cea2710a19e48a3905bdc';
    const city = document.querySelector(".search-box input").value;
    if (city === ''){
        alert(`Please Enter the City Name...`)
        return
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response=>response.json()).then(json=>{
        if (json.cod == '404'){
            cityHide.textContent =city;
            container.style.height = '480px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return
        }
        container.style.height = '550px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        const image= document.querySelector(".weather-box img")
        const temperature= document.querySelector(".weather-box .temperature")
        const description= document.querySelector(".weather-box .description")
        const humidity= document.querySelector(".weather-details .humidity span")
        const wind= document.querySelector(".weather-details .wind span")
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'src/clear.png'
                break
            case 'Rain':
                image.src = 'src/rain.png'
                break
            case 'Snow':
                image.src = 'src/snow.png'
                break
            case 'Clouds':
                image.src = 'src/clouds.png'
                break
            case 'Mist':
                image.src = 'src/mist.png'
                break
            case 'Haze':
                image.src = 'src/mist.png'
                break
            default:
                image.src = 'src/clouds.png'
                break
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`
    })
})
