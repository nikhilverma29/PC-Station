# PC Station

PC Station is a premium, interactive custom PC configurator web application. It allows users to visually select, compare, and verify the compatibility of various PC components to build their dream rig.

## Features

- **Interactive Component Selection**: Choose from processors, motherboards, graphics cards, RAM, storage, and more.
- **Real-Time Compatibility Checking**: Automatically detects and warns about incompatible components (e.g., mismatched CPU sockets and motherboards, or inadequate power supplies).
- **Power Draw Analysis**: Calculates estimated system power consumption and recommends an appropriate power supply unit.
- **Dynamic Summary Panel**: A sticky, auto-updating summary that keeps track of the total cost and build progress.
- **Responsive Design**: Carefully crafted for both desktop and mobile devices, providing a seamless "app-like" experience across all screen sizes.
- **Sleek Aesthetic**: Features a modern, dark-themed UI with glassmorphism effects, a dynamic background, and PlayStation-inspired typography.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Shadcn UI (Component Library)

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhilverma29/PC-Station.git
   ```
2. Navigate into the project directory:
   ```bash
   cd PC-Station
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Built with a focus on component modularity and reusability.
- Global state management is handled via React Context (`ConfiguratorContext`).
- Styling is primarily handled through Tailwind CSS utility classes, with custom base styles in `index.css`.
