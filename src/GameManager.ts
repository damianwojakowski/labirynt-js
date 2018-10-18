import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelGenerator} from "./level/LevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {Player} from "./Player";
import {GameBoard} from "./GameBoard";

export class GameManager {

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
    }

    private levelGenerator: LevelGenerator;
    private currentLevel: Array<Array<string>>;
    private levelElements: LevelElements;
    private player: Player;
    private gameBoard: GameBoard;

    public play() {
        this.gameBoard.drawLevel(this.currentLevel);
        this.gameBoard.drawPlayer(this.player);
    }

    public KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };

    public movePlayer(event: KeyboardEvent) {
        if (this.didWin()) {
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
            setTimeout(this.showWinPage, 0);
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

    public canMoveTo(newPositionY: any, newPositionX: any) {
        if (!(this.currentLevel[[newPositionY]] && this.currentLevel[newPositionY][newPositionX])) {
            return false;
        }
        return this.currentLevel[newPositionY][newPositionX] === this.levelElements.getFreeSpace() ||
            this.currentLevel[newPositionY][newPositionX] === this.levelElements.getExit();

    }

    public didWin() {
        return this.currentLevel[this.player.getPositionY()][this.player.getPositionX()] ===
            this.levelElements.getExit()
    }

    public showWinPage() {
        alert("YOU FOUND THE EXIT!");
    }

    public startGame() {
        this.gameBoard.initializeBoard();
        document.addEventListener('keydown', this.movePlayer.bind(this), true);
        this.play();
    }

}