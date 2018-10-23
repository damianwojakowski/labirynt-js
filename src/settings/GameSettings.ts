export class GameSettings {

    private GRID_SIZE = 15;
    private GAME_ID = 'game';
    private LEVEL_SIZE = 600;

    public getGridSize(): number {
        return this.GRID_SIZE;
    }

    public getGameId(): string {
        return this.GAME_ID;
    }

    public getLevelSize(): number {
        return this.LEVEL_SIZE;
    }

}