// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',               // إضافة دعم الوضع الداكن عبر الكلاس
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',         // اللون الأساسي للأزرار والعناوين
        accent:  '#10B981',         // لون التمييز للتفاعلات والعناصر البارزة
        warning: '#F59E0B',         // لتحذيرات المستخدم
        danger:  '#EF4444',         // لإظهار الأخطاء والتنبيهات الحرجة
        neutral: {
          100: '#F3F4F6',           // خلفيات فاتحة
          900: '#111827'            // نص داكن
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'], // للعناوين الرئيسية
        body:    ['Roboto', 'sans-serif']   // للنص الرئيسي
      }
    }
  },
  plugins: []
};
