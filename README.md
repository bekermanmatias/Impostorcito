# 🎭 El Impostor - Juego Social

Una Web App del juego social "El Impostor" (estilo Spyfall o Undercover) diseñada para jugar en grupo pasando un solo celular.

## 🎮 Características

- **4 Pantallas principales**: Lobby, Reparto de Roles, Partida y Revelación
- **Animaciones fluidas**: Tarjetas con efecto flip usando Framer Motion
- **Diseño Mobile-First**: Interfaz optimizada para móviles con botones grandes
- **Tema oscuro/misterioso**: Colores púrpura, negro y neón
- **Temporizador**: Cuenta regresiva configurable (3, 5, 7 o 10 minutos)
- **Confetti**: Celebración visual al final del juego
- **Múltiples categorías**: Animales, Comida, Lugares, Profesiones, Deportes, Tecnología

## 🚀 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador o dispositivo móvil.

## 🎯 Cómo Jugar

1. **Configuración (Lobby)**:
   - Agrega al menos 3 jugadores
   - Selecciona una categoría o elige "Aleatoria"
   - Elige la cantidad de impostores (1 o 2)
   - Configura el tiempo de partida
   - Presiona "COMENZAR"

2. **Reparto de Roles**:
   - Pasa el teléfono a cada jugador
   - Cada jugador presiona "Soy [Nombre], ver mi rol"
   - La tarjeta se voltea revelando:
     - **Ciudadano**: Ve la palabra secreta
     - **Impostor**: Ve "ERES EL IMPOSTOR" (sin la palabra)
   - Presiona "Ocultar y pasar al siguiente"

3. **La Partida**:
   - El temporizador comienza a contar
   - Los jugadores discuten y deducen quién es el impostor
   - Presiona "¡Votar / Terminar!" cuando estén listos

4. **Revelación**:
   - Se muestra la palabra secreta
   - Se revelan los impostores
   - Confetti celebra el final
   - Presiona "Jugar de Nuevo" para otra ronda

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** (Mobile-First)
- **Framer Motion** (Animaciones)
- **Lucide React** (Íconos)
- **Canvas Confetti** (Efectos visuales)

## 📱 Diseño

- Interfaz optimizada para móviles
- Botones grandes para fácil interacción
- Tema oscuro con colores neón
- Animaciones suaves y fluidas
- Experiencia de "tapar la pantalla" para privacidad

## 📝 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal (router de pantallas)
│   └── globals.css          # Estilos globales
├── components/
│   ├── LobbyScreen.tsx     # Pantalla de configuración
│   ├── RoleDistributionScreen.tsx  # Reparto de roles con flip
│   ├── GameScreen.tsx      # Pantalla de partida con temporizador
│   └── RevealScreen.tsx    # Pantalla de revelación con confetti
└── data.ts                 # Base de datos local (categorías y palabras)
```

## 🎨 Personalización

Puedes agregar más categorías y palabras editando el archivo `data.ts`:

```typescript
export const gameData: GameData = {
  TuCategoría: ["Palabra1", "Palabra2", ...],
  // ...
};
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

¡Disfruta jugando El Impostor! 🎭
