const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const boxxElements = document.querySelectorAll('[data-boxx]')
const main = document.getElementById('main')
const msgElement = document.getElementById('msg')
const restartButton = document.getElementById('restartButton')
const msgTextElement = document.querySelector('[data-msg-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  boxxElements.forEach(boxx => {
    boxx.classList.remove(X_CLASS)
    boxx.classList.remove(CIRCLE_CLASS)
    boxx.removeEventListener('click', handleClick)
    boxx.addEventListener('click', handleClick, { once: true })
  })
  setMainHoverClass()
  msgElement.classList.remove('show')
}

function handleClick(e) {
  const boxx = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(boxx, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setMainHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    msgTextElement.innerText = 'Draw!'
  } else {
    msgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  msgElement.classList.add('show')
}

function isDraw() {
  return [...boxxElements].every(boxx => {
    return boxx.classList.contains(X_CLASS) || boxx.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(boxx, currentClass) {
  boxx.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setMainHoverClass() {
  main.classList.remove(X_CLASS)
  main.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    main.classList.add(CIRCLE_CLASS)
  } else {
    main.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return boxxElements[index].classList.contains(currentClass)
    })
  })
}