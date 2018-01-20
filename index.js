/* global AFRAME */
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
    end: {type: 'vec3'},
    src: {default: ''},
    rotation: {type: 'vec3'},
    width: {default: 1, min: 0},
    height: {default: 1, min: 0},
    lineColor: {default: '#fff', type: 'color'},
    lineHorizontalAlign: {default: 'left', oneOf: ['left', 'right', 'center']},
    lineVerticalAlign: {default: 'center', oneOf: ['top', 'bottom', 'center']},
    opacity: {default: 1, min: 0, max: 1},
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

    var quad = this.quad = document.createElement('a-entity');
    var self = this;

    quad.addEventListener('loaded', function () {
      self.updateTooltip();
    });

    quad.setAttribute('slice9', {width: data.width, height: data.height, left: 20, right: 43, top: 20, bottom: 43, padding: 0.005, src: data.src});
    quad.setAttribute('rotation', data.rotation);
    quad.setAttribute('text', {width: 0.25, color: '#fff', value: data.text, align: 'center'});
    el.appendChild(quad);

    // Line
    var material = this.material = new THREE.LineBasicMaterial({color: data.lineColor, opacity: data.opacity, transparent: data.opacity < 1});
    var geometry = this.geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    this.line = new THREE.Line(geometry, material);
    this.el.setObject3D('line', this.line);

    this.el.addEventListener('componentchanged', function (evt) {
      self.updateTooltip();
    });

    this.updateTooltip();
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */

   updateTooltip: (function () {
     var parentPosition = new THREE.Vector3();
     var targetPosition = new THREE.Vector3();
     var startPosition = new THREE.Vector3();

     return function () {
       var data = this.data;
       parentPosition.copy(this.el.getAttribute('position'));
       targetPosition.copy(data.targetPosition);

       var endPosition = targetPosition.sub(parentPosition);

       var data = this.data;
       var valign = {top: data.height / 2, bottom: -data.height / 2, center: 0};
       var halign = {left: -data.width / 2, right: data.width / 2, center: 0};

       var y = valign[data.lineVerticalAlign];
       var x = halign[data.lineHorizontalAlign];

       this.quad.setAttribute('slice9', {opacity: data.opacity});
       this.quad.setAttribute('text', {opacity: data.opacity, value: data.text});

       // Update geometry
       this.quad.object3D.updateMatrix();
       startPosition.set(x, y, 0);
       startPosition.applyMatrix4(this.quad.object3D.matrix);

       var pos = this.geometry.attributes.position.array;
       pos[0] = startPosition.x;
       pos[1] = startPosition.y;
       pos[2] = startPosition.z;
       pos[3] = endPosition.x;
       pos[4] = endPosition.y;
       pos[5] = endPosition.z;
       this.geometry.attributes.position.needsUpdate = true;

       this.material.opacity = data.opacity;
       this.material.transparent = data.opacity < 1;
       this.material.color.setStyle(data.color);
     }
   })(),

   update: function () {
     this.updateTooltip();
   }
 });
