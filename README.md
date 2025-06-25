# English Janala - Vocabulary Learning App

👉 [Live Demo](https://shauncuier.github.io/English-Janala/)  
👉 [GitHub Repository](https://github.com/shauncuier/English-Janala.git)

## Project Overview
English Janala is an interactive vocabulary learning platform designed to help users master English words through structured lessons. The application features multiple difficulty levels, pronunciation guides, and detailed word explanations. It also includes an educational FAQ section covering key JavaScript programming concepts.

## Features
- User authentication system
- Dynamic vocabulary loading
- Interactive word cards
- Responsive design
- Smooth navigation

## Requirements

### Core Functionality
- [x] Navbar with logo and navigation buttons
- [x] Login banner with form validation
- [x] FAQ section covering JavaScript concepts
- [x] Vocabulary section with dynamic content loading
- [x] Word details modal
- [x] Responsive footer with social links

### Challenge Requirements
- [x] Custom navigation flow
- [x] Data validation handling
- [x] Loading indicators
- [x] Smooth scrolling

## API Documentation

```bash
# Get all levels
https://openapi.programming-hero.com/api/levels/all

# Get words by level (replace {id})
https://openapi.programming-hero.com/api/level/{id}

# Get word details (replace {id}) 
https://openapi.programming-hero.com/api/word/{id}

# Get all words
https://openapi.programming-hero.com/api/words/all
```

## Installation
1. Clone the repository
```bash
git clone https://github.com/shauncuier/English-Janala.git
```
2. Install dependencies
```bash
npm install
```
3. Start development server
```bash
npm run dev
```

## Technologies Used
- HTML5, CSS3, JavaScript
- Tailwind CSS
- Web Speech API
- Fetch API

## Optional Enhancements
- SweetAlert integration
- Word pronunciation feature
- Custom Bengali font integration
