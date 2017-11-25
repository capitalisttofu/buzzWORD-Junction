import * as Twit from 'twit'
import * as R from 'ramda'
import { Twitter } from '../types'
import * as gaussian from 'gaussian'

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
  // { airport: 'BRU', WOEID: 968019 },
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
  // { airport: 'BKK', WOEID: 1208341 },
  { airport: 'FCO', WOEID: 721943 },
  { airport: 'KIX', WOEID: 15015370 },
  { airport: 'MAD', WOEID: 766273 }
]

const twit = new Twit(twitterconf)

export type MappedTwitterData = {
  airport: string
  diff: number
  sum: number
  tags: string[]
}

export const getTwitterDataForAirport = (airportData: AirportToWOEID) => {
  return new Promise<MappedTwitterData>((resolve, reject) => {
    twit.get('trends/place', { id: airportData.WOEID }, (err, data) => {
      if (data.errors || err) {
        return reject('lol couldnt find stuff for ' + airportData.airport)
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

export const getAllTwitterData = async () => {
  return new Promise((res, rej) => {
    Promise.all(
      R.map((air: AirportToWOEID) => getTwitterDataForAirport(air))(
        airportToWOEID
      )
    ).then(data => res(data), err => rej(err))
  })
}
