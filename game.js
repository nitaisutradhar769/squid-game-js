const game=document.querySelectorAll('.game')
const boxes=document.querySelectorAll('.box')
const reset=document.querySelector('#reset-btn')
const newBtn=document.querySelector("#new-btn")
const playFriend=document.querySelector("#play-friends-btn")
const playAI=document.querySelector("#play-ai-btn")
const newGameSound = new Audio("sounds/pink_soldiers.mp3");
const newGameSound1 = new Audio("sounds/squide_game_tinngading.mp3");
const draw=document.getElementById('draw')
const winner=document.getElementById('winner')
let chkAI=false
let box_toggler=true
 playAI.addEventListener('click',()=>{
    chkAI=true})


const arr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]
newBtn.addEventListener('click', () => {
  localStorage.setItem("playNewGameSound", "yes");
  location.reload(); // this reloads the page
});
window.addEventListener("load", () => {
  boxes.forEach(box =>box.disabled=true)
  if (localStorage.getItem("playNewGameSound") === "yes") {
    boxes.forEach(box =>box.disabled=false)
    let newGameSoundNo=Math.floor(Math.random()*2)+1
     newGameSoundNo===1?newGameSound.play():newGameSound1.play()
    newGameSound.play()
    localStorage.removeItem("playNewGameSound");
  }
})



function result(chk0) {
       newGameSound.pause()
       newGameSound.currentTime=0 
       newGameSound1.pause()
       newGameSound1.currentTime=0 
      winner.innerHTML=`Congratulation, Winner is ${chk0}`
     speak(winner.innerHTML)
     startCongratulationsRain();
     // 🎉 Start emoji rain
     setInterval(() => {
     startCongratulationsRain();
  }, 1000);
}
function checkWinner() {
    arr.forEach(chk => {
        let chk0=boxes[chk[0]].innerText
        let chk1=boxes[chk[1]].innerText
        let chk2=boxes[chk[2]].innerText
       if(chk0!='' && chk1!='' && chk2!=''){
        if(chk0===chk1 && chk1===chk2){
          boxes.forEach(box =>box.disabled=true)
          new Audio("https://www.soundjay.com/human/sounds/applause-8.mp3").play()   
        result(chk0)
        }
       }
    });
}

/* boxes.forEach(box => {
    box.addEventListener('click',()=>{   
    if(box_toggler===true){
      new Audio('sounds/X_sound.mp3').play()
      box.innerHTML='X'
      box_toggler=false
      box.disabled=true
      checkWinner()
      
     if(winner.innerText=='')
      checkDraw()
    }
    else{
    new Audio('sounds/O_sound.mp3').play()
     box.innerHTML='O'
     box_toggler=true
     box.disabled=true
      checkWinner()
   if(winner.innerText=='')
      checkDraw()
    }
    })
}); */


function aiAgent() {
  setTimeout(() => {
      const temp = Array.from(boxes).filter(box => box.disabled === false);
  console.log(temp.length);
  let index=Math.floor(Math.random()*temp.length)
  temp[index].click()
  }, 2000);

}


boxes.forEach(box => {
    box.addEventListener('click',()=>{   
    if(box_toggler===true){
      new Audio('sounds/X_sound.mp3').play()
      box.innerHTML='X'
      box_toggler=false
      box.disabled=true
      checkWinner()
      
      if(winner.innerText=='') checkDraw()
    if(chkAI) aiAgent()
    }

    else{
     new Audio('sounds/O_sound.mp3').play()
     box.innerHTML='O'
     box_toggler=true
     box.disabled=true
    checkWinner()

    if(winner.innerText=='')
      checkDraw()
    }
    })
});


reset.addEventListener('click',()=>{
    boxes.forEach(box => {
        box.innerHTML=''
    });
})


function startCongratulationsRain() {
  const rainContainer = document.createElement('div');
  rainContainer.classList.add('rain');
  document.body.appendChild(rainContainer);

  const emojis = ['🎉', '🥳', '🎊', '✨', '👏', '🎈', '🎁', '🏆'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    rainContainer.appendChild(confetti);

    // Remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }

  // Optional: Remove whole container after all
  setTimeout(() => rainContainer.remove(), 4000);
}


function checkDraw() {
  let boxCheck=true
  let count=0
boxes.forEach(box=>{
  if(box.innerText!='')
    count++
})
if(count===boxes.length){
   boxes.forEach(box =>box.disabled=true)
   newGameSound.pause()
    newGameSound.currentTime=0 
   new Audio("sounds/button_warning.mp3").play()
   draw.innerHTML=`Game Draw!!`
}
}



function speak() {
  const text = document.getElementById("winner").innerText;
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;

  // Wait for voices to be loaded before selecting
  function setVoiceAndSpeak() {
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v =>
      v.name.toLowerCase().includes("zira") ||    // Windows
      v.name.toLowerCase().includes("samantha") || // macOS
      v.name.toLowerCase().includes("google") ||  // Chrome
      v.name.toLowerCase().includes("female")
    );
    msg.voice = femaleVoice || voices[0];
    speechSynthesis.speak(msg);
  }

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  } else {
    setVoiceAndSpeak();
  }
}
