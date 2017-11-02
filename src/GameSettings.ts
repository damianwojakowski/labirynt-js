export class GameSettings {

    private GRID_SIZE = 30;
    private GAME_ID = 'game';
    private LEVEL_SIZE = 600;

    private ELEMENT_WALL = 'WW';
    private ELEMENT_FREE_SPACE = '00';
    private ELEMENT_END_POINT = '!!';

    public getGridSize() {
        return this.GRID_SIZE;
    }

    public getGameId() {
        return this.GAME_ID;
    }

    public getLevelSize() {
        return this.LEVEL_SIZE;
    }

    public getElementWall() {
        return this.ELEMENT_WALL;
    }

    public getElementFreeSpace() {
        return this.ELEMENT_FREE_SPACE;
    }

    public getElementEndPoint() {
        return this.ELEMENT_END_POINT;
    }
}