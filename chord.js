class SoundGenerator {
  constructor() {
    this.data = new Array();
    this.offset = 0;
    this.sampleRate = 0;
    this.bufferSize = 0;
    this.stream_length = 4096;
    this.samplerate = 48000;
    this.channle = 1;
  }

  // number freq, number rate, number[] member
  // return void
	create( freq, rate, member ) {
		this.sampleRate = rate;
		this.offset = 0;
		this.bufferSize = 4096 * 24;
		for( var i=0; i<member.length; i++ ) {
			this.data[i] = 0;
		}
		for( var j in member ) {
			var k = 2.0 * Math.PI * freq * j / this.sampleRate;
			for( var i=0; i<this.data.length; i++ ){
				this.data[i] += member[j] * Math.sin( k * i );
			}
		}
	}
  // return number[]
	next() {
		var stream = [];
		for( var i=0; i<this.stream_length; i++ ) {
			stream[i] = this.data[ i + this.offset ];
		}
		this.offset += this.stream_length;
		return stream;
	}
	getSize() {
		return this.bufferSize;
	}
	rewind() {
		this.offset = 0;
	}
	clear() {
		for( var i=0; i<this.bufferSize; i++ ) {
			this.data[i] = 0;
		}
	}
}

class WebAudio {
  constructor() {
  	this.context = new AudioContext();
    this.sampleRate = this.context.sampleRate;
  	this.buf = null;
  //	var dest: AudioDestinationNode;
  	this.isPlaying = false;
  	this.sampleRate = 44100;
  	this.src = null;
  }
  // int number, int[] data
  // return void
	play( freq, data ) {
		//this.context.sampleRate = 48000;
		this.buf = this.context.createBuffer(1, this.context.sampleRate, this.context.sampleRate);
		var sound_data = this.buf.getChannelData( 0 );
		for( var i=0; i<data.length; i++ ){
			sound_data[i] = data[i];
		}
		var src = this.context.createBufferSource();
		src.buffer = this.buf;
		src.connect( this.context.destination );
//		src.gain.value = 1;
		src.start( 0 );
	}
  waves(freq, member, sec ) {
    // 基本周波数と，含まれる周波数スペクトラムを受け取り，波形を合成するメソッド
    // freqは基本周波数
    // memberは周波数をkey，振幅をvalueとするハッシュテーブル
    // secは秒数
    data = new Array(samplerate*sec);
    for( var i=0; i<data.length; i++ )	data[i] = 0;
    for( var j in member ) {
      var k = 2 * Math.PI * freq * j / samplerate;
      for( var i=0; i<data.length; i++ ){
        data[i] += member[j] * Math.sin( k * i );
      }
    }
  };
/*
	function play( freq: number, second: number, member: Array.<Map.<number>> ) : void {
		this.buf = this.context.createBuffer(1, this.context.sampleRate * second, this.context.sampleRate);
		var sound_data = this.buf.getChannelData( 0 );
		for( var i=0; i<this.context.sampleRate * second; i++ ){
			sound_data[i] = 0;
		}
		member.forEach( function(j) {
			var k = 2.0 * Math.PI * freq * j["key"] / this.context.sampleRate;
			for( var i=0; i<sound_data.length; i++ ){
				sound_data[i] += j["val"] * Math.sin( k * i ) / 3.0;
			}
		});
		var src = this.context.createBufferSource();
		this.src = src;
		src.buffer = this.buf;
		src.connect( this.context.destination );
		//src.gain.value = 1;
		log src.loop;
		src.loop = true;
		src.noteOn( 0 );
		this.isPlaying = true;
	}*/

	stop() {
//		this.node.disconnect();
		if( this.isPlaying == true )	this.src.stop( 0 );
		this.isPlaying = false;
	}
}
class chord {
	/*static function main( canvas1Id: string ) : void {
		var elm1 = dom.id(canvas1Id) as HTMLCanvasElement;
		var vc1 = new VCanvas( elm1 );
		var mychord = new chord( vc1 );
	}*/

  constructor( vc1, vc2 ) {
    vc1.scale( 350, -30, 630, 40 );
    vc2.scale( 350, -10, 630, 50 );
    var nl = new nylon();
    nl.on( "chord", ( key, params ) => {
      vc1.cls();
      vc1.forecolor( 200, 0, 0 );
      vc1.drawWidth( 2 );
      vc1.beginPath();
      vc1.circle( params["freq"], 0, 5 );
      vc1.circle( params["freq"] * params["waves"][1]["ratio"], 0, 5 );
      vc1.circle( params["freq"] * params["waves"][2]["ratio"], 0, 5 );
      vc1.stroke();
    });
    nl.on( "chord", ( key, params ) => {
      vc2.cls();
      vc2.forecolor( 200, 0, 0 );
      vc2.drawWidth( 2 );
      vc2.beginPath();
      vc2.circle( params["freq"], 0, 5 );
      vc2.circle( params["freq"] * params["waves"][1]["ratio"], 0, 5 );
      vc2.circle( params["freq"] * params["waves"][2]["ratio"], 0, 5 );
      vc2.stroke();
    });
  }
  // int freq, map member
	sound( freq, member ) {
		this.wa.stop();
		var f0 = member[0]["key"];
		var f1 = member[1]["key"];
		var f2 = member[2]["key"];
		var vc = this.vc1;
		vc.beginPath();
		//vc.cls();
		vc.fill();

		vc.beginPath();
		vc.lineWidth( 2 );
		vc.forecolor( 255, 0, 0 );
		vc.circle( f0, 0, 5 );
		vc.stroke();

		vc.beginPath();
		vc.circle( f1, 0, 5 );
		vc.stroke();

		vc.beginPath();
		vc.circle( f2, 0, 5 );
		vc.stroke();

		vc.forecolor( 0, 0, 0 );
		vc.setFont( "18px sans-serif" );
		vc.print( f0 - 0.05, -2.2, ( Math.round( f0 * 440 ) ) + "Hz" );
		vc.print( f1 - 0.05, -2.2, ( Math.round( f1 * 440 ) ) + "Hz" );
		vc.print( f2 - 0.05, -2.2, ( Math.round( f2 * 440 ) ) + "Hz" );

		this.wa.play( freq, 5, member );

    var res1 = document.getElementById("result1");
		res1.innerHTML = Math.abs( Math.round( 440 * ( f1 - member[1]["val"] ) ) ) + "Hz";

    var res2 = document.getElementById("result2");
		res2.innerHTML = Math.abs( Math.round( 440 * ( f2 - member[2]["val"] ) ) ) + "Hz";

	}
}

class Graph2 {
  background() {
    this.vc.lineWidth( 3 );
    this.vc.forecolor( 47, 81, 115 );
    this.vc.beginPath();
    this.vc.line( 400, 0, 900, 0 );
    for( var i=440; i<=880; i+=440/12 )
      this.vc.line( i, -10, i, 10 );
    this.vc.stroke();

    this.vc.forecolor( 0, 0, 0 );
    this.vc.setFont( "18px sans-serif" );
    this.vc.beginPath();
    var name = { "c":440, "d":513, "e":586, "f":623, "g":697, "a":770, "b":843}
    for( let tone in name )
    {
      this.vc.print( name[tone]-5, 20, tone );
      console.log( "freq:" + name[tone] + "Hz = " + tone );
    }
    this.vc.setFont( "24px sans-serif" );
    this.vc.print( 580, 35, "12 tone tempeament" );
    this.vc.stroke();
  }

  // VCanvas vc
	constructor( vc ) {
		this.vc = vc;
    this.vc.scale( 350, -10, 630, 50 );

    this.background();

		var nl = new nylon();
		nl.on( "stop", function(){
			this.wa.stop();
		});
	}
}

class Graph1 {
  background() {
    this.vc.lineWidth( 3 );
    this.vc.forecolor( 169, 91, 2 );
    this.vc.beginPath();
    this.vc.line( 400, 0, 900, 0 );
    for( var i=440; i<=880; i+=44 )
      this.vc.line( i, -5, i, 5 );
    this.vc.stroke();

    this.vc.forecolor( 0, 0, 0 );
    this.vc.setFont( "18px sans-serif" );
    this.vc.beginPath();
    for( var i=440; i<=880; i+=44 )
      this.vc.print( i-10, -10, i/440 );
    this.vc.setFont( "20px sans-serif" );
    this.vc.print( 620, -22, "one octave" );
    this.vc.print( 840, -18, "frequency ratio" );
    this.vc.stroke();
  }

  // VCanvas vc1
	constructor( vc ) {
		this.vc = vc;
		//this.vc.scale( 0.787, -9.85, 1.44, 16.04 );
    this.vc.scale( 350, -30, 630, 40 );
		this.wa = new WebAudio();

    this.background();

		var nl = new nylon();
    nl.on( "chord", ( key, params ) => {
      console.log( params );
    })
	}
}

var guisetup = ( nl ) => {
  document.getElementById("b11").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1,"amp":1}, {"ratio":4/3,"amp":4/3}, {"ratio":5/3, "amp":5/3}] } );
  });
  document.getElementById("b12").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":5/4, "amp":5/4}, {"ratio":6/4,"amp":6/4}] });
  });
  document.getElementById("b13").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":6/5, "amp":6/5}, {"ratio":7/5,"amp":7/5}] });
  });
  document.getElementById("b14").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":7/6, "amp":7/6}, {"ratio":8/6,"amp":8/6}] });
  });
  document.getElementById("b15").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":7/5, "amp":7/5}, {"ratio":9/5,"amp":9/5}] });
  });
  document.getElementById("b16").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":8/6, "amp":8/6}, {"ratio":9/6,"amp":9/6}] });
  });
  document.getElementById("b21").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.335, "amp":4/3}, {"ratio":1.682,"amp":5/3}] });
  });
  document.getElementById("b22").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.26, "amp":5/4}, {"ratio":1.498,"amp":6/4}] });
  });
  document.getElementById("b23").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.189, "amp":6/5}, {"ratio":1.414,"amp":7/5}] });
  });
  document.getElementById("b24").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.189, "amp":7/6}, {"ratio":1.335,"amp":8/6}] });
  });
  document.getElementById("b25").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.414, "amp":7/5}, {"ratio":1.782,"amp":9/5}] });
  });
  document.getElementById("b26").addEventListener( "click", () => {
    nl.emit( "chord", { "freq":440, waves:[{"ratio":1, "amp":1}, {"ratio":1.335, "amp":8/6}, {"ratio":1.498,"amp":9/6}] });
  });
  document.getElementById("stop").addEventListener( "click", () => {
    nl.emit( "stop" );
  });
}
window.addEventListener("load", function(e) {
  var nl = new nylon();
  guisetup( nl );
  var vcb1 = new VCanvas( document.getElementById('graphback1') );
  new Graph1( vcb1 );

  var vcb2 = new VCanvas( document.getElementById('graphback2') );
  new Graph2( vcb2 );

  var vc1 = new VCanvas( document.getElementById('graph1') );
  var vc2 = new VCanvas( document.getElementById('graph2') );

  var mychord = new chord( vc1, vc2 );
});
