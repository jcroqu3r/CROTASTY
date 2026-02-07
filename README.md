# CROTASTY - Website con SCSS

## 📋 Requisitos previos

Para compilar los archivos SCSS a CSS, necesitas tener instalado Node.js:

1. **Descargar Node.js**: https://nodejs.org/
2. **Instalar Node.js** (elige la versión LTS recomendada)
3. **Verificar instalación** abriendo PowerShell y ejecutando:
   ```powershell
   node --version
   npm --version
   ```

## 🚀 Instalación

Una vez instalado Node.js, ejecuta en PowerShell desde la carpeta del proyecto:

```powershell
npm install
```

Esto instalará SASS automáticamente.

## 🎨 Compilación de SCSS a CSS

### Opción 1: Compilar una vez
```powershell
npm run sass
```

### Opción 2: Compilar automáticamente al guardar cambios
```powershell
npm run sass:watch
```
Deja esta terminal abierta mientras trabajas. Cada vez que guardes un archivo `.scss`, se compilará automáticamente.

### Opción 3: Compilar para producción (minificado)
```powershell
npm run sass:build
```

## 📁 Estructura de archivos SCSS

```
styles/
├── scss/
│   ├── _variables.scss     # Colores, fuentes, breakpoints
│   ├── _mixins.scss         # Funciones reutilizables
│   ├── _animations.scss     # Animaciones keyframe
│   ├── _base.scss           # Reset y estilos base
│   ├── _header.scss         # Header y navegación
│   ├── _hero.scss           # Secciones hero
│   ├── _platos.scss         # Página de platos
│   ├── _recetas.scss        # Página de recetas
│   ├── _tips.scss           # Página de tips
│   ├── _contacto.scss       # Página de contacto
│   ├── _footer.scss         # Footer
│   ├── _responsive.scss     # Media queries
│   └── style.scss           # Archivo principal (importa todo)
└── style.css                # Archivo compilado (no editar)
```

## ⚙️ Características SCSS utilizadas

- ✅ **Variables**: `$brand-ochre`, `$ff-serif`, `$bp-mobile`, etc.
- ✅ **Nesting**: Selectores anidados para mejor organización
- ✅ **Mixins**: `@include flex-center`, `@include mobile`, etc.
- ✅ **@extend**: `%button-base` para estilos compartidos
- ✅ **Operadores**: Cálculos con variables (`$base-spacing * 2`)
- ✅ **Animaciones avanzadas**: fadeIn, slideUp, hover effects
- ✅ **Transiciones**: smooth transitions en todos los elementos interactivos

## 🎭 Animaciones implementadas

- **fadeIn**: Aparición gradual con movimiento vertical
- **slideUp**: Entrada desde abajo
- **slideInLeft/Right**: Entrada lateral
- **Hover effects**: Escala, transformaciones, sombras
- **Transiciones**: En enlaces, botones, imágenes, formularios

## 📝 Cómo editar estilos

1. **NO edites** `styles/style.css` directamente
2. **Edita** los archivos en `styles/scss/`
3. **Compila** con `npm run sass:watch`
4. Los cambios se reflejarán automáticamente en `style.css`

## 🌐 GitHub Pages

El sitio está publicado en GitHub Pages. Para actualizar:

```powershell
git add .
git commit -m "Actualización SCSS"
git push origin main
```

Espera 1-2 minutos para que GitHub Pages actualice el sitio.

## 🔧 Troubleshooting

**Problema**: "npm no se reconoce"
- **Solución**: Instala Node.js desde https://nodejs.org/

**Problema**: Los cambios SCSS no se reflejan
- **Solución**: Asegúrate de tener `npm run sass:watch` ejecutándose

**Problema**: Error al compilar SCSS
- **Solución**: Verifica la sintaxis en los archivos `.scss`

## 📚 Documentación

- **SASS**: https://sass-lang.com/documentation/
- **Bootstrap**: https://getbootstrap.com/docs/5.3/
- **Google Fonts**: https://fonts.google.com/
