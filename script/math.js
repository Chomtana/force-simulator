/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Math.linear = {};
Math.linear.create = function (a,b) {
	//A=a B=-1 C=b
	return {
		equation: {a:a,b:b},
		canvasmode: false,
		perpendicular: function (x,y) {
			if (this.canvasmode) {y=-y;}
			var a = -1/this.equation.a;
			var b = y-a*x;
			var result = Math.linear.create(a,b);
			result.canvasmode = this.canvasmode;
			return result;
		},
		intersection: function (eq) {
			//x = (b1-b2)/(a2-a1)
			var x = (this.equation.b-eq.equation.b)/(eq.equation.a-this.equation.a);
			var y = this.equation.a*x+this.equation.b;
			if (this.canvasmode) {y=-y;}
			return {x:x,y:y};
		},
		parallelD: function (d) {
			var c = this.equation.b-d*Math.sqrt(this.equation.a*this.equation.a+1);
			var result = Math.linear.create(this.equation.a,c);
			result.canvasmode = this.canvasmode;
			return result;
		},
		parallel: function (x,y) {
			if (this.canvasmode) {y=-y;}
			var b = y-this.equation.a*x;
			var result = Math.linear.create(this.equation.a,b);
			result.canvasmode = this.canvasmode;
			return result;
		},
		getparallelD: function (eq,abs) {
		    if (this.equation.a.toFixed(5) != eq.equation.a.toFixed(5)) {
				return false;
			}
			var cdif = abs?Math.abs(this.equation.b-eq.equation.b):this.equation.b-eq.equation.b;
			return cdif/(Math.sqrt(this.equation.a*this.equation.a+1));
		},
		getperpendicularD: function (x,y,abs) {
			return this.getparallelD(this.parallel(x,y),abs);
		},
		translate: function(x,y,d) {
			if (this.canvasmode) {
				var dummy = this.clone();
				dummy.canvasmode = false;
				var result = dummy.translate(x,-y,d);
				result.y = -result.y;
				return result;
			} else {
				var line1 = this.perpendicular(x,y);
				var line2 = line1.parallelD(d);
				var result = line2.intersection(this);
			}
			return result;
		},
		getY: function (x) {
			var result = this.equation.a*x+this.equation.b;
			if (this.canvasmode) {result = -result;}
			return result;
		},
		equal: function(eq,similar) {
			if (similar) {
				if (Math.floor(this.equation.a) == Math.floor(eq.equation.a) && Math.floor(this.equation.b) == Math.floor(eq.equation.b)) {
					return true;
				} else {
					return false;
				}
			} else {
				if (this.equation.a == eq.equation.a && this.equation.b == eq.equation.b) {
					return true;
				} else {
					return false;
				}
			}
		},
		clone: function() {
			return Math.linear.create(this.equation.a,this.equation.b);
		}
	}
};
Math.linear.getPointDistance = function(x1,y1,x2,y2,abs) {
	var xdif = x2-x1;
	var ydif = y2-y1;
	var result = Math.sqrt(xdif*xdif+ydif*ydif);
	if (!abs) {
		/*if ((xdif<0 && ydif>0) || (xdif>0 && ydif<0)) {
			result = -result;
		}*/
		if (xdif<0) {
			result = -result;
		}
	}
	return result;
};
Math.linear.createXY = function (x1,y1,x2,y2) {
	var a = (y1-y2)/(x1-x2);
	var b = y1-a*x1;
	return Math.linear.create(a,b);
};

Math.linearCanvas = {};
Math.linearCanvas.getPointDistance = function(x1,y1,x2,y2,abs) {
	y1 = -y1;
	y2 = -y2;
	return Math.linear.getPointDistance(x1,y1,x2,y2,abs);
};
Math.linearCanvas.create = function (x1,y1,x2,y2) {
	y1 = -y1;
	y2 = -y2;
	var a = (y1-y2)/(x1-x2);
	var b = y1-a*x1;
	var result = Math.linear.create(a,b);
	result.canvasmode = true;
	return result;
};

Math.getAngleFromTwoPoint = function (x1,y1,x2,y2,canvasmode) {
	var deltaX = x2-x1;
	var deltaY = y2-y1;
	if (canvasmode) {
		deltaY = y1-y2;
	}
	var result = Math.atan2(deltaX, deltaY) * 180 / Math.PI;
	if (result < 0) {
		result = 360+result;
	}
	return result;
};

Math.quadratic = function (a,b,c)  {
	var b24ac = b*b-4*a*c;
	if (b24ac > 0) {
		return [
			(-b+Math.sqrt(b24ac))/(2*a),
			(-b-Math.sqrt(b24ac))/(2*a)
		];
	} else if (b24ac == 0) {
		return [
			(-b+Math.sqrt(b24ac))/(2*a)
		];
	} else {
		return [];
	}
}