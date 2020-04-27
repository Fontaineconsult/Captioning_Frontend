import * as moment from 'moment'
import React, { Component } from 'react';

export const datePicker = function (cell, onRendered, success, cancel, editorParams, isSelected) {

    let date_picker = document.createElement("input");
    date_picker.setAttribute("id", "date_picker");
    date_picker.setAttribute("type", "date");
    date_picker.style.padding = "3px";
    date_picker.style.width = "100%";
    date_picker.style.boxSizing = "border-box";

    date_picker.value = moment(cell.getValue(), moment.ISO_8601).format("MM/DD/YYYY")
    onRendered(function () {
        date_picker.focus()
    });

    function successFunc() {
        success(moment(date_picker.value, moment.ISO_8601).format("MM/DD/YYYY"))
        // submit_date_update(cell);
    }

    function cancelFunc() {
        cancel(moment(date_picker.value, moment.ISO_8601).format("MM/DD/YYYY"))

    }

    date_picker.addEventListener("change", successFunc);
    date_picker.addEventListener("blur", cancelFunc);

    return date_picker




}

export const showDateToggle = function (show_date) {

    if (show_date === null || show_date === "Please enter show date"){
        return "Please enter show date"
    } else {
        return moment(show_date).format("MM/DD/YYYY")
    }}


export const capStatToggle = (cap) => ({
    'Available': false,
    'Unavailable': true,
    "Unknown": true
})[cap];

export const capStatToggle2 = (cap) => ({
    true: false,
    false: true,
    null: true
})[cap];


export const capSubmitToggle = (cap) => ({
    true: false,
    false: true,
    null: true
})[cap];

export const capStatus = (cap) => ({
    true: "Available",
    false: "Unavailable",
    null: "Unknown"
})[cap];


export const buttonIcon = function (value, data, cell) {
    let icon_svg = '<svg enable-background="new 0 0 24 24" height="17" width="17" viewBox="0 0 24 24" xml:space="preserve">' +
        '<path d="M32 4h-4v-4h-4v4h-4v4h4v4h4v-4h4z"></path>' +
        '<path d="M26.996 13.938c0.576 0.64 1.1 1.329 1.563 2.062-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.022-0.001-0.043-0.001-0.065-3.415-0.879-5.947-3.957-5.998-7.635-0.657-0.074-1.325-0.113-2.001-0.113-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-0.551-1.101-1.209-2.137-1.958-3.095-0.915 0.537-1.946 0.897-3.046 1.034zM13 10c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"></path>' +
        '</svg>'
    return icon_svg

}

export const ClosedCaptionIcon = function (props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>)

}