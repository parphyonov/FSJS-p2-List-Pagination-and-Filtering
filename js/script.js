/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// The list of .student-item-s as our primary pagination target
const students = document.querySelectorAll('.student-item');

// A function to hide all .student-item-s from the view
// We will need it a couple of times
const hideAllStudents = () => {
  students.forEach(student => {
    student.style.display = 'none';
  });
};
// And it is the first time
hideAllStudents();

// .page div will have some children appended later
const page = document.querySelector('.page');
// Page header will be used to insert search field
const pageHeader = document.querySelector('.page-header');
// This will be the message that appears when no search results are found
// and hides if there are search results
const disclaimer = document.querySelector('.disclaimer');
// This variable sets the number of items to be shown on the page
// FEEL FREE TO CHANGE IT for our paginator to display another number of items per page
const paginationBreaker = 10;



// The function accepts a list and a page number and uses CSS properties
// of (allegedly) Nodes in this list to hide and show them depending on the page number.
const showPage = (list, page) => {

  // These variables set the top and bottom range of possible indices
  // E.g. page 3 results in 29 here
  const bottomElem = page * paginationBreaker - 1;
  // ...and 20 here. After all these are INDICES, not actual ordinar places of .student.item
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

// This function deletes already existing pagination from the page
// It will be called from within functions that add new pagination or
// do the search on the items and thus needs old paginations gone.
const deletePagination = () => {
  const oldPages = document.querySelector('.pagination');
  if (oldPages) {
    oldPages.remove();
  }
}

// !!! ::: Functionality ::: !!!
// I decided that doing it all in one function is contraditing with at least
// the next function name (appendPageLinks)
const addPaginationBehavior = (list, paginationDiv) => {
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
}

// Create and append the pagination links
const appendPageLinks = list => {

  deletePagination();

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

  // Oh, these infinite number of function calls
  addPaginationBehavior(list, paginationDiv);

};

// This function is called from event listeners that trigger search
const doTheSearch = (input, list) => {
  // All students names are lower case, so I want to make sure anything a user inputs is also lower case
  const currentSearch = input.value.toLowerCase();
  // This array will hold the results that match the search criteria
  const customSearch = [];
  // We loop through each of the student's items
  list.forEach(listElem => {
    // Getting hold on each student's name
    const elemName = listElem.firstElementChild.children[1].textContent;
    // If it contains a search text...
    if (elemName.includes(currentSearch)) {
      // ...it adds to the search results array
      customSearch.push(listElem);
    };
  });
  // We hide every student from the page to show search results
  hideAllStudents();

  // Some logic, after all
  if (customSearch.length === 0) {
    deletePagination();
    // Displays a message that no results were found, click on a link to refresh the page
    disclaimer.style.display = 'block';
  } else {
    // Removes the error message
    disclaimer.style.display = 'none';
    // Prints the found element and appends new pagination
    showPage(customSearch, 1);
    appendPageLinks(customSearch);
  }
};

const addSearchCapability = (button, input, list) => {
  // On click onto button we make a search on the elements
  button.addEventListener('click', () => {
    doTheSearch(input, list);
  });
  input.addEventListener('keyup', () => {
    doTheSearch(input, list);
  })
}

// Appends search field to the top of the web page
const appendSearchField = () => {
  // Creates div
  const studentSearch = document.createElement('div');
  // Adds class for styling purposes
  studentSearch.className = 'student-search';
  // Then creates input element
  const input = document.createElement('input');
  // Applies its pklaceholder text
  input.autofocus = true;
  input.placeholder = 'Search for students...';
  // And a button element
  const button = document.createElement('button');
  // Setting its text as well
  button.textContent = 'Search';
  // Appends both elements to .student-search
  studentSearch.appendChild(input);
  studentSearch.appendChild(button);
  // And appends .student-search to .page-header
  // The search field is displayed, but no functionality YET
  pageHeader.appendChild(studentSearch);

  // And let the search commence...
  addSearchCapability(button, input, students);

};

appendSearchField();
// Shows first ten items when the page opens
showPage(students, 1);
appendPageLinks(students);
// After all, we have the first page displayed on page opening
document.querySelector('.pagination a').className = 'active';
