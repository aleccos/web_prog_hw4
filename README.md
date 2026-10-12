# Weather Dashboard

A small weather app for my web programming course. You type in a city and it shows the current weather using the OpenWeatherMap API.

It shows the temperature, a short description, an icon, and also the feels like temperature, humidity, wind speed and pressure.

## Setup

The API key is not in the repo, so you need to add your own before it will work.

1. Make a free account at https://openweathermap.org/api
2. Go to your profile, then "My API keys", and copy your key. New keys can take up to a couple of hours to start working.
3. In the project folder, copy `config.example.js` and name the copy `config.js`.
4. Open `config.js` and replace `YOUR_API_KEY_HERE` with your key:

   ```js
   const CONFIG = {
     API_KEY: "your key here",
   };
   ```

5. Open `index.html` in your browser (or use Live Server in VS Code).

`config.js` is listed in `.gitignore` so the key never gets committed.

## Files

- `index.html` the page
- `styles.css` the styling
- `script.js` the fetch logic and rendering
- `config.example.js` placeholder for the API key

## Error handling

The app shows a message instead of breaking when:

- the search box is empty
- the city is not found (404)
- the API key is missing or invalid (401)
- too many requests were made (429)
- there is no internet connection
- any other bad response from the API
