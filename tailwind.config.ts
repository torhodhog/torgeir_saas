import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			heading: ["var(--font-heading)", ...fontFamily.sans]
  		},
  		colors: {
  			brand: {
  				'25': '#FCF7E6', // Lys gull
  				'50': '#FAF3D9', // Lysere gull
  				'100': '#F5E8B8', 
  				'200': '#F0DB8C',
  				'300': '#EBCF61',
  				'400': '#E7C437',
  				'500': '#D4AF37', // Standard gull
  				'600': '#B8860B', // Dypere gull
  				'700': '#A37400', 
  				'800': '#805A00', 
  				'900': '#5C3F00', 
  				'950': '#3D2900'
  			},
			'discord-background': '#1E1E1E', // Mørkere for kontrast
			'discord-brand-color': '#D4AF37', // Gull
  			'discord-gray': '#1E1E1E',
  			'discord-text': '#F1C40F', // Lysere gull for tekst
  			'discord-timestamp': '#B8860B', // Dypere gull
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: '#D4AF37', // Gull som primærfarge
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#B8860B', // Dypere gull som sekundærfarge
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: '#E7C437', // Lysere gull som aksentfarge
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: '#E63946', // Rødt for destruktive handlinger
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: '#D4AF37', // Gull-glød rundt fokuserte elementer
  			chart: {
  				'1': '#D4AF37',
  				'2': '#B8860B',
  				'3': '#E7C437',
  				'4': '#F0DB8C',
  				'5': '#FAF3D9'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
