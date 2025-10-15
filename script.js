let btn = document.querySelector("#btn");
let p = document.querySelector("#p1");
let body = document.body;
let btn2 = document.querySelector("#rand");
let back = document.querySelector("#back");
let forward = document.querySelector("#forward");
let currCh, currSh, maxCurrSh;
let chInp = document.querySelector("#ch");
let shInp = document.querySelector("#sh");
let chapterCache = {};


async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

async function getChapter(ch) {
  if (chapterCache[ch]) return chapterCache[ch];
  const data = await fetchJSON(`https://vedicscriptures.github.io/chapter/${ch}`);
  chapterCache[ch] = data;
  return data;
}

async function getShlokData(ch, sh) {
  return await fetchJSON(`https://vedicscriptures.github.io/slok/${ch}/${sh}`);
}

function displayShlok(chapter, shlok) {
  let { name, translation } = chapter;
  let { slok, transliteration, tej, siva, purohit, prabhu } = shlok;
  p.innerHTML = `
<h2>${name} || ${translation}</h2>\n\n<h3>${slok}\n\n${transliteration}</h3>\n\n<h2>Explanations:</h2>\n\n<strong>${tej['author']}:</strong>\n\n${tej['ht']}\n\n\n<strong>${siva['author']}:</strong>\n\n${siva['et']}\n\n${siva['ec']}\n\n\n<strong>${purohit['author']}:</strong>\n\n${purohit['et']}\n\n\n<strong>${prabhu['author']}:</strong>\n\n${prabhu['et']}\n\n${prabhu['ec']}
  `;
}

function showError(msg) {
  p.innerText = ` ${msg}`;
}


async function getShlok(e) {
  e.preventDefault();
  try {
    const ch = Number(chInp.value) || 1;
    const sh = Number(shInp.value) || 1;
    currCh = ch;
    currSh = sh;
    if (ch < 1 || ch > 18) return showError("Chapter must be between 1 and 18");

    const aboutCh = await getChapter(ch);
    const total = aboutCh.verses_count;
    maxCurrSh = total + 1;
    shInp.setAttribute('max', `${maxCurrSh}`);
    if (sh < 1 || sh > maxCurrSh)
      return showError(`Shlok must be between 1 and ${maxCurrSh}`);

    const shData = await getShlokData(ch, sh);
    displayShlok(aboutCh, shData);
  } catch (err) {
    showError(err.message);
  }
}

async function getRandomShlok(e){
  e.preventDefault()
    
try {
    const ch = Math.ceil(Math.random() * 18);
    currCh = ch;
    const aboutCh = await getChapter(ch);
    const total = aboutCh.verses_count;
    maxCurrSh = total + 1;
    const sh = Math.ceil(Math.random() * maxCurrSh);
    currSh = sh;
    shInp.setAttribute('max', `${maxCurrSh}`);
    const shData = await getShlokData(ch, sh);
    displayShlok(aboutCh, shData);
    chInp.value = ch;
    shInp.value = sh;
  } catch (err) {
    showError(err.message);
  }
}


btn.addEventListener("click", getShlok);
btn2.addEventListener("click", getRandomShlok);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getShlok(e);
  }
});

back.addEventListener('click', async (e)=>{
  e.preventDefault()
  let aboutCh = await getChapter(currCh);
  if (typeof currCh === 'undefined' || typeof currSh === 'undefined') {
    currCh = parseInt(chInp.value) || 1;
    currSh = parseInt(shInp.value) || 1;
  }
  if (currSh>1) {
    currSh--;
  } else if (currCh>1) {
      currCh--;
      currSh = aboutCh['verses_count'] + 1;
      maxCurrSh = currSh;
  } else{return}
  document.querySelector('#ch').value = currCh;
  document.querySelector('#sh').value = currSh;
  shInp.setAttribute('max', `${maxCurrSh}`);
  displayShlok(aboutCh, await getShlokData(currCh, currSh));
})

forward.addEventListener('click', async (e) => {
  e.preventDefault()
  let aboutCh = await getChapter(currCh)
  if (typeof currCh === 'undefined' || typeof currSh === 'undefined' || typeof maxCurrSh === 'undefined') {
    currCh = parseInt(chInp.value) || 1;
    currSh = parseInt(shInp.value) || 1;
    maxCurrSh = aboutCh['verses_count'] + 1;
  }
  if (currSh<maxCurrSh) {
    currSh++;
  } else if (currCh<18){
    currCh++;
    currSh = 1;
  } else{return}
  document.querySelector('#ch').value = currCh;
  document.querySelector('#sh').value = currSh;
  shInp.setAttribute('max', `${maxCurrSh}`);
  displayShlok(aboutCh, await getShlokData(currCh, currSh));
})