/* global AFRAME */
require('aframe-line-component');
require('aframe-slice9-component');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Tooltip component for A-Frame.
 */
AFRAME.registerComponent('tooltip', {
  schema: {
    text: {default: ''},
    width: {default: 1, min: 0},
    height: {default: 1, min: 0},
    lineHorizontalAlign: {default: 'left', oneOf: ['left', 'right', 'center']},
    lineVerticalAlign: {default: 'center', oneOf: ['top', 'bottom', 'center']},
/*
    targetType: {default: 'element', oneOf: ['element', 'position']},
    targetElement: {type: 'selector', if: {targetType: ['element']}},
*/
    targetPosition: {type: 'vec3', if: {targetType: ['position']}}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var el = this.el;
    var data = this.data;
    var line = this.line = document.createElement('a-entity');
    line.setAttribute('line', {start: '0 0 0', end: '-2 -1 -3'});
    el.appendChild(line);

    var quad = this.quad = document.createElement('a-entity');
    quad.setAttribute('slice9', {width: data.width, height: data.height, left: 20, right: 43, top: 20, bottom: 43, padding: 0.02, src: 'tooltip.png'});
    quad.setAttribute('text', {width: 0.9, color: '#fff', value: data.text, align: 'center'});
    el.appendChild(quad);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var data = this.data;
    var valign = {top: data.height / 2, bottom: -data.height / 2, center: 0};
    var halign = {left: -data.width / 2, right: data.width / 2, center: 0};

    var y = valign[data.lineVerticalAlign];
    var x = halign[data.lineHorizontalAlign];

    var endPosition = data.endPosition;

    this.line.setAttribute('line', {start: {x: x, y: y, z: 0}, end: endPosition});
  }
});
