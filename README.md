# Test Project: Weather 2

Vue assessment project

## Install & Configure

Install dependencies:

```bash
npm install
```

Create local environmental variables:

```bash
cp default.env .env.local
# then modify as needed
```

Run development version:

```bash
npm run dev
```

## Considerations

The OpenWeather API free tier only allows for two APIs:

- Current weather
- Forecast for the next 5 days every 3 hours (at a max count of 40)

So _Next hours_ functionality only shows every three hours and the _Next days_ gets an "average" of the day from the data of every three hours.

## Next steps

- Put a card for the current weather of the city
- Give the option for the user to change units and locale
- Store forecast data with city data, so it can be reused without calling the API every time
