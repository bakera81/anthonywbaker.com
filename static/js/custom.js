$(document).ready(function(){

  var visitedLanding = false;
  function redirect(){
    if (!localStorage.getItem("visitedLanding")){
      visitedLanding = true;
      try{
        localStorage.setItem("visitedLanding", true);
      }
      catch(e){
        alert("This website does not currently support private browsing. Turn off private browsing and reload the page.");
      }
      window.location = "https://anthonywbaker.com/landing.html";
    }
  }

  redirect();


  //check for touchScreen
  function touchScreen() {
    console.log("Checking for touchscreen...");
    try{
      document.createEvent("TouchEvent");
      console.log("Touch Device");
      return true;
    }
    catch(e){
      console.log("Desktop Device");
      return false;
    }
  }


  //hide all hid elements
  $(".hid").hide();


  var touch = touchScreen();
  var navLinksHidden = true;
  var shown = true;
  var hashes = [];


  //center the nav blocks
  function centerNavBlocks(){
    if($(window).width() >= 768){
      var navBlocksH = $("#nav-blocks").find(".row").height()+($(".featurette-divider").outerHeight()-21);
      var navBlockMargin = (($(window).height()-50)/2)-navBlocksH-50;
      if(navBlockMargin < 75){
        navBlockMargin = 75;
      }
      $("#nav-blocks").css("margin-top", navBlockMargin);
    }
  }

  centerNavBlocks();


  function getPath(){
    //console.log(window.location.href);
    return window.location.href;
  }

  $(document).one('ready', function(){
    if(window.location.href.includes("#")){
      var section = window.location.href.split('#')[1];
      if(section.length > 0){
        if(section == "about" || section == "resume" || section == "projects"
        || section == "writing" || section == "contact"){
          if(section == "projects"){
            shw($("#projects, .card"), $(".projects"));
          }
          else{
            shw($("#"+section), $("."+section));
          }
        }
      }
    }


    //alert(window.location);

  });




  // if($(window).width() < 768){
  //   $("#nav-links").removeClass("hid");
  //   $("#nav-links").show();
  // }

  //more with ability to minimize by clicking any card
  //show full divs
  // function more(element, buttons){
  //   if(buttons.hasClass("inactive")){
  //     console.log("BUTTON INACTIVE");
  //     // console.log($(".card.expanded"));
  //     // $(".card.expanded").one("click", function(){
  //     // console.log($(".card.expanded").attr("id"));
  //     var selector = "#"+$(".card.expanded").attr("id")+".card-info";
  //
  //     less($(selector), $(".card.expanded"));
  //     // });
  //   }
  //   else{
  //     if(buttons.hasClass("expanded")){
  //       console.log("ERROR: BUTTON EXPANDED");
  //     }
  //     else{
  //       console.log("BUTTON NEUTRAL");
  //     }
  //
  //     $(".card").not(buttons).addClass("inactive");
  //     buttons.addClass("expanded");
  //
  //     //show card image
  //     buttons.find(".card-background").hide();
  //     buttons.find(".img-responsive").show();
  //
  //     //show triangle
  //     element.before('<div class="row triangle-container hid"><div class="triangle"></div><div class="triangle-border"></div></div>');
  //     $(".triangle-container").hide();
  //
  //
  //     //position the triangles
  //     var w = buttons.width();
  //     console.log("w/2= "+Math.floor(w/2));
  //     if($(window).width() <= 768){
  //       $(".triangle").css("margin-left", Math.floor($(window).width()/2)-14);
  //       $(".triangle-border").css("margin-left", Math.floor($(window).width()/2)-14);
  //     }
  //     else if(buttons.hasClass("zero")){
  //       $(".triangle").css("margin-left", Math.floor(w/2)-14);
  //       $(".triangle-border").css("margin-left", Math.floor(w/2)-14);
  //     }
  //     else if(buttons.hasClass("one")){
  //       $(".triangle").css("margin-left", w+Math.floor(w/2)-14);
  //       $(".triangle-border").css("margin-left", w+Math.floor(w/2)-14);
  //     }
  //     else if(buttons.hasClass("two")){
  //       $(".triangle").css("margin-left", 2*w+Math.floor(w/2)-14);
  //       $(".triangle-border").css("margin-left", 2*w+Math.floor(w/2)-14);
  //
  //     }
  //     else if(buttons.hasClass("three")){
  //       $(".triangle").css("margin-left", 3*w+Math.floor(w/2)-14);
  //       $(".triangle-border").css("margin-left", 3*w+Math.floor(w/2)-14);
  //
  //     }
  //     $(".triangle").css("border-color","transparent transparent "+element.css("backgroundColor")+" transparent");
  //
  //     //show full elements
  //     element.removeClass("hid");
  //     $(".triangle-container").removeClass("hid");
  //     $(".triangle-container").slideDown(500, function(){
  //       $(this).css("border-bottom", "1px solid #e7e7e7");
  //     });
  //     element.slideDown(500);
  //
  //     buttons.off("click").on("click", function(event){
  //       less(element, buttons);
  //     });
  //   }
  //
  //
  // }

  //hide full divs
  // function less(element, buttons){
  //   buttons.removeClass("expanded");
  //
  //   //hide the element
  //   element.slideUp(500, function(){
  //     element.addClass("hid");
  //   });
  //   //hide the triangle
  //   $(".triangle-container").css("border-bottom", "");
  //   $(".triangle-container").slideUp(500, function(){
  //     $(".triangle-container").remove();
  //   });
  //   $(".card").removeClass("inactive");
  //
  //
  //
  //   buttons.off("click").on("click", function(event){
  //     more(element, buttons);
  //   });
  // }


  function shadeRGBColor(color, percent) { //http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
  }

  function setTriangle($button){
    var w = $button.width();
    if($(window).width() < 768){
      $(".triangle").css("margin-left", Math.floor($(window).width()/2)-7);
      $(".triangle-border").css("margin-left", Math.floor($(window).width()/2)-7);
    }
    else if($button.hasClass("zero")){
      $(".triangle").css("margin-left", Math.floor(w/2)-7);
      $(".triangle-border").css("margin-left", Math.floor(w/2)-7);
    }
    else if($button.hasClass("one")){
      $(".triangle").css("margin-left", w+Math.floor(w/2)-7);
      $(".triangle-border").css("margin-left", w+Math.floor(w/2)-7);
    }
    else if($button.hasClass("two")){
      $(".triangle").css("margin-left", 2*w+Math.floor(w/2)-7);
      $(".triangle-border").css("margin-left", 2*w+Math.floor(w/2)-7);

    }
    else if($button.hasClass("three")){
      $(".triangle").css("margin-left", 3*w+Math.floor(w/2)-7);
      $(".triangle-border").css("margin-left", 3*w+Math.floor(w/2)-7);

    }
  }
function hideNavLinks(){
  if(!($("#nav-about").hasClass("active") ||
  $("#nav-resume").hasClass("active") ||
  $("#nav-projects").hasClass("active") ||
  $("#nav-writing").hasClass("active") ||
  $("#nav-contact").hasClass("active"))){
    $("#nav-links").slideUp(500);
    $(".navbar-toggle").hide();
    //  $("#bs-example-navbar-collapse-1").slideUp(500);

    navLinksHidden = true;
  }
}


  var bColor;
  function more($element, $button){

    $(".card").not($button).addClass("inactive");
    $button.addClass("expanded");

    //show card image
    $button.find(".card-background").hide();
    $button.find(".img-responsive, .img-placeholder").show();

    //create triangle container
    $element.before('<div class="row triangle-container hid"><div class="triangle"></div><div class="triangle-border"></div></div>');
    $(".triangle-container").hide();

    //position the triangle
    setTriangle($button);
    $(".triangle").css("border-color", "transparent transparent "+$element.css("backgroundColor")+" transparent");

    //color the borders
    bColor = shadeRGBColor($element.css("backgroundColor"), -0.2);
    console.log(bColor);
    $(".triangle-border").css("border-color", "transparent transparent "+bColor+" transparent");
    $element.css("border-color", bColor);

    //show full elements
    $element.removeClass("hid");
    $(".triangle-container").removeClass("hid");
    $(".triangle-container").slideDown(500, function(){
      $(this).css("border-bottom", "1px solid "+bColor);
    });
    $element.slideDown(500);

    var sel = "";
    sel = "#"+$element.attr("id")+"."+$element.attr("class");
    sel = sel.replace(" added","").replace(" hid","").replace(" dark","").split(" ").join(".");

    $button.off("click").on("click", function(event){
      less($(sel), $button);
    });
  }


  //hide full divs
  function less($element, $button){
    console.log("In less");
    $button.removeClass("expanded");

    //hide the element
    $element.slideUp(500, function(){
      $element.addClass("hid");
    });

    //hide the triangle
    $(".triangle-container").css("border-bottom", "");
    $(".triangle-container").slideUp(500, function(){
      $(".triangle-container").remove();
    });

    $(".card").removeClass("inactive");

    // select a new element that doesnt contain .added
    var sel = "";
    sel = "#"+$element.attr("id")+"."+$element.attr("class");
    sel = sel.replace(" added","").replace(" hid","").replace(" dark","").split(" ").join(".");

    $button.off("click").on("click", function(event){
      more($(sel), $button);
    });
  }



  //show hidden divs
  //if showing an element at the top of the page, scroll to nav-spacer instead
  function shw($element, $buttons){


      var $activeButtons = $(".active");//.not($buttons);

    if($activeButtons.hasClass("about")){
      hde($("#about"), $(".active"));
      location.hash = 'about';
    }
    else if($activeButtons.hasClass("resume")){
      hde($("#resume"), $(".active"));
      location.hash = 'resume';
    }
    else if($activeButtons.hasClass("projects")){
      hde($("#projects, .card"), $(".active"));
      location.hash = 'projects';
      //setBrand(); //position the #thissite img-placeholder
    }
    else if($activeButtons.hasClass("writing")){
      hde($("#writing"), $(".active"));
      location.hash = 'writing';
    }
    else if($activeButtons.hasClass("contact")){
      hde($("#contact"), $(".active"));
      location.hash = 'contact';
    }


    // $buttons.css(".navbar-nav>li>a:hover")
$buttons.addClass("active");

    $element.removeClass("hid");
    if($element.hasClass("card")){
      $(".cards").show();
      $(".proj-row").show();
    }

    $element.slideDown(500, function(){
      shown = true;
    });

    //  if(navLinksHidden){
    $("#nav-links").removeClass("hid");
    $("#nav-links").slideDown(500);
    navLinksHidden = false;
    if($(window).width() < 768){
      $(".navbar-toggle").show();
      //  $("#bs-example-navbar-collapse-1").css("display", "block");
    }

    //set hash to be id
    if($buttons.hasClass("about")){
      location.hash = 'about';
    }
    else if($buttons.hasClass("resume")){
      location.hash = 'resume';
    }
    else if($buttons.hasClass("projects")){
      location.hash = 'projects';
      setBrand(); //position the #thissite img-placeholder
    }
    else if($buttons.hasClass("writing")){
      location.hash = 'writing';
    }
    else if($buttons.hasClass("contact")){
      location.hash = 'contact';
    }
    //
    // console.log(hashes);


    $buttons.off("click").one("click", function(event){
      hde($element, $buttons);

    });
  }


  // hide hidden divs
  //jump to the top of proj header- it isn't hiding it, it is scrolling past it!
  function hde($element, $buttons){
    if($buttons.hasClass("active")){
      location.hash="";
    }
    $buttons.removeClass("active");
    shown = false;

    //undo override bootstrap animation
    $buttons.not(".nav-block").css("background-color", "");

    //prevent jumping by scrolling to the element
    $('html, body').animate({
      scrollTop: $("#nav-spacer").offset().top
    }, 500, function(){
    });



    $element.slideUp(500, function(){
      //collapse expanded projects
      less($("#"+$(".expanded").attr("id")+".card-info.full"),$(".expanded"));

      if($element.hasClass("card")){
        $(".cards, .proj-row").hide();
      }

      $element.addClass("hid");
      $element.hide();

      if(!($("#nav-about").hasClass("active") ||
      $("#nav-resume").hasClass("active") ||
      $("#nav-projects").hasClass("active") ||
      $("#nav-writing").hasClass("active") ||
      $("#nav-contact").hasClass("active"))){
        $("#nav-links").slideUp(500);
        $(".navbar-toggle").hide();
        //  $("#bs-example-navbar-collapse-1").slideUp(500);

        navLinksHidden = true;
      }
    });

    if($buttons.hasClass("active")){

    }
    //if(!navLinksHidden){




    if(hashes.length <= 1){
      hashes.pop();
      console.log("hashes (length == 1)");
      console.log(hashes);
      location.hash = '';
    }
    else if(hashes.length > 1){
      console.log("Hashes.length > 1");
      if($buttons.hasClass("about")){
        console.log("in about");
        console.log(hashes);
        hashes.splice(hashes.indexOf('about'), 1);
        console.log("hashes");
        location.hash = hashes[hashes.length-1];
        console.log(hashes);
      }
      else if($buttons.hasClass("resume")){
        console.log("in resume");
        console.log(hashes);
        hashes.splice(hashes.indexOf('resume'), 1);
        console.log("hashes");
        // console.log(hashes);
        location.hash = hashes[hashes.length-1];
        console.log(hashes);
      }
      else if($buttons.hasClass("projects")){
        console.log("in projects");
        hashes.splice(hashes.indexOf('projects'), 1);
        console.log("hashes");
        // console.log(hashes);
        location.hash = hashes[hashes.length-1];
        console.log(hashes);
      }
      else if($buttons.hasClass("writing")){
        console.log("in writing");
        hashes.splice(hashes.indexOf('writing'), 1);
        console.log("hashes");
        // console.log(hashes);
        location.hash = hashes[hashes.length-1];
        console.log(hashes);
      }
      else if($buttons.hasClass("contact")){
        console.log("in contact");
        hashes.splice(hashes.indexOf('contact'), 1);
        console.log("hashes");
        // console.log(hashes);
        location.hash = hashes[hashes.length-1];
        console.log(hashes);
      }
    }



    //console.log(hashes);

    $buttons.off("click").one("click", function(event){
      shw($element, $buttons);
    });
  }


  //move card-full rows for mobile view
  var fullCards = [];
  var moved = false;
  function mobile(){

    console.log("Mobile called. moved:");
    console.log(moved)

    if($(window).width() < 768 && moved===false){
      console.log("MOBILE VIEW");

      //hide nav toggle
      if(navLinksHidden){
        $(".navbar-toggle").hide();
      }

      moved = true;
      less($("#"+$(".expanded").attr("id")+".card-info.full"), $(".expanded"));

      //put each card in its own row
      var id = null;
      var $row = null;
      var selector = null;
      $(".card").each(function(){
        //get the id
        id = $(this).attr("id");
        //generate the row
        if($(this).find(".card-background").hasClass("dark")){
          $row = $('<div class="row card-info full dark added hid" id="'+id+'"></div>');
        }
        else{
          $row = $('<div class="row card-info full added hid" id="'+id+'"></div>');
        }
        //get the selector for the corresponding card-info
        selector = "#"+id+".card-info";
        //append the first column from card-info to the row
        $row.append($(selector).find(".card-col:first"));
        //place the new row after each card
        $(this).after($row);
      });

      $(".card-full-container").each(function(){
        fullCards.push($(this).detach());
      });

    }
    //move back
    else if($(window).width() >= 768 && moved===true){

      moved = false;

      $(".navbar-toggle").hide();
      less($("#"+$(".expanded").attr("id")+".card-info.full"),$(".expanded"));

      $(".proj-row").each(function(index, elements){
        $(this).after('<div class="card-full-container"></div>');
        $(this).next().append($(fullCards[index].find(".card-info").prepend($(this).find(".card-info:first").find(".card-col"))));
      });

      $(".added").remove();
      fullCards = [];
    }
  }

  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();


  var resizeId;
  var old_width = null;
  function checkResize(){
    old_width = $(window).width();

    $(window).resize(function(){
      clearTimeout(resizeId);
      less($("#"+$(".expanded").attr("id")+".card-info.full"), $(".expanded"));

      if((old_width >= 768 && $(window).width() < 768) || (old_width < 768 && $(window).width() >= 768)){

        waitForFinalEvent(function(){
          mobile();


        }, 500, "some unique string");
      }
    });
  }

  checkResize();


  //Run Initial Mobile
  $(document).one("ready", function(){
    mobile();

  });


  //animate the navigation blocks
  if(!touch){
    $(".nav-block").hover(
      function(){
        $(this).addClass("hover");
      }, function(){
        $(this).removeClass("hover");
      });
    }


    //override bootstrap navbar bx for .active
    if(!touch){
      $(".nav-link").hover(
        function(){
          if($(this).hasClass("active")){
            $(this).css("background-color", "#e7e7e7")
          }
        });
      }


      function getCoord(e, c) {
        return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] : e['page' + c];
      }


      $(document).on("touchstart", function(evt){
        startX = getCoord(evt, 'X');
        startY = getCoord(evt, 'Y');
      }).on("touchend", function(evt){
        // If movement is more than 5px, stop click
        if (Math.abs(getCoord(evt, 'X') - startX) > 5 || Math.abs(getCoord(evt, 'Y') - startY) > 5) {
          console.log("Swipe detected");
          // Prevent emulated mouse events
          console.log($(this));
          //select turn off clicks for the specific element
          //$(".card").off("click");
          $(document).off("click");
          //evt.stopImmediatePropagation();
          //ev.preventDefault();
          //handler.call(this, ev);
        }
        // else{
        //   console.log("Tap detected");
        //   $(".card").on("click");
        // }
      });

      //       var img = $("img")[0]; // Get my img elem
      // var pic_real_width, pic_real_height;
      // $("<img/>") // Make in memory copy of image to avoid css issues
      //     .attr("src", $(img).attr("src"))
      //     .load(function() {
      //         pic_real_width = this.width;   // Note: $(this).width() will not
      //         pic_real_height = this.height; // work for in memory images.
      //     });

      $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
      };

      var padding;
      function setBrand(){

        if($(".projects").hasClass("active")){
          console.log("in setBrand");
          //console.log("img-placeholder");
          padding = Math.floor((Math.floor($(window).width()/4) - $(".img-placeholder").height())/2);

          $(".img-placeholder").css({"padding-top": padding, "padding-bottom": padding});
          $(".text-container").width($("#a").textWidth());
          console.log($("#a").innerWidth());

        }

      }

      setBrand();
      var resizeId2;
      $(window).resize(function(){
        clearTimeout(resizeId2);
        waitForFinalEvent(function(){
          setBrand();

        }, 250, "some unique string");
      });

      //$("#thissite").css("height",Math.floor($(window).width/4));
      // $(function() {
      //     $('.img-placeholder').css({
      //         'position' : 'absolute',
      //
      //         //'margin-top' : -$(this).outerHeight()/2
      //     });
      // });

      $("iframe").attr({"width": "95%", "height": "500"});
      console.log("iframe height");
      console.log($("iframe").find("body").height())

      function getDocHeight(doc) {
        doc = doc || document;
        // stackoverflow.com/questions/1145850/
        var body = doc.body, html = doc.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight );
          return height;
        }

        function setIframeHeight(id) {
          var ifrm = document.getElementById(id);
          var doc = ifrm.contentDocument? ifrm.contentDocument:
          ifrm.contentWindow.document;
          ifrm.style.visibility = 'hidden';
          ifrm.style.height = "10px"; // reset to minimal height ...
          // IE opt. for bing/msn needs a bit added or scrollbar appears
          ifrm.style.height = getDocHeight( doc ) + 4 + "px";
          ifrm.style.visibility = 'visible';
        }

        //$("#iframe").load(setIframeHeight("iframe"));


        $(".about").one("click", function(event){
          shw($("#about"), $(".about"));
        });

        $(".resume").one("click", function(event){
          shw($("#resume"), $(".resume"));
        });

        $(".projects").one("click", function(event){
          shw($("#projects, .card"), $(".projects"));
        });

        $(".writing").one("click", function(event){
          shw($("#writing"), $(".writing"));
        });

        $(".contact").one("click", function(event){
          shw($("#contact"), $(".contact"));
        });

        //collapse all
        $("#name").on("click", function(){
          hde($("#about"), $(".about"));
          hde($("#resume"), $(".resume"));
          hde($("#projects, .card"), $(".projects"));
          hde($("#writing"), $(".writing"));
          hde($("#contact"), $(".contact"));
        });


        //animate cards
        $(".card-background").hide();
        $(".card-background").removeClass("hid");

        //square recipe cards
        // $(".card.recipe").css("height", $(this).outerWidth());

        if(!touch){
          $(".card").hover(
            function(){
              if(!$(this).hasClass("expanded") && !$(this).hasClass("inactive") && shown===true){
                //can this be set when the background is hidden? why do this on hover?
                $(this).find(".card-background").css("width",$(this).find(".img-responsive, .img-placeholder").outerWidth());
                $(this).find(".card-background").css("height",$(this).find(".img-responsive, .img-placeholder").outerHeight());
                $(this).find(".card-background").show();
                $(this).find(".img-responsive, .img-placeholder").hide();

                // if($(this).hasClass("recipe")){
                //   $(this).css("height",$(this).find(".img-responsive, .img-placeholder").outerWidth());
                // }
              }
            },function(){
              if(!$(this).hasClass("expanded") && shown===true){
                $(this).find(".card-background").hide();
                $(this).find(".img-responsive, .img-placeholder").show();
              }
            });
          }



          //show more/less on click
          $(".card").on("click", function(){
            more($("#"+$(this).attr("id")+".card-info"), $(this));
          });


        });
