import {GameSettings} from "./settings/GameSettings";
import {LevelElements} from "./level/LevelElements";
import {Player} from "./Player";

export class GameBoard {

    private context2d: CanvasRenderingContext2D;
    private settings: GameSettings;
    private levelElements: LevelElements;
    private playerStartingPositionX: number;
    private playerStartingPositionY: number;
    private resetPlayerPosition = false;

    constructor(
        settings: GameSettings,
        levelElements: LevelElements
    ) {
        this.settings = settings;
        this.levelElements = levelElements;
    }

    initializeBoard(): void {
        let levelSize = this.settings.getLevelSize();
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.settings.getGameId());
        canvas.width = levelSize; //horizontal resolution (?) - increase for better looking text
        canvas.height = levelSize; //vertical resolution (?) - increase for better looking text
        canvas.style.width = String(levelSize); //actual width of canvas
        canvas.style.height = String(levelSize); //actual height of canvas

        this.context2d = canvas.getContext("2d");

        this.resetPlayerPosition = true;
    }

    nextLevel(): void {
        this.resetPlayerPosition = true;
    }

    public drawLevel(level: Array<Array<string>>) {
        this.clear();
        this.drawElements(level);
    }

    public drawElements(level:  Array<Array<string>>) {
        level.forEach((elements: Array<string>, indexY: number) => {
            elements.forEach((element: string, indexX: number) => {
                let gridSize = this.settings.getGridSize();
                this.context2d.beginPath();
                this.context2d.arc(
                    (indexX + 1) * gridSize,
                    (indexY + 1) * gridSize,
                    gridSize / 2,
                    0,
                    2 * Math.PI
                );

                if (element === this.levelElements.getWall()) {
                    this.context2d.fillStyle = 'black';
                } else if (element === this.levelElements.getExit()) {
                    this.context2d.fillStyle = 'blue';
                } else if (element === this.levelElements.getFreeSpace()) {
                    this.context2d.fillStyle = 'green';
                } else if (element === this.levelElements.getStartingPoint()) {
                    this.playerStartingPositionX = indexX;
                    this.playerStartingPositionY = indexY;
                    this.context2d.fillStyle = 'white';
                } else if (element === this.levelElements.getWallOrPassage()) {
                    this.context2d.fillStyle = 'purple';
                } else {
                    this.context2d.fillStyle = 'white';
                }
                this.context2d.fill();
            });
        });
    }

    public drawPlayer(player: Player) {
        let gridSize = this.settings.getGridSize();

        if (this.resetPlayerPosition) {
            player.setPositionX(this.playerStartingPositionX);
            player.setPositionY(this.playerStartingPositionY);
            this.resetPlayerPosition = false;
        }

        this.context2d.beginPath();
        this.context2d.arc(
            (player.getPositionX() + 1) * gridSize,
            (player.getPositionY() + 1) * gridSize,
            gridSize / 2,
            0,
            2 * Math.PI
        );
        this.context2d.fillStyle = 'pink';
        this.context2d.fill();
    }

    public drawStatistics(levelNumber: number): void {
        let levelSize = this.settings.getLevelSize();
        let fillText = 'Level: ' + levelNumber;

        this.context2d.font = '20px Arial';
        let textWidth = this.context2d.measureText(fillText);

        this.context2d.beginPath();
        this.context2d.fillStyle = "black";
        this.context2d.fillRect(23, levelSize - 30, Math.floor(textWidth.width) + 10, 30);
        this.context2d.fill();

        this.context2d.beginPath();
        this.context2d.fillStyle = "white";
        this.context2d.fillText(fillText, 30, levelSize - 5);
        this.context2d.fill();
    }

    public drawInfoBox(message: string): void {
        let levelSize = this.settings.getLevelSize();
        this.context2d.font = '40px Arial';
        let textWidth = this.context2d.measureText(message);

        this.context2d.beginPath();
        this.context2d.fillStyle = "black";
        this.context2d.fillRect(levelSize / 2 - textWidth.width / 2 - 15, levelSize / 2 - 43, Math.floor(textWidth.width) + 30, 60);
        this.context2d.fill();

        this.context2d.beginPath();
        this.context2d.fillStyle = "white";
        this.context2d.fillText(message, levelSize / 2 - textWidth.width / 2, levelSize / 2, levelSize / 2);
        this.context2d.fill();
    }

    private clear(): void {
        this.context2d.clearRect(0, 0, this.settings.getLevelSize(), this.settings.getLevelSize());
    }

}