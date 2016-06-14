import "timer.jsx";

class vbTimer {
	var interval = 1000;
	var enabled = false;
	var timer : function():void;
	var _tHandle: TimerHandle;

	function enable() : void {
		if( (this.timer != null) && (this.enabled == false) ) {
			this._tHandle = Timer.setInterval(this.timer, this.interval);
			this.enabled = true;
		}
	}
	function disable() : void {
		if( this.enabled == true ) {
			Timer.clearInterval ( this._tHandle );
			this.enabled = false;
		}
	}
}
