map = document.getElementById("map");
let score = 30;
let hp = 3;
let zombieWalking;
let zombies =[]
let game = 1

createZombie = (size, level, frameSpeed) => {
    let zombie = document.createElement('div');
    zombie.className = 'zombie';
    zombie.style.transform = `scale(${size})`;
    zombie.style.bottom = `${level}px`;
    zombies.push(zombie);
    map.appendChild(zombie);
    moveZombie(zombie, frameSpeed);
}
map.onclick = () => {
    updateScore(false)
}
updateScore = (hit) => {
    if (game === 0) return;
    if (hit) {
        score += 10;
    }
    else {
        score -= 3;
        if (score < 0) {
            score = 0;
            endGame();
        }
    }
    let digits = Math.floor(Math.log10(score)) + 1;
    let prefix = '0'.repeat(5 - digits);
    document.getElementById('score').innerText = prefix + `${score}`;
}
changeHp = () => {
    const hearts = document.querySelectorAll('.heart');
    hearts[hp - 1].style.backgroundImage = "url('empty_heart.png')";
    hp -= 1;
    if (hp === 0 ){
        endGame();
    }

}
moveZombie = (zombie, frameSpeed) => {
    let position = map.offsetWidth + 300;
    let animationStep = 2200;

    let walking = setInterval(frameStep, frameSpeed);

    function frameStep() {
        if (position < -200){
            zombie.remove();
            clearInterval(walking);
            changeHp();
        }
        else {
            position -= 15;
            animationStep -= 200;
            if (animationStep === -200) {
                animationStep = 2000;
            }
            zombie.style.backgroundPosition = `${animationStep}px`;
            zombie.style.left = position + 'px';
            zombie.onclick = () => {
                zombie.remove();
                clearInterval(walking);
                updateScore(true);
            }
        }
    }
}
loadGame = () => {
    game = 1
    score = 33;
    hp = 3;
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((obj) => {
        obj.style.backgroundImage = "url('full_heart.png')";
    })
    document.getElementById('wynik').style.display = "none";
    document.getElementById('score').style.display = "inline-block";

}

startGame = () => {
    // location.reload();
    loadGame();
    document.getElementById('startBtn').style.display = "none";
    zombieWalking = setInterval(() => {
        createZombie(0.3 + Math.random(), 100 * Math.random(), 20 + 20 * Math.random());
    }, 2000);
}

endGame = () => {
    game = 0
    clearInterval(zombieWalking)
    zombies.forEach((obj) =>{
        obj.remove();
    })
    document.getElementById('score').style.display = "none";
    document.getElementById('startBtn').style.display = "inline-block";
    document.getElementById('wynik').style.display = "block";
    document.getElementById('wynik').innerHTML= `
                <p>Score: ${score}</p>
        `;
}
