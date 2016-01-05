"use strict";

var lex = (function() {
  var latex_like_symbols = {
    "\\to" : "→",
    "\\lnot" : "¬",
    "\\land" : "∧",
    "\\lor" : "∨",
    "\\bot" : "⊥",
    "\\top" : "⊤",
    "\\Box" : "□",
    "\\Diamond" : "◊",
    "\\multimap" : "⊸",
    "\\otimes" : "⊗",
    "\\parr" : "⅋",
    "\\oplus" : "⊕",
  };
  return function(str) {
    var lex = [];
    var mch = null;
    while(str.length > 0) {
      if(mch = str.match(/^\s+/)) {
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^[a-zA-Z_][a-zA-Z_0-9]*/)) {
        lex.push(mch[0]);
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^\\[a-zA-Z_][a-zA-Z_0-9]*/)) {
        if(mch[0] in latex_like_symbols) {
          lex.push(latex_like_symbols[mch[0]]);
        } else {
          lex.push(mch[0]);
        }
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^\\?&/)) {
        lex.push("＆");
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^[→⊸∧∨⊗⅋＆⊕1⊥⊤0¬□◊!?]/)) {
        lex.push(mch[0]);
        str = str.substring(mch[0].length);
      } else {
        lex.push(str.charAt(0));
        str = str.substring(1);
      }
    }
    lex.push("$$");
    return lex;
  };
})();

var parseProp = function(logic, lex, idx, prec) {
  if(prec >= 90) {
    var result0 = parseProp(logic, lex, idx, 80);
    if(result0 == null) return null;
    var idx0 = result0[1];
    if(lex[idx0].match(logic == "linear" ? /^[⊸]$/ : /^[→]$/)) {
      var result1 = parseProp(logic, lex, idx0+1, 90);
      if(result1 == null) return null;
      var idx1 = result1[1];
      return [new PropCompound(lex[idx0], [result0[0], result1[0]]), idx1];
    } else return result0;
  } else if(prec >= 80) {
    var result0 = parseProp(logic, lex, idx, 70);
    if(result0 == null) return null;
    var idx0 = result0[1];
    if(lex[idx0].match(logic == "linear" ? /^[＆⊕]$/ : /^[∧∨]$/)) {
      var result1 = parseProp(logic, lex, idx0+1, 80);
      if(result1 == null) return null;
      var idx1 = result1[1];
      return [new PropCompound(lex[idx0], [result0[0], result1[0]]), idx1];
    } else return result0;
  } else if(prec >= 70) {
    var result0 = parseProp(logic, lex, idx, 60);
    if(result0 == null) return null;
    var idx0 = result0[1];
    if(lex[idx0].match(logic == "linear" ? /^[⊗⅋]$/ : /^$/)) {
      var result1 = parseProp(logic, lex, idx0+1, 70);
      if(result1 == null) return null;
      var idx1 = result1[1];
      return [new PropCompound(lex[idx0], [result0[0], result1[0]]), idx1];
    } else {
      return result0;
    }
  } else if(prec >= 60) {
    if(lex[idx].match(logic == "linear" ? (/^[¬!?]$/) : logic.match(/^modal_/) ? (/^[¬□◊]$/) : (/^[¬]$/))) {
      var result0 = parseProp(logic, lex, idx+1, 60);
      if(result0 == null) return null;
      var idx0 = result0[1];
      return [new PropCompound(lex[idx], [result0[0]]), idx0];
    } else {
      return parseProp(logic, lex, idx, 50);
    }
  } else {
    if(lex[idx] == "(") {
      var result0 = parseProp(logic, lex, idx+1, 100);
      if(result0 == null) return null;
      var idx0 = result0[1];
      if(lex[idx0] != ")") return null;
      return [result0[0], idx0+1];
    } else if(logic == "linear" && lex[idx] == "⊤") {
      return [new PropCompound("＆", []), idx+1];
    } else if(logic == "linear" && lex[idx] == "0") {
      return [new PropCompound("⊕", []), idx+1];
    } else if(logic == "linear" && lex[idx] == "1") {
      return [new PropCompound("⊗", []), idx+1];
    } else if(logic == "linear" && lex[idx] == "⊥") {
      return [new PropCompound("⅋", []), idx+1];
    } else if(logic != "linear" && lex[idx] == "⊤") {
      return [new PropCompound("∧", []), idx+1];
    } else if(logic != "linear" && lex[idx] == "⊥") {
      return [new PropCompound("∨", []), idx+1];
    } else if(lex[idx].match(/^[A-Z][A-Za-z_0-9]*$/)) {
      return [new PropCompound(lex[idx], []), idx+1];
    }
    return null;
  }
}
var parse = function(logic, lex) {
  var result = parseProp(logic, lex, 0, 100);
  if(result == null) return null;
  var idx = result[1];
  if(lex[idx] != "$$") return null;
  return result[0];
};
