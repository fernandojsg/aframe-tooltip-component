## aframe-tooltip-component - WIP Please do not use it yet!

[![Version](http://img.shields.io/npm/v/aframe-tooltip-component.svg?style=flat-square)](https://npmjs.org/package/aframe-tooltip-component)
[![License](http://img.shields.io/npm/l/aframe-tooltip-component.svg?style=flat-square)](https://npmjs.org/package/aframe-tooltip-component)

A Tooltip component for A-Frame.

For [A-Frame](https://aframe.io).

![](https://raw.githubusercontent.com/fernandojsg/aframe-tooltip-component/master/screenshot.png)

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-tooltip-component/dist/aframe-tooltip-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity tooltip="foo: bar"></a-entity>
  </a-scene>
</body>
```

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:

```sh
angle install aframe-tooltip-component
```
-->

#### npm

Install via npm:

```bash
npm install aframe-tooltip-component
```

Then require and use.

```js
require('aframe');
require('aframe-tooltip-component');
```
