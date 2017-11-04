import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {GameSettings} from "./settings/GameSettings";
import {Player} from "./Player";
import {GameBoard} from "./GameBoard";

let player = new Player();
player.setInitialPosition(2, 2);

let gameBoard = new GameBoard(
    new GameSettings(),
    new LevelElements()
);

let gameManager = new GameManager(
    new InMemoryLevelGenerator(),
    new LevelElements(),
    player,
    gameBoard
);

gameManager.startGame();
