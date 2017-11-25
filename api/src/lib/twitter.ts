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

const airportToWOEID = {
  ARN: 906057,
  BRU: 968019,
  CDG: 615702,
  DUS: 646099,
  EDI: 19344,
  FRA: 650272,
  GOT: 890869,
  LHR: 44418,
  MAN: 28218,
  MUC: 676757,
  MXP: 718345,
  OSL: 862592,
  VIE: 551801,
  ZRH: 784794,
  BCN: 753692,
  BKK: 1208341,
  FCO: 721943,
  KIX: 15015370,
  MAD: 766273
}

const twit = new Twit(twitterconf)

export const getAllTwitterData = (id: string) => {
  return new Promise((resolve, reject) => {
    twit.get('trends/place', { id: airportToWOEID[id] }, (err, data) => {
      if (err) {
        reject(err)
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
        data: {
          ...stuff,
          diff: gaussian(0, 0.01).ppf(Math.random()) * stuff.sum
        }
      })
    })
  })
}
