
const score = document.querySelector('.score'),
   start = document.querySelector('.start'),
   gameArea = document.querySelector('.gameArea'),
   car = document.createElement('div');

car.classList.add('car');

const keys = {
   ArrowUp: false,
   ArrowRight: false,
   ArrowDown: false,
   ArrowLeft: false,
};

const setting = {
   start: false,
   score: 0,
   speed: 3,
   traffic: 7,
};

function getQuantityElementElements(heightElement) {
   return document.documentElement.clientHeight / heightElement;
}


function moveRoad() {
   let lines = document.querySelectorAll('.line');
   lines.forEach(function(line) {
      line.y += setting.speed;
      line.style.top = line.y + 'px';

      if (line.y >= document.documentElement.clientHeight) {
         line.y = -50;
      }
   });
}

function moveEnemy() { 
   let enemies = document.querySelectorAll('.enemy');
   enemies.forEach(function(item) {
      let carRect = car.getBoundingClientRect();
      let enemyRect = item.getBoundingClientRect();

      if (carRect.top <= enemyRect.bottom && 
         carRect.left <= enemyRect.right-10 &&
         carRect.right >= enemyRect.left+10 &&
         carRect.bottom >= enemyRect.top) {
            setting.start = false;
            start.classList.remove('hide');
            score.style.top = start.offsetHeight + 'px';
      }

      item.y += setting.speed/2;
      item.style.top = item.y + 'px';
      if (item.y >= document.documentElement.clientHeight) {
         item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - item.offsetWidth - 30) + item.offsetWidth) + 'px';
         item.y = -100 * (10-setting.traffic);
      }
   });
}


function playGame() {
   moveRoad();
   moveEnemy();
   setting.score += Math.ceil((setting.speed+setting.traffic)/10);
   score.textContent = 'SCORE: ' + setting.score;
   if(setting.score % 1000 === 0) {
      setting.speed++;
   }
   if (setting.start) {
      if (keys.ArrowLeft && setting.x >= (setting.speed + car.offsetWidth / 2)) {
         setting.x -= setting.speed/2;
      }
      if (keys.ArrowRight  && setting.x <= (gameArea.offsetWidth - setting.speed - car.offsetWidth / 2)) {
         setting.x += setting.speed/2;
      }
      if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - setting.speed - car.offsetHeight)) {
         setting.y += setting.speed;
      }
      if (keys.ArrowUp  && setting.y > setting.speed) {
         setting.y -= setting.speed;
      }

      car.style.left = setting.x + 'px';
      car.style.top = setting.y + 'px';
      requestAnimationFrame(playGame);
   }
}

function startGame() {
   start.classList.add('hide');
   score.style.top = 0;
   setting.score = 0;
   setting.speed = 3;
   gameArea.innerHTML = '';
   car.style.top = 'auto';
   car.style.bottom = 10 + 'px';
   for (let i = 0; i < getQuantityElementElements(100); i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      line.y = i * 100;
      line.style.top = line.y + 'px';
      gameArea.appendChild(line);
   }

   for (let i = 0; i < getQuantityElementElements(100 * (10-setting.traffic)); i++) {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.y = -100 * (10-setting.traffic) * (i + 1);
      enemy.style.top = enemy.y + 'px';
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth/2) + enemy.offsetWidth) + 'px';
      enemy.style.backgroundImage = 'url(\'./images/enemy.png\')';
      gameArea.appendChild(enemy);
   }
   setting.start = true;
   gameArea.appendChild(car);
   setting.x = car.offsetLeft;
   setting.y = car.offsetTop;
   requestAnimationFrame(playGame);
}

function startRun(event) {
   event.preventDefault();
   keys[event.key] = true;
}

function stopRun(event) {
   event.preventDefault();
   keys[event.key] = false;
}


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

