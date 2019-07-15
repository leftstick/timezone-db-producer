const fs = require('fs')
const googleZh = require('./raw/google_zh.json')
const googleEn = require('./raw/google_en.json')

const langEn = {}
const canonicals = []

googleEn.forEach(g => {
  langEn[g[0]] = g[1].replace(/\(.*\)/, '').trim()
})

googleZh.forEach(g => {
  canonicals.push({
    timeZoneName: g[0],
    timeZoneOffset: g[1]
      .match(/\(.*\)/)[0]
      .slice(1, -1)
      .substring(3),
    enDisplayName: langEn[g[0]],
    zhDisplayName: g[1].replace(/\(.*\)/, '').trim(),
    aliases: g[2]
  })
})

fs.writeFileSync('./timezone_v2.json', JSON.stringify(canonicals, null, 2), {
  encoding: 'utf8'
})
