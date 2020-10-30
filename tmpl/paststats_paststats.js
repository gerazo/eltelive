function init()
{
    loadStats()
}

function loadStats()
{
    var parameters = location.search.substring(1).split("&")
    var temp = parameters[0].split("=");
    var lecturename = unescape(temp[1]);
    var t2 = parameters[1].split("=");
    var year = unescape(t2[1]);
    var t3 = parameters[2].split("=");
    var month = unescape(t3[1]);
    var t4 = parameters[3].split("=");
    var day = unescape(t4[1]);
    var transformedDate = day
    transformedDate += "/"
    var b = 0;
    switch(parseInt(month)) {
        case 1:
            transformedDate += "Jan/"
            break;
        case 2:
            transformedDate += "Feb/"
            break;
        case 3:
            transformedDate += "Mar/"
            break;
        case 4:
            transformedDate += "Apr/"
            break;
        case 5:
            transformedDate += "May/"
            break;
        case 6:
            transformedDate += "Jun/"
            break;
        case 7:
            transformedDate += "Jul/"
            break;
        case 8:
            transformedDate += "Aug/"
            break;
        case 9:
            transformedDate += "Sep/"
            break;
        case 10:
            transformedDate += "Oct/"
            break;
        case 11:
            transformedDate += "Nov/"
            break;
        case 12:
            transformedDate += "Dec/"
            break;
        default: 
            b = 1;
            document.getElementById("testdiv").innerHTML = "Error during processing month!"
    }
    transformedDate+= year;
    if (b == 0)
    {
        lookForCode(lecturename, transformedDate);
    }
}

function lookForCode(e, str) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var resp = xmlhttp.responseText;
            var ip_raw_string = resp.split('\n')
            ip_raw_string.splice(0,5)
            ip_raw_string.splice(-3,3)
            var ip_array = [];
            var l = ip_raw_string.length;
            if (l == 2 && ip_raw_string[0] == "" && ip_raw_string[1] == "")
            {
                document.getElementById("testdiv").innerHTML="No visits found for the specified code on the specified date!"
            }
            else
            {
                for (var i = 0; i < l; i++)
                {
                    var ip = ip_raw_string[i];
                    console.log(ip)
                    if ( !(ip_array.includes(ip)) )
                    {
                        ip_array.push(ip);
                    }
                }
                document.getElementById("testdiv").innerHTML=ip_array;
            }
            

        } else if (xmlhttp.readyState==4)
        {
            document.getElementById("testdiv").innerHTML=(xmlhttp.status + xmlhttp.statusText);
        }    
    }
    xmlhttp.open("POST","getviewers.cgi", true);
    xmlhttp.setRequestHeader("eacode", e);
    xmlhttp.setRequestHeader("datestring", str);
    xmlhttp.send();
}

window.onload = init;