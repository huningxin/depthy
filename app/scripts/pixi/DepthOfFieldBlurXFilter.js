/**
 *
 * The DepthOfFieldBlurXFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object.
 * You can use this filter to apply all manor of crazy warping effects
 * Currently the r property of the texture is used offset the x and the g propery of the texture is used to offset the y.
 * @class DepthOfFieldBlurXFilter
 * @contructor
 * @param texture {Texture} The texture used for the displacemtent map * must be power of 2 texture at the moment
 */
'use strict';
PIXI.DepthOfFieldBlurXFilter = function(texture)
{
  PIXI.AbstractFilter.call( this );
 
  this.passes = [this];
  // texture.baseTexture._powerOf2 = true;
 
  // set the uniforms
  this.uniforms = {
    depthMap:        {type: 'sampler2D', value:texture},
    min:           {type: '1f', value:100.0},
    max:          {type: '1f', value:100.0},
    blur:         {type: '1f', value: 1/512}
  };

 
  this.fragmentSrc = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'uniform sampler2D depthMap;',
    'uniform sampler2D uSampler;',
    'uniform float min;',
    'uniform float max;',
    'uniform float blur;',
 
    'void main(void) {',
    '   vec2 mapCords = vTextureCoord;',
    '   mapCords.y *= -1.0;',
    '   mapCords.y += 1.0;',
    '   float depth = texture2D(depthMap, mapCords).r;',
    '   if (depth > min && depth < max) {',
    '     gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;',
    '   } else {',
    '     vec4 sum = vec4(0.0);',

    '     sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;',
    '     sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;',

    '     gl_FragColor = sum;',
    '  }',
    '}'
  ];
};
 
PIXI.DepthOfFieldBlurXFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.DepthOfFieldBlurXFilter.prototype.constructor = PIXI.DepthOfFieldBlurXFilter;
 
Object.defineProperty(PIXI.DepthOfFieldBlurXFilter.prototype, 'map', {
  get: function() {
    return this.uniforms.depthMap.value;
  },
  set: function(value) {
    this.uniforms.depthMap.value = value;
  }
});
 

Object.defineProperty(PIXI.DepthOfFieldBlurXFilter.prototype, 'min', {
  get: function() {
    return this.uniforms.min.value;
  },
  set: function(value) {
    this.uniforms.min.value = value;
  }
});
 
Object.defineProperty(PIXI.DepthOfFieldBlurXFilter.prototype, 'max', {
  get: function() {
    return this.uniforms.max.value;
  },
  set: function(value) {
    this.uniforms.max.value = value;
  }
});

Object.defineProperty(PIXI.DepthOfFieldBlurXFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {
        //this.padding = value;
        this.uniforms.blur.value = (1/7000) * value;
    }
});
