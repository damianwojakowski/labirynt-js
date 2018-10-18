export class LevelElements {

    private WALL = 'WW';
    private FREE_SPACE = '00';
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

}