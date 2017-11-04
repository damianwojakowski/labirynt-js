import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {GameSettings} from "./settings/GameSettings";
import {LevelGenerator} from "./level/LevelGenerator";

export class GameManager {

    constructor(levelGenerator: LevelGenerator) {
        this.levelGenerator = levelGenerator;
        this.settings = new GameSettings();
        this.board = this.levelGenerator.generateLevel();
        this.CONTEXT_2D = this.initializeBoardAndReturnContext2d();
    }

    private settings: GameSettings;
    private levelGenerator: InMemoryLevelGenerator;
    private board: Array<Array<string>>;
    private CONTEXT_2D: CanvasRenderingContext2D;

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

    public SETTINGS = {
        GRID_SIZE: 30,
        GAME_ID: 'game',
        SIZE: 600
    };

    public ELEMENTS = {
        WALL: 'WW',
        FREE_SPACE: '00',
        END_POINT: '!!'
    };

    public PLAYER_POSITION = {X: 2, Y: 2};

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

                if (element === this.ELEMENTS.WALL) {
                    context2d.fillStyle = 'black';
                } else if (element === this.ELEMENTS.END_POINT) {
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
        context2d.beginPath();
        context2d.arc((this.PLAYER_POSITION.X + 1) * this.SETTINGS.GRID_SIZE, (this.PLAYER_POSITION.Y + 1) * this.SETTINGS.GRID_SIZE, this.SETTINGS.GRID_SIZE / 2, 0, 2 * Math.PI);
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
        if (this.canMoveTo(this.PLAYER_POSITION.Y - 1, this.PLAYER_POSITION.X)) {
            this.PLAYER_POSITION.Y--;
        }
    }

    public tryToMoveDown() {
        if (this.canMoveTo(this.PLAYER_POSITION.Y + 1, this.PLAYER_POSITION.X)) {
            this.PLAYER_POSITION.Y++;
        }
    }

    public tryToMoveLeft() {
        if (this.canMoveTo(this.PLAYER_POSITION.Y, this.PLAYER_POSITION.X - 1)) {
            this.PLAYER_POSITION.X--;
        }
    }

    public tryToMoveRight() {
        if (this.canMoveTo(this.PLAYER_POSITION.Y, this.PLAYER_POSITION.X + 1)) {
            this.PLAYER_POSITION.X++;
        }
    }

    public canMoveTo(newPositionY: any, newPositionX: any) {
        return this.board[newPositionY][newPositionX] === this.ELEMENTS.FREE_SPACE ||
            this.board[newPositionY][newPositionX] === this.ELEMENTS.END_POINT;

    }

    public didWin() {
        return this.board[this.PLAYER_POSITION.Y][this.PLAYER_POSITION.X] === this.ELEMENTS.END_POINT
    }

    public showWinPage() {
        alert("YOU FOUND THE EXIT!");
    }

    public startGame() {
        document.addEventListener('keydown', this.movePlayer.bind(this), false);
        this.play();
    }

}