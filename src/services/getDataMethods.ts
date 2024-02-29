import { getWeatherIconPath } from '@/services/getIconPath'

export function getHoursData(daysData: any) {
  const weatherByHour: any[] = []
  if (daysData.value) {
    const now = new Date()
    const nowHour: number = now.getHours()
    for (let i = nowHour + 1; i < daysData.value.forecast.forecastday[0].hour.length; i++) {
      const time: string = daysData.value.forecast.forecastday[0].hour[i].time
      const short_time: string = time.slice(-5)
      const hourCondition: string = daysData.value.forecast.forecastday[0].hour[i].condition.text
      const iconPath: string = getWeatherIconPath(hourCondition)
      const temp_c: number = daysData.value.forecast.forecastday[0].hour[i].temp_c
      const temp_f: number = daysData.value.forecast.forecastday[0].hour[i].temp_f
      const is_day: number = daysData.value.forecast.forecastday[1].hour[i].is_day
      let fullIconPath: string
      if (is_day === 1) {
        fullIconPath = 'images/icons/weather-icons/day' + iconPath
      } else {
        fullIconPath = 'images/icons/weather-icons/night' + iconPath
      }
      const pushedObject: any = {
        hour: short_time,
        condition: hourCondition,
        icon_path: fullIconPath,
        hourTemp_c: temp_c,
        hourTemp_f: temp_f,
        isDay: is_day
      }
      weatherByHour.push(pushedObject)
    }
    const currentArrayLength: number = weatherByHour.length
    for (
      let i = 0;
      i < daysData.value.forecast.forecastday[1].hour.length - currentArrayLength;
      i++
    ) {
      const time: string = daysData.value.forecast.forecastday[1].hour[i].time
      const short_time: string = time.slice(-5)
      const hourCondition: string = daysData.value.forecast.forecastday[1].hour[i].condition.text
      const iconPath: string = getWeatherIconPath(hourCondition)
      const temp_c: number = daysData.value.forecast.forecastday[1].hour[i].temp_c
      const temp_f: number = daysData.value.forecast.forecastday[1].hour[i].temp_f
      const is_day: number = daysData.value.forecast.forecastday[1].hour[i].is_day
      let fullIconPath: string
      if (is_day === 1) {
        fullIconPath = 'images/icons/weather-icons/day' + iconPath
      } else {
        fullIconPath = 'images/icons/weather-icons/night' + iconPath
      }
      const pushedObject: any = {
        hour: short_time,
        condition: hourCondition,
        icon_path: fullIconPath,
        hourTemp_c: temp_c,
        hourTemp_f: temp_f,
        isDay: is_day
      }
      weatherByHour.push(pushedObject)
    }

    return weatherByHour
  }
}

export function getTodayWeatherData(daysData: any) {
  const todayWeatherData: any[] = []
  if (daysData.value) {
    for (let i = 0; i < daysData.value.forecast.forecastday[0].hour.length; i++) {
      const time: string = daysData.value.forecast.forecastday[0].hour[i].time
      const short_time: string = time.slice(-5)
      const hourCondition: string = daysData.value.forecast.forecastday[0].hour[i].condition.text
      const iconPath: string = getWeatherIconPath(hourCondition)
      const temp_c: number = daysData.value.forecast.forecastday[0].hour[i].temp_c
      const temp_f: number = daysData.value.forecast.forecastday[0].hour[i].temp_f
      const is_day: number = daysData.value.forecast.forecastday[1].hour[i].is_day
      let fullIconPath: string

      //const fullIconPath2:string= is_day===1?: '/assets/images/icons/weather-icons/day' + iconPath : '/assets/images/icons/weather-icons/night' + iconPath
      if (is_day === 1) {
        fullIconPath = 'images/icons/weather-icons/day' + iconPath
      } else {
        fullIconPath = 'images/icons/weather-icons/night' + iconPath
      }
      const pushedObject: any = {
        hour: short_time,
        condition: hourCondition,
        icon_path: fullIconPath,
        hourTemp_c: temp_c,
        hourTemp_f: temp_f,
        isDay: is_day
      }
      todayWeatherData.push(pushedObject)
    }
    return todayWeatherData
  }
}

function getWeekDay(date: Date) {
  const days: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return days[date.getDay()]
}

export function getWeekData(daysData: any) {
  const weatherByWeek: any = []

  if (daysData.value) {
    for (let i = 1; i < daysData.value.forecast.forecastday.length; i++) {
      const singleDayDate: string = daysData.value.forecast.forecastday[i].date

      const dateYear: number = +singleDayDate.slice(0, 4)
      const dateMonth: number = +singleDayDate.slice(-5, -3) - 1
      const dateDate: number = +singleDayDate.slice(-2)
      const tempDate: Date = new Date(dateYear, dateMonth, dateDate)
      const weekDay: string = getWeekDay(tempDate)
      const singleDayDateNormalized: string = dateYear + '.' + (dateMonth + 1) + '.' + dateDate
      const singleDayCondition: string = daysData.value.forecast.forecastday[i].day.condition.text
      const iconPath: string = getWeatherIconPath(singleDayCondition)
      const fullIconPath: string = 'images/icons/weather-icons/day' + iconPath
      const singleDayMaxTempC: number = daysData.value.forecast.forecastday[i].day.maxtemp_c
      const singleDayMaxTempF: number = daysData.value.forecast.forecastday[i].day.maxtemp_f
      const singleDayMinTempC: number = daysData.value.forecast.forecastday[i].day.mintemp_c
      const singleDayMinTempF: number = daysData.value.forecast.forecastday[i].day.mintemp_f
      const pushedObject: any = {
        date: dateDate,
        normalizedDate: singleDayDateNormalized,
        weekDay: weekDay,
        condition: singleDayCondition,
        icon_path: fullIconPath,
        maxtemp_c: singleDayMaxTempC,
        maxtemp_f: singleDayMaxTempF,
        mintemp_c: singleDayMinTempC,
        mintemp_f: singleDayMinTempF
      }
      weatherByWeek.push(pushedObject)
    }

    return weatherByWeek
  }
}

export function getCurrentDataIcon(daysData: any) {
  let currentDayIconPath: string = ''
  if (daysData.value) {
    const currentDayCondition: string = daysData.value.current.condition.text
    const isDay: number = daysData.value.current.is_day
    const iconPath: string = getWeatherIconPath(currentDayCondition)
    if (isDay === 1) {
      currentDayIconPath = 'images/icons/weather-icons/day' + iconPath
    } else {
      currentDayIconPath = 'images/icons/weather-icons/night' + iconPath
    }
  }
  return currentDayIconPath
}
