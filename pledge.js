/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:



function $Promise(){
	this.state = "pending";
	this.handlerGroups = [];
	this.value;
	this.then = function(successCb, errorCb){
		if(typeof successCb !== "function" && typeof errorCb !== "function"){
			this.handlerGroups.push({
				successCb: undefined,
				errorCb: undefined
				}
			);
		}else{
			this.handlerGroups.push({
				successCb: successCb,
				errorCb: errorCb
				}
			);
		}
		this.callHandlers();
		
	}
}
$Promise.prototype.callHandlers = function(){
	if(this.state==="pending"){
		
		return;
		// setTimeout(function(){
		// 	if(this.state==="resolved"){
		// 		this.callHandlers();
		// 	}
		// },1000)
	}

	while(this.handlerGroups.length){
		var group = this.handlerGroups.shift();
		if(this.state==="resolved"){
			group.successCb(this.value)
		}else if(this.state==="rejected"){
			group.errorCb(this.value)
		}
	}
}

function Deferral(){
	this.$promise = new $Promise();
	this.resolveFlag = false;
	this.rejectFlag = false;

	// return new $Promise();
}
Deferral.prototype.resolve = function(value) {

	if(this.$promise.state === "rejected"){
	
	}else{
		this.$promise.state = "resolved";
		if(!this.resolveFlag){
			this.$promise.value = value;
			this.resolveFlag = true;
		}
		this.$promise.callHandlers();
	}
};


Deferral.prototype.reject = function(error) {
	if(this.$promise.state === "resolved"){

	}else{
		this.$promise.state = "rejected";
		if(!this.rejectFlag){
			this.$promise.value = error;
			this.rejectFlag = true;
		}
		this.$promise.callHandlers();
	};
};

function defer(){
	return new Deferral();
}

/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
