import {LevelElements} from "./LevelElements";

export class RandomLevelGenerator {

    private base: Array<Array<string>> = [];
    private levelElements: LevelElements;
    private levelWidth = 19;
    private levelHeight = 19;
    private startingPoint = {x: 2, y: 2};

    private walls: Array<Wall> = [];

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
        this.pickStartingPointAndAddFirstWalls();

        // While there are walls in the list:
        //     Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
        //         Make the wall a passage and mark the unvisited cell as part of the maze.
        //         Add the neighboring walls of the cell to the wall list.
        //     Remove the wall from the list.
        this.drawMaze();

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
                    nextRow.push(this.getHorizontalPassage());
                }
            }
        }

        private addOneRowWithPassages(nextRow: Array<string>): void {
            for (let i = 0; i < this.levelWidth - 2; i++) {
                if (i % 2) {
                    nextRow.push(this.getVerticalPassage());
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

        private getHorizontalPassage(): string {
            return this.levelElements.getHorizontalPassage();
        }

        private getVerticalPassage(): string {
            return this.levelElements.getVerticalPassage();
        }

    private pickStartingPointAndAddFirstWalls(): void {
        this.addWallsForCell(this.startingPoint);
        console.log(this.walls);
    }

        private addWallsForCell(cell: {x: number, y: number}): void {
            this.base[cell.x][cell.y] = this.levelElements.getFreeSpaceVisited();
            let element;

            // check if wall in north and add to walls list
            element = this.base[cell.x - 1] && this.base[cell.x - 1][cell.y];
            if (this.isWallOrPassage(element)) {
                this.walls.push(this.buildWall(element, cell.x - 1, cell.y));
            }

            // check if wall in south
            element = this.base[cell.x + 1] && this.base[cell.x + 1][cell.y];
            if (this.isWallOrPassage(element)) {
                this.walls.push(this.buildWall(element, cell.x + 1, cell.y));
            }

            // check if wall in east
            element = this.base[cell.x][cell.y + 1];
            if (this.isWallOrPassage(element)) {
                this.walls.push(this.buildWall(element, cell.x, cell.y + 1));
            }

            // check if wall in west
            element = this.base[cell.x][cell.y - 1];
            if (this.isWallOrPassage(element)) {
                this.walls.push(this.buildWall(element, cell.x, cell.y - 1));
            }
        }

        private isWallOrPassage(element: string): boolean {
            return element === this.levelElements.getVerticalPassage() || element === this.levelElements.getHorizontalPassage();
        }

        private buildWall(element: string, positionX: number, positionY: number): Wall {
            return new Wall(element, positionX, positionY);
        }

    private drawMaze(): void {
        let infiniteLoopCounter = 100000;
        let iterations = 0;

        // While there are walls in the list:
        while (this.walls.length > 0 && iterations < infiniteLoopCounter) {
            iterations++;
            // Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
            let randomWall = this.getRandomWall();
            if (this.isOneCellVisitedOfTwoDividedByWall(randomWall)) {
                // Make the wall a passage and mark the unvisited cell as part of the maze.
                // Add the neighboring walls of the cell to the wall list.
            } else {
                // Remove the wall from the list.
            }
        }
    }

        private getRandomWall(): Wall {
            let randomNumber = Math.floor(Math.random() * this.walls.length);
            //console.log('randomNumber: ' + randomNumber);
            return this.walls[randomNumber];
        }

        private isOneCellVisitedOfTwoDividedByWall(wall: Wall): boolean {
            if (wall.element === this.levelElements.getHorizontalPassage()) {
                return true;
            } else if (wall.element === this.levelElements.getHorizontalPassage()) {
                return false
            }
        }
}

class Wall {
    public positionX: number;
    public positionY: number;
    public element: string;

    constructor(element: string, positionX: number, positionY: number) {
        this.element = element;
        this.positionX = positionX;
        this.positionY = positionY
    }
}
