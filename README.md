# library-to-build-forms

## Major tech used

- React
- Storybook [link](https://storybook.js.org/)
- MaterialUI
- FormatJS

## Structure of the project

- The project is a collection of libraries under the `src/lib`.
- Every folder is like a separate library and it's entry point is like `src/lib/<LIB_NAME>/<LIB_NAME.jsx>`.
- FormatJS is added as `<IntlProvider messages={enMessages} defaultLocale="en" locale="en">` under every `src/lib/<LIB_NAME>/<LIB_NAME.jsx>`.
- Under `src/stories` we have the StoryBook stories to test and develop the components. Not familiar with the tool check the link [link](https://storybook.js.org/) 

## Simple instructions

**NOTE**

To make the run without complex languages building, languages are already built in `src/compiled-lang` the only transaltion avaliable for real is for Italian in `src/compiled-lang/it.json` the other are just compiled from English bu not translated yet. 

1. yarn
3. yarn run storybook

**NOTE**

The project doesn't start with `yarn start` above instruction are the way!

## Known Issues

- FormatJS was implemnted as minimum working implemntation but that not optimal
- FormatJS is not fully implemnted as at this time there are issues on passing dynamically the messages (E.G. the project should support more localse and change the messages based on it like now we have EN as default but if I change to IT I shuld see the messages in Italian)
- FormatJS implemnted on StoryBook stories in that way I can pass a different locale and see the text in that locale, so I can test StoryBook stories with the required locale aside from the default EN
- FormatJS messages are not fully extracted/compiled the reasons can be a bad FormatJS configuration or the wrongly usage of `useIntl` or `FormattedMessage`

## To do

- [x] Use [transifex](https://www.transifex.com/) as translate vendor for Formatjs and apply the CLI [#builtin-formatters](https://formatjs.io/docs/tooling/cli/#builtin-formatters)
- [ ] Find a way to implement the workflow of FormatJS as [distribute-libraries](https://formatjs.io/docs/guides/distribute-libraries)
- [ ] FormatJS implemnted on StoryBook stories to test it with different locale
- [ ] Language and locale support aside the default locale EN


 
