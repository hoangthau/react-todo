# React Todo App
## Quickstart

Download and run:

1.`yarn install`

2.`yarn start `

# immoscout24 react frontend

## Continous integration
- [Jenkins feed](http://node-jenkins.is24docker.ch/blue/organizations/jenkins/react-frontend/branches/)
- [Coverage reports](https://github.xmedia.ch/pages/Immoscout24/react-frontend/coverage/lcov-report/)

## Developing

The project is now fully ported back to npm, please don't use yarn anymore.

### Available commands

Running commands with npm `npm run [command]`

command | description
:--- | :---
`start` | Starts a development server with hot module reloading
`server` | Starts a SSR server, run `build` and `buildserver` first
`build` | Creates a production bundle of the **client**
`buildserver` | Creates a production bundle of the **server**
`test` | Opens the test suite
`test:coverage` | Generates a coverage report
`test:verbose` | Runs the test suite with advanced logging
`catalog:install` | Installs styleguide dependencies
`catalog` | Starts the styleguide
`catalog:upload` | *reserved for CI servers only*
`lint` | Syntax check
`lint:fix` | Fix syntax as far as automatically possible
`svg` | Generates React components for all svg under `./src`
`release` | *reserved for CI servers only*
`danger` | *reserved for CI servers only*
`ci:*` | *reserved for CI servers only*

### Branch naming and prefixes

prefix name | description
:--- | :---
_no prefix_ | only `master`, `development` and `gh-pages`
`feature/xyz` | Normal working branches. Everything you change, should be in a feature branch. Feature branches are ment to be merged into `master` someday
`hotfix/xyz` | Reserved for fixing already released versions, the fix release will be on the hotfix branch and will also be merged into `master` afterwards
`test/xyz` | Throw away branches, just for testing out stuff, without the intention to ever be merged.

### Debugging (VS code only, atm)
1. Install the Chrome Debugger Extension
2. Create a new folder in project root `.vscode`
3. Create a new file in that folder `.vscode/launch.json`, enter this and save  
    ```js
    {
      "version": "0.2.0",
      "configurations": [{
        "name": "Chrome",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceRoot}/src",
        "userDataDir": "${workspaceRoot}/.vscode/chrome",
        "sourceMapPathOverrides": {
          "webpack:///src/*": "${webRoot}/*"
        }
      }]
    }
    ```
4. Run `npm start` to start the devserver
5. Now you can set breakpoints in the code editor and run the code with `F5` for more cool stuff read the [docs](https://code.visualstudio.com/docs/editor/debugging)

## Creating releases
### releases and prerelases
- Major and Minor are only allowed on `master`
- Patch releases are only allowed on `master` or `hotfix/xyz` branches. If the fix is for an old (already released) version, hotfix should be used for the release.
- Premajor, Preminor, Prepatch and Prerelease are only alowed on `feature/xyz` branches

target | effect
:--- | :---
`major` | Increments the major position: v**X**.0.0
`minor` | Increments the major position: v0.**X**.0
`patch` | Increments the major position: v0.0.**X**
`premajor` | Looks up the next major version, minor and patch will be zero. A label accoring to the current feature branch is added: v**X.0.0-branch-name.0**
`preminor` | Looks up the next minor version, major is untouched and patch will be zero. A label accoring to the current feature branch is added: v0.**X.0-branch-name.0**
`prepatch` | Looks up the next patch version, major and minor are untouched. A label accoring to the current feature branch is added: v0.0.**X-branch-name.0**
`prerelease` | Increases the last number of the precending release tag: v0.0.0-branch-name.**X**<br>Note: This assumes, you have already an precending prerelease tag present. If not: the effect is the same as prepatch.

### The CHANGELOG.md
All changes should be logged in [CHANGELOG](./CHANGELOG.md). There are two ways to do this:
Running `release xyz` looks for a heading level 2 with the new version number. If such header is present, everything between this header and the next level 2 header is used as changelog.  
If no such header is found, an editor will open with some markdown of all commit messages since the last tag in the current branch

## Conventions
The project structure tries to follow the common best practice around create-react-app.

### `/src`
The only place where ES6 works
```
.
├── App.js               // main application entry point (future routing happens here)
├── configureStore.js    // wrapps the root redoucer and adds redux middlewares
├── constructors         // global classes, used in the whole app
│   ├── ApiClient
│   └── Translator
├── data                 // all child reducer live here
│   ├── locations
│   └── reducer.js
├── donutStyles.js        // development only styles, during the donut hole phase
├── globalStyles.js       // global style sheet (body tag, fonts, ...)
├── index.js              // startup, the only place where the DOM get's accessed directly
├── pages                 // top level pages
│   ├── Home
│   └── ...
├── reducer.js            // the root reducer
├── setupTests.js         // this file runs before every test (currently it enables enzyme)
└── styleguide            // think about styleguilde as a separate module
    ├── components        // styleguide components
    ├── images            // global images
    ├── mixins            // functions to be used inside styled components styles
    ├── theme             // configuration variables, mostl for styles
    └── util              // styleguide utilities (setName() function)
```

### Components and index.js
Every directory should have an index.js. Here are the different kind of index.js files in a component directory.

```
.
├── Radio.js                // component
├── Radio.test.js
├── components              // child components
│   ├── Input.js
│   ├── Input.test.js
│   ├── Label.js
│   ├── Label.test.js
│   └── index.js            // the child list index (2)
├── images
│   ├── Checked.js
│   ├── Checked.test.js
│   ├── Focused.js
│   ├── Focused.test.js
│   ├── checked.svg
│   ├── focused.svg
│   ├── ...
│   └── index.js            // the image list index (3)
└── index.js                // the component index (1)
```

1. **The component**  
   This is the only entry point from where the component is accesed. The default export of this file is always the component. Child components and images should be made available (only one level) as well
2. **The child list**  
   This has no default export, exports all child components as named exports. The purpose of this file is that we can do things like
   - `import { Input } from './components'` importing simgle components
   - `import * as components from './components'` importing all childs at once
3. **The image list**  
   This has no default export, exports all child components as named exports. The purpose of this file is that we can do things like
   - `import { CheckedFocus } from './images'` importing simgle images
   - `import * as images from './images'` importing all images at once

### Naming conventions
This apply for filenames and variable names
- **PascalCase** (uppercase first letter, and every words first letter, no spacer)
  - Components
  - Classes
- **camelCase** (lowercase first letter, uppercase every words first letter, no spacer)
  - instances of classes
  - methods
  - functions
  - variables
  - properties
  - everything

### Module conventions
- Imports on top
- Exports on bottom
- export default fist, followed by named exports

A good example
```js
import React from 'react'
import { makeItBold } from 'text-library'

const awesomeShout = () => makeItBold('I am awesome')
const AwesomeComponent = props => (
  <div>
    {awesomeShout()}
  <div>
)

export default AwesomeComponent
export {
  awesomeShout
}
```

#### Side effects in modules

We are using heavy tree-shaking within the app, webpack will remove any
function and statement that is not used within another module. Therefore,
if you need to do a side effect, such as modifying the global object, the
file/module has to be added to the `sideEffects` list within `package.json`.

#### Routing / Lazyloading

When creating a new route, consider using a lazy loaded component. You can
define any component as lazy using the `Loadable` component from `react-loadable`.

Example:
```js
const MyComponent = Loadable({
  loader: () => import(/* webpackChunkName: "mycomponent" */ './components/MyComponent'),
  modules: ['./components/MyComponent'],
  webpack: () => [require.resolveWeak('./components/MyComponent')]
})
```

The webpackChunkName is a human readably file name that will be generated by
webpack, there's no relation to the module itself. Every other reference in
`modules` and `webpack` has to be the same string as in the dynamic `import()`
expression.

## Logging
We are using the [jsnlog](http://www.jsnlog.com/) library for the client side logging functionality. It is already set up to send the log statements to the React WebApi endpoint (which internally uses NLog for logging purposes).
It is offering out-of-the box unhandled client-side exceptions logging which is pretty neat since we don't have to do anything by ourselves.
When we want to manually add some log statements, we can do it in the following way:

```js
import { JL } from 'jsnlog'

class SomeComponentThatNeedsLogging extends PureComponent {
  render () {
    var logger = JL()
    logger.info('hello from the logger')
    return (
      <div>There was a log statement executed in the component</div>
    )
  }
}

```
All the available log methods (options) are described [here](http://www.jsnlog.com/Documentation/JSNLogJs/Logger) .


## Webtests

### The webtest parameter
By adding the parameter `webtests=true` to any URL, `data-refname` attributes are generated thorough the whole markup. There are three webtest helper methods available, to conviniently deal with those.

### Selecting single or multiple elements
- To select elements, an `"refSelector"` is needed (see section below, for how to get one)
- All webtest functions are members of the global `__WEBTESTS__` object
- `queryRefAll()` is for selecting an array of elements
- `queryRef()` is for selecting a single element. It works the same, but it returns **the first element** of the array.

#### Examples
```js
// select the sorting dropdown on the searchresults
__WEBTESTS__.queryRef("searchresult sortfilter select-dropdown")

// select all bookmark buttons in the searchresults
__WEBTESTS__.queryRefAll("searchresult resultlist listing listing-bookmarkbutton")
```

#### Using it within csharp webtests
- There is a [helper method](https://github.xmedia.ch/Immoscout24/Main/blob/027e7dc6738cf3adf897c5c553f397627264fb5a/Source/Webtests/S24SeleniumSupport/S24SeleniumTestExecutor.cs#L315) in the `testExecutor` to get DOM elements by refname
- For further selecting you can also specify further css selectors, to go deeper
```csharp
// simple selection by refnames
var selectElement = testExecutor.GetElementByReactRef(
  "searchresult sortfilter select-dropdown"
);
```
If you need to go deeper, add CSS selectors
```csharp
// simple selection by refnames
var optionElement = testExecutor.GetElementByReactRef(
  "searchresult sortfilter select-dropdown",
  "option[value='2']"
);
```

### Generating refSelector
- A `"refSelector"` is just a hierarchical space separated string of refnames (similar to a CSS slector).
- `.getRefSelector()` is for easy generation of `"refSelectors"`
- **TIPP**: Use the "right-click -> inspect element" in chrome, and execute the function in the console

#### Examples
```js
// get the refSelector of the currently selecte element while inspecting in chrome -> $0
__WEBTESTS__.getRefSelector($0)

// get the refSelector of a given DOM element (possible but not so usefull)
__WEBTESTS__.getRefSelector(document.querySelector('article'))
```

### Validating GTM events
The (GTM) Tracker has support for webtest mode. This means that when the application runs in `webtest` mode, the GTM events are not pushed to the "real" dataLayer object, but instead stored in the sessionStorage['datalayer'] key. This allows us to easily validate the triggered events in our webtests. An example of the structure looks like this:
```js
{
	"www_Search_KPI-Apply_Standard_Filter" : {
		"searchGroupName" : "Flat, House",
		"search_locationName" : "Düdingen",
		"search_zip" : "",
		"search_locationType" : "Place",
		"search_locationId" : "1090",
		"offerTypeName" : "Rent",
		"event" : "www_Search_KPI",
		"eventAction" : "Apply_Standard_Filter",
		"numberOfRoomsFrom" : "4.5",
		"searchResultCount" : 7
	},
	"www_Interaction_PI-List-Open_Filter" : {
		"eventLabel" : "CTA",
		"eventAction" : "Open_Filter",
		"event" : "www_Interaction_PI-List"
	}
}
```

To support this, there is an additional function inside the global `__WEBTESTS__` object
- `validateGtmEvent(<eventId>)` which accepts an eventId (combination between `event` and `eventAction` properties of the GTM object)

#### Examples
```js
// returns true
const validationResult = __WEBTESTS__.validateGtmEvent('www_Search_KPI-Apply_Standard_Filter')

// returns false as the specified eventId is not found in the example object above
const validationResult = __WEBTESTS__.validateGtmEvent('some_non_existing_event_Id')
```

#### Using it within csharp webtests
There is a helper method in the selenium testExecutor class `S24SeleniumTestExecutor.cs -> ValidateGtmEvent()` which provides the functionality to the Webtest methods.
```csharp
// Existence validation of certain gtm event on the home page
public HomePageReactObject ValidateGtmEvent(string eventIdentifier)
{
    var validationResult = testExecutor.ValidateGtmEvent(eventIdentifier);
    Assert.IsTrue(validationResult, $"Gtm object with id {eventIdentifier} was not found");
    return this;
}
```

## Docker

There is now an experimental Dockerfile included for playing around with. The
ultimate aim of this file is to allow for pinning of the exact commonly agreed
upon versions of Node and NPM. The performance in developer local use most
likely depends a lot on the machine local setup of the backing Docker daemon /
VM.

### Building

The build relies on the `.npmrc-docker` file added into this repository pulling
the registry token for our private registry out of the environment variable
`NPM_TOKEN` passed in via a build time `ARG` in the `Dockerfile`. Setting the
variable up is your own responsibility; there is no automation in place to do
that for you.

#### Windows

* Cmd.exe
  * `docker build --build-arg NPM_TOKEN=%NPM_TOKEN% -t react-frontend .`
* Powershell
  * `docker build --build-arg NPM_TOKEN=$Env.NPM_TOKEN -t react-frontend .`

#### Unixen

`docker build --build-arg NPM_TOKEN=$NPM_TOKEN -t react-frontend .`

### Running

`docker run -it react-frontend npm run test`

`docker run -it react-frontend npm run lint`
