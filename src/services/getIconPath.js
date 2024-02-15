export function getWeatherIconPath(condition){
    switch (condition){
      case 'Sunny':
        return '/clear.svg';
  
      case 'Partly Cloudy':
        return '/partly-cloudy.svg';
  
      case 'Cloudy':
      case 'Overcast ':
      case 'Patchy rain nearby':
        return '/cloudy.svg'
  
      case 'Mist':
      case 'Fog':
      case 'Freezing fog':
        return '/foggy.svg';
  
      case 'Patchy rain possible':
      case 'Patchy light drizzle':
      case 'Light drizzle':
      case 'Freezing drizzle':
      case 'Patchy light rain':
      case 'Light rain':
        return '/weak-rain.svg'
  
      case 'Patchy snow possible':
      case 'Patchy light snow':
      case 'Light snow':
        return '/weak-snow.svg'
  
      case 'Patchy sleet possible':
      case 'Patchy freezing drizzle possible':
      case 'Light freezing rain':
      case 'Moderate or heavy freezing rain':
      case 'Light sleet':
      case 'Moderate or heavy sleet':
      case 'Light sleet showers':
      case 'Moderate or heavy sleet showers':
        return '/sleet.svg';
  
      case 'Thundery outbreaks possible':
      case 'Patchy light rain with thunder':
      case 'Moderate or heavy rain with thunder':
      case 'Patchy light snow with thunder':
      case 'Moderate or heavy snow with thunder':
        return '/thunder.svg';
  
      case 'Blowing snow':
      case 'Blizzard':
      case 'Patchy heavy snow':
      case 'Heavy snow':
      case 'Light snow showers':
      case 'Moderate or heavy snow showers':
        return '/heavy-snow.svg';
  
      case 'Moderate rain at times':
      case 'Moderate rain':
        return '/rainy.svg';
  
      case 'Heavy rain at times':
      case 'Heavy rain':
      case 'Light rain shower':
      case 'Moderate or heavy rain shower':
      case 'Torrential rain shower':
        return '/heavy-rain.svg'
  
      case 'Patchy moderate snow':
      case 'Moderate snow':
        return '/snowy.svg';
  
      case 'Ice pellets':
      case 'Light showers of ice pellets':
      case 'Moderate or heavy showers of ice pellets':
        return '/hail.svg';
      default:
        break;
    }    
  }