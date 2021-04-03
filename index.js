const COUNTRIES_URL = "https://restcountries.eu/rest/v2/all";

// TOPIC : XHR - XMLHttpRequest
// WHY : To get the data from a given endpoint(URL)

// 1. Create an instance of XHR
// 2. Create/open a new connection
// 3. Send the request
// 4. Load the response and display required data

// NOTE : the response from the sent request is returned in 'response' variable

const req = new XMLHttpRequest();

const countryAcceptsUSD = (currencies) => {
  return currencies.filter((currency) => currency.code == "USD").length > 0
    ? true
    : false;
};

req.open("GET", COUNTRIES_URL, true);
req.send();
req.onload = function () {
  const countriesData = JSON.parse(this.response);
  // console.log(countriesData[0]);

  console.log("All the countries from Asia continent : ");
  const asianCountries = [];
  countriesData.filter((country) =>
    country.region.toLowerCase() == "asia"
      ? asianCountries.push(country.name)
      : null
  );
  console.log(asianCountries);

  console.log("All the countries with a population of less than 2 lacs : ");
  const countriesUnder2LacPopulation = [];
  countriesData.filter((country) =>
    country.population < 200000
      ? countriesUnder2LacPopulation.push(country.name)
      : null
  );
  console.log(countriesUnder2LacPopulation);

  console.log(
    "Print the following details name, capital, flag for all countries : "
  );
  countriesData.forEach((country) => {
    console.log(`${country.name} | ${country.capital} | ${country.flag}`);
  });

  console.log("Print the total population of countries");
  const totalPopuation = countriesData.reduce(
    (s, country) => s + country.population,
    0
  );
  console.log(totalPopuation);

  console.log("Print the country which use US Dollars as currency");
  const countriesWithUSD = [];
  countriesData.forEach((country) => {
    countryAcceptsUSD(country.currencies)
      ? countriesWithUSD.push(country.name)
      : null;
  });
  console.log(countriesWithUSD);
};
