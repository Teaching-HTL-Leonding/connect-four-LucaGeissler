import { BoardService } from "./board.service";


describe("BoardService", () => {
  it('can set a piece in a col', () => {
      const boardService = new BoardService();
      boardService.drop(0);

      expect(boardService.board[0][boardService.board[0].length-1]).toBe(1);
  });

  it('can detect a winner horizontal', () => {
      const boardService = new BoardService();
      boardService.drop(0);
      boardService.drop(0);
      boardService.drop(1);
      boardService.drop(1);
      boardService.drop(2);
      boardService.drop(2);
      boardService.drop(3);

      expect(boardService.currentWinnerIndex).toBe(1);
  });

  it('can detect a winner vertical', () => {
      const boardService = new BoardService();
      boardService.drop(0);
      boardService.drop(1);
      boardService.drop(0);
      boardService.drop(1);
      boardService.drop(0);
      boardService.drop(1);
      boardService.drop(0);

      expect(boardService.currentWinnerIndex).toBe(1);
  });

  it('can detect a winner diagonal', () => {
      const boardService = new BoardService();
      boardService.drop(0);
      boardService.drop(1);
      boardService.drop(1);
      boardService.drop(2);
      boardService.drop(0);
      boardService.drop(2);
      boardService.drop(2);
      boardService.drop(3);
      boardService.drop(3);
      boardService.drop(3);
      boardService.drop(3);

      expect(boardService.currentWinnerIndex).toBe(1);
  });

  it('can reset the board', () => {
      const boardService = new BoardService();
      boardService.drop(0);

      boardService.restart();

      expect(boardService.board[0][boardService.board[0].length - 1]).toBe(0);
  });

  it('can stop the player from dropping into a full column', () => {
      const boardService = new BoardService();

      for (let i = 0; i < boardService.board[0].length; i++) {
          boardService.drop(0);
      }

      const currentName = boardService.currentPlayerIndex;

      boardService.drop(0);

      expect(boardService.currentPlayerIndex).toBe(currentName);
  });
});
