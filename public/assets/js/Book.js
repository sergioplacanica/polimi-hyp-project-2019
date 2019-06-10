$(document).ready(fetchData())

function fetchData() {
  
  //extract bookID
  /*var parameters = location.search.substring(1).split('=');
  var temp = unescape(parameters[1]);
  var bookID = temp.substr(1, temp.length-2);
  alert(bookID); //TO LEAVE*/
  
  //Call DB and retrieve all books of 'authorID'
  var recommendedBooks = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(recommendedBooks, 'recommendedBooks');
  
  //Call DB and retrieve top seller books
  var topSellersBooks = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(topSellersBooks, 'topSellersBooks');
  
  //Call DB and retrieve all classic books
  var classicBooks = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(classicBooks, 'classicBooks');
  
  //Call DB and retrieve next comings
  var nextComingBooks = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(nextComingBooks, 'nextComingBooks');
  
}


function SetBooks(books, id) {
  var deckBook = document.getElementById(id);
  var length = books.length < 8 ? books.length : 8; //oppure li restituisco tutti???
  
  var i;
  for(i=0; i<length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.setAttribute("onclick", "goToBook()");
    
    var img = document.createElement('img');
    img.className = 'cardBook__image';
    img.src = books[i].img;
    div.appendChild(img);
    
    var title = document.createElement('div');
    title.className = 'cardBook__link border__bottom';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(books[i].title);
    b1.append(t1);
    title.appendChild(b1);
    div.appendChild(title);
    
    var author = document.createElement('div');
    author.className = 'cardBook__link border__bottom';
    var b2 = document.createElement('b');
    var t2 = document.createTextNode(books[i].author);
    b2.append(t2);
    author.appendChild(b2);
    div.appendChild(author);
    
    var genre = document.createElement('div');
    genre.className = 'cardBook__link';
    var b3 = document.createElement('b');
    var t3 = document.createTextNode(books[i].genre);
    b3.append(t3);
    genre.appendChild(b3);
    div.appendChild(genre);
    
    deckBook.appendChild(div);
  }
  
}

function goToBook(){
  window.location.href = '/bookX';
}


function select_searchBook() {
  document.getElementById("book_of_the_month").classList.remove("button_active");
  document.getElementById("bookOfTheMonth").classList.toggle("choice_hide");
  document.getElementById('search_book').classList.toggle("button_active");
  document.getElementById('searchBooks').classList.remove("choice_hide");
}

function select_bookOfTheMonth() {
  document.getElementById('search_book').classList.remove("button_active");
  document.getElementById("searchBooks").classList.toggle("choice_hide");
  document.getElementById("book_of_the_month").classList.toggle("button_active");
  document.getElementById('bookOfTheMonth').classList.remove("choice_hide");
}