# library-to-build-forms

## Major tech used

- React
- Storybook [link](https://storybook.js.org/)
- MaterialUI

## Simple instructions

1. yarn
2. yarn run languages:build -> On windows this gave issues if you don't use a Linux WSL2 instance (Optional to us the new windows terminal)
3. yarn run storybook

**NOTE**
The project doesn't start with `yarn start` above instruction are the way!

## Known Issues

- FormatJS was implemnted as minimum working implemntation but that not optimal
- FormatJS is not fully implemnted as at this time there are issues on passing dynamically the messages (E.G. the project should support more localse and change the messages based on it like now we have EN as default but if I change to IT I shuld see the messages in Italian)
- FormatJS implemnted on StoryBook stories in that way I can pass a different locale and see the text in that locale, so I can test StoryBook stories with the required locale aside from the default EN
- FormatJS messages are not fully extracted/compiled the reasons can be a bad FormatJS configuration or the wrongly usage of `useIntl` or `FormattedMessage`

## To do

- [ ] Use [transifex](https://www.transifex.com/) as translate vendor for Formatjs and apply the CLI [#builtin-formatters](https://formatjs.io/docs/tooling/cli/#builtin-formatters)
- [ ] Find a way to implement the workflow of FormatJS as [distribute-libraries](https://formatjs.io/docs/guides/distribute-libraries)
- [ ] FormatJS implemnted on StoryBook stories to test it with different locale
- [ ] Language and locale support aside the default locale EN


 
