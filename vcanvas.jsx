/* 仮想座標グラフィックライブラリ */
import "js/web.jsx";

final class VCanvas {
	var context: CanvasRenderingContext2D;
	var canvas: HTMLCanvasElement;
	var scaleWidth: number;
	var scaleHeight: number;
	var scaleTop: number;
	var scaleLeft: number;
	var _scalable = false;
	var _dir_x = 1;	// direction of X axis
	var _dir_y = 1;	// direction of Y axis
	var color: Array.<number> = [ 0, 0, 0, 1 ];
	var width: number;
	var height: number;

	function constructor( canvas: HTMLCanvasElement ) {
		this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.canvas = canvas;
		var x = canvas.offsetLeft;
		var y = canvas.offsetTop;
		this.width = canvas.width;
		this.height = canvas.height;
	}

	function getContext(): CanvasRenderingContext2D {
		return this.context;
	}

	function getImageData( sx: number, sy: number, sw: number, sh: number ): ImageData {
		return this.context.getImageData( sx, sy, sw, sh );
	}

	function putImageData( picture: ImageData, sx: number, sy: number ): void {
		this.context.putImageData( picture, sx, sy );
	}

	function scale( left: number, top: number, width: number, height: number ): void {
		this.scaleLeft = left;
		this.scaleTop = top;
		this.scaleWidth = width;
		this.scaleHeight = height;
		this._scalable = true;
		if( this.scaleWidth < 0 ) {
			this.scaleWidth = -this.scaleWidth;
			this._dir_x = -1;
		} else	this._dir_x = 1;
		if( this.scaleHeight < 0 ) {
			this.scaleHeight = -this.scaleHeight;
			this._dir_y = -1;
		} else	this._dir_y = 1;
	}

	function forecolor( r: number, g: number, b: number ): void {
		this.color = [r, g, b, 1 ];
		this.context.fillStyle = 'rgba(' + this.color.join(',').toString() + ')';
		this.context.strokeStyle = 'rgba(' + this.color.join(',').toString() + ')';
	}

	function forecolor( r: number, g: number, b: number, a: number ): void {
		this.color = [r, g, b, a ];
		this.context.fillStyle = 'rgba(' + this.color.join(',').toString() + ')';
		this.context.strokeStyle = 'rgba(' + this.color.join(',').toString() + ')';
	}

	function line( x1: number, y1: number, x2: number, y2: number ): void {
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

	function lineStart( x1: number, y1: number ): void {
		if( this._scalable ) {
			var xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx1 = x1;
			var yy1 = y1;
		}
		this.context.moveTo( xx1, yy1 );
	}

	function line( x1: number, y1: number ): void {
		if( this._scalable ) {
			var xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx1 = x1;
			var yy1 = y1;
		}
		this.context.lineTo( xx1, yy1 );
	}

	function cls(): void {
		this.context.beginPath();
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.context.fill();
	}

	function print( x: number, y: number, str: string ): void {
		if( this._scalable ) {
			var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
			var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		} else {
			var xx = x;
			var yy = y;
		}
		this.context.fillText( str, xx, yy );
	}

	function pset( x: number, y: number ): void {
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
	function circle( x: number, y: number , radius: number): void {
		var xx = (x - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy = (y - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		var rr = (radius - this.scaleLeft) * this.canvas.width / this.scaleWidth;
		this.context.arc( xx, yy, radius, 0, Math.PI*2, false);
	}
	function rect( x1: number, y1: number , x2: number, y2: number): void {
		var xx1 = (x1 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy1 = (y1 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;
		var xx2 = (x2 - this.scaleLeft) * this.canvas.width / this.scaleWidth * this._dir_x;
		var yy2 = (y2 - this.scaleTop) * this.canvas.height / this.scaleHeight * this._dir_y;

		this.context.fillRect( xx1, yy1, xx2-xx1, yy2-yy1 );
	}
	function beginPath(): void {
		this.context.beginPath();
	}
	function fill(): void {
		this.context.fill();
	}
	function stroke(): void {
		this.context.stroke();
	}
	function lineWidth( width: number ): void {
		this.context.lineWidth = width;
	}
	function drawWidth( width: number ): void {
		this.context.lineWidth = width;
	}
	function setFont( font: string ) : void {
		this.context.font = font;
	}
}
