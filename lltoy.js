$(function() {
  var default_propositions_data = [
    "A⊸A",
    "¬¬A⊸A",
    "A⊸¬¬A",
  ];
  var default_propositions = $("#default-propositions");
  var proposition_to_solve = $("#proposition-to-solve");
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
});
