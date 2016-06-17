/**
 * @public
 * 音を再生するための裏方を取り仕切るクラス
 */
class SoundGenerator {
  /**
   * コンストラクタでAudioContextを初期化する
   */
  constructor() {
    this.context = new AudioContext();
    this.osc = null;
    this._playing = false;
  }

  /**
   * 任意の周波数の音を鳴らす
   * @param { number } freq 周波数
   * @param { number } gain 音量（0〜1）
   */
  start( freq, gain ) {
    if( this._playing == false ) {
      var osc = this.context.createOscillator();
      var gn = this.context.createGain();
      gn.gain.value = gain * 0.5;

      osc.frequency.value = freq;
      osc.connect( gn );
      gn.connect( this.context.destination );
      this.osc = osc;
      osc.start();
      this._playing = true;
    }
  }

  /**
   * 音を止める
   */
  stop() {
    if( this._playing == true ) {
      this.osc.stop();
      this._playing = false;
    }
  }

}

class chord {
  constructor( vc1, vc2 ) {
    this.sg0 = new SoundGenerator();
    this.sg1 = new SoundGenerator();
    this.sg2 = new SoundGenerator();
    this._palying = true;

    vc1.scale( 350, -30, 630, 40 );
    vc2.scale( 350, -30, 630, 70 );
    var nl = new nylon();

    // Upper Graph
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

    // Lower Graph
    nl.on( "chord", ( key, params ) => {
      vc2.cls();
      vc2.forecolor( 200, 0, 0 );
      vc2.drawWidth( 2 );
      vc2.beginPath();
      var f0 = params["freq"];
      var f1 = params["freq"] * params["waves"][1]["ratio"];
      var f2 = params["freq"] * params["waves"][2]["ratio"];
      vc2.circle( f0, 0, 5 );
      vc2.circle( f1, 0, 5 );
      vc2.circle( f2, 0, 5 );
      vc2.stroke();

      vc2.setFont( "20px sans-serif" );
      vc2.forecolor( 0, 0, 0 );
      vc2.beginPath();
      vc2.print( f0-20, -15, Math.floor(f0) + "Hz" );
      vc2.print( f1-20, -15, Math.floor(f1) + "Hz" );
      vc2.print( f2-20, -15, Math.floor(f2) + "Hz" );
      vc2.stroke();
    });

    // sound on
    nl.on( "chord", ( key, params ) => {
      if( this._playing == true ) {
        this.sg0.stop();
        this.sg1.stop();
        this.sg2.stop();
      }
      var f0 = params["freq"];
      var f1 = params["freq"] * params["waves"][1]["ratio"];
      var f2 = params["freq"] * params["waves"][2]["ratio"];

      var v0 = params["waves"][0]["amp"];
      var v1 = params["waves"][1]["amp"];
      var v2 = params["waves"][2]["amp"];

      this.sg0.start( f0, v0 );
      this.sg1.start( f1, v1 );
      this.sg2.start( f2, v2 );

      this._playing = true;
    });

    // sound off
    nl.on( "stop", ( key, params ) => {
      if( this._playing == true ) {
        this.sg0.stop();
        this.sg1.stop();
        this.sg2.stop();
      }
      this._playing = false;
    });

    // display difference
    nl.on( "chord", ( key, params ) => {
      var f0 = params["freq"];
      var f1 = params["freq"] * params["waves"][1]["ratio"];
      var f2 = params["freq"] * params["waves"][2]["ratio"];

      var v0 = params["freq"] * params["waves"][0]["amp"];
      var v1 = params["freq"] * params["waves"][1]["amp"];
      var v2 = params["freq"] * params["waves"][2]["amp"];

      document.getElementById( 'result1' ).innerHTML = Math.abs( Math.floor( f1 - v1 ) ) + "Hz";
      document.getElementById( 'result2' ).innerHTML = Math.abs( Math.floor( f2 - v2 ) ) + "Hz";
    });
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
    for( var tone in name )
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
    this.vc.scale( 350, -30, 630, 70 );

    this.background();
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
