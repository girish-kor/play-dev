# PLAYDEV: The Premier React UI Component Library for Game Development

<div align="left">
  <br />
  <a href="#quickstart"><strong>Get Started</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#features"><strong>Features</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#documentation"><strong>Documentation</strong></a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#contributing"><strong>Contribute</strong></a>
  <br />
  <br />
</div>

![PlayDev](./banner.png)

**PLAYDEV** is a comprehensive, mature, and enterprise-grade React component system designed for building immersive game interfaces. It provides over 60+ production-ready components, powerful hooks, and a strict separation of concerns between runtime game UI (PlayMode) and development tooling (DevMode).

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/playdev)
[![license](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)
[![types](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## Why PLAYDEV?

Building a game's UI in React often means reinventing the wheel—creating health bars, inventory grids, dialogue systems, and debug overlays for each new project. PLAYDEV eliminates this repetitive work by offering a suite of **battle-tested, accessible, and highly customizable components**, allowing you to focus on your game's unique mechanics and content.

- **PlayMode & DevMode**: A strict architectural split ensures that debug components (inspector, console) are never bundled into your production game.
- **Theming**: A centralized `DesignTokens` system via `ThemeProvider` allows for complete visual rebranding with minimal effort.
- **React & TypeScript**: Built with modern React and fully typed with TypeScript for an exceptional developer experience and robust code.
- **Accessible**: All components are built with accessibility in mind, including focus management, ARIA attributes, and screen reader support.
- **Game Agnostic**: Works seamlessly with any game engine, rendering library, or state management solution.

## Features

- **Comprehensive Component Library**: Over 60 components across categories like:
  - **HUD**: `HealthBar`, `ManaBar`, `StaminaBar`, `MiniMap`, `QuestTracker`
  - **Menus & Overlays**: `MainMenu`, `PauseMenu`, `Modal`, `ConfirmationDialog`
  - **Inventory & Equipment**: `InventoryGrid`, `InventorySlot`, `EquipmentPanel`
  - **Multiplayer**: `PartyPanel`, `ChatBox`
  - **Developer Tools**: `DebugConsole`, `DevInspector`, `PerformanceMonitor`
- **Powerful Custom Hooks**: 26 hooks for common game needs, including `useGameState`, `useKeybind`, `useScreenShake`, `useTyping`, and `useInfiniteScroll`.
- **Context Providers**: `ThemeProvider`, `GameStateProvider`, and `SettingsProvider` for managing global state and configuration.
- **Full TypeScript Support**: Comprehensive type definitions for all components and hooks.
- **Optimized Build**: Dual CJS/ESM builds, tree-shakeable, and optimized for performance.

## Installation

Install the package along with its peer dependencies:

```bash
npm install playdev react react-dom styled-components
# or
yarn add playdev react react-dom styled-components
```

## Quickstart

Get a health bar and button on screen in seconds:

```tsx
import React from 'react';
import { ThemeProvider, GameStateProvider, HealthBar, Button } from 'playdev';

const App = () => {
  return (
    <ThemeProvider>
      <GameStateProvider>
        {/* HUD Component */}
        <HealthBar current={72} max={100} showText animated />

        {/* Action Button */}
        <Button variant="primary" size="large">
          Attack
        </Button>
      </GameStateProvider>
    </ThemeProvider>
  );
};

export default App;
```

This renders a themed health bar and primary button without any additional CSS configuration.

## Documentation

For a complete list of components, hooks, and their APIs, please refer to the detailed [Document.md](./Document.md) file.

## Testing

PLAYDEV is extensively tested using Jest and React Testing Library.

```bash
npm test
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/girish-kor/playdev/blob/main/CONTRIBUTING.md) for more details.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

Please ensure you run `npm run ci` before submitting to confirm everything is in order.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Built with [React](https://reactjs.org/) and [Styled Components](https://styled-components.com/).
- Package development and building powered by [tsup](https://tsup.egoist.dev/).
