/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// Add variables that store DOM elements you will need to reference and/or manipulate
const students = document.querySelectorAll('.student-item');
// Stores a div with '.page' class for later use in functions
const page = document.querySelector('.page');
// Removes old pagination in case the number of elements changes
const oldPagination = document.querySelector('.pagination');
// This variable sets the number of items to be shown on the page
const paginationBreaker = 10;


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
const showPage = (list, page) => {

  // These variables set the top and bottom range of possible indices
  const bottomElem = page * paginationBreaker - 1;
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


// Create and append the pagination links - Creating a function that can do this is a good approach
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

  // Add functionality to the pagination buttons so that they show and hide the correct items
  // Tip: If you created a function above to show/hide list items, it could be helpful here

  // I had first introduced functionality through applying listener to each anchor,
  // But then decided to implement this as it was more challenging to me
  // And took some time.
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



// Shows first ten items when the page loads
showPage(students, 1);
appendPageLinks(students);
