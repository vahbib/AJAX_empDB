// imports
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + 
    "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data=null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(methodType+" State Changed Called at: " + showTime() +" RS: " +
                    xhr.readyState + " Status: " + xhr.status);
            if(xhr.readyState === 4) {
                // Matching all 200 Series Responses
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed");
                    console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data){
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("GET Error Status: " +
                JSON.stringify(error)));
console.log("Made GET AJAX Call to Server at " + showTime());

const delUrl = "http://localhost:3000/employees/2";
makePromiseCall("DELETE", delUrl, true)
    .then(responseText => {
        console.log("User Data Deleted: "+responseText)
    })
    .catch(error => console.log("DEL Error Status: " + 
                JSON.stringify(error)));

const postUrl = "http://localhost:3000/employees";
const empData = {"name": "Manikanta", "salary": "10000.0"};
makePromiseCall("POST", postUrl, true, empData)
    .then(responseText => {
        console.log("User Data Added: "+responseText)
    })
    .catch(error => console.log("POST Error Status: " + 
                JSON.stringify(error)));