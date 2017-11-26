import * as Twit from 'twit'
import * as R from 'ramda'
import { Twitter, MappedTwitterData, Flight } from '../types'
import * as gaussian from 'gaussian'
import * as db from '../db/twitter'

const twitterconf = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}

export type AirportToWOEID = {
  airport: string
  WOEID: number
}

const airportToWOEID: AirportToWOEID[] = [
  { airport: 'ARN', WOEID: 906057 },
  { airport: 'BRU', WOEID: 968019 },
  { airport: 'CDG', WOEID: 615702 },
  { airport: 'DUS', WOEID: 646099 },
  { airport: 'EDI', WOEID: 19344 },
  { airport: 'FRA', WOEID: 650272 },
  { airport: 'GOT', WOEID: 890869 },
  { airport: 'LHR', WOEID: 44418 },
  { airport: 'MAN', WOEID: 28218 },
  { airport: 'MUC', WOEID: 676757 },
  { airport: 'MXP', WOEID: 718345 },
  { airport: 'OSL', WOEID: 862592 },
  { airport: 'VIE', WOEID: 551801 },
  { airport: 'ZRH', WOEID: 784794 },
  { airport: 'BCN', WOEID: 753692 },
  { airport: 'BKK', WOEID: 1208341 },
  { airport: 'FCO', WOEID: 721943 },
  { airport: 'KIX', WOEID: 15015370 },
  { airport: 'MAD', WOEID: 766273 }
]

const twit = new Twit(twitterconf)

export const getTwitterDataForAirport = (airportData: AirportToWOEID) => {
  return new Promise<MappedTwitterData>((resolve, reject) => {
    twit.get('trends/place', { id: airportData.WOEID }, (err, data) => {
      if (data.errors || err) {
        return resolve(null)
      }
      const stuff = R.compose(
        R.reduce(
          (acc, obj: Twitter) => ({
            sum: acc.sum + obj.tweet_volume,
            tags: acc.tags.concat(obj.name)
          }),
          { sum: 0, tags: [] }
        ),
        R.take(5),
        R.sortBy((obj: Twitter) => obj.tweet_volume),
        R.filter((obj: Twitter) => !!obj.tweet_volume)
      )(data[0].trends)

      resolve({
        ...stuff,
        diff: gaussian(0, 0.01).ppf(Math.random()) * stuff.sum,
        airport: airportData.airport
      })
    })
  })
}

export const getAllTwitterData = (): Promise<MappedTwitterData[]> => {
  return new Promise<MappedTwitterData[]>((res, rej) => {
    Promise.all(
      R.map((air: AirportToWOEID) => getTwitterDataForAirport(air))(
        airportToWOEID
      )
    ).then(
      data => res(R.filter((d: MappedTwitterData) => d !== null)(data)),
      err => rej(err)
    )
  })
}

export const updateAllTwitterData = (data: MappedTwitterData[]) => {
  return new Promise<string[]>((res, rej) => {
    Promise.all(
      R.map((mappedData: MappedTwitterData) => db.putTwitterData(mappedData))(
        data
      )
    ).then(data => res(data), err => rej(err))
  })
}

export type TwitterDict = {
  [key: string]: MappedTwitterData
}
const weatherWeight = 1.5
const twitterWeight = 0.5
const calculateTotalRisk = (
  twitterRisk,
  weatherRiskArrival,
  weatherRiskDeparture
): number => {
  let weatherRisk
  try {
    const parsedAr = parseInt(weatherRiskArrival, 10)
    const parsedDep = parseInt(weatherRiskDeparture, 10)
    weatherRisk = (parsedAr + parsedDep) / 2
  } catch (e) {
    return 0
  }
  if (twitterRisk && weatherRisk) {
    return twitterRisk * twitterWeight + weatherRisk * weatherWeight
  } else if (twitterRisk) {
    return twitterRisk * twitterWeight
  } else if (weatherRisk) {
    return weatherRisk * weatherWeight
  } else {
    return 0
  }
}

const calculateRisk = (twitterData: MappedTwitterData) => {
  const risk = twitterData.sum / twitterData.diff
  if (risk <= 0) {
    return 0
  } else if (risk <= 0.5) {
    return 1
  } else {
    return 2
  }
}

export const updateFlightDataBasedTwitter = (
  flightData: Flight[],
  twitterDataArray: MappedTwitterData[]
): Flight[] => {
  const onlyHell = R.filter(
    (flight: Flight) => flight.PLAN_ARRIVAL_STATION === 'HEL'
  )(flightData)
  const twitterDict: TwitterDict = {}
  R.forEach(
    (twitterData: MappedTwitterData) =>
      (twitterDict[twitterData.airport] = twitterData)
  )(twitterDataArray)
  const mapped = R.map((flight: Flight) => {
    const twitterData: MappedTwitterData =
      twitterDict[flight.PLAN_DEPARTURE_STATION]
    if (twitterData) {
      const twitterRisk = calculateRisk(twitterData)

      return {
        ...flight,
        twitter_risk_departure: twitterRisk,
        overall_risk: calculateTotalRisk(
          twitterRisk,
          flight.weather_risk_arrival,
          flight.weather_risk_departure
        ),
        twitterTrends: twitterData.tags
      }
    } else {
      return {
        ...flight,
        overall_risk: calculateTotalRisk(
          0,
          flight.weather_risk_arrival,
          flight.weather_risk_departure
        )
      }
    }
  })(onlyHell)
  return R.filter((flight: Flight) => {
    if (flight) {
      return true
    } else {
      false
    }
  })(mapped)
}
