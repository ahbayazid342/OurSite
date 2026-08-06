const fs = require('fs')
const t = fs.readFileSync('.env', 'utf8')
const lines = t.split(/\r?\n/).filter(Boolean)
console.log('lines', lines.length)
for (const line of lines) {
  if (line.trim().startsWith('#')) continue
  const i = line.indexOf('=')
  if (i < 0) {
    console.log('bad_line')
    continue
  }
  const k = line.slice(0, i).trim()
  const v = line.slice(i + 1).trim()
  console.log(
    k,
    'len=' + v.length,
    'empty=' + (v.length === 0),
    'has_rest=' + v.includes('rest/v1'),
    'starts_https=' + v.startsWith('https://'),
    'starts_eyJ=' + v.startsWith('eyJ'),
    'starts_sb=' + v.startsWith('sb_'),
  )
}
