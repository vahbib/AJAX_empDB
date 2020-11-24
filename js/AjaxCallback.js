let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs: "+date.getMinutes() +"Mins: "+date.getSeconds() +"Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data ) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+" State changes called. | At: "+showTime()+" | Ready State: "+
                    xhr.readyState+" Status: "+xhr.status);
            if( xhr.readyState === 4) {
                if(xhr.status === 200 || xhr.status === 201){
                    callback(xhr.responseText);
                } else if (xhr.status >= 400) {
                    console.log("Handle 400 Client Error or 500 Server Error. | At: "+showTime());
                }
            }
    }
    xhr.open(methodType, url, async);
    if(data) {
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.send(JSON.stringify(data));
    } else {
         xhr.send();
    }
    console.log(methodType+ " request sent to the server at "+showTime());
}


// GET User Data
const getURL = "http://localhost:3000/employees";
function getUserDetails(data) {
    console.log("Get User Data at: "+showTime()+" | Data: "+data);
}


 
//Delete User
const deleteURL = "http://localhost:3000/employees/3";
function userDeleted(data) {
    console.log("User Deleted At: "+showTime()+" | Data: "+data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("\n$$$$$$$$$$$$$$$$=== User Deleted ===$$$$$$$$$$$$$$$$$$$\nAt: "+showTime()+"\n");


//Post User
const postURL = "http://localhost:3000/employees";
const empData = { "name": "Harry" , "salary": "500000"};
function userAdded(data) {
    console.log("User Added At: "+showTime()+" | Data: "+data)
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("\n$$$$$$$$$$$$$$$$=== User Added ===$$$$$$$$$$$$$$$$$$$\nAt: "+showTime()+"\n");

makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at "+ showTime()+"\n");