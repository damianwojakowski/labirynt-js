import { expect } from 'chai';
import 'mocha';

import {GameSettings} from "./GameSettings";

describe('GameSettings', () => {
    let gridSize: GameSettings;

    beforeEach(() => {
        gridSize = new GameSettings();
    });

    it('should return grid size as a number', () => {
        expect(gridSize.getGridSize()).is.a('number');
    });

    it('should return game id as string', () => {
        expect(gridSize.getGameId()).is.a('string');
    });

    it('should return level size as a nmber', () => {
        expect(gridSize.getLevelSize()).is.a('number');
    });

});