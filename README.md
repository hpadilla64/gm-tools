# GM Tools

A set of simple tools for Game Masters running a Pathfinder RPG game. It runs in the browser, with no server or account needed.

## Tools

- **Encounter Calculator**: Add your party and enemies with their levels, pick the encounter difficulty and terrain, and see the XP budget, the encounter CR, the XP each character earns, and a suggested loot value.
- **Basic Item Creator**: Build a magic weapon or ammo by choosing the item type, its bonus (+1 to +5), and any special abilities. It shows the item's price and how many bonus slots are left.
- **Initiative Tracker**: Add the characters in your combat, enter their initiative rolls, and drag them to reorder the turn order.

## Requirements

- [Node.js](https://nodejs.org/) 22.15 or newer (the project includes a `.nvmrc` set to Node 24, so `nvm use` picks it up)
- npm (installed with Node)

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:9000 in your browser. The page reloads when you edit the source files.

## Scripts

| Command             | What it does                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `npm start`         | Starts the development server on port 9000                            |
| `npm run build`     | Type-checks the code and builds the production bundle into `out/`     |
| `npm run typecheck` | Type-checks the code with TypeScript, without building                |

To use the tools offline or host them yourself, run `npm run build` and serve the `out/` folder with any static file server.

## Project structure

```
src/
  app/            Entry point that mounts the app
  components/     The screens: App shell, encounterCalculator, itemsCreator, initiativeTracker
  data/           Rules tables and calculations (XP, CR, APL, weapon prices and abilities)
  interfaces/     TypeScript types shared across the app
  styles/         Less stylesheets
  tools/          Small helpers and lookup maps
  index.html      HTML template
```

## Tech stack

- React 19 and TypeScript
- Ant Design 6 for the interface
- Webpack 5, with SWC for compiling TypeScript and Less for styles

## Notes

- The rules data in `src/data/` follows the Pathfinder RPG rules. Check it against your rulebook before relying on a number in a session.
- This is an unofficial fan tool. Pathfinder is a trademark of Paizo Inc., and this project is not affiliated with or endorsed by Paizo.

## License

ISC
