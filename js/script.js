/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// The list of .student-item-s as our primary pagination target
const students = document.querySelectorAll('.student-item');
// .page div will have some children appended later
const page = document.querySelector('.page');
// This one will be deleted each time page links are appended
// I guess in case more items get added or sorted later in this project (someday:)
const oldPagination = document.querySelector('.pagination');
// This variable sets the number of items to be shown on the page
// FEEL FREE TO CHANGE IT for our paginator to display another number of items per page
const paginationBreaker = 10;


// The function accepts a list and a page number and uses CSS properties
// of (allegedly) Nodes in this list to hide and show them depending on the page number.
const showPage = (list, page) => {

  // These variables set the top and bottom range of possible indices
  // E.g. page 3 results in 29 here
  const bottomElem = page * paginationBreaker - 1;
  // ...and 20 here. After all these are INDECES, not actual ordinar places of .student.item
  const topElem = bottomElem - 9;

  // Loop through the array, check if a student's index within the page's boundaries and...
  list.forEach((listElem, listIndex) => {
    // leave it displayed if it is within
    if (listIndex >= topElem && listIndex <= bottomElem) {
      listElem.style.display = '';
    // hides it if it is not
    } else {
      listElem.style.display = 'none';
    }
  });

};


// Create and append the pagination links
const appendPageLinks = list => {

  // Removes pagination if it already exists
  if (oldPagination) {
    oldPagination.remove();
  }

  // This determines how many pages will be needed
  // Math.ceil is used in case the division provides a float, and in this case an extra page is needed
  const pagesNum = Math.ceil(list.length / paginationBreaker);
  // Creates a div to hold all pagination
  const paginationDiv = document.createElement('div');
  // Gives it a class of '.pagination'
  paginationDiv.className = 'pagination';
  // Appends pagination div to page
  page.appendChild(paginationDiv);
  // Creates ul to hold paginator's links in form of list items
  const ul = document.createElement('ul');
  // Adds it to the paginator div
  paginationDiv.appendChild(ul);

  // Now we use a simple for loop to form exact number of links our paginator will need each time the function is called
  for (let pn = 1; pn <= pagesNum; pn += 1) {
    // The list item proper
    const li = document.createElement('li');
    // An anchor element
    const a = document.createElement('a');
    // The text for the anchor element
    const aText = document.createTextNode(pn);
    // Now everything is appended in the right order and here we already have the right number of paginator links
    // But... no functionality is added yet
    a.appendChild(aText);
    li.appendChild(a);
    ul.appendChild(li);
  }

  // !!! ::: Functionality ::: !!!

  // I had first introduced functionality through applying listener to each anchor,
  // but then decided to implement this as it was more challenging for me
  // to figure our how and took some time.
  paginationDiv.addEventListener('click', event => {
    const page = event.target;
    const pageToShow = parseInt(page.textContent);
    showPage(list, pageToShow);
    // I did not like this way, but if it is not a listener of each a,
    // it appeared to me to be the shortest valid solution
    // without jQuery calls (which I did not want to use in this project)
    document.querySelectorAll('.pagination a').forEach(anchor => {
      anchor.className = '';
    });
    // Now we only add active class to the clicked anchor
    page.className = 'active';
  });

};

// Shows first ten items when the page opens
showPage(students, 1);
// And then immediately appends functioning paginator to our web page
appendPageLinks(students);
