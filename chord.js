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
  	this.sampleRate = 0;
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

  // int freq, map member
	sound( freq, member ) {
		this.wa.stop();
		var f0 = member[0]["key"];
		var f1 = member[1]["key"];
		var f2 = member[2]["key"];
		var vc = this.vc1;
		vc.beginPath();
		vc.cls();
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
		vc.print( f0 - 0.05, -2.2, ( (f0 * 440) ) + "Hz" );
		vc.print( f1 - 0.05, -2.2, ( (f1 * 440) ) + "Hz" );
		vc.print( f2 - 0.05, -2.2, ( (f2 * 440) ) + "Hz" );

		this.wa.play( freq, 5, member );

    var res1 = document.getElementById("result1");
		res1.innerHTML = Math.abs( 440 * ( f1 - member[1]["val"] ) ) + "Hz";

    var res2 = document.getElementById("result2");
		res2.innerHTML = Math.abs( 440 * ( f2 - member[2]["val"] ) ) + "Hz";

	}

  // VCanvas vc1
	constructor( vc ) {
		this.vc1 = vc;
		this.vc1.scale( 0.787, -9.85, 1.44, 16.04 );
		this.wa = new WebAudio();

		var nl = new nylon();
		nl.on( "stop", function(){
			this.wa.stop();
		});

    var snd = ( freq, member ) => this.sound( freq, member );
    var stp = () => this.wa.stop();

		var b11 = document.getElementById("b11");
		b11.addEventListener( "click", () => {
      this.sound( 440, [{"key":1, "val":1}, {"key":4/3, "val":4/3}, {"key":5/3,"val":5/3}]);
		});
    var b12 = document.getElementById("b12");
		b12.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":5/4, "val":5/4}, {"key":6/4,"val":6/4}]);
		});
    var b13 = document.getElementById("b13");
		b13.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":6/5, "val":6/5}, {"key":7/5,"val":7/5}]);
		});
		var b14 = document.getElementById("b14");

		b14.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":7/6, "val":7/6}, {"key":8/6,"val":8/6}]);
		});
    var b15 = document.getElementById("b15");
		b15.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":7/5, "val":7/5}, {"key":9/5,"val":9/5}]);
		});
    var b16 = document.getElementById("b16");
		b16.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":8/6, "val":8/6}, {"key":9/6,"val":9/6}]);
		});
    var b21 = document.getElementById("b21");
		b21.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.335, "val":4/3}, {"key":1.682,"val":5/3}]);
		});
    var b22 = document.getElementById("b22");
		b22.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.26, "val":5/4}, {"key":1.498,"val":6/4}]);
		});
    var b23 = document.getElementById("b23");
		b23.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.189, "val":6/5}, {"key":1.414,"val":7/5}]);
		});
    var b24 = document.getElementById("b24");
		b24.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.189, "val":7/6}, {"key":1.335,"val":8/6}]);
		});
    var b25 = document.getElementById("b25");
		b25.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.414, "val":7/5}, {"key":1.782,"val":9/5}]);
		});
    var b26 = document.getElementById("b26");
		b26.addEventListener( "click", function() {
			snd( 440, [{"key":1, "val":1}, {"key":1.335, "val":8/6}, {"key":1.498,"val":9/6}]);
		});
    var b2 = document.getElementById("stop");
		b2.addEventListener( "click", function() {
			stp();
		});

	}


}

/*class gui {
	static function main( btn1: string, btn2: string, btn3: string, btn4: string ): void {
		var nl2 = new nylon();
		var b1 = dom.id(btn1) as HTMLButtonElement;
		// b1.addEventListener( "click", function( e: Event ): void {
		// 	nl2.emit( "start", null );
		// });
		var b2 = dom.id(btn2) as HTMLButtonElement;
		b2.addEventListener( "click", function( e: Event ): void {
			nl2.emit( "stop", null );
		});


		// var b3 = dom.id(btn3) as HTMLButtonElement;
		// b3.addEventListener( "click", function( e: Event ): void {
		// 	nl2.emit( "stop", null );
		// 	nl2.emit( "delta", {"top":0.3}:Map.<variant> );
		// });
		// var b4 = dom.id(btn4) as HTMLButtonElement;
		// b4.addEventListener( "click", function( e: Event ): void {
		// 	nl2.emit( "stop", null );
		// 	nl2.emit( "delta", {"top":0.5}:Map.<variant> );
		// });
	}
}*/
