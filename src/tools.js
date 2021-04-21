import request from 'request'
import fs from 'fs'

export const get = (param) =>
  new Promise((resolve, reject) => {
    request(param, (error, response, body) => {
      if (!error && response.statusCode == 200 && response.body) {
        resolve(response.body)
      } else {
        reject(response)
      }
    })
  })

export const wait = (timeout) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })

export const read = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', async (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data))
    })
  })

export const write = (path, data, format = 'json') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, format === 'json' ? JSON.stringify(data, null, 2) : data, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })

export const fill = (str, length, c = ' ') => {
  if (str.length >= length) return str
  let temp = []
  temp.length = length - str.length
  return `${str}${temp.join(c)}`
}

export const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
