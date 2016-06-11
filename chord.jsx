import "js/web.jsx";
import "vcanvas.jsx";
import "nylon.client.jsx";
import "vbTimer.jsx";

class SoundGenerator {
	var data = []: Array.<number>;
	var offset: number;
	var sampleRate: number;
	var bufferSize: number;
	var stream_length = 4096;
	var samplerate = 48000;
	var channel = 1;

	function create( freq: number, rate: number, member: Array.<number> ) : void {
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
	function next( ) : Array.<number> {
		var stream = []: Array.<number>;
		for( var i=0; i<this.stream_length; i++ ) {
			stream[i] = this.data[ i + this.offset ];
		}
		this.offset += this.stream_length;
		return stream;
	}
	function getSize() : number {
		return this.bufferSize;
	}
	function rewind() : void {
		this.offset = 0;
	}
	function clear() : void {
		for( var i=0; i<this.bufferSize; i++ ) {
			this.data[i] = 0;
		}
	}
}
class WebAudio {
	var context = new AudioContext;
	var buf: AudioBuffer;
//	var dest: AudioDestinationNode;
	var isPlaying = false;
	var sampleRate: number;
	var src: AudioBufferSourceNode;

	function play( freq: number, data: Array.<number> ) : void {
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
		src.noteOn( 0 );
	}
	function play( freq: number, member: Array.<Map.<number>> ) : void {
		this.buf = this.context.createBuffer(1, this.context.sampleRate, this.context.sampleRate);
		var sound_data = this.buf.getChannelData( 0 );
		for( var i=0; i<this.context.sampleRate; i++ ){
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
	}
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
	}
	function stop() : void {
//		this.node.disconnect();
		if( this.isPlaying == true )	this.src.noteOff( 0 );
		this.isPlaying = false;
	}
	function constructor() {
		this.sampleRate = this.context.sampleRate;
	}
}
final class chord {
	var vc1: VCanvas;
	var wa: WebAudio;

	static function main( canvas1Id: string ) : void {
		var elm1 = dom.id(canvas1Id) as HTMLCanvasElement;
		var vc1 = new VCanvas( elm1 );
		var mychord = new chord( vc1 );
	}
	function constructor( vc1: VCanvas ) {

		this.vc1 = vc1;
		this.vc1.scale( 0.787, -9.85, 1.44, 16.04 );
		this.wa = new WebAudio();

		var nl = new nylon();
		nl.on( "stop", ( dummy: Map.<variant> ): void -> {
			this.wa.stop();
		});

		var b11 = dom.id("b11") as HTMLButtonElement;
		b11.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":4/3, "val":4/3}, {"key":5/3,"val":5/3}]);
		});
		var b12 = dom.id("b12") as HTMLButtonElement;
		b12.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":5/4, "val":5/4}, {"key":6/4,"val":6/4}]);
		});
		var b13 = dom.id("b13") as HTMLButtonElement;
		b13.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":6/5, "val":6/5}, {"key":7/5,"val":7/5}]);
		});
		var b14 = dom.id("b14") as HTMLButtonElement;
		b14.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":7/6, "val":7/6}, {"key":8/6,"val":8/6}]);
		});
		var b15 = dom.id("b15") as HTMLButtonElement;
		b15.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":7/5, "val":7/5}, {"key":9/5,"val":9/5}]);
		});
		var b16 = dom.id("b16") as HTMLButtonElement;
		b16.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":8/6, "val":8/6}, {"key":9/6,"val":9/6}]);
		});
		var b21 = dom.id("b21") as HTMLButtonElement;
		b21.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.335, "val":4/3}, {"key":1.682,"val":5/3}]);
		});
		var b22 = dom.id("b22") as HTMLButtonElement;
		b22.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.26, "val":5/4}, {"key":1.498,"val":6/4}]);
		});
		var b23 = dom.id("b23") as HTMLButtonElement;
		b23.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.189, "val":6/5}, {"key":1.414,"val":7/5}]);
		});
		var b24 = dom.id("b24") as HTMLButtonElement;
		b24.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.189, "val":7/6}, {"key":1.335,"val":8/6}]);
		});
		var b25 = dom.id("b25") as HTMLButtonElement;
		b25.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.414, "val":7/5}, {"key":1.782,"val":9/5}]);
		});
		var b26 = dom.id("b26") as HTMLButtonElement;
		b26.addEventListener( "click", function( e: Event ): void {
			this.sound( 440, [{"key":1, "val":1}, {"key":1.335, "val":8/6}, {"key":1.498,"val":9/6}]);
		});
		var b2 = dom.id( "stop" ) as HTMLButtonElement;
		b2.addEventListener( "click", function( e: Event ): void {
			this.wa.stop();
		});

	}

	function sound( freq: number, member: Array.<Map.<number>> ) : void {
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
		vc.print( f0 - 0.05, -2.2, ( (f0 * 440) as int ) as string + "Hz" );
		vc.print( f1 - 0.05, -2.2, ( (f1 * 440) as int ) as string + "Hz" );
		vc.print( f2 - 0.05, -2.2, ( (f2 * 440) as int ) as string + "Hz" );

		this.wa.play( freq, 5, member );

		var res1 = dom.id( "result1" );
		res1.innerHTML = Math.abs( 440 * ( f1 - member[1]["val"] ) ) as int as string + "Hz";
		var res2 = dom.id( "result2" );
		res2.innerHTML = Math.abs( 440 * ( f2 - member[2]["val"] ) ) as int as string + "Hz";

	}
}

class gui {
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
}
