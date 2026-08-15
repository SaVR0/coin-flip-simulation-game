# Coin Flip Simulation Game

An educational mobile game developed to demonstrate concepts of digital simulation through an interactive coin-flipping experience.

## Overview

The **Coin Flip Simulation Game** is a mobile application developed as an educational project focused on digital simulation.

The application uses a coin-flipping game to demonstrate how random events can be represented and simulated through software.

Instead of presenting simulation concepts only through theory, the project provides an interactive experience where users can participate in a simple game based on random outcomes.

The project was developed as part of a Digital Simulation project and focuses on applying programming concepts related to randomness, probability, and simulation in a mobile application.

## Features

### Coin Flip Game

The application provides an interactive coin-flipping experience where the result of each flip is determined programmatically.

The game allows users to interact with the simulation and observe the generated outcomes.

### Simulation

The application demonstrates how a random event can be represented computationally.

Each coin flip represents a simulated random event with two possible outcomes:

- Heads
- Tails

The simulation can be used to observe how repeated random events produce different sequences of results.

### Mobile Interface

The application was developed as a mobile application using Expo and React Native.

The interface is designed to provide a simple and interactive experience focused on the coin-flipping game.

## Simulation Concepts

The project demonstrates several fundamental concepts related to digital simulation and probability.

### Random Events

A coin flip can be represented as a random experiment with two possible outcomes.

```text
Coin Flip
   │
   ├── Heads
   │
   └── Tails
```

## Repeated Simulation

By performing multiple coin flips, the application can generate a sequence of random outcomes that can be analyzed as part of a simulation process.


```bash
Flip 1 → Heads
Flip 2 → Tails
Flip 3 → Tails
Flip 4 → Heads
Flip 5 → Heads
...
```

The project demonstrates how simple random events can be implemented as the foundation of a larger simulation system.

## Technologies

| Technology | Purpose |
|------------|---------|
| React Native | Mobile application development |
| Expo | Development framework and tooling for React Native |
| JavaScript / TypeScript | Application logic |
| CSS / React Native Styling | User interface styling |

## Project Structure

The project follows the standard Expo application structure and uses file-based routing.

```bash
coin-flip-simulation-game/
│
├── app/
├── assets/
├── .vscode/
├── app.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── ...
```

## Getting Started

### Requirements

- Node.js
- npm
- Expo
- Android emulator, iOS simulator, or a physical mobile device
  
### Installation

1. Clone the repository:
```bash
git clone https://github.com/SaVR0/coin-flip-simulation-game.git
```
2. Move into the project directory:
```bash
cd coin-flip-simulation-game
```
3. Install the project dependencies:
```bash
npm install
```
4. Start the Expo development server:
```bash
npx expo start
```
5. Open the application using one of the available development options:

- Android emulator
- iOS simulator
- Physical mobile device
- Expo Go

## How It Works

The application represents a coin flip as a random event with two possible outcomes.

The general simulation process can be represented as:

```text
User Interaction
       │
       ▼
Generate Random Outcome
       │
       ▼
 ┌───────────────┐
 │               │
 ▼               ▼
Heads           Tails
 │               │
 └───────┬───────┘
         ▼
   Display Result

```

Each interaction generates a new simulated outcome and displays the result through the mobile interface.

By repeating the experiment, users can observe how random events produce different sequences of outcomes.

## Project Status

The application is functional as an educational digital simulation project.

The main objective of the project is to demonstrate the implementation of random events and probability concepts through an interactive mobile experience.

The project can still be improved in terms of visual design, user experience, simulation analysis, and additional functionality.

## Future Improvements

Potential improvements for future versions include:

- Adding a history of previous coin flips
- Displaying heads and tails statistics
- Adding simulation counters
- Visualizing the distribution of results
- Adding configurable numbers of coin flips
- Improving the user interface and animations
- Adding additional simulation experiments
- Adding statistical analysis of simulation results
- Improving application performance and maintainability

## Screenshots

*The following screenshots showcase the main interfaces and interactions of the application.*

### Home / Main Screen
<img width="200" alt="home_game" src="https://github.com/user-attachments/assets/a49c39dd-f212-4f57-a5d0-5e03cd9f0f0a" />

### Coin Flip
<img width="200" alt="coin" src="https://github.com/user-attachments/assets/51bf54c6-1543-421e-b1be-91daf33cc9a6" />

### Simulation Result
<img width="200" alt="result" src="https://github.com/user-attachments/assets/c18867c6-cf67-4ffd-9208-becf0dc7e250" />

### Game Interface
<img width="200" alt="interface" src="https://github.com/user-attachments/assets/ce88958e-b472-43f4-ae6a-176cf2d0584d" />

## Author

### Sergio Velaides
GitHub
https://github.com/SaVR0
https://github.com/SaVR0
