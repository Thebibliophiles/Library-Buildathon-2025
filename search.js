let shPartInput = document.querySelector('#shPart')
let search = document.querySelector('#search')

async function getShlokFromInput(input) {
  let prompt = `Give only the chapter and verse NUMBER of the Bhagwat Gita Shlok, In the format - Chapter,Verse. Remember to give only the numbers and nothing more except the comma. The Part of the Shlok is - ${input}. Give ONLY THE NUMBERS`
  let res = await fetch(`https://text.pollinations.ai/${prompt}`)
  return res.text();
}

search.addEventListener('click', async (e) => {
    e.preventDefault()
    try{let part = shPartInput.value.trim()
    if (part !== '') {
      let data = await getShlokFromInput(part)
      let splitLst = data.split(',')
      let ch = splitLst[0]
      let sh = splitLst[1]
      if (ch && sh) {
        chInp.value = ch
        shInp.value = sh
        getShlok(e)
      } else {
        alert("There was a problem.\nPlease try again later.")
      }
      
    }} catch(err){
      alert("There was a problem.\nPlease try again later.")
    }
})