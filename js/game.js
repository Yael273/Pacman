'use strict'

// const WALL = '#'
const WALL = '🧱'
const FOOD = '•'
const EMPTY = ' '
const POWER_FOOD = '🧁'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard
var gIsWinner = false
var gCherryInterval

function onInit() {
    var elScore = document.querySelector('h2 span')
    elScore.innerText = '0'
    var elGameOver = document.querySelector('.gamover')
    elGameOver.innerHTML = ``
    var elGameOver = document.querySelector('.gamover')
    elGameOver.innerHTML = ``

    clearInterval(gIntervalGhosts)
 
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    gGame.foodCount -= 5
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    gGame.foodCount = 0
    gGame.score = 0
    clearInterval(gCherryInterval)
    clearInterval(gIntervalGhosts)
    // TODO
    
    if (gIsWinner) {
        victory()

    } else {
        renderCell(gPacman.location, '💀')
        var elGameOver = document.querySelector('.gamover')
    elGameOver.innerHTML = `<h2>Game Over</h2><button onclick="onInit()">Restart</button>`
    }
   
    
    
    
}

function victory() {
    console.log('victory!')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    var elGameOver = document.querySelector('.gamover')
    elGameOver.innerHTML = `<h2>Victory!</h2><button onclick="onInit()">Restart</button>`
}

// random cell

function randCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] !== WALL && gBoard[i][j] !== GHOST && gBoard[i][j] !== PACMAN && gBoard[i][j] !== FOOD && gBoard[i][j] !== POWER_FOOD) {
                emptyCells.push({ i, j })
            }
        }
    }

    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]
  
}

function addCherry() {
    var emptyCell = randCell(gBoard)
    if (!emptyCell) return
    // console.log('emptyCell = ', emptyCell)

    // MODEL
    gBoard[emptyCell.i][emptyCell.j] = CHERRY

    // DOM
    renderCell(emptyCell, CHERRY)
}