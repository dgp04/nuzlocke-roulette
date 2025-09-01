# 🎮 Nuzlocke Roulette

A modern, interactive roulette wheel designed specifically for Pokémon Nuzlocke challenges. This web application helps trainers add an extra layer of difficulty and unpredictability to their Nuzlocke runs through customizable penalty rules.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Roulette Wheel**: Smooth spinning animation with realistic physics
- **Customizable Rules**: Edit, add, or remove penalty rules (3-12 rules supported)
- **Smart Activation System**: Roulette only activates when specific conditions are met
- **Automatic Reset**: Counters reset automatically after spinning

### 🌺 Game Mode Support
- **Classic Mode**: Traditional gym-based progression
- **Gen 7 (Alola) Mode**: Island Trial system with Trials and Kahunas
- **Dynamic UI**: Colors and counters adapt based on selected mode

### 📊 Progress Tracking
- **Route Counter**: Tracks completed routes (activates at 3)
- **Gym/Trial Counter**: Monitors gym victories or trial completions
- **Death Counter**: Records Pokémon losses (activates at 1)
- **Visual Indicators**: Clear progress display with status messages

### 🎨 User Experience
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Real-time Editing**: Modify rules with instant visual feedback
- **Smooth Animations**: Polished transitions and hover effects
- **Accessibility**: Screen reader friendly with proper ARIA labels

### 📋 Additional Features
- **Update History**: Built-in changelog modal
- **Rule Persistence**: Automatic saving of custom rules

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nuzlocke-roulette.git
   cd nuzlocke-roulette
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm start
```

## 🎲 How to Use

### Basic Usage
1. **Set Your Progress**: Use the counter buttons to track your current progress
   - Routes: Click "+Route Completed" for each route finished
   - Gyms/Trials: Click the appropriate button for victories
   - Deaths: Record Pokémon losses as they occur

2. **Activate the Roulette**: The wheel becomes active when you meet any condition:
   - Complete 3 routes
   - Defeat 1 gym leader (Classic) or 1 Kahuna/1 Trial (Gen 7)
   - Lose 1 Pokémon

3. **Spin and Apply**: Click "🎯 Tirar Ruleta" to spin and receive your penalty

### Customization
1. **Edit Rules**: Click "✏️ Editar Reglas" to modify existing rules
2. **Add New Rules**: Use the "+ Añadir" button (max 12 rules)
3. **Remove Rules**: Delete unwanted rules (min 3 rules required)
4. **Restore Defaults**: Use "🔄 Restaurar" to reset to original rules

### Gen 7 Mode
1. **Enable Gen 7**: Toggle the switch to use Gen 7 conditions
2. **Switch Counters**: Use the Trials/Kahunas selector
3. **Different Requirements**: 1 Trial    or 1 Kahuna needed to activate

## 🛠️ Technology Stack

- **Framework**: React 18.+
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Animations**: CSS Transitions
- **Storage**: localStorage (browser-based)

## 🎨 Customization

### Adding New Rules
Rules follow this structure:
```javascript
{
  titulo: "🔥 Rule Title",
  descripcion: "Detailed description of the penalty effect"
}
```

### Color Scheme
The roulette uses a predefined color palette that can be modified in the `colores` array:
```javascript
const colores = [
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#10b981", // Green
  // ... add more colors
]
```

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Add comments for complex logic
3. Test on multiple screen sizes
4. Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Pokémon Nuzlocke community
- Built with modern web technologies
- Designed for trainers, by trainers

## 📞 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Check the update history in the app
- Review the documentation
- Contact developers in the mailto link at the end of update history

## 🔄 Version History

- **v1.2**: Customizable life counter
- **v1.1**: Gen 7 (Alola) mode support
- **v1.0.1**: Complete UI redesign and responsiveness
- **v1.0.0**: Initial release with basic roulette functionality and counter system implementation

---

**Happy Nuzlocking! 🎮✨**

*May your runs be challenging and your Pokémon survive the roulette!*
