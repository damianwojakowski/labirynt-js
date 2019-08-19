export class LevelElements {

    private WALL = 1;
    private WALL_OR_PASSAGE = 2;
    private HORIZONTAL_PASSAGE = 3;
    private VERTICAL_PASSAGE = 4;
    private FREE_SPACE = 5;
    private EXIT = 6;
    private STARTING_POINT = 7;
    private MAZE_CELL = 8;

    public getWall(): number {
        return this.WALL;
    }

    public getFreeSpace(): number {
        return this.FREE_SPACE;
    }

    public getExit(): number {
        return this.EXIT;
    }

    public getStartingPoint(): number {
        return this.STARTING_POINT;
    }

    public getWallOrPassage(): number {
        return this.WALL_OR_PASSAGE;
    }

    public getMazeCell(): number {
        return this.MAZE_CELL;
    }

    public getHorizontalPassage(): number {
        return this.HORIZONTAL_PASSAGE;
    }

    public getVerticalPassage(): number {
        return this.VERTICAL_PASSAGE;
    }

}