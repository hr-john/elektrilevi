// Apply cookies when page has loaded
document.addEventListener("DOMContentLoaded", function(event){
    GetMüügiMarginaalCookie("marginaal");
    GetOstuMarginaalCookie("tmarginaal");
});

function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p)
                row[i] += l;
            s = !s;
        }
        else if (',' === l && s)
            l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p)
                row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        }
        else row[i] += l;
        p = l;
    }
    return ret;
};
  
function display(msg) {
    var rida = { hind:[0] }, rows = csvToArray(msg);
    var rowNum, row, KP="", r_date, priceRow, algus = 5, tootmine = 2, toodang = 0, tarbimine = 0;
    var cells, arve_summa = 0, kogu_kw = 0, kogu_ukw = 0, paeva_kw = [], u_kw =[], u_summa = 0, tm_summa = 0 ;  //        var cellNum;
    cells = rows[0][0].split(";") ;
    if ( cells[0] == "EIC" ) {
        algus = 4; tootmine = 4
    };
    console.log ( "ALGUS " + algus + rows[0] + " " + tootmine );
    for (rowNum = algus; rowNum < rows.length-1 ; ++rowNum) {
        //      row = rows[rowNum].join() ;
        cells = rows[rowNum].join().split(";") ; 
        r_date = cells[0].replace(/(\d{2})\.(\d{2})\.(\d{4}) [A-Za-z0-9.,-:]*/,'$3-$2-$1'); //split(" ") ;
        if ( !KP ) {
            KP = r_date ;
            var yesterday = new Date(Date.parse(KP) - 1000*3600*24).toJSON().slice(0,10),reads;
        }
        if ( KP != r_date ) {
            //          alert ( KP + " KP " + Date.parse(KP) ) ;  
            GetPrice(yesterday , KP, paeva_kw, u_kw );
            yesterday = new Date(Date.parse(KP)).toJSON().slice(0,10),reads;
            KP=r_date ;
            //          console.log ( Math.round(rowNum/24) + " " + rowNum + " "+ paeva_kw ) ;
            paeva_kw=[]; u_kw=[];
        } //  if KP
        if (cells.length <= tootmine) {
            tootmine = 2
        };
        //	      console.log ( tootmine + cells + " " + cells.length + " " + cells[1] + "X" + cells[3] + "Y" + cells[tootmine] ) ;
	      toodang= cells[tootmine].replace(",",".");
        paeva_kw.push( toodang );  u_kw.push( cells[tootmine]);
	      // u_kw.push( cells[2].replace(",",".") ) ;
    } // for rowNum
    KP = new Date(Date.parse(r_date)).toJSON().slice(0,10);
    GetPrice(yesterday , KP, paeva_kw, u_kw);
    console.log ( Math.round(rowNum/24) + " " + rowNum + " " + paeva_kw );

    function GetPrice(start_time,end_time, kws, ukws ) {
        //	console.log("KWs"+kws) ;
        //	console.log("u KWs" + ukws) ;	     
        function transferComplete(evt) {
            answer(xhr.status == 200 ? xhr.responseText : null) ;
        }
        var xhr = new XMLHttpRequest();
        var i, hind; 
        xhr.onreadystatechange = handleStateChange;
        // "https://dashboard.elering.ee/api/nps/price/csv?start=2020-12-31T21:00:00.000Z&end=2021-01-01T20:59:59.999Z&fields=ee");
        xhr.open("GET", "https://dashboard.elering.ee/api/nps/price/csv?start="+ start_time +"T21:00:00.000Z&end="+ end_time +"T20:59:59.999Z&fields=ee");
        xhr.send();  
	  
        function handleStateChange() {
            var rows, cells ;
            var p_end = document.createElement('p');
            if ( xhr.readyState == 4 ) { 
                var vahe_summa=0, vahe_usumma=0, vahe_kw =0, vahe_ukw=0, vahe_tm_summa=0, marginaal=0;
                rows = [] ;
                rows = csvToArray(xhr.responseText);
                //             console.log( "Kilowats " + start_time + " " + end_time + " " + kws ) ;
                //             console.log( "PRICE" + rows.length + " " + rows[1] ) ;
                p_end.innerHTML = "<BR>";
                marginaal=  document.getElementById("marginaal").value;   
                for (i = 1; i < rows.length-1 && i <= kws.length; i++) {
                    cells = rows[i][0].split(";") ;
                    hind = cells[2].replace(",",".");
                    vahe_summa += Math.round( kws[i-1]*hind*100 ) ;
                    vahe_usumma += Math.round( ukws[i-1]*hind*100 ) ;
                    vahe_tm_summa += Math.trunc( kws[i-1]*(hind-marginaal*10)*100 ) ;
                    vahe_kw += Math.round(kws[i-1]*1000) ;
                    vahe_ukw += Math.round(ukws[i-1]*1000) ;
                    p_end.innerHTML += rows[i] + " XXX " + hind + " XXX " + kws[i-1] + " X "+ Math.round( kws[i-1]*hind*100 ) + "<BR>" ;
                }
                p_end.innerHTML += "KW " + vahe_kw + " SUMMA " + vahe_summa + " X " + vahe_usumma+ "<BR>" ;
                document.body.appendChild(p_end);
                arve_summa += vahe_summa ;
                u_summa += vahe_usumma ;
                tm_summa += vahe_tm_summa ;
                kogu_kw += vahe_kw ;
                kogu_ukw += vahe_ukw;
                document.getElementById("summa").innerHTML = Math.round(arve_summa/1000)/100 ;
                document.getElementById("summa_km").innerHTML = Math.round(arve_summa/1000*1.2)/100 ;
                document.getElementById("kw").innerHTML = Math.round(kogu_kw/10)/100 ;
                document.getElementById("ukw").innerHTML = Math.round(kogu_ukw/10)/100 ;
                document.getElementById("usumma").innerHTML =  -Math.round(u_summa/1000)/100 ;
                document.getElementById("usumma_km").innerHTML =  -Math.round(u_summa/1000*1.2)/100 ;
                document.getElementById("m_summa").innerHTML = -Math.round(kogu_kw*marginaal/1000)/100 ;
                document.getElementById("m_summa_km").innerHTML = -Math.round(kogu_kw*marginaal/1000*1.2)/100 ;
                document.getElementById("tm_summa").innerHTML = Math.round(tm_summa/100)/1000 ;
                document.getElementById("tm_summa_km").innerHTML = Math.round(tm_summa/1000*1.2)/100 ;
                document.getElementById("t_summa").innerHTML = -Math.round(kogu_ukw*document.getElementById("tmarginaal").value/1000)/100 ;
                document.getElementById("t_summa_km").innerHTML = -Math.round(kogu_ukw*document.getElementById("tmarginaal").value/1000*1.2)/100 ;
                Checkboks() ;
            }
        }; // handleStateChange
    } // GetPrice
} // display
  
function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        display(reader.result);
    };
    reader.onerror = function() {
        console.log(reader.error);
    };
}

function kuva() {
    var yesterday = new Date(kp).toJSON().slice(0,10), reads;
    var utc = new Date(kp+1000*3600*24).toJSON().slice(0,10);
    GetPrice(yesterday,utc,null,function(reads) {
        alert ( "READS " + reads );       
    });
    var rida = showData(reads);
    var data = {
        labels:  rida.aeg ,
        series: [ 
                  {
                    name:'HIND',
                    data:rida.hind
                  }
                ]
    };
    new Chartist.Line('.ct-chart', data, {
        high: Math.ceil(Math.max.apply(Math,rida.hind)/10)*10,
        low: 0,
        showPoint: false,
        axisY: {
            Offset: 20,
            onlyInteger: true
        },
        series: {  'HIND': { lineSmooth: Chartist.Interpolation.step() } } // Näitab hind ühtlaselt tunni jooksul
    }); // Chartist.Line    
} // kuva 

function showData(data) {
    var utc = [], aeg = [], hind = [];
    var rows = csvToArray(data);
    var rowNum;
    var cells;   //        var cellNum;
    for (rowNum = 1; rowNum < rows.length-1 ; ++rowNum) {
        cells = rows[rowNum][0].split(";") ;
        utc.push(cells[0]);aeg.push(cells[1].substr(-5,5));hind.push(cells[2].replace(",","."));
    } // for rowNum
    return {
        utc:utc,
        aeg:aeg,
        hind:hind
    };
} // showData
  
function Checkboks() {
    var i = 0 ;
    var cb = document.querySelectorAll('input[name="chk"]:checked');
    cb.forEach((checkbox) => { i += Number(document.getElementById(checkbox.value).innerHTML); });
    document.getElementById("kokku").innerHTML= i ;
    document.getElementById("kokku_km").innerHTML= i*1.2 ;
}

// Set cookies
function setMüügiMarginaalCookie(id) {
    const element = document.getElementById(id);
    const value = element.value.replace(",",".");
    const isError = simpleSanitizer(value);
    if(isError !== "error") {
        element.value = value;
        localStorage.setItem("MüügiMarginaal", value);
    }
}
  
function setOstuMarginaalCookie(id) {
    const element = document.getElementById(id);
    const value = element.value.replace(",",".");
    const isError = simpleSanitizer(value);
    if(isError !== "error") {
        element.value = value;
        localStorage.setItem("OstuMarginaal", value);
    }
}

function GetMüügiMarginaalCookie(id) {
    const element = document.getElementById(id);
    element.value = localStorage.getItem("MüügiMarginaal");
}
function GetOstuMarginaalCookie(id) {
    const element = document.getElementById(id);
    element.value = localStorage.getItem("OstuMarginaal");
}

// Väga lihtsustatud sisendi puhastus kasutaja müksamisega sisestamaks marginaali arvu korrektses arvuvormis.
// Toimib põhimõttel, et kui on rohkem kui üks komakoht arvus, siis see ei ole enam arv kujul, mida me vajame.
function simpleSanitizer(value) {
    const length = value.length;
    let dot = 0;
    for(let i = 0; i < length; i++) {
        if(value[i] === ",") {
            value = value.replace(",", ".");
        }
    }
    for(let i = 0; i < length; i++) {
        if(value[i] === ".") {
            dot++;
        } 
    }

    if(dot > 1) {
        alert("Sisesta marginaal korrektse arvväärtusena - punkt komakoha eraldajana!");
        return "error";
    }
    return value;
}
