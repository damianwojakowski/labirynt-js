import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {GameSettings} from "./settings/GameSettings";
import {LevelGenerator} from "./level/LevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {Player} from "./Player";

export class GameManager {

    constructor(
        levelGenerator: LevelGenerator,
        levelElements: LevelElements,
        gameSettings: GameSettings,
        player: Player
    ) {
        this.levelGenerator = levelGenerator;
        this.levelElements = levelElements;
        this.settings = gameSettings;
        this.player = player;

        this.board = this.levelGenerator.generateLevel();
        this.CONTEXT_2D = this.initializeBoardAndReturnContext2d();
    }

    private settings: GameSettings;
    private levelGenerator: InMemoryLevelGenerator;
    private board: Array<Array<string>>;
    private CONTEXT_2D: CanvasRenderingContext2D;
    private levelElements: LevelElements;
    private player: Player;

    public getContext2d() {
        return this.CONTEXT_2D;
    }

    initializeBoardAndReturnContext2d() {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.settings.getGameId());
        canvas.width = this.settings.getLevelSize(); //horizontal resolution (?) - increase for better looking text
        canvas.height = this.settings.getLevelSize(); //vertical resolution (?) - increase for better looking text
        canvas.style.width = String(this.settings.getLevelSize()); //actual width of canvas
        canvas.style.height = String(this.settings.getLevelSize()); //actual height of canvas

        return canvas.getContext("2d");
    }

    public play() {
        let context2d: CanvasRenderingContext2D = this.getContext2d();
        this.drawBoard(context2d);
        this.drawPlayer(context2d);
    }

    public drawBoard(context2d: CanvasRenderingContext2D) {
        this.drawElements(context2d);
    }

    public drawElements(context2d: CanvasRenderingContext2D) {
        this.board.forEach((elements: Array<string>, indexY: number) => {
            elements.forEach((element: string, indexX: number) => {
                let gridSize = this.settings.getGridSize();
                context2d.beginPath();
                context2d.arc(
                    (indexX + 1) * gridSize,
                    (indexY + 1) * gridSize,
                    gridSize / 2,
                    0,
                    2 * Math.PI
                );

                if (element === this.levelElements.getWall()) {
                    context2d.fillStyle = 'black';
                } else if (element === this.levelElements.getExit()) {
                    context2d.fillStyle = 'blue';
                } else {
                    context2d.fillStyle = 'white';
                }
                context2d.fill();
            });
        });
    }

    public KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };

    public drawPlayer(context2d: CanvasRenderingContext2D) {
        let gridSize = this.settings.getGridSize();

        context2d.beginPath();
        context2d.arc(
            (this.player.getPositionX() + 1) * gridSize,
            (this.player.getPositionY() + 1) * gridSize,
            gridSize / 2,
            0,
            2 * Math.PI
        );
        context2d.fillStyle = 'pink';
        context2d.fill();
    }

    public movePlayer(event: KeyboardEvent) {
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
        if (this.canMoveTo(playerPositionY- 1, this.player.getPositionX())) {
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
        return this.board[newPositionY][newPositionX] === this.levelElements.getFreeSpace() ||
            this.board[newPositionY][newPositionX] === this.levelElements.getExit();

    }

    public didWin() {
        return this.board[this.player.getPositionY()][this.player.getPositionX()] ===
            this.levelElements.getExit()
    }

    public showWinPage() {
        alert("YOU FOUND THE EXIT!");
    }

    public startGame() {
        document.addEventListener('keydown', this.movePlayer.bind(this), false);
        this.play();
    }

}