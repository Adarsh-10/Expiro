import React from "react";
import Item from "./Item";
import { nanoid } from "nanoid";

export default function Body() {
  console.log(localStorage.getItem("items"));

  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function createNewItem(expiration, name) {
      const newItem = {
        id: nanoid(),
        dateExpired: expiration,
        name: name
      }
      setItems(prevItems => [newItem, ...prevItems])
  }

//   function createNewItem() {
//     const newItem = {
//       id: nanoid(),
//       dateAdded: "January 20220",
//       dateExpired: "Dec 120",
//       name: "Honey Nut Cheerios",
//       barcode: 0,
//     };
//     setItems((prevItems) => [newItem, ...prevItems]);
//   }

  function deleteItem(e, itemId) {
    e.stopPropagation();
    setItems(oldItems => oldItems.filter(item => item.id !== itemId))
  }

  function openItemInput(e) {
    if (e.target.ariaExpanded == "false"){
      document.getElementById("add-item-container").classList.remove("hide");
      document.getElementById("add-item-container").classList.add("show");
      document.getElementById("add-item-btn").ariaExpanded = "true";
    }
    else {
      document.getElementById("add-item-container").classList.remove("show");
      document.getElementById("add-item-container").classList.add("hide");
      document.getElementById("add-item-btn").ariaExpanded = "false";
    }
  }

  function addItemInput(e) {
    e.preventDefault();
    console.log(e);
    createNewItem(
      document.getElementById("date-expiry-input").value,
      document.getElementById("name-input").value
    )
  }


  return (
    <>
      <nav className="nav-container">
        <h1 className="nav-item-name">
          <span>😴 </span>Expiro
        </h1>
        <div id="add-item-container">
            <button onClick={openItemInput} id="add-item-btn" aria-label="Add item" aria-expanded="false" aria-controls="add-item-input-container">
                <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z"/>
                </svg>
            </button>
            <div id="add-item-input-container">
                <form>
                  <label>
                    Name
                    <input type="text" id="name-input" />
                  </label>
                  <label>
                    Expires on
                    <input type="date" id="date-expiry-input" />
                  </label>
                  <button onClick={addItemInput}>Add</button>
                </form>
            </div>
        </div>
        
      </nav>

      <div className="items-container">
        {items.map((item) => <Item item={item} deleteItem={deleteItem}/>)}
      </div>
    </>
  );
}
