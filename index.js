const titleInp=document.getElementById("titleInp")
const artistInp=document.getElementById("artistInp")
const durationInp=document.getElementById("durationInp")
const selectGenre=document.getElementById("selectGenre")
const submitInps=document.getElementById("submitInps")
const searchByTitleInp=document.getElementById("searchByTitleInp")
const searchByTitleBtn=document.getElementById("searchByTitleBtn")
const sortSongs=document.getElementById("sortSongs")
const songPlayListTable=document.getElementById("songPlayListTable")
const songPlayListTbody=document.getElementById("songPlayListTbody")
const search_sort_box=document.getElementById("search_sort_box")

// After clicking add song, song details be being Added.
const songsStorage=JSON.parse(localStorage.getItem("songsStorage")) || []
if (songsStorage.length===0){
    songPlayListTable.innerHTML=""
    search_sort_box.innerHTML=""
}

const addsongFun=()=>{    
    const titleInpVal=titleInp.value
    const artistInpVal=artistInp.value
    const durationInpVal=durationInp.value
    const selectGenreVal=selectGenre.value
    songsStorage.push([titleInpVal, artistInpVal, durationInpVal, selectGenreVal])
    localStorage.setItem("songsStorage", JSON.stringify(songsStorage))
}
submitInps.addEventListener("click", addsongFun)

// Setting songsStorage values in table
function createTable(songsStorage){
    songsStorage.forEach(item=>{
        const tRow=document.createElement("tr")
        const titleCol=document.createElement("td")
        titleCol.innerText=item[0]
        const artistCol=document.createElement("td")
        artistCol.innerText=item[1]
        const durationCol=document.createElement("td")
        durationCol.innerText=item[2]
        const genreCol=document.createElement("td")
        genreCol.innerText=item[3]
        const deleteSongDetail=document.createElement("td")
        const deleteSongDetailBtn=document.createElement("button")
        deleteSongDetailBtn.textContent="Delete"
        deleteSongDetail.append(deleteSongDetailBtn)
        deleteSongDetail.addEventListener("click", ()=>{
            deleteSongDetailFun(item)
        })

        tRow.append(titleCol, artistCol, durationCol, genreCol, deleteSongDetail)
        songPlayListTbody.appendChild(tRow)        
    })
}
createTable(songsStorage)

// Delete paritcular song details
function deleteSongDetailFun(item){
    const songsStorageAfterDel=songsStorage.filter(val=>{
        if (val[0]!==item[0]){
            return true
        }
    })
    localStorage.setItem("songsStorage", JSON.stringify(songsStorageAfterDel))
    location.reload()
}

// Song Playlist search by Title
const searchByTitleFun=()=>{
    songPlayListTbody.innerHTML=""

    const searchByTitleInpVal=searchByTitleInp.value.toLowerCase()
    const filteredSongsStorage=songsStorage.filter(item=>{
        if (item[0].toLowerCase().includes(searchByTitleInpVal.toLowerCase())){
            return true
        }
    })    
    return createTable(filteredSongsStorage)
}
searchByTitleBtn.addEventListener("click", searchByTitleFun)

// Sort playlit by its genre
const sortSongsFun=()=>{
    songPlayListTbody.innerHTML=""

    const sortInpVal=sortSongs.value
    const sortCriteria={
        "Title":0,
        "Artist":1,
        "Duration":2,
        "Genre":3
    }
    const sortedSongsPlaylist=songsStorage.sort((a,b)=>{
        const index=sortCriteria[sortInpVal]
        if (typeof(a[index])==="string"){
            return a[index].localeCompare(b[index]);
        }
        return a[index]-b[index]
    })    
    return createTable(sortedSongsPlaylist)
}
sortSongs.addEventListener("click", sortSongsFun)