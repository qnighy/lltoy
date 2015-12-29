"use strict";

$(function() {
  var proposition_to_solve = $("#proposition-to-solve");
  var proof_status = $("#proof-status");
  var proof_status_label = $("<span class=\"label label-default\"></span>").appendTo(proof_status);
  var proof_area = $("#proof-area");

  var selected_logic = null;
  var logic_short_names = {
    "classical" : "Cl",
    "intuitionistic" : "Int",
    "modal_k" : "K",
    "modal_t" : "T",
    "modal_s4" : "S4",
    "linear" : "LL",
  };
  var update_selected_logic = function(new_selected_logic) {
    selected_logic = new_selected_logic;
    $("#select_classical_logic").removeClass("btn-default btn-primary").addClass(selected_logic == "classical" ? "btn-primary" : "btn-default");
    $("#select_intuitionistic_logic").removeClass("btn-default btn-primary").addClass(selected_logic == "intuitionistic" ? "btn-primary" : "btn-default");
    $("#select_modal_logic").removeClass("btn-default btn-primary").addClass(selected_logic.match(/^modal_/) ? "btn-primary" : "btn-default");
    $("#select_modal_logic_k").removeClass("active").addClass(selected_logic == "modal_k" ? "active" : "");
    $("#select_modal_logic_t").removeClass("active").addClass(selected_logic == "modal_t" ? "active" : "");
    $("#select_modal_logic_s4").removeClass("active").addClass(selected_logic == "modal_s4" ? "active" : "");
    $("#select_linear_logic").removeClass("btn-default btn-primary").addClass(selected_logic == "linear" ? "btn-primary" : "btn-default");

    $("#heading_title").text("LL Toy (" + logic_short_names[selected_logic] + ")");

    var default_propositions = $("#default-propositions");
    default_propositions.empty();
    for(var i = 0; i < default_propositions_data[selected_logic].length; ++i) {
      var li = $("<li></li>");
      var a = $("<a></a>").appendTo(li);
      a.attr("href", "javascript:void(0)");
      a.text(default_propositions_data[selected_logic][i]);
      a.click(function() {
        proposition_to_solve.val($(this).text());
      });
      default_propositions.append(li);
    }
    proposition_to_solve.val(default_propositions_data[selected_logic][0]);

    proof_area.empty();
    proof_status_label.text("Input or select a proposition.");
  };
  $("#select_classical_logic").click(function() { update_selected_logic("classical"); });
  $("#select_intuitionistic_logic").click(function() { update_selected_logic("intuitionistic"); });
  $("#select_modal_logic_k a").click(function() { update_selected_logic("modal_k"); });
  $("#select_modal_logic_t a").click(function() { update_selected_logic("modal_t"); });
  $("#select_modal_logic_s4 a").click(function() { update_selected_logic("modal_s4"); });
  $("#select_linear_logic").click(function() { update_selected_logic("linear"); });
  update_selected_logic("classical");
  var proof = null;
  $("#start-proving").click(function() {
    var propstr = proposition_to_solve.val();
    var proplex = lex(propstr);
    var prop = parse(selected_logic, proplex);
    if(prop == null) {
      proof_status_label.removeClass("label-default");
      proof_status_label.removeClass("label-success");
      proof_status_label.addClass("label-warning");
      proof_status_label.text("Parse error.");
      return;
    }
    proof = new Proof(selected_logic);
    proof.setRoot(new Sequent(null, [new SequentItem(prop, true)]));
    proof.root.initializeHTML();
    proof.update_hook = function() {
      proof_status_label.removeClass("label-default");
      proof_status_label.removeClass("label-success");
      proof_status_label.removeClass("label-warning");
      var count = proof.root.countRemainingGoals();
      if(count == 0) {
        proof_status_label.text("complete!");
        proof_status_label.addClass("label-success");
      } else {
        proof_status_label.text("There are " + count + " remaining goal(s).");
        proof_status_label.addClass("label-warning");
      }
    };
    proof_area.empty();
    proof_area.append(proof.root.html_container);

    proof.update();
  });
});
