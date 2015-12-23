"use strict";
$(function() {
  var UsageResolutionError = (function() {
    var UsageResolutionError = function(message) {
      this.message = message;
    };
    UsageResolutionError.prototype.name = "UsageResolutionError";
    return UsageResolutionError;
  })();
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

  var SequentItem = (function() {
    var SequentItem = function(prop, is_in_succedent) {
      var self = this;
      this.parent = null;
      this.usage_equations = [];
      this.prop = prop;
      this.sequent = null;
      this.is_in_succedent = is_in_succedent;
      this.usage = null;

      this.actions = null;
      if(this.prop instanceof PLLAtom) {
        this.actions = ["atom"];
      } else if(this.prop instanceof PLLNeg) {
        this.actions = ["neg"];
      } else if(this.prop.llkind == "multiplicative") {
        if(this.is_conjunctive_left()) {
          this.actions = ["mult1"];
        } else {
          this.actions = ["mult2"];
        }
      } else if(this.prop.llkind == "additive") {
        if(this.is_conjunctive_left()) {
          if(this.prop.arity == 0) {
            this.actions = ["do_nothing"];
          } else {
            this.actions = ["add1L", "add1R"];
          }
        } else {
          this.actions = ["add2"];
        }
      } else if(this.prop.llkind == "exponential") {
        if(this.is_conjunctive_left()) {
          this.actions = ["dereliction", "weakening", "contraction"];
        } else {
          this.actions = ["promotion"];
        }
      } else {
        console.log("TODO");
      }

      this.html_main_button = $("<button></button>");
      this.html_main_button.addClass("btn");

      if(this.actions.length >= 2) {
        this.html_main_button.addClass("dropdown-toggle");
        this.html_main_button.attr("data-toggle", "dropdown");
        this.html_main_button.attr("aria-haspopup", "true");
        this.html_main_button.attr("aria-expanded", "false");
        this.html_action_buttons_ul = $("<ul class=\"dropdown-menu\"></ul>");
        this.html_action_buttons = Array(this.actions.length);
        for(var i = 0; i < this.actions.length; ++i) {
          this.html_action_buttons[i] = $("<button></button>");
          this.html_action_buttons[i].addClass("btn");
          this.html_action_buttons[i].addClass("btn-default");
          if(this.actions[i] == "add1L") {
            this.html_action_buttons[i].text(this.prop.lhs.toText());
          } else if(this.actions[i] == "add1R") {
            this.html_action_buttons[i].text(this.prop.rhs.toText());
          } else if(this.actions[i] == "dereliction") {
            this.html_action_buttons[i].text(this.prop.sub.toText());
          } else if(this.actions[i] == "weakening") {
            this.html_action_buttons[i].text("-");
          } else if(this.actions[i] == "contraction") {
            this.html_action_buttons[i].text(this.prop.toText() + ", " + this.prop.toText());
          }
          var fun = (function(action) {
            return (function() {
              if(self.sequent.children == null) {
                self.sequent.applyOn(self, action);
              }
            });
          })(this.actions[i]);
          this.html_action_buttons[i].click(fun);
          $("<li></li>").appendTo(this.html_action_buttons_ul).append(this.html_action_buttons[i]);
        }
        this.html_main = $("<span class=\"btn-group\" role=\"group\"></span>");
        this.html_main.append(this.html_main_button);
        this.html_main.append(this.html_action_buttons_ul);
      } else {
        var fun = (function(action) {
          return (function() {
            if(self.sequent.children == null) {
              self.sequent.applyOn(self, action);
            }
          });
        })(this.actions[0]);
        this.html_main_button.click(fun);
        this.html_main = this.html_main_button;
      }
    };
    SequentItem.prototype.is_conjunctive_left = function() {
      return this.prop.is_conjunctive != this.is_in_succedent;
    }
    SequentItem.prototype.updateHTML = function() {
      this.html_main_button.removeClass("btn-default");
      this.html_main_button.removeClass("btn-primary");
      this.html_main_button.removeClass("btn-info");
      this.html_main_button.removeClass("disabled");
      if(this.sequent.children == null) {
        if(this == this.sequent.pending_target) {
          this.html_main_button.addClass("btn-info");
        } else {
          this.html_main_button.addClass("btn-default");
        }
      } else {
        this.html_main_button.addClass("disabled");
        if(this.sequent.targets.indexOf(this) >= 0) {
          this.html_main_button.addClass("btn-primary");
        } else {
          this.html_main_button.addClass("btn-default");
        }
      }
      if(this.usage == 1) {
        this.html_main_button.text(this.prop.toText());
      } else {
        this.html_main_button.text("[" + this.prop.toText() + "]");
      }
      if(this.actions.length >= 2) {
        this.html_main_button.append(" <span class=\"caret\"></span>");
      }
      if(this.usage == 0) {
        this.html_main_button.addClass("hidden");
      } else {
        this.html_main_button.removeClass("hidden");
      }
    };
    SequentItem.prototype.setUsage = function(new_usage) {
      if(this.usage == new_usage) return;
      if(this.usage != null) throw new UsageResolutionError();
      this.usage = new_usage;
      this.solveUsageEquations();
      if(this.parent != null) {
        this.parent.solveUsageEquations();
      }
    };
    SequentItem.prototype.solveUsageEquations = function() {
      for(var i = 0; i < this.usage_equations.length; ++i) {
        var eqn = this.usage_equations[i];
        if(eqn[0] == 1) {
          this.setUsage(1);
          continue;
        }
        var zerocount = 0, onecount = 0, indefcount = 0;
        for(var j = 0; j < eqn.length; ++j) {
          if(eqn[j].usage == 0) ++zerocount;
          else if(eqn[j].usage == 1) ++onecount;
          else if(eqn[j].usage == null) ++indefcount;
        }
        if(onecount >= 2) throw new UsageResolutionError();
        else if(onecount == 1) this.setUsage(1);
        else if(indefcount == 0) this.setUsage(0);
      }
      for(var i = 0; i < this.usage_equations.length; ++i) {
        var eqn = this.usage_equations[i];
        if(eqn[0] == 1) continue;
        var zerocount = 0, onecount = 0, indefcount = 0;
        for(var j = 0; j < eqn.length; ++j) {
          if(eqn[j].usage == 0) ++zerocount;
          else if(eqn[j].usage == 1) ++onecount;
          else if(eqn[j].usage == null) ++indefcount;
        }
        if(this.usage == 0 || (this.usage == 1 && onecount >= 1) || (this.usage != null && indefcount == 1)) {
          for(var j = 0; j < eqn.length; ++j) {
            if(eqn[j].usage == null) eqn[j].setUsage(this.usage - onecount);
          }
        }
      }
    };
    return SequentItem;
  })();
  var Sequent = (function() {
    var Sequent = function(parent, items) {
      var self = this;
      this.parent = parent;
      this.items = items;
      this.pending_target = null;
      this.targets = null;
      this.children = null;
      this.update_hook = null;
      for(var i = 0; i < this.items.length; ++i) {
        this.items[i].sequent = this;
      }

      this.html_container = $("<div></div>");
      this.html_main = $("<span></span>").appendTo(this.html_container);
      this.html_main.addClass("btn-group");
      this.html_ul = $("<ul></ul>").appendTo(this.html_container);
      for(var i = 0; i < this.items.length; ++i) {
        if(!this.items[i].is_in_succedent) {
          this.items[i].html_main.appendTo(this.html_main);
        }
      }
      this.html_turnstile = $("<button class=\"btn btn-danger disabled\">⊦</button>").appendTo(this.html_main);
      this.html_turnstile.click(function() {
        if(self.children != null) {
          self.targets = null;
          self.children = null;
          for(var i = 0; i < self.items.length; ++i) {
            self.items[i].usage_equations = [];
          }
          self.reconstructChildren();
          self.root().update();
        }
      });
      for(var i = 0; i < this.items.length; ++i) {
        if(this.items[i].is_in_succedent) {
          this.items[i].html_main.appendTo(this.html_main);
        }
      }
    };
    Sequent.prototype.applyOn = function(target_item, action) {
      if(action == "do_nothing") return;
      var old_pending_target = this.pending_target;
      this.pending_target = null;
      this.children = null;
      this.targets = null;
      var cancelled = false;

      if(action == "atom") {
        this.targets = [old_pending_target, target_item];
        this.pending_target = target_item;
        if(old_pending_target == null ||
            (old_pending_target.is_in_succedent == target_item.is_in_succedent) ||
            old_pending_target.prop.name != target_item.prop.name) {
          cancelled = true;
        }
      } else {
        this.targets = [target_item];
      }

      var num_children = null;
      var homoinheritance = null;
      if(["neg", "mult1", "add1L", "add1R", "dereliction", "weakening", "contraction", "promotion"].indexOf(action) >= 0) {
        num_children = 1;
        homoinheritance = true;
      } else if(action == "atom" || action == "mult2" || action == "add2") {
        num_children = target_item.prop.arity;
        homoinheritance = (action == "add2");
      }
      var child_items = Array(num_children);
      for(var childidx = 0; childidx < num_children; ++childidx) {
        child_items[childidx] = [[], [], []];
      }
      for(var i = 0; i < this.items.length; ++i) {
        var itemi = this.items[i];
        itemi.usage_equations = [];
        if(this.targets.indexOf(itemi) >= 0) {
          if(action == "atom") {
          } else if(action == "neg") {
            if(itemi.is_in_succedent) {
              child_items[0][2].push(new SequentItem(itemi.prop.sub, !itemi.is_in_succedent));
            } else {
              child_items[0][0].push(new SequentItem(itemi.prop.sub, !itemi.is_in_succedent));
            }
          } else if(action == "mult1") {
            if(itemi.prop.arity == 2) {
              if(itemi.prop instanceof PLLImpl) {
                child_items[0][2].push(new SequentItem(itemi.prop.lhs, !itemi.is_in_succedent));
              } else {
                child_items[0][1].push(new SequentItem(itemi.prop.lhs, itemi.is_in_succedent));
              }
              child_items[0][1].push(new SequentItem(itemi.prop.rhs, itemi.is_in_succedent));
            }
          } else if(action == "add1L") {
            child_items[0][1].push(new SequentItem(itemi.prop.lhs, itemi.is_in_succedent));
          } else if(action == "add1R") {
            child_items[0][1].push(new SequentItem(itemi.prop.rhs, itemi.is_in_succedent));
          } else if(action == "mult2" || action == "add2") {
            for(var childidx = 0; childidx < num_children; ++childidx) {
              if(itemi.prop instanceof PLLImpl && childidx == 0) {
                child_items[childidx][0].push(new SequentItem(itemi.prop.lhs, !itemi.is_in_succedent));
              } else if(childidx == 0) {
                child_items[childidx][1].push(new SequentItem(itemi.prop.lhs, itemi.is_in_succedent));
              } else {
                child_items[childidx][1].push(new SequentItem(itemi.prop.rhs, itemi.is_in_succedent));
              }
            }
          } else if(action == "dereliction") {
            child_items[0][1].push(new SequentItem(itemi.prop.sub, itemi.is_in_succedent));
          } else if(action == "weakening") {
          } else if(action == "contraction") {
            child_items[0][1].push(new SequentItem(itemi.prop, itemi.is_in_succedent));
            child_items[0][1].push(new SequentItem(itemi.prop, itemi.is_in_succedent));
          } else if(action == "promotion") {
            child_items[0][1].push(new SequentItem(itemi.prop.sub, itemi.is_in_succedent));
          } else {
            console.log("TODO");
          }
          itemi.usage_equations.push([1]);
        } else {
          var eqn2 = [];
          for(var childidx = 0; childidx < num_children; ++childidx) {
            var child_item = new SequentItem(itemi.prop, itemi.is_in_succedent);
            child_item.parent = itemi;
            child_items[childidx][1].push(child_item);
            eqn2.push(child_item);
            if(homoinheritance) {
              itemi.usage_equations.push([child_item]);
            }
          }
          if(!homoinheritance) {
            itemi.usage_equations.push(eqn2);
          }
          if(action == "promotion") {
            if(itemi.prop.llkind != "exponential" || !itemi.is_conjunctive_left()) {
              itemi.usage_equations.push([]);
            }
          }
        }
      }
      if(!cancelled) {
        try {
          for(var i = 0; i < this.items.length; ++i) {
            this.items[i].solveUsageEquations();
          }
        } catch(e) {
          if(e instanceof UsageResolutionError) {
            cancelled = true;
          } else throw e;
        }
      }
      if(!cancelled) {
        this.children = [];
        for(var childidx = 0; childidx < num_children; ++childidx) {
          var l = child_items[childidx];
          var ll = l[0].concat(l[1]).concat(l[2]);
          this.children.push(new Sequent(this, ll));
        }
        this.pending_target = null;
      } else {
        this.children = null;
        this.targets = null;
        for(var i = 0; i < this.items.length; ++i) {
          this.items[i].usage_equations = [];
        }
      }
      this.reconstructChildren();
      this.root().update();
    };
    Sequent.prototype.root = function() {
      return this.parent == null ? this : this.parent.root();
    }
    Sequent.prototype.reconstructChildren = function() {
      this.html_ul.empty();
      this.html_turnstile.removeClass("btn-danger");
      this.html_turnstile.removeClass("btn-success");
      this.html_turnstile.removeClass("disabled");
      if(this.children == null) {
        this.html_turnstile.addClass("btn-danger");
        this.html_turnstile.addClass("disabled");
      } else {
        this.html_turnstile.addClass("btn-success");
        for(var i = 0; i < this.children.length; ++i) {
          var html_li = $("<li></li>").appendTo(this.html_ul);
          html_li.append(this.children[i].html_container);
        }
      }
    };
    Sequent.prototype.resetUsage = function() {
      for(var i = 0; i < this.items.length; ++i) {
        this.items[i].usage = null;
      }
      if(this.children != null) {
        for(var i = 0; i < this.children.length; ++i) {
          this.children[i].resetUsage();
        }
      }
    };
    Sequent.prototype.updateUsage = function() {
      for(var i = 0; i < this.items.length; ++i) {
        if(this.items[i].parent == null) {
          this.items[i].setUsage(1);
        }
        this.items[i].solveUsageEquations();
      }

      if(this.children != null) {
        for(var i = 0; i < this.children.length; ++i) {
          this.children[i].updateUsage();
        }
      }
    };
    Sequent.prototype.updateHTML = function() {
      for(var i = 0; i < this.items.length; ++i) {
        this.items[i].updateHTML();
      }

      if(this.children != null) {
        for(var i = 0; i < this.children.length; ++i) {
          this.children[i].updateHTML();
        }
      }
    };
    Sequent.prototype.update = function() {
      this.resetUsage();
      this.updateUsage();
      this.updateHTML();
      if(this.update_hook) {
        this.update_hook();
      }
    };
    Sequent.prototype.countRemainingGoals = function() {
      if(this.children == null) return 1;
      var sum = 0;
      for(var i = 0; i < this.children.length; ++i) {
        sum += this.children[i].countRemainingGoals();
      }
      return sum;
    };
    return Sequent;
  })();

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
      "(B⊸C)⊸((A⊸B)⊸(A⊸C))",
      "(A⊸(B⊸C))⊸(B⊸(A⊸C))",
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
      "A⊗(B＆C)⊸(A⊗B)＆(A⊗C)",
      "A⊗⊤⊸⊤",
      "(A⅋B)⊕(A⅋C)⊸A⅋(B⊕C)",
      "0⊸A⅋0",
      "!A⊸A",
      "!!A⊸!A",
      "!A⊸!!A",
      "A⊸?A",
      "?A⊸??A",
      "??A⊸?A",
      "!A⊸!?!A",
      "?!?A⊸?A",
      "¬!A⊸?¬A",
      "?¬A⊸¬!A",
      "¬?A⊸!¬A",
      "!¬A⊸¬?A",
      "!(A＆B)⊸!A⊗!B",
      "!A⊗!B⊸!(A＆B)",
      "!⊤⊸1",
      "1⊸!⊤",
      "?(A⊕B)⊸?A⅋?B",
      "?A⅋?B⊸?(A⊕B)",
      "?0⊸⊥",
      "⊥⊸?0",
      "!?(!A＆!B)⊸!(?!A＆?!B)",
      "!(?!A＆?!B)⊸!?(!A＆!B)",
      "?!(?A⊕?B)⊸?(!?A⊕!?B)",
      "?(!?A⊕!?B)⊸?!(?A⊕?B)",
    ];
    var default_propositions = $("#default-propositions");
    var proposition_to_solve = $("#proposition-to-solve");
    var proof_status = $("#proof-status");
    var proof_status_label = $("<span class=\"label label-default\"></span>").appendTo(proof_status);
    proof_status_label.text("Input or select a proposition.");
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
    var root_sequent = null;
    $("#start-proving").click(function() {
      var propstr = proposition_to_solve.val();
      var proplex = lex(propstr);
      var prop = parse(proplex);
      if(prop == null) {
        proof_status_label.removeClass("label-default");
        proof_status_label.removeClass("label-success");
        proof_status_label.addClass("label-warning");
        proof_status_label.text("Parse error.");
        return;
      }
      root_sequent = new Sequent(null, [new SequentItem(prop, true)]);
      root_sequent.update_hook = function() {
        proof_status_label.removeClass("label-default");
        proof_status_label.removeClass("label-success");
        proof_status_label.removeClass("label-warning");
        var count = root_sequent.countRemainingGoals();
        if(count == 0) {
          proof_status_label.text("complete!");
          proof_status_label.addClass("label-success");
        } else {
          proof_status_label.text("There are " + count + " remaining goal(s).");
          proof_status_label.addClass("label-warning");
        }
      };
      proof_area.empty();
      proof_area.append(root_sequent.html_container);

      root_sequent.update();
    });
  })();
});
