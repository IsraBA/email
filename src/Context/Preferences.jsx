import { create } from 'zustand';

const usePreferences = create((set) => ({
    darkMode: localStorage.darkMode ? JSON.parse(localStorage.darkMode) : false,
    toggleDarkMode: () => set((state) => {
        const darkMode = !state.darkMode;
        localStorage.darkMode = darkMode;
        return { darkMode }
    }),

    siteColor: localStorage.siteColor || 'purple',
    colorOptions: {
        purple: ['#7d49ed', '#8b5ded', { light: '#e5dff4', dark: '#48415a' }],
        red: ['#ed4949', '#f05959', { light: '#f7e1e1', dark: '#573e3e' }],
        blue: ['#4959ed', '#5564ed', { light: '#d3d6f2', dark: '#3a3d4f' }],
        green: ['#49ed64', '#5cf275', { light: '#dff5e2', dark: '#3b523f' }],
        yellow: ['#e5ed49', '#e8f059', { light: '#f6f7e1', dark: '#53543d' }],
        orange: ['#ed9049', '#f29c5a', { light: '#f5e8df', dark: '#52453b' }],
        cyan: ['#49ede8', '#5aede9', { light: '#dcf2f2', dark: '#384f4e' }],
        magenta: ['#ed4993', '#f05d9f', { light: '#f2dce6', dark: '#4f3842' }]
    },
    toggleSiteColor: (color) => set((state) => {
        const siteColor = color;
        localStorage.siteColor = siteColor;
        return { siteColor }
    }),
}))

export default usePreferences;