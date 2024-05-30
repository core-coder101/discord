import React from "react";

function DateSeperator(props){

    let {
        currentDate,
    } = props

    let year = currentDate.getFullYear()
    let monthNumber = currentDate.getMonth()
    let day = currentDate.getDate()
    let monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let monthName = monthsArr[parseInt(monthNumber)]
    return(
        <div className="DateSeperatorMainDiv">
            <div className="greyLines"></div>
            <div className="dateSeperatorDateDiv">
                <p>{monthName} {day}, {year}</p>
            </div>
            <div className="greyLines"></div>
        </div>
    )
}

export default DateSeperator