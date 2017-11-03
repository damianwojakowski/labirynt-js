import { expect } from 'chai';
import 'mocha';

import {GameSettings} from "./GameSettings";

describe('GameSettings', () => {

    it('should return grid size as a number', () => {
        let gridSize = new GameSettings();
        expect(gridSize.getGridSize()).is.a('number');
    });

    it('should return game id as string', () => {
        let gridSize = new GameSettings();
        expect(gridSize.getGameId()).is.a('string');
    });

    it('should return level size as a nmber', () => {
        let gridSize = new GameSettings();
        expect(gridSize.getLevelSize()).is.a('number');
    });

});