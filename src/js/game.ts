
import {Player,WinColor} from './constants' // import constants

// Game class
export default class Game {
    private height: number = window.innerHeight;
    private width: number = window.innerWidth;

    private board: Player[] = Array(9).fill(null);   // Game Board Variable
    private currentPlayer: Player = Player.Human;    // Current Player 
    cells = document.querySelectorAll('.cell');      // Game Board Cells
    title = document.getElementById('title');        // Game Title
    resetBtn = document.getElementById('reset');     // Reset Buttton


    // Constructor
    constructor() {
        this.resetBtn.addEventListener("click", (e: Event) => this.reset());   // Reset Button Click event
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleClick(index));     // Game Board Cell Click event
        });
    }

    // call when player click on cell
    private handleClick(index: number): void {
        if (this.board[index] || this.checkWinner()) return;  // Send control back when player click on existing filled cell OR anyone already win
        
        this.board[index] = this.currentPlayer;               // Add value into the borad 'O' based on current player
        this.renderBoard();                                    // Call renderBoard Fuction

        // check winner
        if (this.checkWinner()) {
            this.title.textContent = 'you Win!';
            this.resetBtn.textContent = 'Play Again';

        }
        // check draw
        else if (this.checkDraw()) {
            this.title.textContent = `A Tie!`;
            this.resetBtn.textContent = 'Play Again';

        }
        else {
            this.currentPlayer = this.currentPlayer == Player.Human ? Player.Computer : Player.Human; // change turn of the current player
            if (this.currentPlayer === Player.Computer) {
                setTimeout(() => this.computerPlayer(), 500); // Delay for better UX
            }
        }
    }

    // Computer player
    private computerPlayer(): void {
        let index = Math.floor(Math.random() * 9); // select random cell index

        //control enter the borad cell have value
        while (this.board[index]) {
            index = Math.floor(Math.random() * 9); // Again select next randon cell index
        }
        this.board[index] = this.currentPlayer;     // Add value into the borad 'X' based on current player
        this.renderBoard();                         // Call renderBoard Fuction

         // check winner
        if (this.checkWinner()) {
            this.title.textContent = 'Computer Win!';
            this.resetBtn.textContent = 'Play Again';

        }
        // check draw
        else if (this.checkDraw()) {
            this.title.textContent = `A Tie!`;
            this.resetBtn.textContent = 'Play Again';
        }
        else {
            this.currentPlayer = this.currentPlayer == Player.Human ? Player.Computer : Player.Human; // change turn of the current player
        }
    }
    // check draw
    private checkDraw(): boolean {
        return this.board.every(cell => cell !== null); // return true if all cell is filled with text, otherwise false
    }
    //check winner
    private checkWinner(): boolean {
        const winPatterns: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]; // winning pattern index

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.cells.forEach((cell, index) => {
                    if (index === a || index === b || index === c) {
                       this.changeBGColor(index,(this.currentPlayer === Player.Human ? WinColor.Player : WinColor.Computer)) // call for cell background change
                    }
                });
                return true;
            }
        }

        return false;
    }

    // This function chnage the cell background color
    private changeBGColor(index: number, color:WinColor): void {
        const cell = this.cells[index] as HTMLElement; // Cast cell to HTMLElement
        if (cell) {
            cell.style.backgroundColor =color;

        }
    }
    // This fuction change the cell text and background color 
    private renderBoard(): void {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index] || '';    // change cell value
            this.changeBGColor(index,WinColor.Normal)      // call changeBGColor() function to change cell BG color
        });
    }
    // call on Reset button click event
    private reset(): void {
        this.board.fill(null);  
        this.renderBoard();
        this.currentPlayer = Player.Human;
        this.title.textContent = 'Tic Tac Toe';
        this.resetBtn.textContent = 'Reset';
    }
   
}

