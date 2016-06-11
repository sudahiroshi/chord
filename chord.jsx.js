var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};

JSX.resetProfileResults = function () {
	if ($__jsx_profiler.resetResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.resetResults();
};
/**
 * class SoundGenerator extends Object
 * @constructor
 */
function SoundGenerator() {
}

SoundGenerator.prototype = new Object;
/**
 * @constructor
 */
function SoundGenerator$() {
	this.data = [  ];
	this.offset = 0;
	this.sampleRate = 0;
	this.bufferSize = 0;
	this.stream_length = 4096;
	this.samplerate = 48000;
	this.channel = 1;
};

SoundGenerator$.prototype = new SoundGenerator;

/**
 * @param {!number} freq
 * @param {!number} rate
 * @param {Array.<undefined|!number>} member
 */
SoundGenerator.prototype.create$NNAN = function (freq, rate, member) {
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var j;
	/** @type {!number} */
	var k;
	this.sampleRate = rate;
	this.offset = 0;
	this.bufferSize = 4096 * 24;
	for (i = 0; i < member.length; i++) {
		this.data[i] = 0;
	}
	for (j in member) {
		k = 2.0 * Math.PI * freq * j / this.sampleRate;
		for (i = 0; i < this.data.length; i++) {
			this.data[i] += (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[chord.jsx:25] null access");
				}
				return v;
			}(member[j])) * Math.sin(k * i);
		}
	}
};

/**
 * @return {Array.<undefined|!number>}
 */
SoundGenerator.prototype.next$ = function () {
	/** @type {Array.<undefined|!number>} */
	var stream;
	/** @type {!number} */
	var i;
	stream = [  ];
	for (i = 0; i < this.stream_length; i++) {
		stream[i] = this.data[i + this.offset];
	}
	this.offset += this.stream_length;
	return stream;
};

/**
 * @return {!number}
 */
SoundGenerator.prototype.getSize$ = function () {
	return this.bufferSize;
};

/**
 */
SoundGenerator.prototype.rewind$ = function () {
	this.offset = 0;
};

/**
 */
SoundGenerator.prototype.clear$ = function () {
	/** @type {!number} */
	var i;
	for (i = 0; i < this.bufferSize; i++) {
		this.data[i] = 0;
	}
};

/**
 * class WebAudio extends Object
 * @constructor
 */
function WebAudio() {
}

WebAudio.prototype = new Object;
/**
 * @constructor
 */
function WebAudio$() {
	this.context = new AudioContext();
	this.buf = null;
	this.isPlaying = false;
	this.src = null;
	this.sampleRate = this.context.sampleRate;
};

WebAudio$.prototype = new WebAudio;

/**
 * @param {!number} freq
 * @param {Array.<undefined|!number>} data
 */
WebAudio.prototype.play$NAN = function (freq, data) {
	/** @type {Float32Array} */
	var sound_data;
	/** @type {!number} */
	var i;
	/** @type {AudioBufferSourceNode} */
	var src;
	this.buf = this.context.createBuffer(1, this.context.sampleRate, this.context.sampleRate);
	sound_data = this.buf.getChannelData(0);
	for (i = 0; i < data.length; i++) {
		sound_data[i] = data[i];
	}
	src = this.context.createBufferSource();
	src.buffer = this.buf;
	src.connect(this.context.destination);
	src.start(0);
};

/**
 * @param {!number} freq
 * @param {Array.<undefined|Object.<string, undefined|!number>>} member
 */
WebAudio.prototype.play$NAHN = function (freq, member) {
	var $this = this;
	/** @type {Float32Array} */
	var sound_data;
	/** @type {!number} */
	var i;
	/** @type {AudioBufferSourceNode} */
	var src;
	this.buf = this.context.createBuffer(1, this.context.sampleRate, this.context.sampleRate);
	sound_data = this.buf.getChannelData(0);
	for (i = 0; i < this.context.sampleRate; i++) {
		sound_data[i] = 0;
	}
	member.forEach((function (j) {
		/** @type {!number} */
		var k;
		/** @type {!number} */
		var i;
		k = 2.0 * Math.PI * freq * (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[chord.jsx:77] null access");
			}
			return v;
		}(j.key)) / $this.context.sampleRate;
		for (i = 0; i < sound_data.length; i++) {
			sound_data[i] += (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[chord.jsx:79] null access");
				}
				return v;
			}(j.val)) * Math.sin(k * i) / 3.0;
		}
	}));
	src = this.context.createBufferSource();
	this.src = src;
	src.buffer = this.buf;
	src.connect(this.context.destination);
	console.log(src.loop);
	src.loop = true;
	src.start(0);
	this.isPlaying = true;
};

/**
 * @param {!number} freq
 * @param {!number} second
 * @param {Array.<undefined|Object.<string, undefined|!number>>} member
 */
WebAudio.prototype.play$NNAHN = function (freq, second, member) {
	var $this = this;
	/** @type {Float32Array} */
	var sound_data;
	/** @type {!number} */
	var i;
	/** @type {AudioBufferSourceNode} */
	var src;
	this.buf = this.context.createBuffer(1, this.context.sampleRate * second, this.context.sampleRate);
	sound_data = this.buf.getChannelData(0);
	for (i = 0; i < this.context.sampleRate * second; i++) {
		sound_data[i] = 0;
	}
	member.forEach((function (j) {
		/** @type {!number} */
		var k;
		/** @type {!number} */
		var i;
		k = 2.0 * Math.PI * freq * (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[chord.jsx:99] null access");
			}
			return v;
		}(j.key)) / $this.context.sampleRate;
		for (i = 0; i < sound_data.length; i++) {
			sound_data[i] += (function (v) {
				if (! (v != null)) {
					debugger;
					throw new Error("[chord.jsx:101] null access");
				}
				return v;
			}(j.val)) * Math.sin(k * i) / 3.0;
		}
	}));
	src = this.context.createBufferSource();
	this.src = src;
	src.buffer = this.buf;
	src.connect(this.context.destination);
	console.log(src.loop);
	src.loop = true;
	src.start(0);
	this.isPlaying = true;
};

/**
 */
WebAudio.prototype.stop$ = function () {
	if (this.isPlaying === true) {
		this.src.stop(0);
	}
	this.isPlaying = false;
};

/**
 * class chord extends Object
 * @constructor
 */
function chord() {
}

chord.prototype = new Object;
/**
 * @constructor
 * @param {VCanvas} vc1
 */
function chord$LVCanvas$(vc1) {
	var $this = this;
	/** @type {nylon} */
	var nl;
	/** @type {HTMLButtonElement} */
	var b11;
	/** @type {HTMLButtonElement} */
	var b12;
	/** @type {HTMLButtonElement} */
	var b13;
	/** @type {HTMLButtonElement} */
	var b14;
	/** @type {HTMLButtonElement} */
	var b15;
	/** @type {HTMLButtonElement} */
	var b16;
	/** @type {HTMLButtonElement} */
	var b21;
	/** @type {HTMLButtonElement} */
	var b22;
	/** @type {HTMLButtonElement} */
	var b23;
	/** @type {HTMLButtonElement} */
	var b24;
	/** @type {HTMLButtonElement} */
	var b25;
	/** @type {HTMLButtonElement} */
	var b26;
	/** @type {HTMLButtonElement} */
	var b2;
	this.wa = null;
	this.vc1 = vc1;
	this.vc1.scale$NNNN(0.787, - 9.85, 1.44, 16.04);
	this.wa = new WebAudio$();
	nl = new nylon$();
	nl.on$SF$HXV$("stop", (function (dummy) {
		$this.wa.stop$();
	}));
	b11 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b11"));
	b11.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 4 / 3, "val": 4 / 3 }, { "key": 5 / 3, "val": 5 / 3 } ]);
	}));
	b12 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b12"));
	b12.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 5 / 4, "val": 5 / 4 }, { "key": 6 / 4, "val": 6 / 4 } ]);
	}));
	b13 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b13"));
	b13.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 6 / 5, "val": 6 / 5 }, { "key": 7 / 5, "val": 7 / 5 } ]);
	}));
	b14 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b14"));
	b14.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 7 / 6, "val": 7 / 6 }, { "key": 8 / 6, "val": 8 / 6 } ]);
	}));
	b15 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b15"));
	b15.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 7 / 5, "val": 7 / 5 }, { "key": 9 / 5, "val": 9 / 5 } ]);
	}));
	b16 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b16"));
	b16.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 8 / 6, "val": 8 / 6 }, { "key": 9 / 6, "val": 9 / 6 } ]);
	}));
	b21 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b21"));
	b21.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.335, "val": 4 / 3 }, { "key": 1.682, "val": 5 / 3 } ]);
	}));
	b22 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b22"));
	b22.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.26, "val": 5 / 4 }, { "key": 1.498, "val": 6 / 4 } ]);
	}));
	b23 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b23"));
	b23.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.189, "val": 6 / 5 }, { "key": 1.414, "val": 7 / 5 } ]);
	}));
	b24 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b24"));
	b24.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.189, "val": 7 / 6 }, { "key": 1.335, "val": 8 / 6 } ]);
	}));
	b25 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b25"));
	b25.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.414, "val": 7 / 5 }, { "key": 1.782, "val": 9 / 5 } ]);
	}));
	b26 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("b26"));
	b26.addEventListener("click", (function (e) {
		$this.sound$NAHN(440, [ { "key": 1, "val": 1 }, { "key": 1.335, "val": 8 / 6 }, { "key": 1.498, "val": 9 / 6 } ]);
	}));
	b2 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S("stop"));
	b2.addEventListener("click", (function (e) {
		$this.wa.stop$();
	}));
};

chord$LVCanvas$.prototype = new chord;

/**
 * @param {!string} canvas1Id
 */
chord.main$S = function (canvas1Id) {
	/** @type {HTMLCanvasElement} */
	var elm1;
	/** @type {VCanvas} */
	var vc1;
	/** @type {chord} */
	var mychord;
	elm1 = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(canvas1Id));
	vc1 = new VCanvas$LHTMLCanvasElement$(elm1);
	mychord = new chord$LVCanvas$(vc1);
};

var chord$main$S = chord.main$S;

/**
 * @param {!number} freq
 * @param {Array.<undefined|Object.<string, undefined|!number>>} member
 */
chord.prototype.sound$NAHN = function (freq, member) {
	var $math_abs_t;
	/** @type {undefined|!number} */
	var f0;
	/** @type {undefined|!number} */
	var f1;
	/** @type {undefined|!number} */
	var f2;
	/** @type {VCanvas} */
	var vc;
	/** @type {HTMLElement} */
	var res1;
	/** @type {HTMLElement} */
	var res2;
	this.wa.stop$();
	f0 = member[0].key;
	f1 = member[1].key;
	f2 = member[2].key;
	vc = this.vc1;
	vc.beginPath$();
	vc.cls$();
	vc.fill$();
	vc.beginPath$();
	vc.lineWidth$N(2);
	vc.forecolor$NNN(255, 0, 0);
	vc.circle$NNN((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:211] null access");
		}
		return v;
	}(f0)), 0, 5);
	vc.stroke$();
	vc.beginPath$();
	vc.circle$NNN((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:215] null access");
		}
		return v;
	}(f1)), 0, 5);
	vc.stroke$();
	vc.beginPath$();
	vc.circle$NNN((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:219] null access");
		}
		return v;
	}(f2)), 0, 5);
	vc.stroke$();
	vc.forecolor$NNN(0, 0, 0);
	vc.setFont$S("18px sans-serif");
	vc.print$NNS((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:224] null access");
		}
		return v;
	}(f0)) - 0.05, - 2.2, (((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:224] null access");
		}
		return v;
	}(f0)) * 440 | 0) + "") + "Hz");
	vc.print$NNS((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:225] null access");
		}
		return v;
	}(f1)) - 0.05, - 2.2, (((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:225] null access");
		}
		return v;
	}(f1)) * 440 | 0) + "") + "Hz");
	vc.print$NNS((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:226] null access");
		}
		return v;
	}(f2)) - 0.05, - 2.2, (((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:226] null access");
		}
		return v;
	}(f2)) * 440 | 0) + "") + "Hz");
	this.wa.play$NNAHN(freq, 5, member);
	res1 = dom$id$S("result1");
	res1.innerHTML = (((($math_abs_t = 440 * ((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:231] null access");
		}
		return v;
	}(f1)) - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:231] null access");
		}
		return v;
	}(member[1].val)))) >= 0 ? $math_abs_t : -$math_abs_t) | 0) + "") + "Hz";
	res2 = dom$id$S("result2");
	res2.innerHTML = (((($math_abs_t = 440 * ((function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:233] null access");
		}
		return v;
	}(f2)) - (function (v) {
		if (! (v != null)) {
			debugger;
			throw new Error("[chord.jsx:233] null access");
		}
		return v;
	}(member[2].val)))) >= 0 ? $math_abs_t : -$math_abs_t) | 0) + "") + "Hz";
};

/**
 * class gui extends Object
 * @constructor
 */
function gui() {
}

gui.prototype = new Object;
/**
 * @constructor
 */
function gui$() {
};

gui$.prototype = new gui;

/**
 * @param {!string} btn1
 * @param {!string} btn2
 * @param {!string} btn3
 * @param {!string} btn4
 */
gui.main$SSSS = function (btn1, btn2, btn3, btn4) {
	/** @type {nylon} */
	var nl2;
	/** @type {HTMLButtonElement} */
	var b1;
	/** @type {HTMLButtonElement} */
	var b2;
	nl2 = new nylon$();
	b1 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S(btn1));
	b2 = (function (o) { return o instanceof HTMLButtonElement ? o : null; })(dom$id$S(btn2));
	b2.addEventListener("click", (function (e) {
		nl2.emit$SHX("stop", null);
	}));
};

var gui$main$SSSS = gui.main$SSSS;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return (function (v) {
		if (! (v == null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/js/web.jsx:45] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.document.createElement(tag)));
};

var dom$createElement$S = dom.createElement$S;

/**
 * class VCanvas extends Object
 * @constructor
 */
function VCanvas() {
}

VCanvas.prototype = new Object;
/**
 * @constructor
 * @param {HTMLCanvasElement} canvas
 */
function VCanvas$LHTMLCanvasElement$(canvas) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var width;
	/** @type {!number} */
	var height;
	this.scaleWidth = 0;
	this.scaleHeight = 0;
	this.scaleTop = 0;
	this.scaleLeft = 0;
	this._scalable = false;
	this._dir_x = 1;
	this._dir_y = 1;
	this._color = [ 0, 0, 0, 1 ];
	this.context = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
	this.canvas = canvas;
	x = canvas.offsetLeft;
	y = canvas.offsetTop;
	width = canvas.width;
	height = canvas.height;
};

VCanvas$LHTMLCanvasElement$.prototype = new VCanvas;

/**
 * @param {!number} left
 * @param {!number} top
 * @param {!number} width
 * @param {!number} height
 */
VCanvas.prototype.scale$NNNN = function (left, top, width, height) {
	this.scaleLeft = left;
	this.scaleTop = top;
	this.scaleWidth = width;
	this.scaleHeight = height;
	this._scalable = true;
	if (this.scaleWidth < 0) {
		this.scaleWidth = - this.scaleWidth;
		this._dir_x = - 1;
	} else {
		this._dir_x = 1;
	}
	if (this.scaleHeight < 0) {
		this.scaleHeight = - this.scaleHeight;
		this._dir_y = - 1;
	} else {
		this._dir_y = 1;
	}
};

/**
 * @param {!number} r
 * @param {!number} g
 * @param {!number} b
 */
VCanvas.prototype.forecolor$NNN = function (r, g, b) {
	this._color = [ r, g, b, 1 ];
	this.context.fillStyle = 'rgba(' + this._color.join(',').toString() + ')';
	this.context.strokeStyle = 'rgba(' + this._color.join(',').toString() + ')';
};

/**
 * @param {!number} r
 * @param {!number} g
 * @param {!number} b
 * @param {!number} a
 */
VCanvas.prototype.forecolor$NNNN = function (r, g, b, a) {
	this._color = [ r, g, b, a ];
	this.context.fillStyle = 'rgba(' + this._color.join(',').toString() + ')';
	this.context.strokeStyle = 'rgba(' + this._color.join(',').toString() + ')';
};

/**
 * @param {!number} x1
 * @param {!number} y1
 * @param {!number} x2
 * @param {!number} y2
 */
VCanvas.prototype.line$NNNN = function (x1, y1, x2, y2) {
	/** @type {!number} */
	var xx1;
	/** @type {!number} */
	var xx2;
	/** @type {!number} */
	var yy1;
	/** @type {!number} */
	var yy2;
	if (this._scalable) {
		xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		xx2 = (x2 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		yy2 = (y2 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	} else {
		xx1 = x1;
		xx2 = x2;
		yy1 = y1;
		yy2 = y2;
	}
	this.context.moveTo(xx1, yy1);
	this.context.lineTo(xx2, yy2);
};

/**
 * @param {!number} x1
 * @param {!number} y1
 */
VCanvas.prototype.lineStart$NN = function (x1, y1) {
	/** @type {!number} */
	var xx1;
	/** @type {!number} */
	var yy1;
	if (this._scalable) {
		xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	} else {
		xx1 = x1;
		yy1 = y1;
	}
	this.context.moveTo(xx1, yy1);
};

/**
 * @param {!number} x1
 * @param {!number} y1
 */
VCanvas.prototype.line$NN = function (x1, y1) {
	/** @type {!number} */
	var xx1;
	/** @type {!number} */
	var yy1;
	if (this._scalable) {
		xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	} else {
		xx1 = x1;
		yy1 = y1;
	}
	this.context.lineTo(xx1, yy1);
};

/**
 */
VCanvas.prototype.cls$ = function () {
	this.context.beginPath();
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fill();
};

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!string} str
 */
VCanvas.prototype.print$NNS = function (x, y, str) {
	/** @type {!number} */
	var xx;
	/** @type {!number} */
	var yy;
	if (this._scalable) {
		xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	} else {
		xx = x;
		yy = y;
	}
	this.context.fillText(str, xx, yy);
};

/**
 * @param {!number} x
 * @param {!number} y
 */
VCanvas.prototype.pset$NN = function (x, y) {
	/** @type {!number} */
	var xx;
	/** @type {!number} */
	var yy;
	if (this._scalable) {
		xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	} else {
		xx = x;
		yy = y;
	}
	this.context.moveTo(xx, yy);
	this.context.lineTo(xx + 1, yy + 1);
};

/**
 * @param {!number} x
 * @param {!number} y
 * @param {!number} radius
 */
VCanvas.prototype.circle$NNN = function (x, y, radius) {
	/** @type {!number} */
	var xx;
	/** @type {!number} */
	var yy;
	/** @type {!number} */
	var rr;
	xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
	yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	rr = (radius - this.scaleLeft) * this.canvas.width / this.scaleWidth;
	this.context.arc(xx, yy, radius, 0, Math.PI * 2, false);
};

/**
 * @param {!number} x1
 * @param {!number} y1
 * @param {!number} x2
 * @param {!number} y2
 */
VCanvas.prototype.rect$NNNN = function (x1, y1, x2, y2) {
	/** @type {!number} */
	var xx1;
	/** @type {!number} */
	var yy1;
	/** @type {!number} */
	var xx2;
	/** @type {!number} */
	var yy2;
	xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
	yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	xx2 = (x2 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
	yy2 = (y2 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
	this.context.fillRect(xx1, yy1, xx2 - xx1, yy2 - yy1);
};

/**
 */
VCanvas.prototype.beginPath$ = function () {
	this.context.beginPath();
};

/**
 */
VCanvas.prototype.fill$ = function () {
	this.context.fill();
};

/**
 */
VCanvas.prototype.stroke$ = function () {
	this.context.stroke();
};

/**
 * @param {!number} width
 */
VCanvas.prototype.lineWidth$N = function (width) {
	this.context.lineWidth = width;
};

/**
 * @param {!number} width
 */
VCanvas.prototype.drawWidth$N = function (width) {
	this.context.lineWidth = width;
};

/**
 * @param {!string} font
 */
VCanvas.prototype.setFont$S = function (font) {
	this.context.font = font;
};

/**
 * class nylonfunc extends Object
 * @constructor
 */
function nylonfunc() {
}

nylonfunc.prototype = new Object;
/**
 * @constructor
 * @param {nylon} object
 */
function nylonfunc$F$HXV$Lnylon$(func, object) {
	this.fn = func;
	this.obj = object;
};

nylonfunc$F$HXV$Lnylon$.prototype = new nylonfunc;

/**
 * class nylon extends Object
 * @constructor
 */
function nylon() {
}

nylon.prototype = new Object;
/**
 * @constructor
 */
function nylon$() {
	if (js.global.map == null) {
		js.global.map = {  };
	}
};

nylon$.prototype = new nylon;

/**
 * @param {!string} keyword
 */
nylon.prototype.on$SF$HXV$ = function (keyword, fn) {
	if (nylon.map[keyword] == null) {
		console.log("map - keyword is null");
		nylon.map[keyword] = [ new nylonfunc$F$HXV$Lnylon$(fn, this) ];
	} else {
		nylon.map[keyword].push(new nylonfunc$F$HXV$Lnylon$(fn, this));
	}
};

/**
 * @param {!string} keyword
 * @param {Object.<string, undefined|*>} params
 */
nylon.prototype.emit$SHX = function (keyword, params) {
	/** @type {Array.<undefined|!string>} */
	var keys;
	console.log(nylon.map[keyword]);
	keys = keyword.split("|");
	this.emit$ASHX(keys, params);
};

/**
 * @param {Array.<undefined|!string>} keys
 * @param {Object.<string, undefined|*>} params
 */
nylon.prototype.emit$ASHX = function (keys, params) {
	var $this = this;
	keys.forEach((function (key) {
		if (nylon.map[key] == null) {
			console.log("Invarid keyword!");
		} else {
			nylon.map[key].forEach((function (element) {
				if (element.obj != $this) {
					element.fn(params);
				}
			}));
		}
	}));
};

/**
 * @param {!string} keyword
 */
nylon.prototype.off$SF$HXV$ = function (keyword, fn) {
	/** @type {Array.<undefined|nylonfunc>} */
	var arr;
	/** @type {!number} */
	var i;
	if (nylon.map[keyword] == null) {
		console.log("map - keyword is null");
	} else {
		arr = nylon.map[keyword];
		for (i = arr.length - 1; i >= 0; i--) {
			console.log(i);
			if (arr[i].obj == this && arr[i].fn == fn) {
				arr.splice(i, 1);
			}
		}
		if (nylon.map[keyword].length === 0) {
			nylon.map[keyword] = null;
		}
	}
};

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} arts
 */
_Main.main$AS = function (arts) {
	var f;
	var g;
	/** @type {nylon} */
	var a;
	/** @type {nylon} */
	var b;
	f = (function (x) {
		console.log("f was executed");
	});
	g = (function (x) {
		console.log("g was executed");
	});
	a = new nylon$();
	console.log("check A");
	a.on$SF$HXV$("test", f);
	a.on$SF$HXV$("test2", f);
	console.log(nylon.map);
	console.log("check B");
	a.on$SF$HXV$("test", g);
	console.log(nylon.map);
	a.emit$SHX("test", {  });
	b = new nylon$();
	console.log("check C");
	b.emit$SHX("test", null);
	b.emit$SHX("test2", null);
	a.off$SF$HXV$("test", f);
	console.log("check D");
	console.log(nylon.map);
	console.log("check E");
	b.emit$SHX("test|test2", null);
	console.log(nylon.map);
};

var _Main$main$AS = _Main.main$AS;

/**
 * class vbTimer extends Object
 * @constructor
 */
function vbTimer() {
}

vbTimer.prototype = new Object;
/**
 * @constructor
 */
function vbTimer$() {
	this.interval = 1000;
	this.enabled = false;
	this.timer = null;
	this._tHandle = null;
};

vbTimer$.prototype = new vbTimer;

/**
 */
vbTimer.prototype.enable$ = function () {
	if (this.timer != null && this.enabled === false) {
		this._tHandle = Timer$setInterval$F$V$N(this.timer, this.interval);
		this.enabled = true;
	}
};

/**
 */
vbTimer.prototype.disable$ = function () {
	if (this.enabled === true) {
		Timer$clearInterval$LTimerHandle$(this._tHandle);
		this.enabled = false;
	}
};

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

/**
 * class Timer extends Object
 * @constructor
 */
function Timer() {
}

Timer.prototype = new Object;
/**
 * @constructor
 */
function Timer$() {
};

Timer$.prototype = new Timer;

/**
 * @param {!number} intervalMS
 * @return {TimerHandle}
 */
Timer.setTimeout$F$V$N = function (callback, intervalMS) {
	return (function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:34] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.setTimeout))(callback, intervalMS);
};

var Timer$setTimeout$F$V$N = Timer.setTimeout$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearTimeout$LTimerHandle$ = function (timer) {
	(function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:38] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.clearTimeout))(timer);
};

var Timer$clearTimeout$LTimerHandle$ = Timer.clearTimeout$LTimerHandle$;

/**
 * @param {!number} intervalMS
 * @return {TimerHandle}
 */
Timer.setInterval$F$V$N = function (callback, intervalMS) {
	return (function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:42] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.setInterval))(callback, intervalMS);
};

var Timer$setInterval$F$V$N = Timer.setInterval$F$V$N;

/**
 * @param {TimerHandle} timer
 */
Timer.clearInterval$LTimerHandle$ = function (timer) {
	(function (v) {
		if (! (v == null || typeof v === "function")) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:46] detected invalid cast, value is not a function or null");
		}
		return v;
	}(js.global.clearInterval))(timer);
};

var Timer$clearInterval$LTimerHandle$ = Timer.clearInterval$LTimerHandle$;

/**
 * @return {TimerHandle}
 */
Timer.requestAnimationFrame$F$NV$ = function (callback) {
	return Timer._requestAnimationFrame(callback);
};

var Timer$requestAnimationFrame$F$NV$ = Timer.requestAnimationFrame$F$NV$;

/**
 * @param {TimerHandle} timer
 */
Timer.cancelAnimationFrame$LTimerHandle$ = function (timer) {
	Timer._cancelAnimationFrame(timer);
};

var Timer$cancelAnimationFrame$LTimerHandle$ = Timer.cancelAnimationFrame$LTimerHandle$;

/**
 * @param {!boolean} enable
 */
Timer.useNativeRAF$B = function (enable) {
	Timer._requestAnimationFrame = Timer$_getRequestAnimationFrameImpl$B(enable);
	Timer._cancelAnimationFrame = Timer$_getCancelAnimationFrameImpl$B(enable);
};

var Timer$useNativeRAF$B = Timer.useNativeRAF$B;

/**
 * @param {!boolean} useNativeImpl
 */
Timer._getRequestAnimationFrameImpl$B = function (useNativeImpl) {
	/** @type {!number} */
	var lastTime;
	if (useNativeImpl) {
		if (js.global.requestAnimationFrame) {
			return (function (callback) {
				return (function (v) {
					if (! (v == null || typeof v === "function")) {
						debugger;
						throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:72] detected invalid cast, value is not a function or null");
					}
					return v;
				}(js.global.requestAnimationFrame))(callback);
			});
		} else {
			if (js.global.webkitRequestAnimationFrame) {
				return (function (callback) {
					return (function (v) {
						if (! (v == null || typeof v === "function")) {
							debugger;
							throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:78] detected invalid cast, value is not a function or null");
						}
						return v;
					}(js.global.webkitRequestAnimationFrame))(callback);
				});
			} else {
				if (js.global.mozRequestAnimationFrame) {
					return (function (callback) {
						return (function (v) {
							if (! (v == null || typeof v === "function")) {
								debugger;
								throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:84] detected invalid cast, value is not a function or null");
							}
							return v;
						}(js.global.mozRequestAnimationFrame))(callback);
					});
				} else {
					if (js.global.oRequestAnimationFrame) {
						return (function (callback) {
							return (function (v) {
								if (! (v == null || typeof v === "function")) {
									debugger;
									throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:90] detected invalid cast, value is not a function or null");
								}
								return v;
							}(js.global.oRequestAnimationFrame))(callback);
						});
					} else {
						if (js.global.msRequestAnimationFrame) {
							return (function (callback) {
								return (function (v) {
									if (! (v == null || typeof v === "function")) {
										debugger;
										throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:96] detected invalid cast, value is not a function or null");
									}
									return v;
								}(js.global.msRequestAnimationFrame))(callback);
							});
						}
					}
				}
			}
		}
	}
	lastTime = 0;
	return (function (callback) {
		/** @type {!number} */
		var now;
		/** @type {!number} */
		var timeToCall;
		now = Date.now();
		timeToCall = Math.max(0, 16 - (now - lastTime));
		lastTime = now + timeToCall;
		return Timer$setTimeout$F$V$N((function () {
			callback(now + timeToCall);
		}), timeToCall);
	});
};

var Timer$_getRequestAnimationFrameImpl$B = Timer._getRequestAnimationFrameImpl$B;

/**
 * @param {!boolean} useNativeImpl
 */
Timer._getCancelAnimationFrameImpl$B = function (useNativeImpl) {
	if (useNativeImpl) {
		if (js.global.cancelAnimationFrame) {
			return (function (timer) {
				(function (v) {
					if (! (v == null || typeof v === "function")) {
						debugger;
						throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:119] detected invalid cast, value is not a function or null");
					}
					return v;
				}(js.global.cancelAnimationFrame))(timer);
			});
		} else {
			if (js.global.webkitCancelAnimationFrame) {
				return (function (timer) {
					(function (v) {
						if (! (v == null || typeof v === "function")) {
							debugger;
							throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:125] detected invalid cast, value is not a function or null");
						}
						return v;
					}(js.global.webkitCancelAnimationFrame))(timer);
				});
			} else {
				if (js.global.mozCancelAnimationFrame) {
					return (function (timer) {
						(function (v) {
							if (! (v == null || typeof v === "function")) {
								debugger;
								throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:131] detected invalid cast, value is not a function or null");
							}
							return v;
						}(js.global.mozCancelAnimationFrame))(timer);
					});
				} else {
					if (js.global.oCancelAnimationFrame) {
						return (function (timer) {
							(function (v) {
								if (! (v == null || typeof v === "function")) {
									debugger;
									throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:137] detected invalid cast, value is not a function or null");
								}
								return v;
							}(js.global.oCancelAnimationFrame))(timer);
						});
					} else {
						if (js.global.msCancelAnimationFrame) {
							return (function (timer) {
								(function (v) {
									if (! (v == null || typeof v === "function")) {
										debugger;
										throw new Error("[/Users/suda/JSX/lib/js/timer.jsx:143] detected invalid cast, value is not a function or null");
									}
									return v;
								}(js.global.msCancelAnimationFrame))(timer);
							});
						}
					}
				}
			}
		}
	}
	return Timer$clearTimeout$LTimerHandle$;
};

var Timer$_getCancelAnimationFrameImpl$B = Timer._getCancelAnimationFrameImpl$B;

/**
 * class TimerHandle extends Object
 * @constructor
 */
function TimerHandle() {
}

TimerHandle.prototype = new Object;
/**
 * @constructor
 */
function TimerHandle$() {
};

TimerHandle$.prototype = new TimerHandle;

$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return (function (v) {
		if (! (v == null || v instanceof HTMLDocument)) {
			debugger;
			throw new Error("[/Users/suda/JSX/lib/js/js/web.jsx:23] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(js.global.document));
});
$__jsx_lazy_init(nylon, "map", function () {
	return (function (o) { return o instanceof Object ? o : null; })(js.global.map);
});
js.global = (function () { return this; })();

$__jsx_lazy_init(Timer, "_requestAnimationFrame", function () {
	return Timer$_getRequestAnimationFrameImpl$B(true);
});
$__jsx_lazy_init(Timer, "_cancelAnimationFrame", function () {
	return Timer$_getCancelAnimationFrameImpl$B(true);
});
var $__jsx_classMap = {
	"chord.jsx": {
		SoundGenerator: SoundGenerator,
		SoundGenerator$: SoundGenerator$,
		WebAudio: WebAudio,
		WebAudio$: WebAudio$,
		chord: chord,
		chord$LVCanvas$: chord$LVCanvas$,
		gui: gui,
		gui$: gui$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"vcanvas.jsx": {
		VCanvas: VCanvas,
		VCanvas$LHTMLCanvasElement$: VCanvas$LHTMLCanvasElement$
	},
	"nylon.client.jsx": {
		nylonfunc: nylonfunc,
		nylonfunc$F$HXV$Lnylon$: nylonfunc$F$HXV$Lnylon$,
		nylon: nylon,
		nylon$: nylon$,
		_Main: _Main,
		_Main$: _Main$
	},
	"vbTimer.jsx": {
		vbTimer: vbTimer,
		vbTimer$: vbTimer$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	},
	"system:lib/js/timer.jsx": {
		Timer: Timer,
		Timer$: Timer$,
		TimerHandle: TimerHandle,
		TimerHandle$: TimerHandle$
	}
};


})();

//@ sourceMappingURL=chord.jsx.js.mapping
