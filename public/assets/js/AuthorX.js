$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentAuthorID */
  var idParam0 = parameters[0].split('=');
  var currentAuthorID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  if(from=='authorOfTheMonth'){ 
    document.getElementById("paginationID").style.display = "none";
    var orientationInfo = "you have searched &nbsp;<b>Author of the month</b>";
    $('#orientationInfoID').append(orientationInfo);
  }
  else if(from.substring(0,4)=='book'){
    /* book ID */
    var idParam2 = parameters[2].split("=");
    var bookID = unescape(idParam2[1]);
    $.ajax({
      url: '/books/'+ bookID + '/authors',
      type: 'GET',
      dataType: 'json',
      success: (data) => { 
        if(data){
          var str = JSON.stringify(data);
          sessionStorage.setItem("authorList", str);
          setPagination(data, currentAuthorID);
          var orientationInfo = "you have searched authors of &nbsp;<b>" + from.substring(5, from.length-1) + "</b>";
          $('#orientationInfoID').append(orientationInfo);
        } 
      }
    });
  }
  else if(from.substring(0,14)=='similarAuthors'){
    /* previous author ID */
    var idParam2 = parameters[2].split("=");
    var oldAuthID = unescape(idParam2[1]);
    $.ajax({
      url: '/authors/' + oldAuthID + '/similar',
      type: 'GET',
      dataType: 'json',
      success: (data) => { 
        if(data){
          var str = JSON.stringify(data);
          sessionStorage.setItem("authorList", str);
          setPagination(data, currentAuthorID);
          var orientationInfo = "you have searched authors similar to &nbsp;<b>" + from.substring(15, from.length-1) + "</b>";
          $('#orientationInfoID').append(orientationInfo);
        } 
      }
    });
  }
  else if(from.substring(0,12)=='authorSearch'){
    if(from.substring(13, from.length-1)=='allAuthors'){
       $.ajax({
        url: '/authors',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("authorList", str);
            setPagination(data, currentAuthorID);
            var orientationInfo = "you have searched &nbsp;<b>all authors</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else {
      var strSearched = from.substring(13, from.length-1);
      $.ajax({
        url: '/authors?name='+strSearched,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("authorList", str);
            setPagination(data, currentAuthorID);
            var orientationInfo = "you have searched authors whose name contains &nbsp;<b>\"" + strSearched + "\"</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
  }
  else if(from.substring(0,12)=='eventAuthors'){
    /* previous author ID */
    var idParam2 = parameters[2].split("=");
    var eventID = unescape(idParam2[1]);
    $.ajax({
      url: '/events/'+ eventID + '/authors',
      type: 'GET',
      dataType: 'json',
      success: (data) => { 
        if(data){
          var str = JSON.stringify(data);
          sessionStorage.setItem("authorList", str);
          setPagination(data, currentAuthorID);
          var orientationInfo = "you have searched authors at event &nbsp;<b>" + from.substring(13, from.length-1) + "</b>";
          $('#orientationInfoID').append(orientationInfo);
        } 
      }
    });
  }
  
  setAuthor(currentAuthorID);
}




/*-----------------------
  PAGINATION FUNCTIONS
------------------------*/

/* Called when user clicks one of the pagination buttons */
function changePage(dir){
  var str = sessionStorage.getItem('authorList');
  var data = JSON.parse(str);
  var counter = document.getElementById('counter');
  var tabIndex = counter.tabIndex;
  var newIndex = tabIndex + dir;
  
  if(newIndex>=1 && newIndex<=data.length){
    counter.tabIndex = newIndex;
    counter.textContent = " "+newIndex+" / "+data.length; 
    setAuthor(data[newIndex-1].id);
    paginationStyle(newIndex, data.length);
  }
}

/* Set pagination data */
function setPagination(data, id){
  var authID = parseInt(id);
  var i=0;
  while(data[i].id!=authID && i<data.length){ i++ }
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




/*--------------------------
  CURRENT AUTHOR FUNCTIONS
----------------------------*/

/* Set current author data */
function setAuthor(id){
  $.ajax({
    url: '/authors/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        
        $('#authorNameID').text(data[0].name);
        $('#authorImageID').attr("src", data[0].image);
        $('#authorBioID').empty();
        $('#authorBioID').append(data[0].bio);
        $('#authorLinkID').attr("href", data[0].link);
        $('#authorBooks').empty();
        $('#similarAuthor').empty();
        fetchAuthorBooks(id, data[0].name);
        fetchSimilarAuthors(id, data[0].name);
      }
    }
  });
}

/* Fetch all author's books */
function fetchAuthorBooks(authorID, authorName){
  $.ajax({
    url: '/authors/' + authorID + '/books',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'authorBooks', authorName, authorID) } }
  });
}

/* Set all book list to page */
function SetBooks(booksIDs, elementID, bookTitle, searchID) {
  var deckBook = document.getElementById(elementID); 
  while(deckBook.firstChild){ deckBook.removeChild(deckBook.firstChild) }
  for(let i=0; i<booksIDs.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBook(booksIDs[i].isbn, elementID, bookTitle, searchID);
          
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
        console.log("FUNZIONE CREATE GENRES LIST", data);
        for(let i=0; i<data.length; i++){
          element.textContent = element.textContent + data[i].value;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

/* Redirect to book page */
function goToBook(newBookISBN, from, name, isbn){
  var str = from + "( of "+name+" )";
  window.location.href = 'Book.html?isbn='+newBookISBN+'&from='+str+'&searchID='+isbn;
}

/* Fetch all similar author */
function fetchSimilarAuthors(id, authorName){
  $.ajax({
    url: '/authors/' + id + '/similar',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setSimilarAuthors(data, authorName, id); } }
  });
}

/* Set authors list to page */
function setSimilarAuthors(authors, authorName, authorID) {
  var deckAuthor = document.getElementById('similarAuthor');
  while(deckAuthor.firstChild){ deckAuthor.removeChild(deckAuthor.firstChild) }
  for(let i=0; i<authors.length; i++){
    var div = document.createElement('div');
    div.className = "cardAuthor card-1";
    div.onclick = () => goToAuthor(authors[i].id, authorName, authorID);
    
    var img = document.createElement('img');
    img.className = 'cardAuthor__image';
    img.src = authors[i].image;
    div.appendChild(img);
    
    var name = document.createElement('div');
    name.className = 'cardAuthor__body';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(authors[i].name);
    b1.append(t1);
    name.appendChild(b1);
    div.appendChild(name);
    
    deckAuthor.appendChild(div);
  }
}

/* Redirect to author page */
function goToAuthor(authorID, authorName, oldAuthorID){
  window.location.href = 'Author.html?id='+ authorID + '&from=similarAuthors(' + authorName + ')&searchID=' + oldAuthorID; 
}