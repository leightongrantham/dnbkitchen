## Getting Started

You'll need the latest versions of the following installed on your system:

* [Node.js](https://nodejs.org/en/)
* [Gulp](http://gulpjs.com/)

Once your system is setup with the above, navigate to the cloned repo and install project dependencies:

```javascript
npm install
```

## Project Tasks

The following Gulp task launches a local server via BrowserStack that will watch for any changes to your assets and automatically compile as well as refreshing your browser:

```javascript
gulp watch
```

You can compile any templates, js and css and copy static assets by running the build script:

```javascript
npm run build
gulp build
```

The former should be used when building for production. It sets the Node environment to 'production' via ```NODE_ENV=production``` and minifies the compiled output.

Alternatively the latter can be used with or without the flag ```--production```

As the build folder contents will become outdated with updates it's a good idea to purge everything periodically so you're working from a clean slate. To do this run the following task to delete all the contents listed in the ```tidy``` array set in ```gulpfile.babel.js```

```javascript
gulp clean
```

Make sure to then run the ```gulp build``` task to rebuild all the required assets.

## Testing

[Mocha](https://mochajs.org/) testing framework and the [Chai](http://chaijs.com/) assertion library are included in the boilerplate.

There are a number of example tests covering the generic library functions ```src/scripts/functions/index.js```

```javascript
npm run test
```

* [Ultimate Unit Testing Cheatsheet](https://gist.github.com/yoavniran/1e3b0162e1545055429e)

## Linting

Before compilation JavaScript is linted by ESLint using ```eslint-config-airbnb-base```. Any linting errors must be fixed before the bundle will compile successfully.

CSS is also linted via stylelint in the same manner as above.

* [ESLint](https://eslint.org/)
  * [Rules](https://eslint.org/docs/rules/)
* [stylelint](https://stylelint.io/)
  * [Rules](https://stylelint.io/user-guide/rules/)
