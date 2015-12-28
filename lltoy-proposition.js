"use strict";

var Proposition = (function() {
  var Proposition = function() {
  };
  return Proposition;
})();
var PLLAtom = (function() {
  var PLLAtom = function(name) {
    this.name = name;
  };
  PLLAtom.prototype = Object.create(Proposition.prototype);
  PLLAtom.prototype.constructor = PLLAtom;
  PLLAtom.prototype.is_conjunctive = null;
  PLLAtom.prototype.llkind = "atom";
  PLLAtom.prototype.arity = 0;
  PLLAtom.prototype.toText = function(prec) {
    return this.name;
  }
  return PLLAtom;
})();
var PLLImpl = (function() {
  var PLLImpl = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  };
  PLLImpl.prototype = Object.create(Proposition.prototype);
  PLLImpl.prototype.constructor = PLLImpl;
  PLLImpl.prototype.is_conjunctive = false;
  PLLImpl.prototype.llkind = "multiplicative";
  PLLImpl.prototype.arity = 2;
  PLLImpl.prototype.toText = function(prec) {
    return "(" + this.lhs.toText() + "⊸" + this.rhs.toText() + ")";
  };
  return PLLImpl;
})();
var PLLNeg = (function() {
  var PLLNeg = function(sub) {
    this.sub = sub;
  };
  PLLNeg.prototype = Object.create(Proposition.prototype);
  PLLNeg.prototype.constructor = PLLNeg;
  PLLNeg.prototype.is_conjunctive = null;
  PLLNeg.prototype.llkind = "neg";
  PLLNeg.prototype.arity = 1;
  PLLNeg.prototype.toText = function(prec) {
    return "(¬" + this.sub.toText() + ")";
  };
  return PLLNeg;
})();
var PLLWith = (function() {
  var PLLWith = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  };
  PLLWith.prototype = Object.create(Proposition.prototype);
  PLLWith.prototype.constructor = PLLWith;
  PLLWith.prototype.is_conjunctive = true;
  PLLWith.prototype.llkind = "additive";
  PLLWith.prototype.arity = 2;
  PLLWith.prototype.toText = function(prec) {
    return "(" + this.lhs.toText() + "＆" + this.rhs.toText() + ")";
  };
  return PLLWith;
})();
var PLLTop = (function() {
  var PLLTop = function() {
  };
  PLLTop.prototype = Object.create(Proposition.prototype);
  PLLTop.prototype.constructor = PLLTop;
  PLLTop.prototype.is_conjunctive = true;
  PLLTop.prototype.llkind = "additive";
  PLLTop.prototype.arity = 0;
  PLLTop.prototype.toText = function(prec) {
    return "⊤";
  };
  return PLLTop;
})();
var PLLPlus = (function() {
  var PLLPlus = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  };
  PLLPlus.prototype = Object.create(Proposition.prototype);
  PLLPlus.prototype.constructor = PLLPlus;
  PLLPlus.prototype.is_conjunctive = false;
  PLLPlus.prototype.llkind = "additive";
  PLLPlus.prototype.arity = 2;
  PLLPlus.prototype.toText = function(prec) {
    return "(" + this.lhs.toText() + "⊕" + this.rhs.toText() + ")";
  };
  return PLLPlus;
})();
var PLLZero = (function() {
  var PLLZero = function() {
  };
  PLLZero.prototype = Object.create(Proposition.prototype);
  PLLZero.prototype.constructor = PLLZero;
  PLLZero.prototype.is_conjunctive = false;
  PLLZero.prototype.llkind = "additive";
  PLLZero.prototype.arity = 0;
  PLLZero.prototype.toText = function(prec) {
    return "0";
  };
  return PLLZero;
})();
var PLLTensor = (function() {
  var PLLTensor = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  };
  PLLTensor.prototype = Object.create(Proposition.prototype);
  PLLTensor.prototype.constructor = PLLTensor;
  PLLTensor.prototype.is_conjunctive = true;
  PLLTensor.prototype.llkind = "multiplicative";
  PLLTensor.prototype.arity = 2;
  PLLTensor.prototype.toText = function(prec) {
    return "(" + this.lhs.toText() + "⊗" + this.rhs.toText() + ")";
  };
  return PLLTensor;
})();
var PLLOne = (function() {
  var PLLOne = function() {
  };
  PLLOne.prototype = Object.create(Proposition.prototype);
  PLLOne.prototype.constructor = PLLOne;
  PLLOne.prototype.is_conjunctive = true;
  PLLOne.prototype.llkind = "multiplicative";
  PLLOne.prototype.arity = 0;
  PLLOne.prototype.toText = function(prec) {
    return "1";
  };
  return PLLOne;
})();
var PLLPar = (function() {
  var PLLPar = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  };
  PLLPar.prototype = Object.create(Proposition.prototype);
  PLLPar.prototype.constructor = PLLPar;
  PLLPar.prototype.is_conjunctive = false;
  PLLPar.prototype.llkind = "multiplicative";
  PLLPar.prototype.arity = 2;
  PLLPar.prototype.toText = function(prec) {
    return "(" + this.lhs.toText() + "⅋" + this.rhs.toText() + ")";
  };
  return PLLPar;
})();
var PLLBot = (function() {
  var PLLBot = function() {
  };
  PLLBot.prototype = Object.create(Proposition.prototype);
  PLLBot.prototype.constructor = PLLBot;
  PLLBot.prototype.is_conjunctive = false;
  PLLBot.prototype.llkind = "multiplicative";
  PLLBot.prototype.arity = 0;
  PLLBot.prototype.toText = function(prec) {
    return "⊥";
  };
  return PLLBot;
})();
var PLLOfc = (function() {
  var PLLOfc = function(sub) {
    this.sub = sub;
  };
  PLLOfc.prototype = Object.create(Proposition.prototype);
  PLLOfc.prototype.constructor = PLLOfc;
  PLLOfc.prototype.is_conjunctive = true;
  PLLOfc.prototype.llkind = "exponential";
  PLLOfc.prototype.arity = 1;
  PLLOfc.prototype.toText = function(prec) {
    return "(!" + this.sub.toText() + ")";
  };
  return PLLOfc;
})();
var PLLWhyn = (function() {
  var PLLWhyn = function(sub) {
    this.sub = sub;
  };
  PLLWhyn.prototype = Object.create(Proposition.prototype);
  PLLWhyn.prototype.constructor = PLLWhyn;
  PLLWhyn.prototype.is_conjunctive = false;
  PLLWhyn.prototype.llkind = "exponential";
  PLLWhyn.prototype.arity = 1;
  PLLWhyn.prototype.toText = function(prec) {
    return "(?" + this.sub.toText() + ")";
  };
  return PLLWhyn;
})();
