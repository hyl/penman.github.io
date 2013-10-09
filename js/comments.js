async.parallel([

  function(next) {
    console.log("http://rp-comments.herokuapp.com/comments?article_slug=" + window.location.pathname.replace(/\/$/, "") + "callback=?")
    $.getJSON("http://rp-comments.herokuapp.com/comments?article_slug=" + window.location.pathname.replace(/\/$/, "") + "&callback=?", function(json) {
      next(null, json) 
    })
  },

  function(next) {
    $.get("/hogan/comments.html", function(result) {
      next(null, result)
    })
  },

], function(error, results) {

  /* both resources have been loaded */

  // extract results from array
  var comments = results[0],
      template = results[1],

      renders = []

  // compile the Hogan template
  template = Hogan.compile(template),

  // generate the markup
  $.each(comments, function() {
    
    renders.push(template.render(this))

  })

  console.log(renders)

  $("#comments ul").html(renders.join(""))

}) 
