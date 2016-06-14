class vbTimer {
  constructor() {
  	this.interval = 1000;
  	this.enabled = false;
  	this.timer = null;
  	this._tHandle = null;
  }

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
