import React from "react";
import Item from "./Item";
import { nanoid } from "nanoid";
import barcodeHelpImage from "../images/barcodeHelpExample.png"

export default function Body() {

  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  async function createNewItem(barcode, dateExpired, name) {
    let image;
    let linkToBuy;
    if (barcode) {
      let response = await fetch(`/barcode?barcode=${barcode}`);
      let jsonItem = await response.json();
      let item = jsonItem.items[0];
      name = item.title;
      image = item.images[0]
      linkToBuy = item.offers[0]?.link;
    }
    const newItem = {
      id: nanoid(),
      dateExpired,
      name,
      image,
      linkToBuy
    }
    let itemsInOrder = [newItem, ...items];
    itemsInOrder.sort((a, b)=>{
      let dateA = new Date(a.dateExpired);
      let dateAStandard = new Date(dateA.getUTCFullYear(), dateA.getUTCMonth(), dateA.getUTCDate());
      let dateB = new Date(b.dateExpired);
      let dateBDateStandard = new Date(dateB.getUTCFullYear(), dateB.getUTCMonth(), dateB.getUTCDate());
      return dateAStandard.getTime() - dateBDateStandard.getTime();
    });
    setItems(itemsInOrder);
  }


  function deleteItem(e, itemId) {
    e.stopPropagation();
    setItems(oldItems => oldItems.filter(item => item.id !== itemId))
  }

  function openItemInput() {
    if (document.getElementById("add-item-btn").ariaExpanded == "false") {
      document.getElementById("add-item-container").classList.remove("hide");
      document.getElementById("add-item-container").classList.add("show");
      document.getElementById("add-item-btn").ariaExpanded = "true";
    }
    else {
      document.getElementById("add-item-container").classList.remove("show");
      document.getElementById("add-item-container").classList.add("hide");
      document.getElementById("add-item-btn").ariaExpanded = "false";
      document.getElementById("name-input-container").classList.remove("show");
      document.getElementById("barcode-input-container").classList.remove("hide");
    }
  }

  function addItemInput(e) {
    e.preventDefault();
    
    if (!document.getElementById("barcode-input").value && !document.getElementById("name-input").value){
      return;
    }
    if (!document.getElementById("date-expiry-input").value){
      return;
    }

    createNewItem(
      document.getElementById("barcode-input").value,
      document.getElementById("date-expiry-input").value,
      document.getElementById("name-input").value
    );
  }

  function noBarcodeBtnClick(e) {
    e.preventDefault();
    document.getElementById("name-input-container").classList.toggle("show");
    document.getElementById("barcode-input-container").classList.toggle("hide");
  }

  function yesBarcodeBtnClick(e) {
    e.preventDefault();
    document.getElementById("barcode-input-container").classList.toggle("hide");
    document.getElementById("name-input-container").classList.toggle("show");
  }

  function openSortItemInput(e) {
    e.preventDefault();
    if (document.getElementById("sort-item-btn").ariaExpanded == "false") {
      document.getElementById("sort-items-container").classList.remove("hide");
      document.getElementById("sort-items-container").classList.add("show");
      document.getElementById("sort-item-btn").ariaExpanded = "true";
    }
    else {
      document.getElementById("sort-items-container").classList.remove("show");
      document.getElementById("sort-items-container").classList.add("hide");
      document.getElementById("sort-item-btn").ariaExpanded = "false";
    }
  }

  function firstExpireSort() {
    document.getElementById("sort-items-container").classList.remove("show");
    document.getElementById("sort-items-container").classList.add("hide");
    document.getElementById("sort-item-btn").ariaExpanded = "false";
    let itemsInOrder = [...items];
    itemsInOrder.sort((a, b)=>{
      let dateA = new Date(a.dateExpired);
      let dateAStandard = new Date(dateA.getUTCFullYear(), dateA.getUTCMonth(), dateA.getUTCDate());
      let dateB = new Date(b.dateExpired);
      let dateBDateStandard = new Date(dateB.getUTCFullYear(), dateB.getUTCMonth(), dateB.getUTCDate());
      return dateAStandard.getTime() - dateBDateStandard.getTime();
    });
    setItems(itemsInOrder);
  }

  function lastExpireSort() {
    document.getElementById("sort-items-container").classList.remove("show");
    document.getElementById("sort-items-container").classList.add("hide");
    document.getElementById("sort-item-btn").ariaExpanded = "false";
    let itemsInOrder = [...items];
    itemsInOrder.sort((a, b)=>{
      let dateA = new Date(a.dateExpired);
      let dateAStandard = new Date(dateA.getUTCFullYear(), dateA.getUTCMonth(), dateA.getUTCDate());
      let dateB = new Date(b.dateExpired);
      let dateBDateStandard = new Date(dateB.getUTCFullYear(), dateB.getUTCMonth(), dateB.getUTCDate());
      return dateBDateStandard.getTime() - dateAStandard.getTime();
    });
    setItems(itemsInOrder);
  }

  function azSort() {
    document.getElementById("sort-items-container").classList.remove("show");
    document.getElementById("sort-items-container").classList.add("hide");
    document.getElementById("sort-item-btn").ariaExpanded = "false";
    let itemsInOrder = [...items];
    itemsInOrder.sort((a, b)=>{
      if (a.name < b.name) {return -1};
      if (a.name > b.name) {return 1};
      return 0;
    });
    setItems(itemsInOrder);
  }

  function zaSort() {
    document.getElementById("sort-items-container").classList.remove("show");
    document.getElementById("sort-items-container").classList.add("hide");
    document.getElementById("sort-item-btn").ariaExpanded = "false";
    let itemsInOrder = [...items];
    itemsInOrder.sort((a, b)=>{
      if (a.name > b.name) {return -1};
      if (a.name < b.name) {return 1};
      return 0;
    });
    setItems(itemsInOrder);
  }


  return (
    <>
      <nav className="nav-container">
        <h1 className="nav-item-name">
          <span>😴 </span>Expiro
        </h1>
        <div id="sort-items-container">
          <button onClick={openSortItemInput} id="sort-item-btn" aria-label="sort-items" aria-expanded="false" aria-content="sort-item-input-container">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12V10H6V12H0ZM0 7V5H12V7H0ZM0 2V0H18V2H0Z" fill="#1C1B1F"/>
            </svg>
          </button>
          <div id="sort-item-input-container">
            <button onClick={azSort}>Alphabetical A to Z</button>
            <button onClick={zaSort} >Alphabetical Z to A</button>
            <button onClick={firstExpireSort}>Expire Date first to last</button>
            <button onClick={lastExpireSort}>Alphabetical last to first</button>
          </div>
        </div>
        <div id="add-item-container">
          <button onClick={openItemInput} id="add-item-btn" aria-label="Add item" aria-expanded="false" aria-controls="add-item-input-container">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" />
            </svg>
          </button>
          <div id="add-item-input-container">
            <form>
              <div id="product-identification">
                <div id="barcode-input-container">
                  <label>
                    <span id="barcode-title">
                      Barcode number (required)
                      <div>
                        <svg id="open-help-barcode" width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.95 16C10.3 16 10.596 15.879 10.838 15.637C11.0793 15.3957 11.2 15.1 11.2 14.75C11.2 14.4 11.0793 14.1043 10.838 13.863C10.596 13.621 10.3 13.5 9.95 13.5C9.6 13.5 9.304 13.621 9.062 13.863C8.82067 14.1043 8.7 14.4 8.7 14.75C8.7 15.1 8.82067 15.3957 9.062 15.637C9.304 15.879 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9627 11.1667 11.088 10.85C11.2127 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.704 13.175 8.312C13.425 7.92067 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37933 4.25 7.788 4.75C7.196 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.471 6.575 8.763 6.225C9.05433 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84567 11.3 6.137C11.5667 6.429 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74567 11.4 8.037C11.2 8.329 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#1C1B1F" />
                        </svg>
                        <div id="help-barcode">
                          <p>Include all the numbers including the numbers at the corner</p>
                          <img src={barcodeHelpImage} alt="sample barcode" />
                          <p>For example, this one would be <b>033200011101</b></p>
                        </div>
                      </div>
                    </span>
                    <input type="number" id="barcode-input" />
                  </label>
                  <button onClick={noBarcodeBtnClick} id="without-barcode-button" type="button">No barcode?</button>
                </div>
                <div id="name-input-container">
                  <label>
                    Name (required)
                    <input type="text" id="name-input" />
                  </label>
                  <button onClick={yesBarcodeBtnClick} id="with-barcode-button" type="button">have barcode?</button>
                </div>
              </div>

              <label>
                Expires on (required)
                <input type="date" id="date-expiry-input" />
              </label>
              <button onClick={addItemInput}>Add</button>
            </form>
          </div>
        </div>

      </nav>

      <div className="items-container">
        {items.map((item) => <Item item={item} deleteItem={deleteItem} />)}
      </div>
    </>
  );
}
