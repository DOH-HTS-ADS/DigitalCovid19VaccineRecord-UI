# Translations

## Adding Translations

In order to add a translation to the application a directory with a `translation.json` file must be added in
`public/locales`. The directory should be named using the appropriate BCP47 code for the language. See the existing
`translation.json` files for the translated fields.

e.g. for English `public/locales/en/translation.json`
e.g. for Spanish `public/localges/es/translation.json`

This translation will be automatically applied based on the user's browser preferences.

To add languages to the language selection dropdown in the header add an entry to the 
`menuLanguages` constant in `src/components/Header.js` using the BCP47 code as the key and display text as the value.

e.g.
```javascript
const menuLanguages = {
    'am': 'Amharic - የቋንቋዎ ስም',
    'ar': 'Arabic - العربية'
}
```