import {LevelElements} from "./LevelElements";

export class InMemoryLevelGenerator {

    private base: Array<Array<string>> = [];
    private row: Array<string>= [];
    private startPoint: number = null;
    private endPoint: number = null;
    private levelElements: LevelElements;
    private DEFAULT_POSITIONS = 4;
    private levelSize = 19;

    constructor(levelElements: LevelElements) {
        this.levelElements = levelElements;
    }

    public generateLevel(): Array<Array<string>> {
        return this.createLevel();
    }

    private createLevel(): Array<Array<string>> {
        this.resetSettings();
        this.prepareBase(this.levelSize, this.levelSize);
        this.setStartingPoint();
        this.setExitPoint();

        return this.base;
    }

    private resetSettings(): void {
        this.startPoint = null;
        this.endPoint = null;
    }

    private setStartingPoint(): void {
        this.startPoint = this.getRandomPosition();
        this.addPointToLevel(this.startPoint, this.levelElements.getStartingPoint());
    }

    private setExitPoint(): void {
        this.endPoint =  this.getRandomPosition();

        while (this.startPoint === this.endPoint)  {
            this.endPoint =  this.getRandomPosition();
        }

        this.addPointToLevel(this.endPoint, this.levelElements.getExit());
    }

    private addPointToLevel(pointPosition: number, point: string) {
        if (pointPosition === 1) {
            this.base[0][this.getPositionForStartOrExitPoints()] = point;
        } else if (pointPosition === 2) {
            this.base[this.getPositionForStartOrExitPoints()][this.levelSize - 1] = point;
        } else if (pointPosition === 3) {
            this.base[this.levelSize - 1][this.getPositionForStartOrExitPoints()] = point;
        } else if (pointPosition === 4) {
            this.base[this.getPositionForStartOrExitPoints()][0] = point;
        }
    }

    private getRandomPosition(): number {
        return Math.floor((Math.random() * this.DEFAULT_POSITIONS) + 1);
    }

    private getPositionForStartOrExitPoints(): number {
        return Math.floor((Math.random() * (this.levelSize - 4)) + 2);
    }

    private prepareBase(x: number, y: number): void {
        this.base = [];
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (this.isFirstRow(i)) {
                    this.row.push('WW');
                    continue;
                }

                if (this.isLastRow(i, x - 1)) {
                    this.row.push('WW');
                    continue;
                }

                this.fillMiddleRows(i, j, x, y);
            }
            this.base.push(this.row);
            this.row = [];
        }

        console.log(this.base);
    }

    private fillMiddleRows(i: number, j: number, x: number, y: number): void {
        // first vertical line
        if (i !== 0 && j === 0 && i !== x - 1) {
            this.row.push('WW');
            return;
        }

        // last vertical line
        if (i !== 0 && i !== x - 1 && j === y - 1) {
            this.row.push('WW');
            return;
        }

        if (!(j % 2) && !(i % 2)) {
            this.row.push('WW');
        } else {
            this.row.push('OO');
        }
    }

    private isFirstRow(index: number): boolean {
        return index === 0;
    }

    private isLastRow(index: number, levelSize: number): boolean {
        return index === levelSize;
    }

    private getHardcodedLevel(): Array<Array<string>> {
        return [
            ['WW', 'SS', 'WW', 'WW', 'WW', 'WW', 'WW'],
            ['WW', '00', '00', 'WW', '00', '00', '!!'],
            ['WW', '00', '00', 'WW', '00', 'WW', 'WW'],
            ['WW', '00', 'WW', 'WW', '00', 'WW', 'WW'],
            ['WW', '00', 'WW', '00', '00', '00', 'WW'],
            ['WW', '00', 'WW', '00', 'WW', '00', 'WW'],
            ['WW', '00', '00', '00', '00', '00', 'WW'],
            ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW']
        ];
    }
}
