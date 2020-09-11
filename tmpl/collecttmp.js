function init(){
    refresh();
}


function refresh()
{
    var myvar = setInterval(readlog, 5000)
}

function readlog() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //document.getElementById("temptable").innerHTML=xmlhttp.responseText;
            var str = xmlhttp.responseText;
            var streams = str.split('\n')
            streams.splice(0,5)
            streams.splice(-3,3)
            if (streams[0] === "*-tmp.log" && streams.length === 1)
            {
                document.getElementById("temptable").innerHTML="No streams are online at the moment."
            }
            else
            {
                document.getElementById("listofstreams").innerHTML="";
                for (i = 0; i < streams.length; i++)
                {
                    var processTheName = streams[i].split("-")
                    var eacode = processTheName[1]
                    console.log(eacode)
                    var table = document.getElementById("listofstreams")
                    var row = table.insertRow(-1)
                    var c1 = row.insertCell(0)
                    var c2 = row.insertCell(1)
                    c1.innerHTML = eacode
                    XHR = new XMLHttpRequest();
                    XHR.onreadystatechange=function()
                    {
                        if (XHR.readyState==4 && XHR.status==200)
                        {
                            
                            c2.innerHTML = XHR.responseText
                            console.log(XHR.responseText)
                        }
                        else if (xmlhttp.readyState==4)
                        {
                            c2.innerHTML = XHR.responseText
                        }
                    }
                    XHR.open("POST","../feedback/gettmpstats.cgi", true);
                    XHR.setRequestHeader("eacode", eacode);
                    XHR.send();
                    console.log("xhr sent")
                }

                document.getElementById("temptable").innerHTML=streams
            }
            
            console.log(streams)
        } else if (xmlhttp.readyState==4)
        {
            document.getElementById("temptable").innerHTML=(xmlhttp.status + xmlhttp.statusText);
        }    
    }
    xmlhttp.open("POST","listoftmps.cgi", true);
    xmlhttp.send();
}




window.onload = init;