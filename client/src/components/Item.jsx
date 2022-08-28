import React from "react"

export default function Item(props) {

    function dateMonth(number) {
        switch (number) {
            case 1: return "January"
            case 2: return "February"
            case 3: return "March"
            case 4: return "April"
            case 5: return "May"
            case 6: return "June"
            case 7: return "July"
            case 8: return "August"
            case 9: return "September"
            case 10: return "October"
            case 11: return "November"
            case 12: return "December"
        }
    }

    function dateCLassList() {
        let today = new Date();
        let todayStandard = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
        let expiryDate = new Date(props.item.dateExpired);
        let expiryDateStandard = new Date(expiryDate.getUTCFullYear(), expiryDate.getUTCMonth(), expiryDate.getUTCDate());
        let difference = expiryDateStandard.getTime() - todayStandard.getTime();
        if (difference <= 0) {
            return "expired";
        }
        if (difference <= 1000 * 60 * 60 * 24 * 10) {
            return "soon";
        }
        else {
            return "not-expired"
        }
    }

    function itemImage() {
        if (!props.item.image) {
            return;
        }
        return <img className="item-image" src={props.item.image} alt={props.item.name} />
    }

    function itemLink() {
        if (!props.item.linkToBuy) {
            return;
        }
        return (
            <a href={props.item.linkToBuy} target="_blank">
                Buy more
                <svg width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H9V2H2V16H16V9H18V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM6.7 12.7L5.3 11.3L14.6 2H11V0H18V7H16V3.4L6.7 12.7Z" fill="#1C1B1F" />
                </svg>
            </a>
        );
    }

    let date = props.item.dateExpired.split("-");
    let readableDate = `${dateMonth(Number(date[1]))} ${date[2]}, ${date[0]}`
    if (!date[1]) {
        readableDate = "";
    }


    return (
        <div className="item-container">
            {itemImage()}
            <div>
                <p className={dateCLassList()}>
                    Expiry Date: {readableDate}
                    <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 18C1.45 18 0.979334 17.8043 0.588 17.413C0.196 17.021 0 16.55 0 16C0 15.45 0.196 14.979 0.588 14.587C0.979334 14.1957 1.45 14 2 14C2.55 14 3.021 14.1957 3.413 14.587C3.80433 14.979 4 15.45 4 16C4 16.55 3.80433 17.021 3.413 17.413C3.021 17.8043 2.55 18 2 18ZM0 12V0H4V12H0Z" fill="#1C1B1F" />
                    </svg>
                </p>
                <p>{props.item.name}</p>
                {itemLink()}
            </div>
            <button onClick={(e) => props.deleteItem(e, props.item.id)}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" />
                </svg>
            </button>
        </div>
    );
}