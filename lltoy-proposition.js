"use strict";

var PropCommon = (function() {
  var PropCommon = function() {
  };
  return PropCommon;
})();
var PropVar = (function() {
  var PropVar = function() {
  };
  PropVar.prototype = Object.create(PropCommon.prototype);
  PropVar.prototype.constructor = PropVar;
  return PropVar;
})();
var PropCompound = (function() {
  var PropCompound = function(name, args) {
    this.name = name;
    this.args = args;
  };
  PropCompound.prototype = Object.create(PropCommon.prototype);
  PropCompound.prototype.constructor = PropCompound;
  var unit_name_table = {
    "∧": "⊤",
    "∨": "⊥",
    "⊗": "1",
    "⅋": "⊥",
    "＆": "⊤",
    "⊕": "0",
  };
  PropCompound.prototype.toText = function() {
    if(this.name.match(/^[A-Z][A-Za-z_0-9]*$/)) {
      var ret = this.name;
      if(this.args.length > 0) {
        ret += "(";
        for(var i = 0; i < this.args.length; ++i) {
          if(i > 0) ret += ", ";
          ret += this.args[i].toText();
        }
        ret += ")";
      }
      return ret;
    } else if(this.name.match(/^[¬□◊!?]$/)) {
      return "(" + this.name + this.args[0].toText() + ")";
    } else if(this.name.match(/^[→⊸∧∨⊗⅋＆⊕]$/)) {
      if(this.args.length == 0) {
        return unit_name_table[this.name];
      } else {
        return "(" + this.args[0].toText() + this.name + this.args[1].toText() + ")";
      }
    } else {
      console.log("TODO");
    }
  };
  return PropCompound;
})();
