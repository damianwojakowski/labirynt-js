import {LevelElements} from "./LevelElements";

export class RandomLevelGenerator {

    private base: Array<Array<string>> = [];
    private levelElements: LevelElements;
    private levelWidth = 19;
    private levelHeight = 19;

    private walls = [
        ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW'],
        ['WW', 'WW', 'WW', '00', 'WW', '00', 'WW'],
        ['WW', '00', 'WW', 'WW', 'WW', 'WW', 'WW'],
        ['WW', 'WW', 'WW', '00', 'WW', '00', 'WW'],
        ['WW', '00', 'WW', 'WW', 'WW', 'WW', 'WW'],
        ['WW', 'WW', 'WW', '00', 'WW', '00', 'WW'],
        ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW'],
        ['WW', 'WW', 'WW', 'WW', 'WW', 'WW', 'WW']
    ];

    //    W P W P W
    //    P C P C P
    //    W P W P W
    //    P C P C P
    //    W P W P W

    constructor(levelElements: LevelElements) {
        this.levelElements = levelElements;
    }

    public generateLevel(): Array<Array<string>> {
        // Start with a grid full of walls.
        this.fillLevelWithWalls();

        // Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
        // While there are walls in the list:
        //     Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
        //         Make the wall a passage and mark the unvisited cell as part of the maze.
        //         Add the neighboring walls of the cell to the wall list.
        //     Remove the wall from the list.

        console.log(this.base);
        return this.base;
    }

    private fillLevelWithWalls(): void {
        this.addEmptyRow();
        this.addMiddleRows();
        this.addEmptyRow();
    }

    private addEmptyRow(): void {
        let emptyRow: Array<string> = [];
        for (let i = 0; i < this.levelWidth; i++) {
            emptyRow.push(this.getWall());
        }
        this.base.push(emptyRow);
    }

    private addMiddleRows(): void {
        for (let i = 0; i < this.levelHeight - 2; i++) {
            if (i % 2) {
                this.addSingleRow();
            } else {
                this.addSingleRawWithPassages();
            }

        }
    }

    private addSingleRow(): void {
        let nextRow: Array<string> = [];
        nextRow.push(this.getWall());

        this.addOneRow(nextRow);

        nextRow.push(this.getWall());
        this.base.push(nextRow);
    }

    private addSingleRawWithPassages(): void {
        let nextRow: Array<string> = [];
        nextRow.push(this.getWall());

        this.addOneRowWithPassages(nextRow);

        nextRow.push(this.getWall());
        this.base.push(nextRow);
    }

    private addOneRow(nextRow: Array<string>) {
        for (let i = 0; i < this.levelWidth - 2; i++) {
            if (i % 2) {
                nextRow.push(this.getEmptyCell());
            } else {
                nextRow.push(this.getWallOrPassage());
            }
        }
    }

    private addOneRowWithPassages(nextRow: Array<string>): void {
        for (let i = 0; i < this.levelWidth - 2; i++) {
            if (i % 2) {
                nextRow.push(this.getWallOrPassage());
            } else {
                nextRow.push(this.getWall());
            }
        }
    }

    private getWall(): string {
        return this.levelElements.getWall();
    }

    private getEmptyCell(): string {
        return this.levelElements.getFreeSpace();
    }

    private getWallOrPassage(): string {
        return this.levelElements.getWallOrPassage();
    }
}
