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

Therefore, the "Next hours" functionality only shows updates every three hours, and the "Next days" section aggregates daily data from the available information.

## Next steps

- Add a card displaying the current weather for the selected city
- Provide an option to bookmark new cities
- Provide an option to change units and locale
- Store forecast data with city information to reuse without calling the API each time (reload if the data is too old or if the user refreshes it)
