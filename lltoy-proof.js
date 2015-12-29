"use strict";

var UsageResolutionError = (function() {
  var UsageResolutionError = function(message) {
    this.message = message;
  };
  UsageResolutionError.prototype.name = "UsageResolutionError";
  return UsageResolutionError;
})();
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
    if(this.prop.name.match(/^[A-Z][A-Za-z_0-9]*$/)) {
      this.actions = ["atom"];
    } else if(this.prop.name == "¬") {
      this.actions = ["neg"];
    } else if(this.prop.name.match(/^[→∧∨]$/)) {
      if(this.prop.name == "∧" ^ this.is_in_succedent) {
        this.actions = ["mult1"];
      } else {
        this.actions = ["add2"];
      }
    } else if(this.prop.name.match(/^[⊸⊗⅋]$/)) {
      if(this.prop.name == "⊗" ^ this.is_in_succedent) {
        this.actions = ["mult1"];
      } else {
        this.actions = ["mult2"];
      }
    } else if(this.prop.name.match(/^[＆⊕]$/)) {
      if(this.prop.name == "＆" ^ this.is_in_succedent) {
        if(this.prop.args.length == 0) {
          this.actions = ["do_nothing"];
        } else {
          this.actions = ["add1L", "add1R"];
        }
      } else {
        this.actions = ["add2"];
      }
    } else if(this.prop.name.match(/^[!?]$/)) {
      if(this.prop.name == "!" ^ this.is_in_succedent) {
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
          this.html_action_buttons[i].text(this.prop.args[0].toText());
        } else if(this.actions[i] == "add1R") {
          this.html_action_buttons[i].text(this.prop.args[1].toText());
        } else if(this.actions[i] == "dereliction") {
          this.html_action_buttons[i].text(this.prop.args[0].toText());
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
    this.top = this.parent == null ? null : this.parent.top;
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
        self.top.update();
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
      num_children = target_item.prop.args.length;
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
            child_items[0][2].push(new SequentItem(itemi.prop.args[0], !itemi.is_in_succedent));
          } else {
            child_items[0][0].push(new SequentItem(itemi.prop.args[0], !itemi.is_in_succedent));
          }
        } else if(action == "mult1") {
          if(itemi.prop.args.length == 2) {
            if(itemi.prop.name.match(/^[→⊸]$/)) {
              child_items[0][2].push(new SequentItem(itemi.prop.args[0], !itemi.is_in_succedent));
            } else {
              child_items[0][1].push(new SequentItem(itemi.prop.args[0], itemi.is_in_succedent));
            }
            child_items[0][1].push(new SequentItem(itemi.prop.args[1], itemi.is_in_succedent));
          }
        } else if(action == "add1L") {
          child_items[0][1].push(new SequentItem(itemi.prop.args[0], itemi.is_in_succedent));
        } else if(action == "add1R") {
          child_items[0][1].push(new SequentItem(itemi.prop.args[1], itemi.is_in_succedent));
        } else if(action == "mult2" || action == "add2") {
          for(var childidx = 0; childidx < num_children; ++childidx) {
            if(itemi.prop.name.match(/^[→⊸]$/) && childidx == 0) {
              child_items[childidx][0].push(new SequentItem(itemi.prop.args[0], !itemi.is_in_succedent));
            } else if(childidx == 0) {
              child_items[childidx][1].push(new SequentItem(itemi.prop.args[0], itemi.is_in_succedent));
            } else {
              child_items[childidx][1].push(new SequentItem(itemi.prop.args[1], itemi.is_in_succedent));
            }
          }
        } else if(action == "dereliction") {
          child_items[0][1].push(new SequentItem(itemi.prop.args[0], itemi.is_in_succedent));
        } else if(action == "weakening") {
        } else if(action == "contraction") {
          child_items[0][1].push(new SequentItem(itemi.prop, itemi.is_in_succedent));
          child_items[0][1].push(new SequentItem(itemi.prop, itemi.is_in_succedent));
        } else if(action == "promotion") {
          child_items[0][1].push(new SequentItem(itemi.prop.args[0], itemi.is_in_succedent));
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
          if(itemi.prop.name == "!" && !itemi.is_in_succedent ||
              itemi.prop.name == "?" && itemi.is_in_succedent) {
          } else {
            itemi.usage_equations.push([]);
          }
        }
      }
      if(this.top.logic != "linear") {
        itemi.usage_equations = [[1]];
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
    this.top.update();
  };
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
      if(this.top.logic != "linear" || this.items[i].parent == null) {
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
var Proof = (function() {
  var Proof = function(logic) {
    this.logic = logic;
    this.root = null;
    this.update_hook = null;
  };
  Proof.prototype.setRoot = function(new_root) {
    this.root = new_root;
    this.root.top = this;
  };
  Proof.prototype.update = function() {
    this.root.resetUsage();
    this.root.updateUsage();
    this.root.updateHTML();
    if(this.update_hook) {
      this.update_hook();
    }
  };
  return Proof;
})();

