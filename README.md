# Stylus Stylesheets for GitBook

This plugin makes it easy to use Stylus custom stylesheets instead of CSS for your book.

Add it to your `book.json`, with some custom stylesheets:

```js
{
    "plugins": ["styles-stylus"],
    "styles": {
        "pdf": "./styles/pdf.styl"
    }
}
```

NOTE: This is a port of [gitbook-plugin-styles-sass](https://github.com/GitbookIO/plugin-styles-sass) for stylus.
