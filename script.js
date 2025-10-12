let btn = document.querySelector("#btn");
let p = document.querySelector("#p1");
let body = document.body;
let btn2 = document.querySelector("#rand");
let back = document.querySelector("#back");
let forward = document.querySelector("#forward");
let currCh, currSh, maxCurrSh;

//Give only the chapter and verse number of the Bhagwat Gita Shlok, In the format - Chapter,Verse. Remember to give only the numbers and nothing more except the comma. The Shlok is - Karmnyevadhikaraste
async function getShlok(e) {
  e.preventDefault();
  let ch = document.querySelector("#ch").value;
  let sh = document.querySelector("#sh").value;
  if (ch === "") {
    ch = 1;
    document.querySelector("#ch").value = 1;
  }
  if (sh === "") {
    sh = 1;
    document.querySelector("#sh").value = 1;
  }
  if (ch >= 1 && ch <= 18) {
    let urlC = `https://vedicscriptures.github.io/chapter/${ch}`;
    let resp = await fetch(urlC);
    let about = await resp.json();
    let total = about["verses_count"];
    let chName = about["name"];
    let chNameEn = about["translation"];
    maxCurrSh = total + 1;
    document.querySelector("#sh").setAttribute('max', `${total+1}`)
    if (sh >= 1 && sh <= total + 1) {
      let urlS = `https://vedicscriptures.github.io/slok/${ch}/${sh}`;
      let res = await fetch(urlS);
      let data = await res.json();
      let shlok = data["slok"];
      let inEn = data["transliteration"];
      currCh = data["chapter"];
      currSh = data["verse"];
      p.innerText = `${chName} || ${chNameEn} \n\n ${shlok} \n\n ${inEn}`;
    } else {
      p.innerText = `Invalid Number Of Shlok \n\n It Should Be Between 1 and ${
        total + 1
      } \n Shlok Number ${total + 1} Is The Closing Shlok`;
    }
  } else {
    p.innerText =
      "Chapter Number Is Not Valid \n\n It Must Be Between 1 and 18";
  }
}

async function getRandomShlok(e){
  e.preventDefault()
  let ch = document.querySelector("#ch").value;
  let sh = document.querySelector("#sh").value;
  ch = Math.ceil(Math.random() * 18);
  let urlC = `https://vedicscriptures.github.io/chapter/${ch}`;
  let resp = await fetch(urlC);
  let about = await resp.json();
  let total = about["verses_count"];
  sh = Math.ceil(Math.random() * (total + 1));
  let urlS = `https://vedicscriptures.github.io/slok/${ch}/${sh}`;
  let res = await fetch(urlS);
  let data = await res.json();
  let shlok = data["slok"];
  let inEn = data["transliteration"];
  let chName = about["name"];
  let chNameEn = about["translation"];
  p.innerText = `${chName} || ${chNameEn} \n\n ${shlok} \n\n ${inEn}`;
  document.querySelector("#ch").value = ch;
  document.querySelector("#sh").value = sh;
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
  if (typeof currCh === 'undefined' || typeof currSh === 'undefined') {
    currCh = parseInt(document.querySelector('#ch').value) || 1;
    currSh = parseInt(document.querySelector('#sh').value) || 1;
  }
  if (currSh>1) {
    currSh--;
  } else if (currCh>1)
    if (currCh>1) {
      currCh--;
      let urlCurr = `https://vedicscriptures.github.io/chapter/${currCh}`;
      let res = await fetch(urlCurr)
      let data = await res.json()
      currSh = data['verses_count'] + 1;
      maxCurrSh = currSh;
  } else{return}
  document.querySelector('#ch').value = currCh;
  document.querySelector('#sh').value = currSh;
  getShlok(e);
})
forward.addEventListener('click', async (e) => {
  e.preventDefault()
  if (typeof currCh === 'undefined' || typeof currSh === 'undefined' || typeof maxCurrSh === 'undefined') {
    currCh = parseInt(document.querySelector('#ch').value) || 1;
    currSh = parseInt(document.querySelector('#sh').value) || 1;
    let urlCurr = `https://vedicscriptures.github.io/chapter/${currCh}`;
    let res = await fetch(urlCurr)
    let data = await res.json()
    maxCurrSh = data['verses_count'] + 1;
  }
  if (currSh<maxCurrSh) {
    currSh++;
  } else if (currCh<18){
    currCh++;
    currSh = 1;
  } else{return}
  document.querySelector('#ch').value = currCh;
  document.querySelector('#sh').value = currSh;
  getShlok(e);
})