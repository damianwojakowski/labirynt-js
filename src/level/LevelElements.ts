export class LevelElements {

    private WALL = 'WW';
    private WALL_OR_PASSAGE = 'WP';
    private HORIZONTAL_PASSAGE = 'HP';
    private VERTICAL_PASSAGE = 'VP';
    private FREE_SPACE = 'PP';
    private MAZE_CELL = '00';
    private EXIT = '!!';
    private STARTING_POINT = 'SS';

    public getWall(): string {
        return this.WALL;
    }

    public getFreeSpace(): string {
        return this.FREE_SPACE;
    }

    public getExit(): string {
        return this.EXIT;
    }

    public getStartingPoint(): string {
        return this.STARTING_POINT;
    }

    public getWallOrPassage(): string {
        return this.WALL_OR_PASSAGE;
    }

    public getMazeCell(): string {
        return this.MAZE_CELL;
    }

    public getHorizontalPassage(): string {
        return this.HORIZONTAL_PASSAGE;
    }

    public getVerticalPassage(): string {
        return this.VERTICAL_PASSAGE;
    }

}