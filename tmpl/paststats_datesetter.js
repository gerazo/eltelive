function init()
{
    document.getElementById("formsubmitter").onclick = checkAndSubmit;
}

function checkAndSubmit()
{
    var eacode = document.getElementById("code").value;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var isCorrect = 1;
    document.getElementById("errorlog").innerHTML = ""
    if (eacode == "")
    {
        document.getElementById("errorlog").innerHTML += "Code cannot be empty! "
        isCorrect = 0;
    }

    if (isNaN(year) || year < 0 || year == "")
    {
        document.getElementById("errorlog").innerHTML += "Incorrect year format! "
        isCorrect = 0;
    }
    if (isNaN(month) || month < 0 || month > 12 || month == "")
    {
        document.getElementById("errorlog").innerHTML += "Incorrect month format! "
        isCorrect = 0;
    }
    if (isNaN(day) || day < 0 || day > 31 || month == "")
    {
        document.getElementById("errorlog").innerHTML += "Incorrect day format! "
        isCorrect = 0;
    }

    if (isCorrect == 1)
    {
        document.getElementById("yearform").submit();
    }
}





window.onload = init;