# AGENTS.md

Guidance for AI agents (and humans) working on this repo.

## What this is

A collection of small browser games written in vanilla JavaScript (ES modules, no framework, no build step), rendered on an HTML `<canvas>`. A minimal Express server ([index.js](index.js)) serves the static files under `src/` for local development. Production is GitHub Pages: [.github/workflows/pages.yml](.github/workflows/pages.yml) deploys `src/` to https://jsgames.cristianofaustino.me on every push to `main` — asset paths must stay root-absolute (`/common/...`) or root-relative for both to work.

## Commands

The project uses pnpm (version pinned via `packageManager` in [package.json](package.json)).

```bash
pnpm install     # install dependencies
pnpm start       # serve on http://localhost:4000 (override with PORT)
pnpm run lint    # eslint over the whole repo
pnpm run lint:fix
```

CI ([.github/workflows/node.js.yml](.github/workflows/node.js.yml)) runs `pnpm install --frozen-lockfile` + `pnpm run lint` on Node 23.

Dependency resolution enforces a 3-day minimum release age (`minimumReleaseAge` in [pnpm-workspace.yaml](pnpm-workspace.yaml)) as a supply-chain guard — brand-new package releases are rejected until they have aged.

## Game engine

The engine lives in `src/common/` and has two pieces:

### `GameMachine.js` — the game loop

`GameMachine` runs a fixed-timestep loop on top of `requestAnimationFrame`:

- Constructed with `(game, cfg, selector)`: a game instance, a config object (`width`, `height`, optional `fps`, default 60), and a CSS selector for the target `<canvas>`.
- Each frame it accumulates elapsed wall-clock time and calls `game.update()` once per fixed step (`1000 / fps` ms) until the accumulator drains — so game logic advances at a constant rate regardless of frame rate.
- After updating, it calls `game.draw(context, accumulator)` once with the canvas 2D context.
- It sets `game.machine = this` back-reference on construction, and `start()` kicks off the loop.
- **Pause**: pressing `P` toggles PLAYING ↔ PAUSED for every game — while paused, updates stop and the machine draws a "Paused" overlay on top of the frozen frame.
- **Game over**: a game ends its round by calling `this.machine.gameOver(message)`. The machine freezes updates, draws the message in an overlay with "Press ESC to restart", and on ESC calls `game.init()` and resumes — so `init()` must fully reset the game's state (see BreakoutGame rebuilding its blocks).

A game is any class implementing this contract:

| Member | Purpose |
|--------|---------|
| `update()` | Advance game logic by one fixed step (input, movement, collisions) |
| `draw(ctx, dt)` | Render current state to the canvas 2D context |
| `init()` | Position/reset all entities; called by the game's `main.js` before the loop starts and by the machine on every ESC restart |

### `Keyboard.js` — input

A keydown/keyup listener that records pressed keys in a static map, keyed by `KeyboardEvent.code` (e.g. `'ArrowLeft'`, `'KeyW'`). It self-registers a global singleton on load (`window.GameKeyboard`); games poll input inside `update()` via `Keyboard.isDown(code)`. It also exports the `Keys` enum holding every key code the project uses — games reference `Keys.ARROW_LEFT` etc. instead of hardcoding code strings.

## Games

| Game | Path | Notes |
|------|------|-------|
| Snake | `src/games/snake/` | Arrow-key snake; eat food, grow, die on self/wall collision |
| Breakout | `src/games/breakout/` | Paddle + ball; clear the block grid |
| Pong | `src/games/pong/` | Human (arrows) vs. simple AI paddle; first to 5 points wins |

Every game follows the same layout:

```
src/games/<name>/
├── index.html            # canvas + <script type="module" src="js/main.js">
└── js/
    ├── main.js           # entry: builds the game + GameMachine, calls init() and start()
    ├── <Name>Game.js     # the game class (update/draw/init) and collision logic
    ├── globalVariables.js# exported constants: sizes, speeds, colors
    └── *.js              # entity classes (Ball, Paddle, Block, SnakeHead, Food, ...)
```

The landing page [src/index.html](src/index.html) links to each game. When adding a game, follow this exact structure and add it to the landing page list.

## Conventions

- ES modules everywhere; imports include the `.js` extension (enforced by `import-x/extensions`).
- No semicolons, 2-space indent, max line length 140 — enforced by [eslint.config.js](eslint.config.js); run `pnpm run lint` before committing.
- Per-game constants live in that game's `globalVariables.js`; shared engine code goes in `src/common/`.
- JSDoc everything: every class, method, function, and exported constant carries a doc comment (`@param`/`@returns` where they apply).
- Arrow functions everywhere: class members as `name = () => {}` fields (constructors excepted), standalone functions as `const name = () => {}`.
- No build step and no test suite — verify changes by running `pnpm start` and playing the game.
