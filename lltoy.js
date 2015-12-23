$(function() {
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
    PLLWhyn.prototype.toText = function(prec) {
      return "(?" + this.sub.toText() + ")";
    };
    return PLLWhyn;
  })();

  var lex = function(str) {
    var lex = [];
    var mch = null;
    while(str.length > 0) {
      if(mch = str.match(/^\s+/)) {
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^[a-zA-Z_][a-zA-Z_0-9]*/)) {
        lex.push(mch[0]);
        str = str.substring(mch[0].length);
      } else if(mch = str.match(/^[⊸¬⊗1⅋⊥＆⊤⊕0!?]/)) {
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

  var parseProp = function(lex, idx, prec) {
    if(prec >= 90) {
      var result0 = parseProp(lex, idx, 80);
      if(result0 == null) return null;
      var idx0 = result0[1];
      if(lex[idx0].match(/^[⊸]$/)) {
        var result1 = parseProp(lex, idx0+1, 90);
        if(result1 == null) return null;
        var idx1 = result1[1];
        return [new PLLImpl(result0[0], result1[0]), idx1];
      } else return result0;
    } else if(prec >= 80) {
      var result0 = parseProp(lex, idx, 70);
      if(result0 == null) return null;
      var idx0 = result0[1];
      if(lex[idx0].match(/^[＆⊕]$/)) {
        var result1 = parseProp(lex, idx0+1, 80);
        if(result1 == null) return null;
        var idx1 = result1[1];
        if(lex[idx0] == "＆") {
          return [new PLLWith(result0[0], result1[0]), idx1];
        } else {
          return [new PLLPlus(result0[0], result1[0]), idx1];
        }
      } else return result0;
    } else if(prec >= 70) {
      var result0 = parseProp(lex, idx, 60);
      if(result0 == null) return null;
      var idx0 = result0[1];
      if(lex[idx0].match(/^[⊗⅋]$/)) {
        var result1 = parseProp(lex, idx0+1, 70);
        if(result1 == null) return null;
        var idx1 = result1[1];
        if(lex[idx0] == "⊗") {
          return [new PLLTensor(result0[0], result1[0]), idx1];
        } else {
          return [new PLLPar(result0[0], result1[0]), idx1];
        }
      } else {
        return result0;
      }
    } else if(prec >= 60) {
      if(lex[idx].match(/^[¬!?]$/)) {
        var result0 = parseProp(lex, idx+1, 60);
        if(result0 == null) return null;
        var idx0 = result0[1];
        if(lex[idx] == "¬") {
          return [new PLLNeg(result0[0]), idx0];
        } else if(lex[idx] == "!") {
          return [new PLLOfc(result0[0]), idx0];
        } else {
          return [new PLLWhyn(result0[0]), idx0];
        }
      } else {
        return parseProp(lex, idx, 50);
      }
      var result0 = parseProp(lex, idx, 60);
      if(result0 == null) return null;
      var idx0 = result0[1];
      if(lex[idx0].match(/^[⊗⅋]$/)) {
        var result1 = parseProp(lex, idx0+1, 70);
        if(result1 == null) return null;
        var idx1 = result1[1];
        if(lex[idx0] == "⊗") {
          return [new PLLTensor(result0[0], result1[0]), idx1];
        } else {
          return [new PLLPar(result0[0], result1[0]), idx1];
        }
      } else return result0;
    } else {
      if(lex[idx] == "(") {
        var result0 = parseProp(lex, idx+1, 100);
        if(result0 == null) return null;
        var idx0 = result0[1];
        if(lex[idx0] != ")") return null;
        return [result0[0], idx0+1];
      } else if(lex[idx] == "⊤") {
        return [new PLLTop(), idx+1];
      } else if(lex[idx] == "0") {
        return [new PLLZero(), idx+1];
      } else if(lex[idx] == "1") {
        return [new PLLOne(), idx+1];
      } else if(lex[idx] == "⊥") {
        return [new PLLBot(), idx+1];
      } else if(lex[idx].match(/^[A-Za-z_][A-Za-z_0-9]*$/)) {
        return [new PLLAtom(lex[idx]), idx+1];
      }
      return null;
    }
  }
  var parse = function(lex) {
    var result = parseProp(lex, 0, 100);
    if(result == null) return null;
    var idx = result[1];
    if(lex[idx] != "$$") return null;
    return result[0];
  };

  (function() {
    var default_propositions_data = [
      "A⊸A",
      "¬¬A⊸A",
      "A⊸¬¬A",
      "A⊗B⊸A⊗B",
      "A⅋B⊸A⅋B",
      "A⊗B⊸B⊗A",
      "A⅋B⊸B⅋A",
      "A⊗(B⊗C)⊸(A⊗B)⊗C",
      "A⅋(B⅋C)⊸(A⅋B)⅋C",
      "A⊸A⊗1",
      "A⊗1⊸A",
      "A⊸A⅋⊥",
      "A⅋⊥⊸A",
      "¬A⅋¬B⊸¬(A⊗B)",
      "¬(A⊗B)⊸¬A⅋¬B",
      "¬A⊗¬B⊸¬(A⅋B)",
      "¬(A⅋B)⊸¬A⊗¬B",
      "A⊗(B⅋C)⊸(A⊗B)⅋C",
      "A＆B⊸A＆B",
      "A⊕B⊸A⊕B",
      "A＆B⊸B＆A",
      "A⊕B⊸B⊕A",
      "A＆(B＆C)⊸(A＆B)＆C",
      "A⊕(B⊕C)⊸(A⊕B)⊕C",
      "A⊸A＆⊤",
      "A＆⊤⊸A",
      "A⊸A⊕0",
      "A⊕0⊸A",
      "¬A⊕¬B⊸¬(A＆B)",
      "¬(A＆B)⊸¬A⊕¬B",
      "¬A＆¬B⊸¬(A⊕B)",
      "¬(A⊕B)⊸¬A＆¬B",
      "A⊸A＆A",
      "A＆A⊸A",
      "A⊸A⊕A",
      "A⊕A⊸A",
      "A⊗(B⊕C)⊸(A⊗B)⊕(A⊗C)",
      "(A⊗B)⊕(A⊗C)⊸A⊗(B⊕C)",
      "A⊗0⊸0",
      "0⊸A⊗0",
      "A⅋(B＆C)⊸(A⅋B)＆(A⅋C)",
      "(A⅋B)＆(A⅋C)⊸A⅋(B＆C)",
      "A⅋⊤⊸⊤",
      "⊤⊸A⅋⊤",
    ];
    var default_propositions = $("#default-propositions");
    var proposition_to_solve = $("#proposition-to-solve");
    var proof_area = $("#proof-area");
    for(var i = 0; i < default_propositions_data.length; ++i) {
      var li = $("<li></li>");
      var a = $("<a></a>").appendTo(li);
      a.attr("href", "javascript:void(0)");
      a.text(default_propositions_data[i]);
      a.click(function() {
        proposition_to_solve.val($(this).text());
      });
      default_propositions.append(li);
    }
    $("#start-proving").click(function() {
      var propstr = proposition_to_solve.val();
      var proplex = lex(propstr);
      console.log(proplex);
      var prop = parse(proplex);
      console.log(prop);
      console.log(prop.toText());
    });
  })();
});
