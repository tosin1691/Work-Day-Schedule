let currentDayEl = $("#currentDay")
let containerEl = $(".container")



dayjs.extend(window.dayjs_plugin_advancedFormat)
dayjs.extend(window.dayjs_plugin_customParseFormat)
let today = dayjs();
let todaysDate = today.format("Do MMMM YYYY")
currentDayEl.text(todaysDate)

let currentTime = dayjs().format("hA")

let taskItems = ["", "", "", "", "", "", "", "", ""]

 if (localStorage.getItem("taskItems")){
    let initialTaskArray = JSON.parse(localStorage.getItem("taskItems"))
    if (Array.isArray(initialTaskArray)){
        taskItems = initialTaskArray
    } 
    } 


 

 taskItems.forEach(function(element, index) {
    
    let timeBlockDiv = $("<div>")
    let timeBlockHour = $("<div>")
    let timeBlockText = $("<textarea>")
    let timeBlockButton = $("<button>")

    timeBlockDiv.attr("class", "time-block row")
    timeBlockHour.attr("class", "col-md-1 hour")
    timeBlockText.attr("class", "col-md-10 description")
    timeBlockText.attr("id", "time-block" + index)
    timeBlockButton.attr("class", "btn saveBtn col-md-1")

    
    let startTime = dayjs().set("hour", 9).add(index, "hour").format("hA")
    

    timeBlockHour.text(startTime)
    timeBlockText.text(element)


    timeBlockDiv.append(timeBlockHour)
    timeBlockDiv.append(timeBlockText)
    timeBlockDiv.append(timeBlockButton)
    containerEl.append(timeBlockDiv)



    let scheduleTime = dayjs(startTime, "hA")
    let currentScheduleTime = dayjs(currentTime, "hA")
    
        if(currentScheduleTime.isBefore(scheduleTime)){
            timeBlockText.addClass("future")
            timeBlockText.removeClass("past")
            timeBlockText.removeClass("present")
        } else if (currentScheduleTime.isAfter(scheduleTime)){
            timeBlockText.addClass("past")
            timeBlockText.removeClass("future")
            timeBlockText.removeClass("present")
        } else {
            timeBlockText.addClass("present")
            timeBlockText.removeClass("future")
            timeBlockText.removeClass("past")
        }


    timeBlockButton.on("click", function(event){
    
    let task = timeBlockText.val()

    taskItems[index] = task

    localStorage.setItem("taskItems", JSON.stringify(taskItems))


     })



    
    // 

    
    
    // 
   
    
})
