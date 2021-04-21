import cheerio from 'cheerio'

const url = 'http://m.youdao.com/singledict?q=doctor&dict=rel_word&le=eng&more=false'

const content = `
<p>词根：doctor</p>
<ul>
  <li>
    <p class="secondary">adj.</p>
    <div>
      <p>
        <a class="clickable" href="/dict?le=eng&q=doctoral">doctoral</a>
        博士的；博士学位的；有博士学位的
      </p>
      <p>
        <a class="clickable" href="/dict?le=eng&q=doctorial">doctorial</a>
        博士的；学者的（等于doctorel）
      </p>
    </div>
  </li>
  <li>
    <p class="secondary">n.</p>
    <div>
      <p><a class="clickable" href="/dict?le=eng&q=doctorate">doctorate</a> 博士学位；博士头衔</p>
      <p><a class="clickable" href="/dict?le=eng&q=doctoral">doctoral</a> 博士论文</p>
    </div>
  </li>
</ul>

`

const $ = cheerio.load(content)
const words = []
$('p').each(function () {
  words.push($(this).text())
})

const result = []
$('ul li').each(function () {
  const li = $(this)
  const wordClass = li.find('.secondary').text()
  const wordlist = []
  li.find('div p').each(function () {
    const word = $(this).find('.clickable').text()
    const translate = $(this).text().replace(word, '').trim()
    wordlist.push({ word, translate })
  })

  result.push({ wordClass, wordlist })
})

console.log(words[0])
console.log(JSON.stringify(result, null, 2))
