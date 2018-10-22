import {LevelElements} from "./LevelElements";

export class RandomLevelGenerator {

    private base: Array<Array<string>> = [];
    private levelElements: LevelElements;
    private levelWidth = 11;
    private levelHeight = 11;

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

    //      W   W
    //    W C W C W
    //      W   W
    //    W C W C W
    //      W   W

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

        return this.base;
    }

    private fillLevelWithWalls(): void {
        this.addFirstRow();
    }

    private addFirstRow() {
        let emptyRow: Array<string> = [];
        for (let i = 0; i < this.levelWidth; i++) {
            emptyRow.push('WW');
        }
        this.base.push(emptyRow);
    }
}
