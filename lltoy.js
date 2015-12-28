"use strict";

$(function() {
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
});
