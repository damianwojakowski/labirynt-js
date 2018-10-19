import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";
import {LevelElements} from "./level/LevelElements";
import {GameSettings} from "./settings/GameSettings";
import {Player} from "./Player";
import {GameBoard} from "./GameBoard";

let player = new Player();
let levelElements = new LevelElements();

let gameBoard = new GameBoard(
    new GameSettings(),
    new LevelElements()
);

let gameManager = new GameManager(
    new InMemoryLevelGenerator(levelElements),
    levelElements,
    player,
    gameBoard
);

gameManager.startGame();
