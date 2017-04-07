/* global AFRAME */
require('aframe-line-component');
require('aframe-slice9-component');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('triline', {
  schema: {
    start: {type: 'vec3', default: '0 0 0'},
    end: {type: 'vec3', default: '0 0 0'},
    color: {type: 'color', default: '#fff'}
  },

  init: function () {
    var material = this.material = new THREE.LineBasicMaterial({color: this.data.color});
    var geometry = this.geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    this.line = new THREE.Line(geometry, material);
    this.el.setObject3D('line', this.line);
  },

  update: function (oldData) {
    var data = this.data;
    var diff = AFRAME.utils.diff(data, oldData);

    // Update geometry
    if ('start' in diff || 'end' in diff) {
      var pos = this.geometry.attributes.position.array;
      pos[0] = data.start.x;
      pos[1] = data.start.y;
      pos[2] = data.start.z;
      pos[3] = data.end.x;
      pos[4] = data.end.y;
      pos[5] = data.end.z;
      this.geometry.attributes.position.needsUpdate = true;
    }

    this.material.color.setStyle(data.color);
  }
});

/**
 * Tooltip component for A-Frame.
 */
AFRAME.registerComponent('tooltip', {
  schema: {
    text: {default: ''},
    end: {type: 'vec3'},
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

    // Line
    var material = this.material = new THREE.LineBasicMaterial({color: this.data.color});
    var geometry = this.geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    this.line = new THREE.Line(geometry, material);
    this.el.setObject3D('line', this.line);






    var line = this.line = document.createElement('a-entity');
    line.setAttribute('line', {end: data.targetPosition});
    el.appendChild(line);

    var quad = this.quad = document.createElement('a-entity');
    quad.setAttribute('slice9', {width: data.width, height: data.height, left: 20, right: 43, top: 20, bottom: 43, padding: 0.005, src: 'tooltip.png'});
    quad.setAttribute('text', {width: 0.25, color: '#fff', value: data.text, align: 'center'});
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

    var endPosition = data.targetPosition;

    this.line.setAttribute('line', {start: {x: x, y: y, z: 0}, end: endPosition});
  }
});
