
// Variable declairation

const play = document.getElementById('play');
const music=document.querySelector('audio');
const img=document.querySelector('img');
const title=document.getElementById('title');
const singer=document.getElementById('singer');
const next=document.getElementById('next');
const prev=document.getElementById('prev');
const random=document.getElementById('random');
const rpt=document.getElementById('rpt');
const progress_div=document.getElementById("progress-div")
let  progress=document.getElementById('progress');
let dur=document.getElementById('duration');
let cur_time =document.getElementById('cur_time');


// 1. playing and pausing audio

let playing=false;

// playing

const playTheSong=()=> {
    playing=true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('rotate-player');
};

// pausing

const pauseTheSong=()=> {
    playing=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('rotate-player');
};

play.addEventListener('click',() =>{
    if(playing){
        pauseTheSong();
    }
    else{
        playTheSong();
    }
});


// 2. changing music

const songs=[{
    name:"track-1",
    title:"বায়নাবিলাসী",
    singer:"Sahana Bajpaie & Samantak",

},
{
    name:"track-2",
    title:"August",
    singer:"Taylor Swift",

},
{
    name:"track-3",
    title:"একটা ছেলে",
    singer:"Sahana Bajpaie",

},
{
    name:"track-4",
    title:"Tumhi Dekho Na",
    singer:"Sonu Nigam & Alka Yagnik",

},
{
    name:"track-5",
    title:"Night Changes",
    singer:"One Direction",

},
{
    name:"track-6",
    title:"Jaan Baan Gaye",
    singer:"Asees Kaur",

},
{
    name:"track-7",
    title:"Tujhe Sochta Hoon",
    singer:"KK",

},
{
    name:"track-8",
    title:"আমার পরান যাহা চায়",
    singer:"Arijit Singh",

},
{
    name:"track-9",
    title:"Tum Hi Ho",
    singer:"Arijit Singh",

},
{
    name:"track-10",
    title:"Dil Kyu Yeh Mera",
    singer:"KK",

},];



const loadSong=(songs)=>{
    title.textContent = songs.title;
    singer.textContent = songs.singer;
    music.src = "music/"+songs.name+".mp3";
    img.src = "album/"+songs.name+".jpg";

}

let songInx=0;

const nextSong=()=>{
    songInx=(songInx+1)%songs.length;
    loadSong(songs[songInx]);
    playTheSong();
}

const prevSong=()=>{
    songInx=(songInx-1 + songs.length) % songs.length ;
    loadSong(songs[songInx]);
    playTheSong();
}


const randomSong=()=>{
    songInx=Math.floor(Math.random() * 10);
    loadSong(songs[songInx]);
    playTheSong();
}

const rptSong=()=>{
    let curinx=songInx;
    loadSong(songs[curinx]);
    playTheSong();
}



// progessbar

music.addEventListener('timeupdate',(event)=>{
    const {currentTime,duration}=event.target;

   let progressTime = (currentTime/duration )*100;
   progress.style.width=`${progressTime}%`;

    //    music duration times 
   
    let min_dur=Math.floor(duration/60);
    let sec_dur=Math.floor(duration%60);
    
    let  Total_dur=`0${min_dur}:${sec_dur}`;

    if(sec_dur < 10){
        Total_dur=`0${min_dur}:0${sec_dur}`;
    }

    if(duration){
      dur.textContent=`${Total_dur}`;
    }

    let min_cur=Math.floor(currentTime/60);
    let sec_cur=Math.floor(currentTime%60);
    
    let Total_cur=`0${min_cur}:${sec_cur}`;
    if(sec_cur < 10){
        Total_cur=`0${min_cur}:0${sec_cur}`;
    }

    cur_time.textContent=`${Total_cur}`;
    
}); 

// progress switcher 

progress_div.addEventListener('click',(event)=>{
    // console.log(event);
    const {duration}=music;
    let move_progress=(event.offsetX/event.target.clientWidth)*duration;

    music.currentTime=move_progress;
})

// autoplay next 
music.addEventListener("ended", nextSong);




// song changing buttons
next.addEventListener('click', nextSong);

prev.addEventListener('click', prevSong);

random.addEventListener('click', randomSong);

rpt.addEventListener('click', rptSong);















