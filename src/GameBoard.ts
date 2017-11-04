import {GameSettings} from "./settings/GameSettings";
import {LevelElements} from "./level/LevelElements";
import {Player} from "./Player";

export class GameBoard {

    private context2d: CanvasRenderingContext2D;
    private settings: GameSettings;
    private levelElements: LevelElements;

    constructor(
        settings: GameSettings,
        levelElements: LevelElements
    ) {
        this.settings = settings;
        this.levelElements = levelElements;
    }

    initializeBoard() {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.settings.getGameId());
        canvas.width = this.settings.getLevelSize(); //horizontal resolution (?) - increase for better looking text
        canvas.height = this.settings.getLevelSize(); //vertical resolution (?) - increase for better looking text
        canvas.style.width = String(this.settings.getLevelSize()); //actual width of canvas
        canvas.style.height = String(this.settings.getLevelSize()); //actual height of canvas

        this.context2d = canvas.getContext("2d");
    }

    public drawLevel(level: Array<Array<string>>) {
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
                } else {
                    this.context2d.fillStyle = 'white';
                }
                this.context2d.fill();
            });
        });
    }

    public drawPlayer(player: Player) {
        let gridSize = this.settings.getGridSize();

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

}