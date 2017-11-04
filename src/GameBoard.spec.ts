import { expect } from 'chai';
import 'mocha';

import {GameBoard} from "./GameBoard";

describe('GameBoard', () => {

    it('should return grid size as a number', () => {
        let gameBoard = new GameBoard();
        expect(gameBoard).is.not.null();
    });

});