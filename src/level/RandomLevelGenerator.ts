import {LevelElements} from "./LevelElements";

export class RandomLevelGenerator {

    private base: Array<Array<string>> = [];
    private levelElements: LevelElements;
    private levelWidth = 35;
    private levelHeight = 35;
    private startingPoint = {x: 1, y: 11};

    private walls: Array<Wall> = [];

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

        this.setPlayerPosition();

        console.log(this.base);

        return this.base;
    }

    private setPlayerPosition(): void {
        this.base[this.startingPoint.x][this.startingPoint.y] = this.levelElements.getStartingPoint();
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
                    this.addSingleRawWithPassages();
                } else {
                    this.addSingleRow();
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
                    nextRow.push(this.getHorizontalPassage());
                } else {
                    nextRow.push(this.getFreeSpace());
                }
            }
        }

        private addOneRowWithPassages(nextRow: Array<string>): void {
            for (let i = 0; i < this.levelWidth - 2; i++) {
                if (i % 2) {
                    nextRow.push(this.getWall());
                } else {
                    nextRow.push(this.getVerticalPassage());
                }
            }
        }

        private getWall(): string {
            return this.levelElements.getWall();
        }

        private getFreeSpace(): string {
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
    }

        private addWallsForCell(cell: {x: number, y: number}): void {
            this.base[cell.x][cell.y] = this.levelElements.getMazeCell();
            let element;

            // check if wall in north and add to walls list
            element = this.base[cell.x - 1] ? this.base[cell.x - 1][cell.y] : '';
            if (this.isWallOrPassage(element)) {
                this.walls.push(this.buildWall(element, cell.x - 1, cell.y));
            }

            // check if wall in south
            element = this.base[cell.x + 1] ? this.base[cell.x + 1][cell.y] : '';
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

        private getFreeSpaceVisited(): string {
            return this.levelElements.getMazeCell();
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
            let randomWallIndex = this.getRandomWallIndex();
            let randomWall = this.walls[randomWallIndex];
            if (this.isOneCellVisitedOfTwoDividedByWall(randomWall)) {
                // Make the wall a passage
                this.base[randomWall.positionX][randomWall.positionY] = this.getFreeSpaceVisited();

                // and mark the unvisited cell as part of the maze.
                // Add the neighboring walls of the cell to the wall list.
                this.addUnvisitedCellToMazeAndItsWallsToWallsList(randomWall);
            } else {
                this.base[randomWall.positionX][randomWall.positionY] = this.getWall();
            }
            this.walls.splice(randomWallIndex, 1);
        }
    }

        private getRandomWallIndex(): number {
            return Math.floor(Math.random() * this.walls.length);
        }

        private isOneCellVisitedOfTwoDividedByWall(wall: Wall): boolean {
            let isVisitedCounter = 0;
            if (this.isHorizontalPassage(wall)) {
                if (this.isLeftCellVisited(wall)) {
                    isVisitedCounter++;
                }
                if (this.isRightCellVisited(wall)) {
                    isVisitedCounter++;
                }
            } else if (this.isVerticalPassage(wall)) {
                if (this.isUpCellVisited(wall)) {
                    isVisitedCounter++;
                }
                if (this.isDownCellVisited(wall)) {
                    isVisitedCounter++;
                }
            }

            return isVisitedCounter === 1;
        }

        private isHorizontalPassage(wall: Wall): boolean {
            return wall.element === this.levelElements.getHorizontalPassage();
        }

        private isVerticalPassage(wall: Wall): boolean {
            return wall.element === this.levelElements.getVerticalPassage();
        }

        private isLeftCellVisited(wall: Wall): boolean {
            return this.getLeftCell(wall) === this.getFreeSpaceVisited();
        }

        private getLeftCell(wall: Wall): string {
            return this.base[wall.positionX][wall.positionY - 1];
        }

        private isRightCellVisited(wall: Wall): boolean {
            return this.getRightCell(wall) === this.getFreeSpaceVisited();
        }

        private getRightCell(wall: Wall): string {
            return this.base[wall.positionX][wall.positionY + 1];
        }

        private isUpCellVisited(wall: Wall): boolean {
            return this.getUpCell(wall) === this.getFreeSpaceVisited();
        }

        private getUpCell(wall: Wall): string {
            return this.base[wall.positionX - 1] ? this.base[wall.positionX - 1][wall.positionY] : '';
        }

        private isDownCellVisited(wall: Wall): boolean {
            return this.getDownCell(wall) === this.getFreeSpaceVisited();
        }

        private getDownCell(wall: Wall): string {
            return this.base[wall.positionX + 1] ? this.base[wall.positionX + 1][wall.positionY] : '';
        }

        private addUnvisitedCellToMazeAndItsWallsToWallsList(wall: Wall): void {
            let notVisitedCell = this.getNotVisitedCell(wall);

            if (notVisitedCell.x === null) return;

            // add walls of unvisited to walls list
            this.addWallsForCell(notVisitedCell);

            this.base[notVisitedCell.x][notVisitedCell.y] = this.getFreeSpaceVisited();
        }

        private getNotVisitedCell(wall: Wall): {x: number, y: number} {
            let notVisitedCellPosition = {x: null, y: null};

            if (this.isHorizontalPassage(wall)) {
                if (this.getLeftCell(wall) === this.getFreeSpace()) {
                    notVisitedCellPosition.x = wall.positionX;
                    notVisitedCellPosition.y = wall.positionY - 1;
                }
                else if (this.getRightCell(wall) === this.getFreeSpace()) {
                    notVisitedCellPosition.x = wall.positionX;
                    notVisitedCellPosition.y = wall.positionY + 1;
                }
            } else if (this.isVerticalPassage(wall)) {
                if (this.getUpCell(wall) === this.getFreeSpace()) {
                    notVisitedCellPosition.x = wall.positionX - 1;
                    notVisitedCellPosition.y = wall.positionY;
                }
                if (this.getDownCell(wall) === this.getFreeSpace()) {
                    notVisitedCellPosition.x = wall.positionX + 1;
                    notVisitedCellPosition.y = wall.positionY;
                }
            }

            return notVisitedCellPosition;
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
