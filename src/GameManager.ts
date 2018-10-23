import {LevelGenerator} from "./level/LevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {Player} from "./Player";
import {GameBoard} from "./GameBoard";

export class GameManager {

    private levelGenerator: LevelGenerator;
    private currentLevel: Array<Array<string>>;
    private levelElements: LevelElements;
    private player: Player;
    private gameBoard: GameBoard;
    private levelNumber: number = 1;
    private gamePaused: boolean = false;

    constructor(
        levelGenerator: LevelGenerator,
        levelElements: LevelElements,
        player: Player,
        gameBoard: GameBoard
    ) {
        this.levelGenerator = levelGenerator;
        this.levelElements = levelElements;
        this.player = player;
        this.gameBoard = gameBoard;
        this.currentLevel = this.levelGenerator.generateLevel();
        this.movePlayer = this.movePlayer.bind(this);
    }

    public play() {
        this.gameBoard.drawLevel(this.currentLevel);
        this.gameBoard.drawStatistics(this.levelNumber);
        this.gameBoard.drawPlayer(this.player);

        if (this.gamePaused) {
            this.showInfoMessage("GAME PAUSED");
        }
    }

    private generateNewLevel(): void {
        this.gameBoard.nextLevel();
        this.currentLevel = this.levelGenerator.generateLevel();
    }

    public KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        P_KEY: 80
    };

    public movePlayer(event: KeyboardEvent) {
        if (event.keyCode === this.KEY_CODES.P_KEY) {
            this.pauseGame();
        }

        if (this.gamePaused) {
            this.play();
            return;
        }

        if (event.keyCode === this.KEY_CODES.ARROW_UP) {
            this.tryToMoveUp();
        } else if (event.keyCode === this.KEY_CODES.ARROW_DOWN) {
            this.tryToMoveDown();
        } else if (event.keyCode === this.KEY_CODES.ARROW_LEFT) {
            this.tryToMoveLeft();
        } else if (event.keyCode === this.KEY_CODES.ARROW_RIGHT) {
            this.tryToMoveRight();
        }

        this.play();

        if (this.didWin()) {
            setTimeout(() => this.showWinPage(), 0);
        }
    }

    public tryToMoveUp() {
        let playerPositionY = this.player.getPositionY();
        if (this.canMoveTo(playerPositionY - 1, this.player.getPositionX())) {
            this.player.setPositionY(playerPositionY - 1);
        }
    }

    public tryToMoveDown() {
        let playerPositionY = this.player.getPositionY();
        if (this.canMoveTo(playerPositionY + 1, this.player.getPositionX())) {
            this.player.setPositionY(playerPositionY + 1);
        }
    }

    public tryToMoveLeft() {
        let playerPositionX = this.player.getPositionX();
        if (this.canMoveTo(this.player.getPositionY(), playerPositionX - 1)) {
            this.player.setPositionX(playerPositionX - 1);
        }
    }

    public tryToMoveRight() {
        let playerPositionX = this.player.getPositionX();
        if (this.canMoveTo(this.player.getPositionY(), playerPositionX + 1)) {
            this.player.setPositionX(playerPositionX + 1);
        }
    }

    canMoveTo(newPositionY: number, newPositionX: number): boolean {
        if (!(this.currentLevel[newPositionY] && this.currentLevel[newPositionY][newPositionX])) {
            return false;
        }
        return this.currentLevel[newPositionY][newPositionX] === this.levelElements.getMazeCell() ||
            this.currentLevel[newPositionY][newPositionX] === this.levelElements.getExit();
    }

    public didWin() {
        return this.currentLevel[this.player.getPositionY()][this.player.getPositionX()] ===
            this.levelElements.getExit()
    }

    public showWinPage() {
        alert("YOU FOUND THE EXIT!");
        this.nextLevel();
    }

    private nextLevel() {
        this.levelNumber++;
        this.generateNewLevel();
        this.play();
        this.showInfoMessage("NEW LEVEL");
    }

    private showInfoMessage(message: string): void {
        this.gameBoard.drawInfoBox(message);
    }

    public pauseGame() {
        this.gamePaused = !this.gamePaused;
    }

    public startGame() {
        this.gameBoard.initializeBoard();
        document.addEventListener('keydown', this.movePlayer, false);
        this.play();
    }

}