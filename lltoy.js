"use strict";
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

  var ItemUsage = (function() {
    var ItemUsage = function(parent) {
      this.parent = parent;
      this.children = null;
      this.usage = null;
      if(this.parent == null) {
        this.usage = 1;
      }
    };
    ItemUsage.prototype.setUsage = function(new_usage) {
      if(this.usage == new_usage) return;
      this.usage = new_usage;
      if(this.parent != null) {
        this.parent.propagateFromChildren();
        this.parent.propagateToChildren();
      }
      this.propagateToChildren();
    };
    ItemUsage.prototype.propagateFromChildren = function() {
      if(this.children == null) return;
      if((this.children[0] != null && this.children[0].usage == 1) ||
        (this.children[1] != null && this.children[1].usage == 1)) {
        this.setUsage(1);
      }
      if(this.children[0] != null && this.children[0].usage == 0 &&
          this.children[1] != null && this.children[1].usage == 0) {
        this.setUsage(0);
      }
    };
    ItemUsage.prototype.propagateToChildren = function() {
      if(this.children == null) return;
      if(this.usage == 0) {
        for(var i = 0; i < 2; ++i) {
          if(this.children[i] != null) {
            this.children[i].setUsage(0);
          }
        }
      } else if(this.usage == 1 &&
          this.children[0] != null &&
          this.children[1] != null) {
        if(this.children[0].usage != null) {
          this.children[1].setUsage(this.usage - this.children[0].usage);
        }
        if(this.children[1].usage != null) {
          this.children[0].setUsage(this.usage - this.children[1].usage);
        }
      }
    };
    ItemUsage.prototype.childrenUpdated = function() {
      this.propagateToChildren();
      this.propagateFromChildren();
    };
    return ItemUsage;
  })();

  var SequentItem = (function() {
    var SequentItem = function(prop, is_in_succedent) {
      var self = this;
      this.parent = null;
      this.inheritance = null;
      this.prop = prop;
      this.sequent = null;
      this.is_in_succedent = is_in_succedent;
      this.usage = null;

      this.html_main = $("<button></button>");
      this.html_main.addClass("btn");
      this.html_main.addClass("btn-default");
      this.html_main.text(this.prop.toText());
      this.html_main.click(function() {
        if(self.sequent.children == null) {
          self.sequent.applyOn(self);
        }
      });
    };
    SequentItem.prototype.update = function() {
      this.html_main.removeClass("btn-default");
      this.html_main.removeClass("btn-primary");
      this.html_main.removeClass("btn-info");
      this.html_main.removeClass("disabled");
      if(this.sequent.children == null) {
        if(this == this.sequent.pending_target) {
          this.html_main.addClass("btn-info");
        } else {
          this.html_main.addClass("btn-default");
        }
      } else {
        this.html_main.addClass("disabled");
        if(this.sequent.targets.indexOf(this) >= 0) {
          this.html_main.addClass("btn-primary");
        } else {
          this.html_main.addClass("btn-default");
        }
      }
      if(this.usage.usage == 1) {
        this.html_main.text(this.prop.toText());
      } else {
        this.html_main.text("[" + this.prop.toText() + "]");
      }
      if(this.usage.usage == 0) {
        this.html_main.addClass("hidden");
      } else {
        this.html_main.removeClass("hidden");
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
          self.reconstructChildren();
          self.triggerUpdate();
        }
      });
      for(var i = 0; i < this.items.length; ++i) {
        if(this.items[i].is_in_succedent) {
          this.items[i].html_main.appendTo(this.html_main);
        }
      }
    };
    Sequent.prototype.applyOn = function(item) {
      var old_pending_target = this.pending_target;
      this.pending_target = null;
      this.children = null;
      this.targets = null;

      if(item.prop instanceof PLLAtom) {
        this.pending_target = item;
        if(old_pending_target != null &&
            (old_pending_target.is_in_succedent ^ item.is_in_succedent) &&
            old_pending_target.prop.name == item.prop.name) {
          var usage_ok = true;
          for(var i = 0; i < this.items.length; ++i) {
            if(this.items[i] != item &&
                this.items[i] != old_pending_target &&
                this.items[i].usage.usage == 1) {
              usage_ok = false;
            }
          }
          if(usage_ok) {
            this.children = [];
            this.targets = [old_pending_target, item];
            this.pending_target = null;
          }
        }
      } else if(item.prop instanceof PLLNeg) {
        var child_items = [];
        var child_items_last = [];
        for(var i = 0; i < this.items.length; ++i) {
          if(this.items[i] == item) {
            child_items_last.push(new SequentItem(
                  item.prop.sub, !item.is_in_succedent));
          } else {
            var child_item = new SequentItem(
                this.items[i].prop, this.items[i].is_in_succedent);
            child_item.parent = this.items[i];
            child_item.inheritance = "same";
            child_items.push(child_item);
          }
        }
        if(item.is_in_succedent) {
          child_items = child_items.concat(child_items_last);
        } else {
          child_items = child_items_last.concat(child_items);
        }
        this.children = [new Sequent(this, child_items)];
        this.targets = [item];
      } else if(item.prop.llkind == "multiplicative") {
        if(item.prop.is_conjunctive ^ item.is_in_succedent) {
          var child_items = [];
          var child_items_last = [];
          for(var i = 0; i < this.items.length; ++i) {
            if(this.items[i] == item) {
              if(item.prop instanceof PLLImpl) {
                child_items_last.push(new SequentItem(
                      item.prop.lhs, !item.is_in_succedent));
                child_items.push(new SequentItem(
                      item.prop.rhs, item.is_in_succedent));
              } else if(item.prop.arity == 2) {
                child_items.push(new SequentItem(
                      item.prop.lhs, item.is_in_succedent));
                child_items.push(new SequentItem(
                      item.prop.rhs, item.is_in_succedent));
              }
            } else {
              var child_item = new SequentItem(
                  this.items[i].prop, this.items[i].is_in_succedent);
              child_item.parent = this.items[i];
              child_item.inheritance = "same";
              child_items.push(child_item);
            }
          }
          child_items = child_items.concat(child_items_last);
          this.children = [new Sequent(this, child_items)];
          this.targets = [item];
        } else {
          var children = []
          for(var childidx = 0; childidx < item.prop.arity; ++childidx) {
            var child_items = [];
            var child_items_last = [];
            for(var i = 0; i < this.items.length; ++i) {
              if(this.items[i] == item) {
                if(item.prop instanceof PLLImpl && childidx == 0) {
                  child_items_last.push(new SequentItem(
                        item.prop.lhs, !item.is_in_succedent));
                } else if(childidx == 0) {
                  child_items.push(new SequentItem(
                        item.prop.lhs, item.is_in_succedent));
                } else {
                  child_items.push(new SequentItem(
                        item.prop.rhs, item.is_in_succedent));
                }
              } else {
                var child_item = new SequentItem(
                    this.items[i].prop, this.items[i].is_in_succedent);
                child_item.parent = this.items[i];
                if(childidx == 0) {
                  child_item.inheritance = "multiplicative0";
                } else {
                  child_item.inheritance = "multiplicative1";
                }
                child_items.push(child_item);
              }
            }
            child_items = child_items.concat(child_items_last);
            children.push(new Sequent(this, child_items));
          }
          this.children = children;
          this.targets = [item];
          if(item.prop.arity == 0) {
            var usage_ok = true;
            for(var i = 0; i < this.items.length; ++i) {
              if(this.items[i] != item &&
                  this.items[i].usage.usage == 1) {
                usage_ok = false;
              }
            }
            if(!usage_ok) {
              this.children = null;
              this.targets = null;
            }
          }
        }
      } else {
        console.log("TODO");
      }
      this.reconstructChildren();
      this.triggerUpdate();
    };
    Sequent.prototype.triggerUpdate = function() {
      if(this.parent == null) {
        this.updateUsage();
        this.update();
      } else {
        this.parent.triggerUpdate();
      }
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
    Sequent.prototype.updateUsage = function() {
      for(var i = 0; i < this.items.length; ++i) {
        var item = this.items[i];
        if(item.parent == null) {
          item.usage = new ItemUsage(null);
        } else if(item.inheritance == "same") {
          item.usage = item.parent.usage;
        } else if(item.inheritance == "multiplicative0") {
          item.usage = new ItemUsage(item.parent.usage);
          if(item.parent.usage.children == null) {
            item.parent.usage.children = [null, null];
          }
          item.parent.usage.children[0] = item.usage;
          item.parent.usage.childrenUpdated();
        } else if(item.inheritance == "multiplicative1") {
          item.usage = new ItemUsage(item.parent.usage);
          if(item.parent.usage.children == null) {
            item.parent.usage.children = [null, null];
          }
          item.parent.usage.children[1] = item.usage;
          item.parent.usage.childrenUpdated();
        }
      }
      if(this.targets != null) {
        if(this.targets.length == 2 && this.targets[0].prop.llkind == "atom") {
          for(var j = 0; j < this.items.length; ++j) {
            if(this.targets.indexOf(this.items[j]) < 0) {
              this.items[j].usage.setUsage(0);
            }
          }
        }
        for(var i = 0; i < this.targets.length; ++i) {
          var item = this.targets[i];
          item.usage.setUsage(1);
          if(item.prop.llkind == "multiplicative" &&
              item.prop.is_conjunctive == item.is_in_succedent &&
              item.prop.arity == 0) {
            for(var j = 0; j < this.items.length; ++j) {
              if(this.items[j] != item) {
                this.items[j].usage.setUsage(0);
              }
            }
          }
        }
      }

      if(this.children != null) {
        for(var i = 0; i < this.children.length; ++i) {
          this.children[i].updateUsage();
        }
      }
    };
    Sequent.prototype.update = function() {
      for(var i = 0; i < this.items.length; ++i) {
        this.items[i].update();
      }

      if(this.children != null) {
        for(var i = 0; i < this.children.length; ++i) {
          this.children[i].update();
        }
      }

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

      root_sequent.triggerUpdate();
    });
  })();
});
