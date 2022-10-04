import { Component } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  constructor(public board: BoardService) {}

  // TODO: Enhance solution from level 3 by extracting the logic in a separate Angular service.
  private getStyle(colIx: number, rowIx: number): string {
    let playerIx = this.board.getPlayerIx(colIx, rowIx);

    if (playerIx === 0) {
      return '';
    }

    return `occupied-${playerIx}`;
  }

  public getStyles(): string[][] {
    let styles: string[][] = [];
    for (let rowIx = 0; rowIx < this.board.nrRows; rowIx++) {
      styles[rowIx] = [];
      for (let colIx = 0; colIx < this.board.nrCols; colIx++) {
        styles[rowIx][colIx] = this.getStyle(colIx, rowIx);
      }
    }

    return styles;
  }
}
