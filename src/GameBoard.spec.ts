import { expect } from 'chai';
import 'mocha';

import {GameBoard} from "./GameBoard";

describe('GameBoard', () => {

    it('should init', () => {
        let gameBoard = new GameBoard();
        expect(gameBoard).is.not.equal(null);
    });

});