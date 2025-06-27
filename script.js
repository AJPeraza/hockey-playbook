let activePlayer = null;
let offsetX = 0;
let offsetY = 0;
let redCount = 0;
let blueCount = 0;
let lastColor = 'blue'; // to alternate btwn red/blue

const rink = document.querySelector('.rink');

function createPlayer(color = 'red') {
    const player = document.createElement('div');
    player.classList.add('player', color);
    player.setAttribute('tabindex', '0');

    // set random position within rink bounds
    player.style.left = `${Math.random() * (rink.offsetWidth - 30)}px`;
    player.style.yop = `${Math.random() * (rink.offsetHeight - 30)}px`;

    //create label element
    const label = document.createElement('span');
    label.classList.add('player-label');

    //asign label based on color
    if (color === 'red') {
        redCount++;
        label.innerText = redCount;
    } else if (color === 'blue') {
        blueCount++;
        label.innerText = blueCount;
    } else {
        label.innerText = '?';
    }
    
    player.appendChild(label);
    rink.appendChild(player);
}

//add initial players
createPlayer('red');
redCount++;
createPlayer('blue');
blueCount++;

document.getElementById('addPlayerBtn').addEventListener('click', () => {
    const nextColor = lastColor === 'blue' ? 'red' : 'blue';
    createPlayer(nextColor);
    lastColor = nextColor;
})

document.getElementById('resetBtn').addEventListener('click', () => {
    //clear all players
    rink.innerHTML = '';
    redCount = 0;
    blueCount = 0;
    lastColor = 'blue';

    //re-add default players
    createPlayer('red');
    createPlayer('blue');
    
    //clear coach notes
    document.querySelector('textarea').value = '';
})

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('player')) {
        activePlayer = e.target;
        const rect = activePlayer.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    }
});

document.addEventListener('mousemove', (e) => {
    if (activePlayer) {
        const rink = document.querySelector('.rink');
        const rinkRect = rink.getBoundingClientRect();

        let x = e.clientX - rinkRect.left - offsetX;
        let y = e.clientY - rinkRect.top - offsetY;

        activePlayer.style.left = `${x}px`;
        activePlayer.style.top = `${y}px`;
    }
});

document.addEventListener('mouseup', () => {
    activePlayer = null;
})