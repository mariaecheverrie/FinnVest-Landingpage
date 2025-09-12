#!/bin/bash

# Script de Despliegue Rápido - FinnVest Website
# Este script te ayuda a desplegar tu sitio web rápidamente

echo "🚀 Script de Despliegue - FinnVest Website"
echo "=========================================="

# Verificar que estemos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo "❌ Error: No se encontró index.html"
    echo "   Asegúrate de estar en el directorio correcto del proyecto"
    exit 1
fi

# Verificar que Supabase esté configurado
if [ ! -f "supabase-config.js" ]; then
    echo "❌ Error: No se encontró supabase-config.js"
    echo "   Ejecuta: cp supabase-config.example.js supabase-config.js"
    echo "   Y configura tus credenciales de Supabase"
    exit 1
fi

echo "✅ Archivos principales encontrados"
echo ""

# Opciones de despliegue
echo "Selecciona tu plataforma de despliegue:"
echo "1. GitHub Pages (Gratis, automático)"
echo "2. Netlify (Recomendado - Gratis, fácil)"
echo "3. Vercel (Gratis, rápido)"
echo "4. Firebase Hosting (Gratis, Google)"
echo "5. Solo preparar para despliegue manual"
echo ""

read -p "Ingresa tu opción (1-5): " choice

case $choice in
    1)
        echo "📚 Configurando GitHub Pages..."
        echo ""
        echo "Pasos manuales:"
        echo "1. Ve a tu repositorio en GitHub"
        echo "2. Settings > Pages"
        echo "3. Source: Deploy from a branch"
        echo "4. Branch: main"
        echo "5. Folder: / (root)"
        echo "6. Save"
        echo ""
        echo "Tu sitio estará en: https://mariaecheverrie.github.io/Finnvest-Website"
        ;;
    2)
        echo "🌐 Configurando Netlify..."
        echo ""
        echo "Pasos manuales:"
        echo "1. Ve a netlify.com y crea una cuenta"
        echo "2. New site from Git"
        echo "3. Conecta tu repositorio de GitHub"
        echo "4. Build command: (dejar vacío)"
        echo "5. Publish directory: ."
        echo "6. Deploy site"
        echo ""
        echo "Después configura las variables de entorno:"
        echo "- SUPABASE_URL: $(grep -o "https://[^']*" supabase-config.js | head -1)"
        echo "- SUPABASE_ANON_KEY: (tu clave anónima)"
        ;;
    3)
        echo "⚡ Configurando Vercel..."
        echo ""
        echo "Pasos manuales:"
        echo "1. Ve a vercel.com y crea una cuenta"
        echo "2. New Project"
        echo "3. Importa tu repositorio de GitHub"
        echo "4. Framework Preset: Other"
        echo "5. Deploy"
        ;;
    4)
        echo "🔥 Configurando Firebase Hosting..."
        echo ""
        echo "Pasos manuales:"
        echo "1. Instala Firebase CLI: npm install -g firebase-tools"
        echo "2. firebase login"
        echo "3. firebase init hosting"
        echo "4. firebase deploy"
        ;;
    5)
        echo "📦 Preparando archivos para despliegue manual..."
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

echo ""
echo "🔧 Verificaciones previas al despliegue:"
echo ""

# Verificar que todos los archivos necesarios estén presentes
files=("index.html" "styles.css" "script.js" "supabase-config.js" "logo.png" "finnvest.png" "landing.png")
missing_files=()

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (faltante)"
        missing_files+=("$file")
    fi
done

echo ""

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "⚠️  Archivos faltantes: ${missing_files[*]}"
    echo "   Asegúrate de tener todos los archivos antes del despliegue"
    echo ""
fi

# Verificar configuración de Supabase
if grep -q "YOUR_SUPABASE_URL" supabase-config.js; then
    echo "⚠️  Supabase no está configurado completamente"
    echo "   Edita supabase-config.js con tus credenciales reales"
    echo ""
else
    echo "✅ Supabase configurado correctamente"
    echo ""
fi

# Preparar para Git
echo "📝 Preparando para Git..."
echo ""

# Verificar estado de Git
if [ -d ".git" ]; then
    echo "Git repository encontrado"
    
    # Verificar si hay cambios sin commitear
    if [ -n "$(git status --porcelain)" ]; then
        echo "Cambios detectados. ¿Quieres hacer commit?"
        read -p "¿Hacer commit de los cambios? (y/n): " commit_choice
        
        if [ "$commit_choice" = "y" ] || [ "$commit_choice" = "Y" ]; then
            git add .
            read -p "Mensaje del commit: " commit_message
            git commit -m "$commit_message"
            echo "✅ Commit realizado"
        fi
    else
        echo "✅ No hay cambios pendientes"
    fi
    
    # Preguntar si hacer push
    echo ""
    read -p "¿Hacer push a GitHub? (y/n): " push_choice
    
    if [ "$push_choice" = "y" ] || [ "$push_choice" = "Y" ]; then
        git push origin main
        echo "✅ Push realizado"
    fi
else
    echo "❌ No se encontró repositorio Git"
    echo "   Ejecuta: git init && git remote add origin <tu-repositorio>"
fi

echo ""
echo "🎉 ¡Listo para desplegar!"
echo ""
echo "📚 Recursos adicionales:"
echo "- DEPLOYMENT_GUIDE.md - Guía completa de despliegue"
echo "- SUPABASE_SETUP.md - Configuración de Supabase"
echo "- README.md - Documentación del proyecto"
echo ""
echo "🔗 URLs útiles:"
echo "- Netlify: https://netlify.com"
echo "- Vercel: https://vercel.com"
echo "- Firebase: https://firebase.google.com"
echo "- GitHub Pages: https://pages.github.com"
echo ""
echo "¡Buena suerte con tu despliegue! 🚀" 