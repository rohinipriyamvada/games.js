const WIDTH = 40;
const HEIGHT = 25;
const FOOD = "🍎";
const BUG = "🪲";

function repeat(string, times) {
  let repeatedString = '';

  for (let noOfTimes = 1; noOfTimes <= times; noOfTimes++) {
    repeatedString += string;
  }
  return repeatedString;
}

function joinBorders(startBorder, string, endBorder) {
  return startBorder + string + endBorder;
}

function createTop(length) {
  return joinBorders('┏', repeat('━┳', length), '┓');
}

function createBottom(length) {
  return joinBorders('┗', repeat('━┻', length), '┛');
}

function createIndex(Xposition, Yposition) {
  return (Yposition * WIDTH) + Xposition;
}

function addIcons(bugPos, foodPos, index) {
  if (index === bugPos || (index - 1) === bugPos) {
    return index === bugPos ? BUG : '';
  }

  if (index === foodPos || (index - 1) === foodPos) {
    return index === foodPos ? FOOD : '';
  }

  return ' ';
}

function createBoard(snakePlaceX, snakePlaceY, foodPlaceX, foodPlaceY) {
  console.log(createTop(22));
  console.log(createBottom(22));

  const bugPos = createIndex(snakePlaceX, snakePlaceY);
  const foodPos = createIndex(foodPlaceX, foodPlaceY);
  let char = '';

  for (let counter = 1; counter <= (WIDTH * HEIGHT); counter++) {
    char += addIcons(bugPos, foodPos, counter);

    if (counter % WIDTH === 0) {
      console.log(joinBorders("┃━┃", char, "┃━┃"));
      char = '';
    }
  }

  console.log(createTop(22));
  console.log(createBottom(22));
}

function moveLeft(Xposition) {
  return Xposition - 1;
}

function moveRight(Xpositon) {
  return Xpositon + 1;
}

function moveUp(Yposition) {
  return Yposition - 1;
}

function moveDown(Yposition) {
  return Yposition + 1;
}

function readInput() {
  console.log("Click to move: ");
  console.log("a ==> LEFT");
  console.log("d ==> RIGHT");
  console.log("s ==> DOWN");
  console.log("w ==> UP");

  return prompt("Enter :")
}

function displayScore(score) {
  console.log("Your current score is: ", score);
}

function hasHitBoundaries(bugPosX, bugPosY) {
  return bugPosX === WIDTH || bugPosX < 0 || bugPosY === HEIGHT || bugPosY < 0;
}

function isBugNearbyFood(bugPosX, bugPosY, foodPlaceX, foodPlaceY) {
  return ((foodPlaceX === bugPosX ||
    foodPlaceX - 2 === bugPosX || foodPlaceX + 2 === bugPosX ||
    foodPlaceX - 1 === bugPosX || foodPlaceX + 1 === bugPosX)
    && foodPlaceY === bugPosY);
}

function moveX(command, bugPosX) {
  switch (command) {
    case 'a': bugPosX = moveLeft(bugPosX); break;
    case 'd': bugPosX = moveRight(bugPosX);
  }

  return bugPosX;
}

function moveY(command, bugPosY) {
  switch (command) {
    case 'w': bugPosY = moveUp(bugPosY); break;
    case 's': bugPosY = moveDown(bugPosY);
  }

  return bugPosY;
}

function play(bugPosX, bugPosY, foodPlaceX, foodPlaceY) {
  let playerScore = 0;

  while (playerScore < 10) {
    console.clear();

    if (hasHitBoundaries(bugPosX, bugPosY)) {
      return "OOPS!!! YOU HAVE HIT WALLS AND DIED!!!";
    }

    createBoard(bugPosX, bugPosY, foodPlaceX, foodPlaceY);
    displayScore(playerScore);

    const command = readInput();
    bugPosX = moveX(command, bugPosX);
    bugPosY = moveY(command, bugPosY);

    if (isBugNearbyFood(bugPosX, bugPosY, foodPlaceX, foodPlaceY)) {
      playerScore++;

      foodPlaceX = generateRandomInt(WIDTH - 4);
      foodPlaceY = generateRandomInt(HEIGHT - 4);
    }
  }

  displayScore(playerScore);
  return "CONGRATULATIONS!! YOU HAVE COMPLETED THE GAME";
}

function generateRandomInt(range) {
  return Math.ceil(Math.random() * range);
}

function gameStart() {
  const snakePlaceX = generateRandomInt(WIDTH - 4);
  const snakePlaceY = generateRandomInt(HEIGHT - 4);

  const foodPlaceX = generateRandomInt(WIDTH - 4);
  const foodPlaceY = generateRandomInt(HEIGHT - 4);

  console.log(play(snakePlaceX, snakePlaceY, foodPlaceX, foodPlaceY));
}

gameStart();
