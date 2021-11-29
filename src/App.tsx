import React, { useState, useEffect, DragEvent } from 'react';
import ScoreBoard from './components/ScoreBard';
import BlueCandy from './images/blue-candy.png';
import OrangeCandy from './images/orange-candy.png';
import PurpleCandy from './images/purple-candy.png';
import YellowCandy from './images/yellow-candy.png';
import RedCandy from './images/red-candy.png';
import GreenCandy from './images/green-candy.png';
import Blank from './images/blank.png';
import PopupBoard from './components/popupBoard';
// import { SubmitHandler } from 'react-hook-form';

const width = 8;
const candyColors = [
  BlueCandy, OrangeCandy, PurpleCandy, GreenCandy, RedCandy, YellowCandy
]
const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
type FormData = {
  fullName: string;
};

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<EventTarget | null>();
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<EventTarget | null>();
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [showTimer, setShowTimer] = useState('')
  const [timer, setTimer] = useState(120)
  const [gameStatus, setGameStatus] = useState(0)
  const [player, setPlayer] = useState('')

  const getRandomItem = () => candyColors[Math.floor(Math.random() * candyColors.length)];

  //Columns Validation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 48; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decideColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;

      if (columnOfThree.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfThree.forEach(square => currentColorArrangement[square] = Blank);
        return true;
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 40; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decideColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === Blank;

      if (columnOfFour.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfFour.forEach(square => currentColorArrangement[square] = Blank);
        return true;
      }
    }
  }

  //Rows Validation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decideColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === Blank;

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfThree.forEach(square => currentColorArrangement[square] = Blank);
        return true;
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decideColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
      const isBlank = currentColorArrangement[i] === Blank;

      if (notValid.includes(i)) continue;

      if (rowOfFour.every(square => currentColorArrangement[square] === decideColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfFour.forEach(square => currentColorArrangement[square] = Blank);
        return true;
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 55; i++) {
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === Blank) {
        currentColorArrangement[i] = getRandomItem();
      }


      if (currentColorArrangement[i + width] === Blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = Blank;
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      randomColorArrangment.push(getRandomItem());
    }

    setCurrentColorArrangement(randomColorArrangment);
  }

  const handleDragEvent = (event: DragEvent<HTMLImageElement>) => setSquareBeingDragged(event.target);
  const handleDropEvent = (event: DragEvent<HTMLImageElement>) => setSquareBeingReplaced(event.target);

  const handleDragEndEvent = (event: DragEvent<HTMLImageElement>) => {

    const squareBeingReplacedId: number = Number((squareBeingReplaced as Element).getAttribute('data-id'));
    const squareBeingDraggedId: number = Number((squareBeingDragged as Element).getAttribute('data-id'));

    currentColorArrangement[squareBeingReplacedId] = String((squareBeingDragged as HTMLImageElement).getAttribute('src'));
    currentColorArrangement[squareBeingDraggedId] = String((squareBeingReplaced as HTMLImageElement).getAttribute('src'));

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfTrhee = checkForRowOfThree();

    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfTrhee)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] = String((squareBeingReplaced as HTMLImageElement).getAttribute('src'));
      currentColorArrangement[squareBeingDraggedId] = String((squareBeingDragged as HTMLImageElement).getAttribute('src'));
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  }

  const getMinutes = (timer: number): number => Math.floor(timer / 60);
  const getSeconds = (timer: number): number => Math.floor(timer - (getMinutes(timer) * 60));

  const handleStartGame = (e: FormData) => {
    setPlayer(e.fullName);
    setScoreDisplay(0);
    setGameStatus(1);
    setTimer(120);
  }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    if (gameStatus === 2) {

    }
  }, [gameStatus])

  useEffect(() => {

    if (timer !== 0 && gameStatus === 1 ) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
  
        setShowTimer(`${getMinutes(timer)}:${getSeconds(timer)}`)
      }, 1000)
  
      return () => clearInterval(interval);
    }
    
  }, [timer])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement])
    }, 250)

    return () => clearInterval(timer);
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index: number) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={handleDragEvent}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDropEvent}
            onDragEnd={handleDragEndEvent}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} timer={showTimer} player={player}/>
      {
        gameStatus === 0 || gameStatus === 2?
          <PopupBoard 
            gameStatus={gameStatus} 
            handleStartGame={handleStartGame} 
            score={scoreDisplay}
          /> :
          null
      }

    </div>
  );
}

export default App;
