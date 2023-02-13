// Base URL
// const base_url_4 = 'http://localhost:3000/'
const base_url_4 = 'https://becon-edc.azurewebsites.net/';

const getEventList = async (day) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    const url = `${base_url_4}api/event/day/${day}`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    const dayRow = document.getElementById(day);
                    var eventList = data.event.map(function (event) {
                        return `<div class="col-sm-6 col-md-4 col-lg-3 my-3">
                            <div class="card" style="height:100%">
                                <div class="card-header" style="color:#b8439a">${event.date}</div>
                                <img src="${event.image}" class="card-img-top" alt="card" />
                                <div class="card-body">
                                    <h5 class="card-title">${event.longName}</h5>
                                    <p class="card-text" id="eventDesc">${event.desc.length > 110 ? event.desc.slice(0, 100) + "..." : event.desc}</p>
                                </div>
                                <div class="card-footer">
                                    <a href="./event.html?${event.eventName}" class="btn btn-primary w-100">Register for event</a>
                                </div>
                            </div>
                        </div>`;
                    })
                    dayRow.innerHTML = eventList.join(' ');
                }
                else {
                    console.log(data.message)
                }
            })
    }
    catch (error) {
        console.log(error)
    }
}

(function () {
    "use strict";
    getEventList("day1")
    getEventList("day2")
})()

