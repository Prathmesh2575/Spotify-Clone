// =======================================
// Spotify Clone - script.js
// Developed by Prathmesh Ukirade
// =======================================

// ---------- Elements ----------

const playBtn = document.querySelector(".play-button");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");

const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const albumImg = document.querySelector(".album-img");

const likeBtn = document.querySelector(".album-actions .fa-heart");

const cards = document.querySelectorAll(".card");

const deviceBtn = document.querySelector(".device-btn");
const queueBtn = document.querySelector(".queue-btn");

// ---------- Song Data ----------

const songs = [
{
title:"Top 50 Global",
artist:"Spotify",
image:"card1img.jpeg",
duration:"3:12"
},

{
title:"Hindi Hits",
artist:"Various Artists",
image:"card2img.jpeg",
duration:"2:58"
},

{
title:"Lofi Beats",
artist:"Spotify",
image:"card3img.jpeg",
duration:"4:01"
},

{
title:"Leo Album",
artist:"Anirudh",
image:"card4img.jpeg",
duration:"3:25"
},

{
title:"Global Hits",
artist:"Top Charts",
image:"card5img.jpeg",
duration:"3:40"
},

{
title:"Top India",
artist:"Spotify India",
image:"card6img.jpeg",
duration:"3:50"
}

];

// ---------- Variables ----------

let playing=false;
let timer;
let progress=0;
let currentSong=0;

// ---------- Initial ----------

loadSong(currentSong);

// ---------- Load Song ----------

function loadSong(index){

songName.innerText=songs[index].title;

artistName.innerText=songs[index].artist;

albumImg.src=songs[index].image;

totalTime.innerText=songs[index].duration;

progress=0;

progressBar.value=0;

currentTime.innerText="0:00";

}

// ---------- Play ----------

playBtn.addEventListener("click",togglePlay);

function togglePlay(){

if(!playing){

playing=true;

playBtn.src="player_icon4.png";

timer=setInterval(updateProgress,1000);

}

else{

playing=false;

playBtn.src="player_icon3.png";

clearInterval(timer);

}

}

// ---------- Progress ----------

function updateProgress(){

progress++;

if(progress>100){

nextSong();

return;

}

progressBar.value=progress;

let totalSeconds=210;

let current=Math.floor((progress/100)*totalSeconds);

let m=Math.floor(current/60);

let s=current%60;

currentTime.innerText=`${m}:${String(s).padStart(2,"0")}`;

}

// ---------- Manual Seek ----------

progressBar.addEventListener("input",()=>{

progress=progressBar.value;

});

// ---------- Volume ----------

volumeBar.addEventListener("input",()=>{

console.log("Volume:",volumeBar.value);

});

// ---------- Like ----------

let liked=false;

likeBtn.addEventListener("click",()=>{

liked=!liked;

if(liked){

likeBtn.classList.remove("fa-regular");

likeBtn.classList.add("fa-solid");

likeBtn.style.color="#1db954";

}

else{

likeBtn.classList.remove("fa-solid");

likeBtn.classList.add("fa-regular");

likeBtn.style.color="";

}

});

// ---------- Card Click ----------

cards.forEach((card,index)=>{

card.addEventListener("click",()=>{

currentSong=index;

loadSong(index);

});

});

// ---------- Previous ----------

document.querySelectorAll(".player-control-icon")[1].addEventListener("click",()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

});

// ---------- Next ----------

document.querySelectorAll(".player-control-icon")[3].addEventListener("click",()=>{

nextSong();

});

function nextSong(){

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

}

// ---------- Keyboard ----------

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){

e.preventDefault();

togglePlay();

}

});

// ---------- Queue ----------

queueBtn.addEventListener("click",()=>{

alert("Queue feature coming soon!");

});

// ---------- Device ----------

deviceBtn.addEventListener("click",()=>{

alert("Searching for nearby devices...");

});

// ---------- Hover Animation ----------

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});

// ---------- Notification ----------

function toast(message){

const div=document.createElement("div");

div.innerText=message;

div.style.position="fixed";

div.style.bottom="110px";

div.style.right="20px";

div.style.background="#1db954";

div.style.color="#fff";

div.style.padding="10px 20px";

div.style.borderRadius="30px";

div.style.zIndex="99999";

document.body.appendChild(div);

setTimeout(()=>{

div.remove();

},2000);

}

// ---------- Card Notification ----------

cards.forEach((card,index)=>{

card.addEventListener("click",()=>{

toast("Now Playing : "+songs[index].title);

});

});

// ---------- Welcome ----------

window.onload=()=>{

toast("Welcome to Spotify Clone");

};