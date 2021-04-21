import { wait, read, write, fill } from './src/tools.js'
import { getWordInfo, getWordList } from './src/english.js'
import fs from 'fs'
import * as R from 'ramda'

// const test = async () => {
//   const w = await getWordInfo('new')
//   console.log(JSON.stringify(w))
// }

// test(url)

const test = async () => {
  const words = await read('./static/words.json')
  const wordMap = await read('./static/wordMap.json')
  const result = []
  let temp = []
  words.forEach((word) => {
    if (word.length <= 3) return
    if (temp.length === 3) {
      result.push(temp.join(''))
      temp = []
    }
    let phonetic = wordMap[word].phonetics[0]
    if (phonetic) {
      if (phonetic.includes(';')) {
        phonetic = `${phonetic.split(';')[0]}]`
      }
      const str = `${phonetic} __________`
      temp.push(fill(fill(str, 25, '_'), 30))
    }
  })
  await write('./static/exercises.txt', result.join('\n'), 'text')
}

test()
