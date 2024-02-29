export function getWeatherIconPath(condition: string) {
  condition = condition.toLowerCase()
  condition = condition.trim()
  switch (condition) {
    case 'sunny':
    case 'clear':
      return '/clear.svg'

    case 'partly cloudy':
      return '/partly-cloudy.svg'

    case 'cloudy':
    case 'overcast':
    case 'patchy rain nearby':
      return '/cloudy.svg'

    case 'mist':
    case 'fog':
    case 'freezing fog':
      return '/foggy.svg'

    case 'patchy rain possible':
    case 'patchy light drizzle':
    case 'light drizzle':
    case 'freezing drizzle':
    case 'patchy light rain':
    case 'light rain':
      return '/weak-rain.svg'

    case 'patchy snow possible':
    case 'patchy light snow':
    case 'light snow':
      return '/weak-snow.svg'

    case 'patchy sleet possible':
    case 'patchy freezing drizzle possible':
    case 'light freezing rain':
    case 'moderate or heavy freezing rain':
    case 'light sleet':
    case 'moderate or heavy sleet':
    case 'light sleet showers':
    case 'moderate or heavy sleet showers':
      return '/sleet.svg'

    case 'thundery outbreaks possible':
    case 'patchy light rain with thunder':
    case 'moderate or heavy rain with thunder':
    case 'patchy light snow with thunder':
    case 'moderate or heavy snow with thunder':
      return '/thunder.svg'

    case 'blowing snow':
    case 'blizzard':
    case 'patchy heavy snow':
    case 'heavy snow':
    case 'light snow showers':
    case 'moderate or heavy snow showers':
      return '/heavy-snow.svg'

    case 'moderate rain at times':
    case 'moderate rain':
      return '/rainy.svg'

    case 'heavy rain at times':
    case 'heavy rain':
    case 'light rain shower':
    case 'moderate or heavy rain shower':
    case 'torrential rain shower':
      return '/heavy-rain.svg'

    case 'patchy moderate snow':
    case 'moderate snow':
      return '/snowy.svg'

    case 'ice pellets':
    case 'light showers of ice pellets':
    case 'moderate or heavy showers of ice pellets':
      return '/hail.svg'
    default:
      return ''
  }
}
