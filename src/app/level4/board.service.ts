import { Injectable } from '@angular/core';

/**
 * Logic for a connect-four-board.
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  // TODO: Add the required code here
  public nrRows = 6;
  public nrCols = 7;
  private board!: number[][];

  private playerNames: string[];
  private _currentPlayerIndex!: number;
  private _currentWinnerIndex!: number;

  public get currentPlayerIndex(): number {
    return this._currentPlayerIndex;
  }

  public get currentWinnerIndex(): number {
    return this._currentWinnerIndex;
  }

  constructor() {
    this.playerNames = ['', '1', '2'];
    this.restart();
  }

  public getPlayerIx(colIx: number, rowIx: number): number {
    return this.board[colIx][rowIx];
  }

  public drop(colIx: number): void {
    if (this.currentWinnerIndex !== 0) {
      return;
    }

    for (let i = this.board[colIx].length - 1; i >= 0; i--) {
      if (this.board[colIx][i] === 0) {
        this.board[colIx][i] = this.currentPlayerIndex;
        console.log(`Coin dropped in column ${colIx}`);
        this._currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
        this._currentWinnerIndex = this.getWinnerIx();
        break;
      }
    }
  }

  public restart(): void {
    this._currentWinnerIndex = 0;
    this._currentPlayerIndex = 1;

    // creates a this.nrCols x this.nrRows board filled with 0
    this.board = [];
    for (let i = 0; i < this.nrCols; i++) {
      this.board.push(new Array(this.nrRows).fill(0));
    }
  }

  /**
   * Returns the index of the player that has won the game, or 0 if no player has won yet.
   */
  private getWinnerIx(): number {
    // check columns
    outer: for (let column of this.board) {
      for (let startRowIx = 0; startRowIx < this.nrRows - 3; startRowIx++) {
        if (column[startRowIx] !== 0) {
          for (let rowIx = 1; rowIx < 4; rowIx++) {
            if (column[startRowIx + rowIx] !== column[startRowIx]) {
              continue outer;
            }
          }
          return column[startRowIx];
        }
      }
    }

    // check rows
    for (let rowIx = 0; rowIx < this.nrRows; rowIx++) {
      outer: for (
        let startColIx = 0;
        startColIx < this.nrCols - 3;
        startColIx++
      ) {
        if (this.board[startColIx][rowIx] !== 0) {
          for (let colIx = 1; colIx < 4; colIx++) {
            if (
              this.board[startColIx + colIx][rowIx] !==
              this.board[startColIx][rowIx]
            ) {
              continue outer;
            }
          }
          return this.board[startColIx][rowIx];
        }
      }
    }

    // check diagonal (from top left to bottom right)
    for (let startColIx = 0; startColIx < this.nrCols - 3; startColIx++) {
      outer: for (
        let startRowIx = 0;
        startRowIx < this.nrRows - 3;
        startRowIx++
      ) {
        if (this.board[startColIx][startRowIx] !== 0) {
          for (let i = 1; i < 4; i++) {
            if (
              this.board[startColIx + i][startRowIx + i] !==
              this.board[startColIx][startRowIx]
            ) {
              continue outer;
            }
          }
          return this.board[startColIx][startRowIx];
        }
      }
    }

    // check diagonal (from top right to bottom left)
    for (let colIx = this.nrCols - 1; colIx > 2; colIx--) {
      outer: for (let rowIx = 0; rowIx < this.nrRows - 2; rowIx++) {
        if (this.board[colIx][rowIx] !== 0) {
          for (let i = 1; i < 4; i++) {
            if (this.board[colIx - i][rowIx + i] !== this.board[colIx][rowIx]) {
              continue outer;
            }
          }
          return this.board[colIx][rowIx];
        }
      }
    }

    return 0;
  }

  public getWinnerName(): string {
    return this.playerNames[this.currentWinnerIndex];
  }
}
