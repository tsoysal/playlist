const nameInput = document.getElementById("songName");
const singerInput = document.getElementById("singerName");
const addBtn = document.getElementById("btn");
const list = document.getElementById('list');
const header = document.getElementById('header');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const nextBtn = document.getElementById('nextBtn');

function Song(songName, songSinger) {
    this.name = songName;
    this.singer = songSinger;
    
    this.play = function() {
        header.textContent = ("Playing " + this.name + " by " + this.singer + "..");
    }
    this.stop = function() {
        header.textContent = (`Stopped playing ${this.name} by ${this.singer}!`);
    }
}


function Playlist() {
    let musicList = [];
    let current = {
        song: undefined,
        index: 0
    }

    this.showList = function() {
        let newHtml = "";
        musicList.map((song, index)=> {
            newHtml += `<li>${index+1}: ${song.name} - ${song.singer}</li>`;
        });
        list.innerHTML = newHtml;
    }
    this.addNewSong = function(songName, singer) {
        let newSong = new Song(songName, singer);
        musicList.push(newSong);
        alert(`You added ${songName} - ${singer} to your playlist.`);
        console.log(musicList)
    }
    this.playCurrent = function() {
        if(musicList[current.index]){
            current.song = musicList[current.index];
            current.song.play();
        }else {
            return;
        }
    }
    this.stopPlaying = function() {
        if(current.song)
            current.song.stop();
    }
    this.nextSong = function() {
        current.index = musicList.indexOf(current.song);
        current.index++;
        if(musicList[current.index]){
            current.song = musicList[current.index];
        }else {
            current.song = musicList[0];
            current.index = 0;
        }
        current.song.play();
    }

}

function handleAdd() {
    if(nameInput.value){
        if(!singerInput.value){
            singerInput.value = "Unknown";
        }
        pl.addNewSong(nameInput.value, singerInput.value);
        pl.showList();
        nameInput.value = "";
        singerInput.value = "";
    }
}

const pl = new Playlist();

//Event listeners

addBtn.addEventListener('click', handleAdd);
playBtn.addEventListener('click', pl.playCurrent);
stopBtn.addEventListener('click', pl.stopPlaying);
nextBtn.addEventListener('click', pl.nextSong)


