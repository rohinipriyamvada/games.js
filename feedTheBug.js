const WIDTH = 40;
const HEIGHT = 25;
const FOOD = "🍎";
const BUG = "🪲";

function repeat(string, times, specialChar, specialCharPos) {
  let repeatedString = '';

  for (let noOfTimes = 1; noOfTimes <= times; noOfTimes++) {
    if (noOfTimes % specialCharPos === 0 && specialChar !== undefined) {
      repeatedString += specialChar;
      continue;
    }
    repeatedString += string;
  }
  return repeatedString;
}

function joinBorders(startBorder, string, endBorder) {
  return startBorder + string + endBorder;
}

function createTop(length, specialChar, specialCharPos) {
  return joinBorders('┏', repeat('━', length, specialChar, specialCharPos), '┓');
}

function createMiddle(length, specialChar, specialCharPos) {
  return joinBorders('┣', repeat('━', length, specialChar, specialCharPos), '┫');
}

function createBottom(length, specialChar, specialCharPos) {
  return joinBorders('┗', repeat('━', length, specialChar, specialCharPos), '┛');
}
// convert these functions into switch

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
  console.log(createTop((WIDTH + 4), '┳', 2));
  console.log(createMiddle((WIDTH + 4), '┻', 2));

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

  console.log(createMiddle((WIDTH + 4), '┳', 2));
  console.log(createBottom((WIDTH + 4), '┻', 2));
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

function play(bugPosX, bugPosY, foodPlaceX, foodPlaceY) {
  let playerScore = 0;


  while (playerScore < 10) {
    console.clear();

    if (bugPosX === WIDTH || bugPosX < 0 || bugPosY === HEIGHT || bugPosY < 0) {
      return "OOPS!!! YOU HAVE HIT WALLS AND DIED!!!";
    }

    createBoard(bugPosX, bugPosY, foodPlaceX, foodPlaceY);
    displayScore(playerScore);

    const command = readInput();
    switch (command) { // function
      case 'a': bugPosX = moveLeft(bugPosX); break;
      case 'd': bugPosX = moveRight(bugPosX); break;
      case 'w': bugPosY = moveUp(bugPosY); break;
      case 's': bugPosY = moveDown(bugPosY); break;
      default: console.log('Invalid input, Enter a valid input');
    }

    const conditionOfXAxis = foodPlaceX === bugPosX ||
      foodPlaceX - 2 === bugPosX || foodPlaceX + 2 === bugPosX ||
      foodPlaceX - 1 === bugPosX || foodPlaceX + 1 === bugPosX;

    if (conditionOfXAxis && foodPlaceY === bugPosY) {
      playerScore++;

      foodPlaceX = randomInt(WIDTH - 4);
      foodPlaceY = randomInt(HEIGHT - 4);
    }

  }
  displayScore(playerScore);
  return "CONGRATULATIONS!! YOU HAVE COMPLETED THE GAME";
}

function randomInt(range) {
  return Math.ceil(Math.random() * range);
}

function gameStart() {
  const snakePlaceX = randomInt(WIDTH - 4);
  const snakePlaceY = randomInt(HEIGHT - 4);

  const foodPlaceX = randomInt(WIDTH - 4);
  const foodPlaceY = randomInt(HEIGHT - 4);

  console.log(play(snakePlaceX, snakePlaceY, foodPlaceX, foodPlaceY));
}

gameStart();
