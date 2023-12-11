// Get references to the relevant elements
let currentDayEl = $("#currentDay")
let containerEl = $(".container")


//below code utilises dayjs() to display the current day/date at the top of the calender
dayjs.extend(window.dayjs_plugin_advancedFormat)
dayjs.extend(window.dayjs_plugin_customParseFormat)
let today = dayjs();
let todaysDate = today.format("dddd, Do MMMM YYYY")
currentDayEl.text(todaysDate)

//below is a varable to set the current time
let currentTime = dayjs().format("hA")

// below is an Array of 9 empty strings stored in the taskItems variable 
let taskItems = ["", "", "", "", "", "", "", "", ""]


// below pull saved information from local storage
 if (localStorage.getItem("taskItems")){
    let initialTaskArray = JSON.parse(localStorage.getItem("taskItems"))
    if (Array.isArray(initialTaskArray)){
        taskItems = initialTaskArray
    } 
    } 


 
// forEach method to loop through each array in taskItems
taskItems.forEach(function(element, index) {
    
    // created required elements for each element in the taskItems array.
    let timeBlockDiv = $("<div>")
    let timeBlockHour = $("<div>")
    let timeBlockText = $("<textarea>")
    let timeBlockButton = $("<button>")

     // added class and id attributes to the elements created above.
    timeBlockDiv.attr("class", "time-block row")
    timeBlockHour.attr("class", "col-md-1 hour")
    timeBlockText.attr("class", "col-md-10 description")
    timeBlockText.attr("id", "time-block" + index)
    timeBlockButton.attr("class", "btn saveBtn col-md-1")
    
    //below sets start time for the day at 9am and adds hour using the array index 
    let startTime = dayjs().set("hour", 9).add(index, "hour").format("hA")
    
    // adds text to the elements created above
    timeBlockHour.text(startTime)
    timeBlockText.text(element)

    //append elements so they display in the browser
    timeBlockDiv.append(timeBlockHour)
    timeBlockDiv.append(timeBlockText)
    timeBlockDiv.append(timeBlockButton)
    containerEl.append(timeBlockDiv)

    // below was used to convert startTime and currentTime string to parse a time
    let businessHour = dayjs(startTime, "hA")
    let currentScheduleTime = dayjs(currentTime, "hA")
    
    if(currentScheduleTime.isBefore(businessHour)){
        timeBlockText.addClass("future")
    } else if (currentScheduleTime.isAfter(businessHour)){
        timeBlockText.addClass("past")
    } else {
        timeBlockText.addClass("present")
    }

    // added click event to save value in element to local storage
    timeBlockButton.on("click", function(event){
    
    let task = timeBlockText.val()

    taskItems[index] = task

    localStorage.setItem("taskItems", JSON.stringify(taskItems))


     })
    
})
