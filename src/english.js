import { get, wait } from './tools.js'
import cheerio from 'cheerio'

export const getWordList = async (url) => {
  const result = []
  try {
    console.log(`Fetching ${url}`)
    const content = await get({
      headers: {},
      url,
      proxy: 'http://web-proxy.austin.hp.com:8080',
      rejectUnauthorized: false,
    })
    const $ = cheerio.load(content)

    $('.word-wrap .word-box a').each(function () {
      result.push($(this).text())
    })
  } catch (ignored) {
    console.log(`Failed to fetch word list from ${url}`)
  }
  return result
}

export const getSynos = async (word) => {
  const content = await get({
    headers: {},
    url: `http://m.youdao.com/singledict?q=${word}&dict=syno&le=eng&more=false`,
    proxy: 'http://web-proxy.austin.hp.com:8080',
    rejectUnauthorized: false,
  })
  const $ = cheerio.load(content)
  const result = []

  $('ul li').each(function () {
    const syno = { words: [] }
    $(this)
      .find('p')
      .each(function () {
        const p = $(this)
        const c = p.attr('class')
        if (c && c.includes('clickable')) {
          p.find('a').each(function () {
            syno.words.push($(this).text())
          })
        } else {
          syno.translate = p.text().trim()
        }
      })
    result.push(syno)
  })

  return result
}

export const getWordInfo = async (word) => {
  console.log(`Fetching ${word}`)
  const result = { word, phonetics: [], translations: [] }

  const content = await get({
    headers: {},
    url: `http://m.youdao.com/dict?le=eng&q=${word}`,
    proxy: 'http://web-proxy.austin.hp.com:8080',
    rejectUnauthorized: false,
  })
  const $ = cheerio.load(content)

  $('#ec span.phonetic').each(function () {
    result.phonetics.push($(this).text())
  })

  $('#ec ul li').each(function () {
    result.translations.push($(this).text())
  })

  try {
    await wait(200)
    result.synos = await getSynos(word)
  } catch (e) {
    console.log(`Failed to fetch syno words for ${word}`)
  }

  return result
}
