async function loadData(params) {
    for (let i = 1; i <= 18; i++) {
    let chDiv = document.querySelector(`#ch${i}`)
    let chData = await getChapter(i)
    let {name, transliteration, summary} = chData
    let {en, hi} = summary

    chDiv.innerHTML = `
        <h3><strong>${i} • ${name} || ${transliteration}</strong></h3>
        <p>&nbsp;&nbsp; &rarr;&nbsp; ${hi}</p>
        <p>&nbsp;&nbsp; &rarr;&nbsp; ${en}</p>
    `
    }
}