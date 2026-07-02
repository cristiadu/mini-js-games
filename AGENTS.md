# AGENTS.md

Guidance for AI agents (and humans) working on this repo.

## What this is

A collection of small browser games written in vanilla JavaScript (ES modules, no framework, no build step), rendered on an HTML `<canvas>`. A minimal Express server ([index.js](index.js)) serves the static files under `src/`.

## Commands

```bash
npm install     # install dependencies
npm start       # serve on http://localhost:4000 (override with PORT)
npm run lint    # eslint over ./src/**
npm run lint:fix
```

CI ([.github/workflows/node.js.yml](.github/workflows/node.js.yml)) runs `npm install` + `npm run lint` on Node 23.

## Game engine

The engine lives in `src/common/` and has two pieces:

### `GameMachine.js` — the game loop

`GameMachine` runs a fixed-timestep loop on top of `requestAnimationFrame`:

- Constructed with `(game, cfg, selector)`: a game instance, a config object (`width`, `height`, optional `fps`, default 60), and a CSS selector for the target `<canvas>`.
- Each frame it accumulates elapsed wall-clock time and calls `game.update()` once per fixed step (`1000 / fps` ms) until the accumulator drains — so game logic advances at a constant rate regardless of frame rate.
- After updating, it calls `game.draw(context, accumulator)` once with the canvas 2D context.
- It sets `game.machine = this` back-reference on construction, and `start()` kicks off the loop.

A game is any class implementing this contract:

| Member | Purpose |
|--------|---------|
| `update()` | Advance game logic by one fixed step (input, movement, collisions) |
| `draw(ctx, dt)` | Render current state to the canvas 2D context |
| `init()` | Position entities before the loop starts (called by the game's `main.js`) |

### `Keyboard.js` — input

A keydown/keyup listener that records pressed key codes in a static map. It self-registers a global singleton on load (`window.GameKeyboard`); games poll input inside `update()` via `Keyboard.isDown(keyCode)`.

## Games

| Game | Path | Notes |
|------|------|-------|
| Snake | `src/games/snake/` | Arrow-key snake; eat food, grow, die on self/wall collision |
| Breakout | `src/games/breakout/` | Paddle + ball; clear the block grid |
| Pong | `src/games/pong/` | Human (W/S or arrows) vs. simple AI paddle |

Every game follows the same layout:

```
src/games/<name>/
├── index.html            # canvas + <script type="module" src="js/main.js">
└── js/
    ├── main.js           # entry: builds the game + GameMachine, calls init() and start()
    ├── <Name>Game.js     # the game class (update/draw/init) and collision logic
    ├── globalVariables.js# exported constants: key codes, sizes, speeds, colors
    └── *.js              # entity classes (Ball, Paddle, Block, SnakeHead, Food, ...)
```

The landing page [src/index.html](src/index.html) links to each game. When adding a game, follow this exact structure and add it to the landing page list.

## Conventions

- ES modules everywhere; imports include the `.js` extension (enforced by `import-x/extensions`).
- No semicolons, 2-space indent, max line length 140 — enforced by [eslint.config.js](eslint.config.js); run `npm run lint` before committing.
- Per-game constants live in that game's `globalVariables.js`; shared engine code goes in `src/common/`.
- No build step and no test suite — verify changes by running `npm start` and playing the game.
