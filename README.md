# FinnVest Website

A modern, responsive landing page for FinnVest - a financial education platform that teaches users about investments, taxes, and financial planning through interactive lessons and gamified learning.

## 🌟 Features

- **Bilingual Support**: English and Spanish language switching
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Elements**: Scroll-reveal animations, hover effects, and smooth transitions
- **Waitlist System**: Real-time database integration with Supabase for lead generation
- **Email Validation**: Duplicate email detection and format validation
- **Modern UI**: Glass morphism effects, gradients, and 3D elements
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Live Demo

[Add your live website URL here]

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript**: Vanilla JS for interactivity and language switching
- **Supabase**: Backend database for waitlist management
- **Font Awesome**: Icons
- **Google Fonts**: Nunito font family

## 📁 Project Structure

```
FinnVest-Website/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality
├── supabase-config.js      # Supabase configuration and functions
├── supabase-config.example.js  # Example configuration file
├── SUPABASE_SETUP.md       # Supabase setup instructions
├── logo.png                # Company logo
├── finnvest.png            # Platform logo
├── landing.png             # Hero section image
└── README.md               # This file
```

## 👥 Collaboration Guide

### Prerequisites

- Git installed on your machine
- GitHub account
- Code editor (VS Code, Cursor, etc.)

### Initial Setup (First Time Only)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mariaecheverrie/Finnvest-Website.git
   cd Finnvest-Website
   ```

2. **Configure Supabase** (required for waitlist functionality):
   ```bash
   # Copy the example configuration
   cp supabase-config.example.js supabase-config.js
   
   # Edit supabase-config.js with your Supabase credentials
   # See SUPABASE_SETUP.md for detailed instructions
   ```

3. **Open in your preferred editor:**
   ```bash
   code .  # For VS Code
   # or open with Cursor, Sublime Text, etc.
   ```

4. **Start a local server** (optional but recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

### Daily Workflow

#### Before Starting Work (Always do this first!)

```bash
# Pull the latest changes from GitHub
git pull origin main
```

#### Making Changes

1. **Create a new branch** (recommended for features):
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. **Make your changes** in your code editor

3. **Test your changes** by opening the website in your browser

4. **Stage your changes:**
   ```bash
   git add .
   # or add specific files:
   git add index.html styles.css script.js
   ```

5. **Commit your changes:**
   ```bash
   git commit -m "Add new waitlist feature"
   git commit -m "Fix mobile responsive design"
   git commit -m "Update Spanish translations"
   ```

6. **Push your changes:**
   ```bash
   # If you're on a feature branch:
   git push -u origin feature/your-feature-name
   
   # If you're on main branch:
   git push
   ```

#### When Others Make Changes

```bash
# Pull the latest changes
git pull origin main

# If you have local changes that conflict:
git stash
git pull origin main
git stash pop
```

### Best Practices

#### Commit Messages
Use clear, descriptive commit messages:
- ✅ `"Add bilingual support for Spanish"`
- ✅ `"Fix mobile navigation menu"`
- ✅ `"Update hero section copy"`
- ❌ `"fix stuff"`
- ❌ `"updates"`

#### Branch Naming
Use descriptive branch names:
- `feature/waitlist-form`
- `fix/mobile-layout`
- `update/translations`
- `style/button-design`

#### File Organization
- Keep CSS organized by sections
- Use consistent naming conventions
- Comment your code when necessary

### Common Tasks

#### Adding New Features
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with descriptive message
5. Push to GitHub
6. Create a Pull Request (if working with a team)

#### Fixing Bugs
1. Create a fix branch
2. Identify and fix the issue
3. Test the fix
4. Commit with clear description
5. Push and merge

#### Updating Content
1. Pull latest changes
2. Update content in HTML
3. Test on different screen sizes
4. Commit and push

### Troubleshooting

#### Merge Conflicts
If you get merge conflicts:
```bash
# See which files have conflicts
git status

# Open conflicted files and resolve manually
# Look for <<<<<<< HEAD, =======, and >>>>>>> markers

# After resolving:
git add .
git commit -m "Resolve merge conflicts"
git push
```

#### Undoing Changes
```bash
# Undo last commit (keep changes):
git reset --soft HEAD~1

# Undo last commit (discard changes):
git reset --hard HEAD~1

# Undo uncommitted changes:
git checkout -- filename
```

#### Checking Status
```bash
# See current status:
git status

# See recent commits:
git log --oneline

# See branch information:
git branch -a
```

## 🌐 Deployment

### 🚀 Despliegue Rápido (Recomendado)

**Para Windows:**
1. Lee `DEPLOYMENT_WINDOWS.md` para instrucciones específicas
2. Ejecuta `./deploy.sh` (si tienes Git Bash) o sigue las instrucciones manuales

**Opciones de Despliegue Gratuito:**

#### 1. Netlify (Más Fácil)
- ✅ Despliegue automático desde GitHub
- ✅ HTTPS automático
- ✅ Dominio personalizado gratuito
- 📖 Ver `DEPLOYMENT_GUIDE.md` para instrucciones detalladas

#### 2. GitHub Pages (Directo)
- ✅ Totalmente gratuito
- ✅ Integrado con GitHub
- Tu sitio en: `https://mariaecheverrie.github.io/Finnvest-Website`

#### 3. Vercel (Muy Rápido)
- ✅ Despliegue automático
- ✅ Excelente rendimiento
- ✅ HTTPS automático

### 📁 Archivos de Configuración Incluidos
- `netlify.toml` - Configuración para Netlify
- `deploy.sh` - Script de despliegue automático
- `DEPLOYMENT_GUIDE.md` - Guía completa
- `DEPLOYMENT_WINDOWS.md` - Guía específica para Windows

## 📞 Support

For questions or issues:
- **Repository Issues**: Create an issue on GitHub
- **Email**: [Add your email]
- **Team Chat**: [Add your team communication channel]

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a Pull Request

## 📄 License

[Add your license information here]

---

**Happy coding! 🚀**

*Remember: Always pull before you push, and communicate with your team about major changes.* 