/* This predicate function is cheer picked from Esprima
 * it returns a function that would have a simple switch
 * case to check if the given word is present or not.
 */
function makePredicate(words) {
  words = words.split(" ");
  var f = "",
    cats = [];
  out: for (var i = 0; i < words.length; ++i) {
    for (var j = 0; j < cats.length; ++j)
      if (cats[j][0].length == words[i].length) {
        cats[j].push(words[i]);
        continue out;
      }
    cats.push([words[i]]);
  }

  function compareTo(arr) {
    if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
    f += "switch(str){";
    for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
    f += "return true}return false;";
  }

  if (cats.length > 3) {
    cats.sort(function(a, b) {
      return b.length - a.length;
    });
    f += "switch(str.length){";
    for (var i = 0; i < cats.length; ++i) {
      var cat = cats[i];
      f += "case " + cat[0].length + ":";
      compareTo(cat);
    }
    f += "}";

  } else {
    compareTo(words);
  }
  return new Function("str", f);
}

module.exports = makePredicate("abstract boolean byte char class double \
  enum export extends final float goto implements import int interface \
  long native package private protected public short static super synchronized \
  throws transient volatile class enum extends super const export import \
  implements interface let package private protected public static yield \
  eval arguments break case catch continue debugger default do else finally \
  for function if return switch throw try var while with null true false \
  instanceof typeof void delete new in this");