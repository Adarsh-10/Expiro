import React from "react"
import {nanoid} from "nanoid"


export default function Body() {

    console.log(localStorage.getItem("items"));

    const [items, setItems] = React.useState(
        JSON.parse(localStorage.getItem("items")) || []
    )

    React.useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    // function createNewItem(dateAdded, dateExpired, name, barcode) {
    //     const newItem = {
    //       id: nanoid(),
    //       dateAdded,
    //       dateExpired,
    //       name,
    //       barcode,
    //     }
    //     setItems(prevItems => [newItem, ...prevItems])
    // }

    function createNewItem() {
        const newItem = {
          id: nanoid(),
          dateAdded: 0,
          dateExpired: 0,
          name: 0,
          barcode: 0
        }
        setItems(prevItems => [newItem, ...prevItems])
    }

    return (
        <div>
            <button onClick={createNewItem}>Click Me!</button>
            {items.dateAdded}
        </div>
    );
}