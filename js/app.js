// Display an empty tic-tac-toe board when the page is initially displayed.
// A player can click on the nine cells to make a move.
// Every click will alternate between marking an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat’s game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.

// Psuedocode
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

let board
let turn
let winner
let tie
let xScore = 0
let oScore = 0
let cpuMode = false

let score = `X 0 - 0 O`
const scoreEl = document.querySelector('#scoreboard')
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetEl = document.querySelector('#reset-button')
const cpuEl = document.querySelector('#cpu-button')
const restartEl = document.querySelector('#restart-button')

console.log(score)
console.log(scoreEl)
console.log(squareEls)
console.log(messageEl)

function init(){
    board = ['','','','','','','','','']
    turn = 'O'
    winner = false
    tie = false
    console.log('Game Initialized')
    messageEl.style.color = ''
    render()
    scoreEl.textContent = score
    // handleClick()
}

function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(event){
        if(turn === 'X'){
            // squareEls.style.color = 'green'
            turn = 'O'
        }
        else if(turn === 'O'){
            turn = 'X'
        }

    squareEls.forEach((element,index) => {
        // else{
        //     board[index] = ''
        // }

        element.textContent = board[index]
    });
}

function updateMessage(){
    if(winner == false && tie == false){
        messageEl.textContent = `it is ${turn}'s turn`
    }
    else if(winner == false && tie == true){
        messageEl.textContent = 'Tie'
    }
    else{
        messageEl.textContent = "You've Won!"
    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [0,3,6],
    [2,5,8],
]

function handleClick(event){
    console.log(board)
    
    if(board[event.target.id] === 'X' || board[event.target.id] === 'O' || winner == true){
        return
    }

    if(cpuMode && turn !== 'X'){
        return
    }
        board[event.target.id] = turn
        updateBoard()
        updateMessage()
        checkForWinner()
    // updateBoard()

    if(cpuMode && !winner){
        vsComputer()
    }

}

squareEls.forEach((element) => {
    element.addEventListener('click',handleClick)
});

function checkForWinner(){
    winningCombos.forEach(combo => {
        const [a,b,c] = combo
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            messageEl.textContent = `${board[a]} Wins!`
            messageEl.style.color = 'green'
            if(board[a] === 'X'){
                xScore += 1
                score = `X ${xScore} - ${oScore} O`
                console.log('X won, +1')
                scoreEl.textContent = score
                turn = 'X'
            }
            else{
                oScore += 1
                score = `X ${xScore} - ${oScore} O`
                console.log('O won, +1')
                scoreEl.textContent = score
                turn = 'O'
            }
            winner = true
        }
    });
}

function vsComputer(){
    cpuMode = true
    // turn = 'X'
    console.log("Now Playing Against Computer")
    console.log(turn)
// it's always X's turn

    if(winner){
        console.log("in winner")
        return
    }
    if(turn === 'O'){
        // something is not working here
        console.log('cpu is making a move')
        board.forEach((cell, index) => {
        if(cell === ''){
        // doesn't work, if statement is wrong
        // console.log('shit')
            board[index] = 'O'
            console.log(index)
            turn = 'X'
            return
        }
        // works
        // console.log('double shit')
        // return false
    });
    

    updateBoard()
    updateMessage()
    checkForWinner() 

}
    
    
    // board.forEach(index => {
    //     console.log(index)
    //     if(board[index] === '' && turn === 'O'){
    //         console.log('O')
    //         console.log(board)
    //     }
    //     else{
    //         console.log("something's wrong")
    //     }
    // })



    // let emptyCells = []
    // let random
    // board.forEach(function(element){
    //     if(board.textContent =''){
    //         emptyCells.push(element)
    //     }
    // });

    // random = Math.ceil(Math.random() * emptyCells.length) -1
    // emptyCells[random].textContent = 'O'
    // updateBoard()


}

function reset(){
    init()
    xScore = 0
    oScore = 0
    score = `X ${xScore} - ${oScore} O`
    scoreEl.textContent = score
}

cpuEl.addEventListener('click',vsComputer)
resetEl.addEventListener('click', reset)
restartEl.addEventListener('click', init)


init()