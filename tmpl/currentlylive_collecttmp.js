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
                document.getElementById("listofstreams").innerHTML = ""
            }
            else
            {
                for (i = 0; i < streams.length; i++)
                {
                    if (streams[i].includes("-lq-tmp"))
                    {
                        streams.splice(i,1);
                        i--;
                    }
                }
                var table = document.getElementById("listofstreams")
                table.innerHTML = ""
                var row = table.insertRow(-1)
                var c1 = row.insertCell(0)
                var c2 = row.insertCell(1)
                c1.innerHTML = "Stream name"
                c2.innerHTML = "Track statistics"
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
                    refLink = "../feedback/streamstats.html?code=" + eacode;
                    c2.innerHTML = "<a href=\"" + refLink + "\" target=\"blank\">Link</a>"
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