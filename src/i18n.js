import { createI18n } from 'vue-i18n'
import ar from './locales/ar.json'
import fr from './locales/fr.json'
import en from './locales/en.json'

function loadLocaleMessages() {
    const locales = [{ en: en },{fr:fr},{ar:ar}]
    const messages = {}
    locales.forEach(lang => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

export default createI18n({
    legacy:false,
    locale: 'fr',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
})