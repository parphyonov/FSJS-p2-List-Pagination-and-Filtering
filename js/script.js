/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// The list of .student-item-s as our primary pagination target
const students = document.querySelectorAll('.student-item');
students.forEach(student => {
  student.style.display = 'none';
});
// .page div will have some children appended later
const page = document.querySelector('.page');
// This variable sets the number of items to be shown on the page
// FEEL FREE TO CHANGE IT for our paginator to display another number of items per page
const paginationBreaker = 10;
// Page header will be used to insert search field
const pageHeader = document.querySelector('.page-header');


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
  const oldPages = document.querySelector('.pagination');
  if (oldPages) {
    oldPages.remove();
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

// Appends search field to the top of the web page
const appendSearchField = () => {
  // Creates div
  const studentSearch = document.createElement('div');
  // Adds class for styling purposes
  studentSearch.className = 'student-search';
  // Then creates input element
  const input = document.createElement('input');
  // Applies its pklaceholder text
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

  // On click onto button we make a search on the elements
  button.addEventListener('click', () => {
    const currentSearch = input.value.toLowerCase();
    const customSearch = [];
    students.forEach(student => {
      const studentName = student.firstElementChild.children[1].textContent;
      if (studentName.includes(currentSearch)) {
        customSearch.push(student);
      };
    });
    students.forEach(student => {
      student.style.display = 'none';
    });
    showPage(customSearch, 1);
    appendPageLinks(customSearch);
  });
};

appendSearchField();
// Shows first ten items when the page opens
showPage(students, 1);
appendPageLinks(students);
// After all, we have the first page displayed on page opening
document.querySelector('.pagination a').className = 'active';
