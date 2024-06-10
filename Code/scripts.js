// Creating the list
var list1 = document.createElement("ul")

// Creating Elements of the list
var item1 = document.createElement("li")
item1.innerHTML = "<p>One</p>"
var item2 = document.createElement("li")
item2.innerHTML ="<p>Two</p>"
var item3 = document.createElement("li")
item3.innerHTML ="<p>Three</p>"

// 
list1.appendChild(item1)
list1.appendChild(item2)
list1.appendChild(item3)
document.body.appendChild(list1)

