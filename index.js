(function() {

  // VARIABLES 

  var form = document.querySelector('form');
  var familyList = document.querySelector('ol[class="household"]');
  var addFamilyButton = document.querySelector('button[class="add"]');
  var submitButton = document.querySelector('button[type="submit"]');

  // METHODS

  // Add people to a growing household list
  function addFamilyMember(age, relationshipText, smoker) {
    smoker ? smoker = "(smoker)" : smoker = ""  
    var familyList = document.querySelector('ol[class="household"]');
    // creating the new li for each family member 
    var newLi = document.createElement("li");
    var text = document.createTextNode(`${relationshipText}: age ${age} ${smoker} `);
    newLi.appendChild(text);
    familyList.appendChild(newLi);
    // adding the delete button for removal later
    var deleteButton = document.createElement("button");
    var deleteText = document.createTextNode("X")
    deleteButton.appendChild(deleteText);
    newLi.appendChild(deleteButton);
    
    // must have a unique ID added onto each li so we can remove the correct family member later
    var attId = document.createAttribute("id"); 
    var randomNumberForID = Math.floor(Math.random() * 123456789)
    attId.value = `${relationshipText}-${randomNumberForID}`;  
    newLi.setAttributeNode(attId);
  }

  // - Serialize the household as JSON 
  function serializeHouseholdToJSON( household ) {
    var obj = {};
    var liFamilyMember = household.querySelectorAll("li");
    for( var i = 0; i < liFamilyMember.length; i++ ) {
      var name = `Family-Member-${i}`;
      var value = liFamilyMember[i].textContent.slice(0,-3);

      if (name) {
        obj[name] = value;
      }
    }
    return obj;
  }

  // EVENT LISTENERS

  // - Display the household list in the HTML as it is modified
  addFamilyButton.addEventListener("click", function(e) {
    e.preventDefault();
    var age = parseInt(document.querySelector("input[name='age']").value);
    var relationshipText = document.querySelector("select").value;
    var smoker = document.querySelector("input[type='checkbox']").checked;

    // - Validate data entry (age is required and > 0, relationship is required)
    if (!age || age < 0 || !relationshipText) {
      alert("Please add an age greater than 0 and/or select a family relationship.")
    } else {
      addFamilyMember(age, relationshipText, smoker);
      // - Reset the entry form after each addition
      form.reset();
    }
  })

  // - Remove a previously added person from the list
  familyList.addEventListener("click", function(e) {
    e.preventDefault();
    var familyMemberToRemove = document.getElementById(e.target.parentNode.id);
    familyList.removeChild(familyMemberToRemove);
  })

  // upon form submission as a fake trip to the server
  submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    var json = serializeHouseholdToJSON(familyList);
    var jsonText = JSON.stringify(json);
    var preElement = document.querySelector("pre[class='debug']");
    preElement.innerHTML = `${jsonText}`;
    preElement.style.display="inline-block";
  })

})();

