$(document).ready(fetchData())

function fetchData() {
  var parameters = location.search.substring(1).split('&');
  
  /* currentBookID */
  var idParam0 = parameters[0].split('=');
  var currentBookISBN = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  /* other url parameters */
  if(parameters.length>2){
    if(from.substring(0,12)=='similarBooks'){
      
      /* old book ID */
      var idParam2 = parameters[2].split("=");
      var oldBookID = unescape(idParam2[1]);
      
      $.ajax({
        url: '/books/'+ oldBookID + '/similar',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books similar to <b>&nbsp;\"" + from.substring(16, from.length-1) + "&nbsp;\"</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
      
    }
    else if(from.substring(0,11)=='authorBooks'){
      /* author ID */
      var idParam2 = parameters[2].split("=");
      var authID = unescape(idParam2[1]);
      $.ajax({
        url: '/authors/'+ authID + '/books',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched <b>&nbsp;" + from.substring(16, from.length-1) + "</b>'s books";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from.substring(0,10)=='eventBooks'){
      /* event ID */
      var idParam2 = parameters[2].split("=");
      var eventID = unescape(idParam2[1]);
      $.ajax({
        url: '/events/' + eventID + '/books',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books at event <b>&nbsp;" + from.substring(11, from.length-1) + "</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from=='searchFromTitle'){
      var idParam2 = parameters[2].split("=");
      var title = unescape(idParam2[1]);
      $.ajax({
        url: '/books?title='+title,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books whose title contains <b>&nbsp;\"" + title + "\"</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from=='searchFromFilters'){
      var idParam2 = parameters[2].split("=");
      var genre = unescape(idParam2[1]);
      var idParam3 = parameters[3].split("=");
      var author = unescape(idParam3[1]);
      var idParam4 = parameters[4].split("=");
      var theme = unescape(idParam4[1]);
      var idParam5 = parameters[5].split("=");
      var bs = unescape(idParam5[1]);
      var idParam6 = parameters[6].split("=");
      var nr = unescape(idParam6[1]);
      var urlSearch = createSearchURL(genre, author, theme, bs, nr);
      $.ajax({
        url: urlSearch,
        type: 'GET',
        dataType: 'json',
        success: (data) => { 
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            createFiltersString(genre, theme, author, bs, nr, document.getElementById('orientationInfoID'));
            //var orientationInfo = "you have performed advanced search ( " + createFiltersString(genre, theme, author, bs, nr) + " )";
            //$('#orientationInfoID').append(orientationInfo);
          } 
        }
      });
    }
  }
  else if(from=='recommendedBooks'){
      $.ajax({
        url: '/books?isRecommended=true',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Our recommendations</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='bestSellers'){
      $.ajax({
        url: '/books?isBestSeller=true',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Best Sellers</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='classicBooks'){
      $.ajax({
        url: '/books?isClassic=true',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Classics</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='newReleases'){
      $.ajax({
        url: '/books?isNewRelease=true',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>New Releases</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='bookOfTheMonth'){
    document.getElementById("paginationID").style.display = "none";
    var orientationInfo = "you have searched &nbsp;<b>Book of the month</b>";
    $('#orientationInfoID').append(orientationInfo);
  }
  else if(from=='errorPage'){
    document.getElementById("paginationID").style.display = "none";
    var orientationInfo = "you have been redirected here from &nbsp;<b>404 page</b>";
    $('#orientationInfoID').append(orientationInfo);
  }
  
  setBook(currentBookISBN);
  
}

/* Create url string for advanced search */
function createSearchURL(genre, author, theme, bs, nr){
  var i=0;
  var url = '/books?';
  if(genre>=0){
    i++;
    url+=('genre='+genre) 
  }
  if(author>=0){ 
    if(i>0){ url+='&' }
    i++;
    url+=('author='+author) 
  }
  if(theme>=0){ 
    if(i>0){ url+='&' }
    i++;
    url+=('theme='+theme) 
  }
  if(bs=='true'){ 
    if(i>0){ url+='&' }
    i++;
    url+=('isBestSeller=true') 
  }
  if(nr=='true'){ 
    if(i>0){ url+='&' }
    i++;
    url+=('isNewRelease=true') 
  }
  return url;
}




/*-----------------------
  PAGINATION FUNCTIONS
------------------------*/

/* Called when user clicks one of the pagination buttons */
function changePage(dir){
  var str = sessionStorage.getItem('bookList');
  var data = JSON.parse(str);
  var counter = document.getElementById('counter');
  var tabIndex = counter.tabIndex;
  var newIndex = tabIndex + dir;
  
  if(newIndex>=1 && newIndex<=data.length){
    counter.tabIndex = newIndex;
    counter.textContent = " "+newIndex+" / "+data.length; 
    setBook(data[newIndex-1].isbn);
    paginationStyle(newIndex, data.length);
  }
}

/* Set pagination data */
function setPagination(data, isbn){
  var i=0;
  while(data[i].isbn!=isbn && i<data.length){ i++ }
  var counter = document.getElementById('counter');
  counter.tabIndex = i+1;
  counter.textContent = " "+(i+1)+" / "+data.length;
  paginationStyle(i+1, data.length);
}

/* Set pagination style on page changing */
function paginationStyle(tabIndex, length){
  var prev5 = document.getElementById('prev5_ID');
  var prev1 = document.getElementById('prev1_ID');
  var next1 = document.getElementById('next1_ID');
  var next5 = document.getElementById('next5_ID');
    
  if(tabIndex==1){ prev1.disabled = true; }
  else { prev1.disabled = false; }
    
  if(tabIndex<=5){ prev5.disabled = true; }
  else { prev5.disabled = false; }
    
  if(tabIndex==length){ next1.disabled = true; }
  else { next1.disabled = false; }
      
  if(tabIndex>length-5){ next5.disabled = true; }
  else { next5.disabled = false; }
}




/*-----------------------------
  ORIENTATION INFO FUNCTIONS
------------------------------*/

/* Create string to be displayed in orientation info when redirected from advanced search */
async function createFiltersString(genre, theme, author, bestSellers, nextComings, element){
  element.innerHTML = "you have performed advanced search ( ";
  if(genre>=0){
    var genreData = await 
    $.ajax({ 
      url: '/genres/' + genre,
      type: 'GET',
      dataType: 'json'
    });
    element.innerHTML += ('&nbsp;genre:<b>&nbsp;' + genreData[0].value + '</b>&nbsp;')
  }
  if(theme>=0){ 
    var themeData = await
    $.ajax({
      url: '/themes/' + theme,
      type: 'GET',
      dataType: 'json'
    });
    element.innerHTML += ('&nbsp;theme:<b>&nbsp;' + themeData[0].value + '</b>&nbsp;')
  }
  if(author>=0){ 
    var authorData = await
    $.ajax({
      url: '/authors/' + author,
      type: 'GET',
      dataType: 'json'
    });
    element.innerHTML += ('&nbsp;author:<b>&nbsp;' + authorData[0].name + '</b>&nbsp;')
  }
  if(bestSellers!="false"){ element.innerHTML += ('&nbsp;<b>Best Sellers</b>&nbsp;') }
  if(nextComings!="false"){ element.innerHTML += ('&nbsp;<b>Next Comings</b>&nbsp;') }
  element.innerHTML += " )";
}




/*------------------------
  CURRENT BOOK FUNCTIONS
--------------------------*/

/* Set current book data */
function setBook(isbn){
  $.ajax({
    url: '/books/'+isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#bookTitleID').text(data[0].title);
        $('#bookImageID').attr("src", data[0].image);
        $('#bookAuthorsID').empty();
        createAuthorsLink(isbn, data[0].title);
        $('#bookPublishingHouseID').empty();
        $('#bookPublishingHouseID').append(data[0].publishingHouse);
        $('#bookGenreID').empty();
        createGenresString(isbn);
        $('#bookThemesID').empty();
        createThemesString(isbn);
        $('#bookYearID').empty();
        $('#bookYearID').append(createDateStr(new Date(data[0].publishingDate)));
        $('#bookIsbnID').empty();
        $('#bookIsbnID').append(data[0].isbn);
        $('#bookPriceID').empty();
        $('#bookPriceID').append(data[0].price.toFixed(2)+' €');
        document.getElementById('addToCartID').onclick = () => addToCart(data[0].isbn);
        $('#bookPlotID').empty();
        $('#bookPlotID').append(data[0].abstract);
        clamping();
        $('#reviewsId').empty();
        fetchBookReviews(isbn);
        $('#bookInterviewID').empty();
        if(data[0].authorInterview!=""){ $('#bookInterviewID').append(data[0].authorInterview); }
        else{ 
          $('#bookInterviewID').append("No interview available");
          $('#bookInterviewID').css('text-align', 'center');
        }
        $('#authorBooks').empty();
        fetchAuthorsBooks(isbn);
        $('#similarBooks').empty();
        fetchSimilarBooks(isbn, data[0].title);
        $('#bookEventsId').empty();
        fetchBookEvents(isbn, data[0].title);
      }
    }
  });
}

/* Add to page all links of book's authors */
function createAuthorsLink(bookISBN, bookTitle){
  var td = document.getElementById('bookAuthorsID');
  $.ajax({
    url: '/books/' + bookISBN + '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          var a = document.createElement('a');
          a.href = 'Author.html?id='+ data[i].id + '&from=book('+ bookTitle +')&searchID=' + bookISBN;
          a.className = "box__link";
          a.textContent = data[i].name;
          td.appendChild(a);
          if(i<data.length-1){ td.appendChild(document.createTextNode(', ')); }
        }
      }
    }
  });
}

/* Add to page all book's genres */
function createGenresString(isbn){
  $.ajax({
    url: '/books/' + isbn + '/genres',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        var td = document.getElementById('bookGenreID');
        var str = "";
        for(let i=0; i<data.length; i++){
          str+= data[i].value;
          if(i<data.length-1){ str+=', ' }
        }
        td.append(str)
      }
    }
  });
}

/* From date in form "MM-DD-YYYY" return date in form "DD MonthName YYYY" */
function createDateStr(dateStr){
  var date = new Date(dateStr);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

/* Add to page all book's themes */
function createThemesString(isbn){
  $.ajax({
    url: '/books/' + isbn + '/themes',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        var td = document.getElementById('bookThemesID');
        var str = "";
        for(let i=0; i<data.length; i++){
          str+= data[i].value;
          if(i<data.length-1){ str+=', ' }
        }
        td.append(str)
      }
    }
  });
}

/* Check if clamp is need or not */
function clamping(){
  var plotDiv = document.getElementById('plotDivID');
  var oldNode = document.getElementById('readMoreLessDivID');
  if(oldNode) { plotDiv.removeChild(oldNode); }
  
  $('#bookPlotID').css('height', 'auto');
  $('#bookPlotID').removeClass('clampPlot');
      
  var strLH = $('#bookPlotID').css('line-height');
  var strH = $('#bookPlotID').css('height');
  var lh = parseFloat(strLH.substring(0,strLH.length-2));
  var h = parseFloat(strH.substring(0,strH.length-2));
  
  if(h / lh > 10){ 
    var div = document.createElement('div');
    div.className = "readMoreLessDiv";
    div.id = "readMoreLessDivID";
    var p = document.createElement('p');
    p.id = "readMoreLessID";
    p.className = "readMoreLess";
    p.innerHTML = 'Read More &raquo;'; 
    p.onclick = () => readMoreLess();
    div.appendChild(p);
    plotDiv.appendChild(div);
    clampPlot();
  }
}

/* If Read More-->Read Less and vice versa */
function readMoreLess(){
  if($('#bookPlotID').hasClass('clampPlot')){ unClampPlot() }
  else { clampPlot() }
}

/* Clamp text */
function clampPlot(){
  var str = $('#bookPlotID').css('line-height');
  var lh = parseFloat(str.substring(0,str.length-2));
  var h = lh * 10;
  var s = h + 'px';
  $('#readMoreLessID').html('Read More &raquo;');
  $('#bookPlotID').css('height', s);
  $('#bookPlotID').addClass('clampPlot');
}

/* Unclamp text */
function unClampPlot(){
  $('#readMoreLessID').html('&laquo; Read Less');
  $('#bookPlotID').css('height', 'auto');
  $('#bookPlotID').removeClass('clampPlot');
}

/* Fetch book's review from db */
function fetchBookReviews(isbn){
  $.ajax({
    url: '/books/' + isbn + '/reviews',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setReviews(data) }
      else{ noReview() }
    } 
  });
}

/* Called if book has reviews */
function setReviews(reviews){
  var review = document.getElementById('reviewsId');
  var h1 = document.createElement('h1');
  h1.textContent = "REVIEWS";
  review.appendChild(h1);
  for(let i=0; i<reviews.length; i++){
    var div = document.createElement('div');
    div.className = "review";
    var reviewer = document.createElement('div');
    reviewer.className = "reviewer";
    var userImg = document.createElement('img');
    userImg.src = "../assets/images/user.png";
    userImg.className = "img__reviewer";
    reviewer.appendChild(userImg);
    var username = document.createElement('p');
    username.textContent = reviews[i].username;
    reviewer.appendChild(username);
    div.appendChild(reviewer);
    var fixedRate = document.createElement('div');
    fixedRate.className = "fixedRate";
    var j=0;
    while(j<reviews[i].stars){
      var label = document.createElement('label');
      label.className = "voted";
      label.textContent = "★";
      fixedRate.appendChild(label);
      j++
    }
    while(j<5){
      var label = document.createElement('label');
      label.textContent = "★";
      fixedRate.appendChild(label);
      j++;
    }
    var h5 = document.createElement('h5');
    h5.textContent = reviews[i].value;
    fixedRate.appendChild(h5);
    div.appendChild(fixedRate);
    if(reviews[i].comments!=""){
      var comment = document.createElement('p');
      comment.textContent = reviews[i].comment;
      div.appendChild(comment);
    }
    review.appendChild(div);
  }
}

/* Called if book has no reviews */
function noReview(){
  var review = document.getElementById('reviewsId');
  var h1 = document.createElement('h1');
  h1.textContent = "REVIEWS";
  review.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = "No reviews";
  p.className = "noReviews";
  review.appendChild(p);
}

/* Fetch events where the book will be presented (TO DO) */
function fetchBookEvents(isbn, title){
  $.ajax({
    url: '/books/' + isbn + '/events',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setEvents(data, 'bookEventsId', title, isbn) }
      else{ noEvents() }
    } 
  });
}

/* Set the events where the book will be presented */
function setEvents(events, elementID, eventTitle, bookISBN){
  var container = document.getElementById(elementID);
  while(container.firstChild){ container.removeChild(container.firstChild) }
  for(let i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.className = "event card-1";
    div.onclick = () => goToEvent(events[i].id, elementID, eventTitle, bookISBN);
    
    var img = document.createElement('img');
    img.className = "event_image";
    img.src = events[i].image;
    div.appendChild(img);
    
    var title = document.createElement('p');
    title.className = "eventBox_borderBottom";
    var title_txt = document.createTextNode(events[i].title);
    title.append(title_txt);
    div.appendChild(title);
    
    var date = document.createElement('p');
    var date_txt = document.createTextNode(createDateStr(events[i].date));
    date.append(date_txt);
    div.appendChild(date);
    container.appendChild(div);
  }
}

/* Called if book has no events */
function noEvents(){
  var events = document.getElementById('bookEventsId');
  //var h1 = document.createElement('h1');
  //h1.textContent = "EVENTS";
  //events.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = "No Events";
  p.className = "noReviews";
  events.appendChild(p);
}

/* Redirect to eventX page */
function goToEvent(newEventID, from, eventTitle, bookISBN){
  window.location.href = "Event.html?id=" + newEventID + '&from=' + from + '(' + eventTitle + ')&searchID=' + bookISBN;
}




/*------------------------
  OTHER BOOKS FUNCTIONS
-------------------------*/

/* Fetch all book's authors from db */
function fetchAuthorsBooks(bookISBN){
  $.ajax({
      url: '/books/' + bookISBN + '/authors',
      type: 'GET',
      dataType: 'json',
      success: (data) => { 
        if(data){ fetchAuthorBooks(data[0].id, data[0].name) }
      }
    });
}

/* Fetch all author's books from db */
function fetchAuthorBooks(authorID, authorName){
  $.ajax({
      url: '/authors/' + authorID + '/books',
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ setBooksToPage(data, 'authorBooks', authorName, authorID) } }
    });
}

/* Fetch all similar books from db */
function fetchSimilarBooks(isbn, title){
  $.ajax({
      url: '/books/' + isbn + '/similar',
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ setBooksToPage(data, 'similarBooks', title, isbn) } }
    });
}

/* Set the results of the Fetch functions above to page */
function setBooksToPage(booksIDs, elementID, bookTitle, bookISBN) {
  var deckBook = document.getElementById(elementID);
  while(deckBook.firstChild){ deckBook.removeChild(deckBook.firstChild) }
  for(let i=0; i<booksIDs.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBook(booksIDs[i].isbn, elementID, bookTitle, bookISBN);
          
    var img = document.createElement('img');
    img.className = 'cardBook__image';
    img.src = booksIDs[i].image;
    div.appendChild(img);
    
    var title = document.createElement('div');
    title.className = 'cardBook__link border__bottom';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(booksIDs[i].title);
    b1.append(t1);
    title.appendChild(b1);
    div.appendChild(title);
    
    var author = document.createElement('div');
    author.className = 'cardBook__link border__bottom';
    var b2 = document.createElement('b');
    createAuthorsList(booksIDs[i].isbn, b2);
    author.appendChild(b2);
    div.appendChild(author);
    
    var genre = document.createElement('div');
    genre.className = 'cardBook__link';
    var b3 = document.createElement('b');
    createGenresList(booksIDs[i].isbn, b3);
    genre.appendChild(b3);
    div.appendChild(genre);
  
    deckBook.appendChild(div);
  } 
}  

/* Set author names list to the books card */
function createAuthorsList(bookISBN, element){
  $.ajax({
    url: '/books/' + bookISBN + '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          element.textContent = element.textContent + data[i].name;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

/* create genres list for book Card */
function createGenresList(bookISBN, element){
  $.ajax({
    url: '/books/' + bookISBN + '/genres',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          element.textContent = element.textContent + data[i].value;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

/* Redirect to bookX page from one of the 2 sliders */
function goToBook(newBookISBN, from, name, isbn){
  var str = from + "( of "+name+" )";
  window.location.href = 'Book.html?isbn='+newBookISBN+'&from='+str+'&searchID='+isbn;
}




/*------------------
  CHOICE FUNCTIONS
--------------------*/

/* Called when user clicks Reviews button */
function selectReviews(){
  if(!document.getElementById("reviews_btn").classList.contains("btn__active")){
    document.getElementById("reviews_btn").classList.toggle("btn__active");
    document.getElementById("interview_btn").classList.remove("btn__active");
    document.getElementById("new_review_btn").classList.remove("btn__active");
    document.getElementById("book_events_btn").classList.remove("btn__active");
    document.getElementById("reviewsId").style.display = "block";
    document.getElementById("interviewId").style.display = "none";
    document.getElementById("newReviewId").style.display = "none";
    document.getElementById("bookEventsId").style.display = "none";
  }
}

/* Called when user clicks Intervies button */
function selectInterview(){
  if(!document.getElementById("interview_btn").classList.contains("btn__active")){
    document.getElementById("reviews_btn").classList.remove("btn__active");
    document.getElementById("interview_btn").classList.toggle("btn__active");
    document.getElementById("new_review_btn").classList.remove("btn__active");
    document.getElementById("book_events_btn").classList.remove("btn__active");
    document.getElementById("reviewsId").style.display = "none";
    document.getElementById("interviewId").style.display = "block";
    document.getElementById("newReviewId").style.display = "none";
    document.getElementById("bookEventsId").style.display = "none";
  }
}

/* Called when user clicks New Reviews button */
function selectNewReview(){
  if(!document.getElementById("new_review_btn").classList.contains("btn__active")){
    document.getElementById("reviews_btn").classList.remove("btn__active");
    document.getElementById("interview_btn").classList.remove("btn__active");
    document.getElementById("new_review_btn").classList.toggle("btn__active");
    document.getElementById("book_events_btn").classList.remove("btn__active");
    document.getElementById("reviewsId").style.display = "none";
    document.getElementById("interviewId").style.display = "none";
    document.getElementById("newReviewId").style.display = "block";
    document.getElementById("bookEventsId").style.display = "none";
  }
}

/* Called when user clicks Book's events button */
function selectBookEvents(){
  if(!document.getElementById("book_events_btn").classList.contains("btn__active")){
    document.getElementById("reviews_btn").classList.remove("btn__active");
    document.getElementById("interview_btn").classList.remove("btn__active");
    document.getElementById("new_review_btn").classList.remove("btn__active");
    document.getElementById("book_events_btn").classList.toggle("btn__active");
    document.getElementById("reviewsId").style.display = "none";
    document.getElementById("interviewId").style.display = "none";
    document.getElementById("newReviewId").style.display = "none";
    document.getElementById("bookEventsId").style.display = "flex";
  }
}




/*--------------------
  CART FUNCTIONS
----------------------*/
function addToCart(isbn){
  var username = localStorage.getItem('username'); 
  if (username) {
    $.ajax({
      url: '/cart/add/' + isbn,
      type: 'POST',
      dataType: 'json',
      success: () => { console.log('success') }
    });
  }else { window.location.href = "Authentication.html" }
}