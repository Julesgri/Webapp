var obj;
var ActorID = "";
var ActorName = "";
var filmName = "Fight";
var namesOffilms = [];
var nameOfactors = [];
var releasedDate = "";

var input = document.getElementById("ba");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("bar").click();
  }
});
var input = document.getElementById("tba");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("tbar").click();
  }
});


("original fetch to show the first film");
function runSearchOriginal() {
  let url = "".concat(
    "https://api.themoviedb.org/3/",
    "search/movie?api_key=",
    "6618b4d139a01b6e481c9e177f472641",
    "&query=Fight"
  );
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      //process the returned data
      document.getElementById("test").innerHTML =
        "<p1>" +
        "Fight Club realeased November 10, 1999" +
        "\n citez moi un acteur de ce film s'il vous plait :</p1>";
    });
}
("reset parameters to restart quiz");
let resetpage = function () {
  obj;
  ActorID = "";
  ActorName = "";
  filmName = "Fight";
  namesOffilms = [];
  nameOfactors = [];
  setVisibility("reseet", "hidden");
  setVisibility("tba", "hidden");
  setVisibility("tbar", "hidden");
  setVisibility("list", "hidden");
  document.getElementById("answer").innerHTML = "";
  document.getElementById("answer2").innerHTML = "";
  document.getElementById("actorname").innerHTML = "";
  setVisibility("ba", "visible");
  setVisibility("bar", "visible");
  setVisibility("helllo", "hidden");
  document.getElementById("hello").src =
    "https://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg";
  setVisibility("hello", "visible");
  runSearchOriginal();
  document.getElementById("ba").value = "";
};
("be abale to set visibility");
function setVisibility(objectID, state) {
  var object = document.getElementById(objectID);
  object.style.visibility = state;
}
(" be able to switch visibility");
function toggleVisibility(objectID) {
  var object = document.getElementById(objectID);
  state = object.style.visibility;
  if (state == "visible") object.style.visibility = "hidden";
  else object.style.visibility = "visible";
}
(" runsearch on actors of a film");
let runSearch = function (obj) {
  obj = filmName;
  keyword = document.getElementById("ba").value;

  intab = "False";
  for (i = 0; i < nameOfactors.length; i++) {
    if (
      nameOfactors[i].toLowerCase() ==
      document.getElementById("ba").value.toLowerCase()
    ) {
      intab = "True";
    }
  }
  if (intab == "True") {
    document.getElementById("answer").innerHTML =
      "vous avez déja écris cet acteur";
  } else {
    let url = "".concat(
      "https://api.themoviedb.org/3/",
      "search/movie?api_key=",
      "6618b4d139a01b6e481c9e177f472641",
      "&query=",
      obj
    );

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        //process the returned data
        document.getElementById("hello").src =
          "https://image.tmdb.org/t/p/w500/" + data.results[0].poster_path;
        //work with results array...
        url1 = "".concat(
          "https://api.themoviedb.org/3/movie/",
          data.results[0].id,
          "?api_key=6618b4d139a01b6e481c9e177f472641&append_to_response=credits"
        );
        fetch(url1)
          .then((res) => res.json())
          .then((data) => {
            obj = "false";
            obj = obj.fontcolor("red");

            for (i = 0; i < data.credits.cast.length; i++) {
              if (
                data.credits.cast[i].original_name.toLowerCase() ==
                keyword.toLowerCase()
              ) {
                ActorID = data.credits.cast[i].id;
                ActorName = keyword;
                obj = "True";
                obj = obj.fontcolor("green");
                nameOfactors.push(keyword.toLowerCase());
              }
            }
            if (obj == "false".fontcolor("red")) {
              setVisibility("ba", "hidden");
              setVisibility("bar", "hidden");
              toggleVisibility("reseet");
              setVisibility("hello", "hidden");
              document.getElementById("test").innerHTML = "";
              document.getElementById("answer2").innerHTML = "";
              document.getElementById("list").innerHTML = "";
              for (i = 0; i < 10; i++) {
                document.getElementById("list").innerHTML +=
                  "<li> actor " +
                  (i + 1) +
                  ":  " +
                  JSON.stringify(data.credits.cast[i].original_name) +
                  "</li>";
              }
              toggleVisibility("list");
              document.getElementById("actorname").innerHTML = "";
            } else {
              document.getElementById("list").innerHTML = "";
              setVisibility("bar", "hidden");
              runSearchID();
            }

            document.getElementById("answer").innerHTML = obj;
          });
      });
  }
};
(" runsearch with ID for original data of actor. displays picture and name");
let runSearchID = function () {
  toggleVisibility("tba");
  toggleVisibility("tbar");
  url1 = "".concat(
    "https://api.themoviedb.org/3/person/",
    ActorID,
    "movie_credits?api_key=6618b4d139a01b6e481c9e177f472641"
  );
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("actorname").innerHTML =
        "Donnez un film dans lequel " + ActorName + " à joué s'il vous plait";

      document.getElementById("helllo").src =
        "https://image.tmdb.org/t/p/w500" + data.profile_path;
      setVisibility("helllo", "visible");
    });
};
("runsearch to see if actor plays in film and to go back to test 2");
let runSearchID2 = function () {
  url1 = "".concat(
    "https://api.themoviedb.org/3/person/",
    ActorID,
    "/movie_credits?api_key=6618b4d139a01b6e481c9e177f472641"
  );
  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      answer = document.getElementById("tba").value;
      intab = "False";
      for (i = 0; i < namesOffilms.length; i++) {
        if (
          namesOffilms[i].toLowerCase() ==
          document.getElementById("tba").value.toLowerCase()
        ) {
          intab = "True";
        }
      }
      if (intab == "True") {
        document.getElementById("answer2").innerHTML =
          "vous avez déja écris ce film";
      } else {
        obj = "false";
        obj = obj.fontcolor("red");

        for (i = 0; i < data.cast.length; i++) {
          console.log(data.cast[i].title);
          if (data.cast[i].title.toLowerCase() == answer.toLowerCase()) {
            obj = "True";
            obj = obj.fontcolor("green");
            filmName = data.cast[i].title.toLowerCase();
            namesOffilms.push(filmName);
            setVisibility("bar", "visible");
          }
        }

        document.getElementById("answer2").innerHTML = obj;
        if (obj == "false".fontcolor("red")) {
          toggleVisibility("tbar");
          toggleVisibility("reseet");
        }
        if (obj == "True".fontcolor("green")) {
          toggleVisibility("tba");
          toggleVisibility("tbar");
          document.getElementById("actorname").innerHTML = "";
          document.getElementById("answer").innerHTML = "";
          document.getElementById("ba").value = "";
          setVisibility("helllo", "hidden");
          let url = "".concat(
            "https://api.themoviedb.org/3/",
            "search/movie?api_key=",
            "6618b4d139a01b6e481c9e177f472641",
            "&query=",
            filmName
          );

          fetch(url)
            .then((result) => result.json())
            .then((data) => {
              //process the returned data
              document.getElementById("hello").src =
                "https://image.tmdb.org/t/p/w500/" +
                data.results[0].poster_path;
              releasedDate = data.results[0].release_date;
              document.getElementById("test").innerHTML =
                "<p1>" +
                filmName +
                " released the " +
                releasedDate +
                "\n citez moi un acteur de ce film s'il vous plait :</p1>";
            });
        }
      }
    });
};
