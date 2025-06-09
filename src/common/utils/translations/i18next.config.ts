import i18n from 'i18next'
import globalSpanish from './es/global.json'
import globalEnglish from './en/global.json'

i18n.init({
    interpolation: { escapeValue: false },
    lng: 'es',
    resources: {
        es: {
            global: globalSpanish,
        },
        en: {
            global: globalEnglish,
        },
    },
})

export default i18n
