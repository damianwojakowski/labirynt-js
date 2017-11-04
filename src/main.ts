import {GameManager} from "./GameManager";
import {InMemoryLevelGenerator} from "./level/InMemoryLevelGenerator";

let levelGenerator = new InMemoryLevelGenerator();

let gameManager = new GameManager(levelGenerator);
gameManager.startGame();
