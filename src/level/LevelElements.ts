export class LevelElements {

    private WALL = 'WW';
    private WALL_OR_PASSAGE = 'WP';
    private FREE_SPACE = 'PP';
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

}