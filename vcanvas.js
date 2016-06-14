class VCanvas {

  constructor( canvasElement ) {
    // canvasElementを与えてください
    this.canvas = canvasElement;
    this.context = this.canvas.getContext("2d");
    this.scaleWidth = null;
    this.scaleHeight = null;
    this.scaleTop = null;
    this.slaceLeft = null;
    this._scalable = false;
    var _dir_x = 1; // X軸の向き
    var _dir_y = 1; // Y軸の向き
    var _color = [0,0,0,1]; // 色の初期値は黒
  };

  scale( left, top, width, height ) {
    // 仮想座標を設定するメソッド
    // leftとtopは左上の仮想的な座標
    // widthとheightは左上からの幅と高さ
    this.scaleLeft = left;
    this.scaleTop = top;
    this.scaleWidth = width;
    this.scaleHeight = height;
    this._scalable = true;

    if( this.scaleWidth < 0 ) {
      this.scaleWidth = -this.scaleWidth;
      this._dir_x = -1;
    } else this._dir_x = 1;

    if( this.scaleHeight < 0 ) {
      this.scaleHeight = -this.scaleHeight;
      this._dir_y = -1;
    } else this._dir_y = 1;
  };

  forecolor( r, g, b, a ) {
    var alpha = a;
    if( arguments.length == 3 ) alpha = 1
		this._color = [ r, g, b, alpha ];
		this.context.fillStyle = 'rgba(' + this._color.join(',').toString() + ')';
		this.context.strokeStyle = 'rgba(' + this._color.join(',').toString() + ')';
	}

  lineWidth( width ) {
		this.context.lineWidth = width;
	}

	drawWidth( width ) {
		this.context.lineWidth = width;
	}

  setFont( font ) {
		this.context.font = font;
	}

  line( x1, y1, x2, y2 ) {
    // 線を描画する
    if( this._scalable ) {
			var xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var xx2 = (x2 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
			var yy2 = (y2 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx1 = x1;
			var xx2 = x2;
			var yy1 = y1;
			var yy2 = y2;
		}
		this.context.moveTo( xx1, yy1 );
		this.context.lineTo( xx2, yy2 );
  }

  lineStart( x, y ) {
    // 連続的に線を描画する際の始点を設定する
		if( this._scalable ) {
			var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx = x;
			var yy = y;
		}
		this.context.moveTo( xx, yy );
	}

	lineto( x, y ) {
    // 連続的に線を描画する
		if( this._scalable ) {
			var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx1 = x1;
			var yy1 = y1;
		}
		this.context.lineTo( xx, yy );
	}

  beginPath() {
    // 描画開始
    this.context.beginPath();
  }

  stroke() {
    // 線描画
    this.context.stroke();
  }

  fill() {
    // 塗りつぶし描画
    this.context.fill();
  }

  cls() {
    // 描画領域のクリア
		this.context.beginPath();
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.context.fill();
	}

  pset( x, y ) {
    // 点を描画
		if( this._scalable ) {
			var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx = x;
			var yy = y;
		}
		this.context.moveTo( xx, yy );
		this.context.lineTo( xx+1, yy+1 );
	}

  circle( x, y, radius ) {
    // 円を描画
		var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		this.context.moveTo( xx, yy );
		this.context.arc( xx, yy, radius, 0, Math.PI*2, false);
	}

  rect( x1, y1, x2, y2 ) {
    // 長方形を描画
		var xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		var xx2 = (x2 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy2 = (y2 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;

		this.context.fillRect( xx1, yy1, xx2-xx1, yy2-yy1 );
	}

  print( x, y, str ) {
    // 文字を描画
		if( this._scalable ) {
			var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx = x;
			var yy = y;
		}
		this.context.fillText( str, xx, yy );
	}
}
