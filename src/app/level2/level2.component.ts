import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public currentPlayerIndex!: number;
  private currentWinnerIndex!: number;
  private playerNames: string[];
  public boardContent!: number[][];

  constructor() {
    this.playerNames = ['', '1', '2'];

    this.onRestart();
  }

  onRestart() {
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }

  public getPlayerName(col: number, row: number): string {
    return this.playerNames[this.boardContent[row][col]];
  }

  public getStyle(col: number, row: number): string {
    if (this.boardContent[row][col] !== 0) {
      return `occupied-${this.getPlayerName(col, row)}`; // Like StringFormat in Java
    }

    return '';
  }

  public drop(colIx: number): void {
    if (this.currentWinnerIndex !== 0) {
      return;
    }

    for (let i = this.boardContent[colIx].length - 1; i >= 0; i--) {
      if (this.boardContent[colIx][i] === 0) {
        this.boardContent[colIx][i] = this.currentPlayerIndex;
        this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
        this.getWinnerIndex();
        break;
      }
    }
  }

  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }

  public getWinnerName(): string {
    return this.playerNames[this.currentWinnerIndex];
  }

  /**
   * get the player (1 or 2) who has won the game
   */
  private getWinnerIndex(): void {

    for (let y = 0; y < 4; y++) {
      if (this.boardContent[y][0] !== 0 && this.boardContent[y][1] === this.boardContent[y][0] && this.boardContent[y][2] === this.boardContent[y][0] && this.boardContent[y][3] === this.boardContent[y][0]) {
        this.currentWinnerIndex =  this.boardContent[y][0];
      }
    }

    for (let y = 0; y < 4; y++) {
      if (this.boardContent[0][y] !== 0 && this.boardContent[1][y] === this.boardContent[0][y] && this.boardContent[2][y] === this.boardContent[0][y] && this.boardContent[3][y] === this.boardContent[0][y]) {
        this.currentWinnerIndex = this.boardContent[0][y];
      }
    }
    if (this.boardContent[0][0] !== 0 && this.boardContent[1][1] === this.boardContent[0][0] && this.boardContent[2][2] === this.boardContent[0][0] && this.boardContent[3][3] === this.boardContent[0][0]) {
      this.currentWinnerIndex = this.boardContent[0][0];
    }
    if (this.boardContent[0][3] !== 0 && this.boardContent[1][2] === this.boardContent[0][3] && this.boardContent[2][1] === this.boardContent[0][3] && this.boardContent[3][0] === this.boardContent[0][3]) {
      this.currentWinnerIndex =  this.boardContent[0][3];
    }

    }

  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
}
