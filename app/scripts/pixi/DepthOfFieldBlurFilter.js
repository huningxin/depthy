/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 *
 * The DepthOfFieldBlurFilter applies a Gaussian blur to an object.
 * The strength of the blur can be set for x- and y-axis separately (always relative to the stage).
 *
 * @class DepthOfFieldBlurFilter
 * @contructor
 */
PIXI.DepthOfFieldBlurFilter = function()
{
    this.blurXFilter = new PIXI.DepthOfFieldBlurXFilter();
    this.blurYFilter = new PIXI.DepthOfFieldBlurYFilter();

    this.passes =[this.blurXFilter, this.blurYFilter];
};

/**
 * Sets the strength of both the blurX and blurY properties simultaneously
 *
 * @property blur
 * @type Number the strength of the blur
 * @default 2
 */
Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'blur', {
    get: function() {
        return this.blurXFilter.blur;
    },
    set: function(value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    }
});

Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'map', {
  get: function() {
    return this.blurXFilter.map;
  },
  set: function(value) {
    this.blurXFilter.map = this.blurYFilter.map = value;
  }
});
 

Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'min', {
  get: function() {
    return this.blurXFilter.min;
  },
  set: function(value) {
    this.blurXFilter.min = this.blurYFilter.min = value;
  }
});
 
Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'max', {
  get: function() {
    return this.blurXFilter.max;
  },
  set: function(value) {
    this.blurXFilter.max = this.blurYFilter.max = value;
  }
});

/**
 * Sets the strength of the blurX property
 *
 * @property blurX
 * @type Number the strength of the blurX
 * @default 2
 */
Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'blurX', {
    get: function() {
        return this.blurXFilter.blur;
    },
    set: function(value) {
        this.blurXFilter.blur = value;
    }
});

/**
 * Sets the strength of the blurX property
 *
 * @property blurY
 * @type Number the strength of the blurY
 * @default 2
 */
Object.defineProperty(PIXI.DepthOfFieldBlurFilter.prototype, 'blurY', {
    get: function() {
        return this.blurYFilter.blur;
    },
    set: function(value) {
        this.blurYFilter.blur = value;
    }
});
