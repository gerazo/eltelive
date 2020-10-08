function init()
{
    refresh();
}

function getEaCode()
{
    var parameters = location.search.substring(1).split("&")
    var temp = parameters[0].split("=");
    lecturename = unescape(temp[1]);
    console.log(lecturename);
    //var myvar = setInterval(readlog(lecturename), 1000)
    readlog(lecturename);
}

function readlog(e) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var resp = xmlhttp.responseText;
            resp = resp.substring(resp.indexOf("frame="))
            if (resp.startsWith("frame="))
            {
                document.getElementById("testdiv").innerHTML = resp;
            }
            else
            {
                resp = resp.substring(resp.indexOf("The requested"))
                if (resp.startsWith("The requested"))
                {
                    document.getElementById("testdiv").innerHTML = resp;
                }
                else
                {
                    document.getElementById("testdiv").innerHTML = "Stream is currently starting...";
                }
            }
            console.log(xmlhttp.responseText);
            
        } else if (xmlhttp.readyState==4)
        {
            document.getElementById("testdiv").innerHTML=(xmlhttp.status + xmlhttp.statusText);
        }    
    }
    xmlhttp.open("POST","gettmpstats.cgi", true);
    xmlhttp.setRequestHeader("eacode", e);
    xmlhttp.send();
}

function refresh()
{
    var myvar = setInterval(getEaCode, 1000)
    
}

window.onload = init;