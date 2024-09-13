function arvuta() {
    const hind = [ 
        // taastuvenergiatasu, aktsiis, V1, V2
        [1.13, 0.447,5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58, 999, 999, 999, 999],
        [1.13, 0.1,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58, 999, 999, 999, 999],
        [1.04, 0.447,5.28, 6.35, 3.69, 5.13, 2.98, 2.98, 3.58, 2.06, 999, 999, 999, 999],
        [0.89, 0.447,5.28, 6.35, 3.69, 5.13, 2.98, 2.98, 3.58, 2.06, 999, 999, 999, 999],
        [1.13, 0.1,  5.12, 6.16, 3.58, 4.23, 2.46, 2.28, 2.74, 1.58, 999, 999, 999, 999],
        [1.13, 0.1,  5.53, 6.65, 3.86, 4.35, 2.52, 999,  2.83, 1.62, 3.95, 6.07, 2.26, 3.52],
        [1.13, 0.1,  6.26, 7.53, 4.38, 4.92, 2.85, 999,  3.20, 1.83, 4.47, 6.88, 2.57, 3.99],
        [1.13, 0.1,  6.38, 7.68, 4.47, 5.02, 2.90, 999,  3.26, 1.86, 4.55, 7.02, 2.61, 4.07],
        [1.24, 0.1,  7.21, 8.68, 5.05, 5.67, 3.28, 999,  3.69, 2.10, 5.14, 7.94, 2.95, 4.60],
        [1.13, 0.1,  7.21, 8.68, 5.05, 5.67, 3.28, 999,  3.69, 2.10, 5.14, 7.94, 2.95, 4.60],
        [1.05, 0.1,  7.21, 8.68, 5.05, 5.67, 3.28, 999,  3.69, 2.10, 5.14, 7.94, 2.95, 4.60],
        [1.05, 0.145, 7.72, 6.07, 3.51, 999, 999, 999,  3.69, 2.10, 5.29, 8.18, 3.03, 4.74]
    ];
    const kuutasu = [ 
        [
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 184, 333,  410,  480,  578,  690,  830,  1012],
            [ 458, 988,  1201, 1446, 1788, 2180, 2670, 3307],
            [ 9999,9999, 9999, 9999, 9999, 9999, 9999, 9999]
        ],
        [
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 184, 333,  410,  480,  578,  690,  830,  1012],
            [ 458, 988,  1201, 1446, 1788, 2180, 2670, 3307],
            [ 9999,9999, 9999, 9999, 9999, 9999, 9999, 9999]
        ],
        [
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 419, 888,  1086, 1306, 1614, 1966, 2406, 2978],
            [ 9999,9999, 9999, 9999, 9999, 9999, 9999, 9999]
        ],
        [
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 419, 888,  1086, 1306, 1614, 1966, 2406, 2978],
            [ 9999,9999, 9999, 9999, 9999, 9999, 9999, 9999]
        ],
        [
            [ 125, 246,  285,  320,  369,  425,  495,  586],
            [ 184, 333,  410,  480,  578,  690,  830,  1012],
            [ 458, 988,  1201, 1446, 1788, 2180, 2670, 3307],
            [ 9999,9999, 9999, 9999, 9999, 9999, 9999, 9999]
        ],
        [
            [ 141, 254,   295,  335,  391,  455,  535,  639],
            [ 200, 370,   455,  535,  647,  775,  935, 1143],
            [ 489, 1034, 1259, 1519, 1883, 2299, 2819, 3495],
            [ 218, 403,   496,  583,  705,  845, 1019, 1246]
        ],
        [
            [ 160,  287,  334,  379,  443,  515,  606,  725],
            [ 227,  419,  515,  606,  734,  878, 1059, 1295],
            [ 554,  1171, 1429, 1721, 2134, 2605, 3195, 3960],
            [ 247,  457,  561,  660,  799,  957, 1155, 1411]
        ],
        [
            [ 163,  293,  341,  387,  452,  525,  618,  739],
            [ 232,  427,  525,  618,  749,  895,  1080, 1321],
            [ 565,  1194, 1455, 1755, 2176, 2657, 3259, 4039],
            [ 252,  466,  572,  673,  815,  976,  1178, 1439]
        ],
        [
            [ 184,  331,  385,  437,  511,  593,  699,  835],
            [ 262,  483,  593,  699,  847,  1012, 1221, 1493],
            [ 639,  1350, 1645, 1984, 2460, 3003, 3684, 4566],
            [ 285,  527,  647,  761,  921,  1103, 1332, 1627]
        ],
        [
            [ 184,  331,  385,  437,  511,  593,  699,  835],
            [ 262,  483,  593,  699,  847,  1012, 1221, 1493],
            [ 639,  1350, 1645, 1984, 2460, 3003, 3684, 4566],
            [ 285,  527,  647,  761,  921,  1103, 1332, 1627]
        ],
        [
            [ 184,  331,  385,  437,  511,  593,  699,  835],
            [ 262,  483,  593,  699,  847,  1012, 1221, 1493],
            [ 639,  1350, 1645, 1984, 2460, 3003, 3684, 4566],
            [ 285,  527,  647,  761,  921,  1103, 1332, 1627]
        ],
        [
            [ 206,  375,  442,  507,  598,  702,  832,  1001],
            [ 288,  564,  702,  832,  1014,  1222, 1482, 1820],
            [ 697,  1546, 1897, 2302, 2869, 3517, 4327, 5380],
            [ 314,  615,  765,  907,  1105,  1332, 1615, 1984]
        ]
    ];

    const aasta = document.getElementById("aasta").value;
    const p = document.getElementById("p").value;
    const pt = document.getElementById("pt").value;
    const o = document.getElementById("o").value;
    const ot = document.getElementById("ot").value;
    const kaitse = document.getElementById("kaitse").value;
    const kokkuKW = Element_Numeric_Value("kokkukW");
    let KM;

    // VAT increased by 10% from 20% to 22% in year 2024
    if ( aasta > 9 ) {
        KM = 1.22 ;
    } else {
        KM = 1.2 ;
    }
    
    ////// Crunch the numbers
    let v1 = Math.round(kokkuKW * Number(hind[aasta][2])*100)/100;
    let v2 = Math.round( ( (Number(p) + Number(pt)) * Number(hind[aasta][3]) + (Number(o) + Number(ot)) * Number(hind[aasta][4]) )*100)/100;
    let vk2 = Math.round( ( (Number(p)+ Number(pt)) * Number(hind[aasta][5]) + (Number(o) + Number(ot)) * Number(hind[aasta][6]) )*100)/100 + kuutasu[aasta][1][kaitse];
    // The Võrk 3 was replaced fully with Võrk 4 from 1. march 2022
    if(aasta < 5) {
        var v3 = Math.round( (kokkuKW * Number(hind[aasta][7]) )*100)/100 + kuutasu[aasta][2][kaitse];
    } else {
        document.getElementById('v3').innerHTML = "-";
        document.getElementById('v3k').innerHTML = "-";
    }
    let v4 = Math.round( ( Number(p) * Number(hind[aasta][8]) + Number(o) * Number(hind[aasta][9]) )*100)/100 + kuutasu[aasta][2][kaitse];
    let v5 = Math.round( ( Number(p) * Number(hind[aasta][10]) + Number(pt) * Number(hind[aasta][11]) + Number(o) * Number(hind[aasta][12]) + Number(ot) * Number(hind[aasta][13]) )*100)/100 + kuutasu[aasta][3][kaitse];
    let taastuvenergiatasu = Math.round(kokkuKW * Number(hind[aasta][0])*100)/100;
    let aktsiis = Math.round(kokkuKW * Number(hind[aasta][1])*100)/100;
    const taastuvtasu_aktsiis = taastuvenergiatasu + aktsiis;
    
    ////// Fill "Hind" fields
    document.getElementById('v1').innerHTML = ToFixed(v1/100, 2);
    document.getElementById('v2').innerHTML = ToFixed(v2/100, 2);
    document.getElementById('vk2').innerHTML = ToFixed(vk2/100, 2);
    if(aasta < 5) {
        document.getElementById('v3').innerHTML = (v3/100).toFixed(2);
    }
    document.getElementById('v4').innerHTML = ToFixed(v4/100, 2);
    document.getElementById('v5').innerHTML = (v5/100).toFixed(2);
    document.getElementById('TaastuvEnergTasu').innerHTML = ToFixed(taastuvenergiatasu/100, 2);
    document.getElementById('Aktsiis').innerHTML = ToFixed(aktsiis/100, 2);

    ////// Fill "Kokku" fields
    document.getElementById('v1k').innerHTML = ToFixed(Math.round(KM * (v1 + taastuvtasu_aktsiis ))/100, 2);
    document.getElementById('v2k').innerHTML = ToFixed(Math.round(KM * (v2 + taastuvtasu_aktsiis ))/100, 2);
    document.getElementById('vk2k').innerHTML = ToFixed(Math.round(KM * (vk2 + taastuvtasu_aktsiis ))/100, 2);
    if(aasta < 5) {
        document.getElementById('v3k').innerHTML = ToFixed(Math.round(KM * (v3 + taastuvtasu_aktsiis ))/100, 2);
    }
    document.getElementById('v4k').innerHTML = ToFixed(Math.round(KM * (v4 + taastuvtasu_aktsiis ))/100, 2);
    document.getElementById('v5k').innerHTML = ToFixed(Math.round(KM * (v5 + taastuvtasu_aktsiis ))/100, 2);
}

// Calculate total of electricity consumption
function summa() {
    const p = document.getElementById("p");
    const o = document.getElementById("o");
    const pt = document.getElementById("pt");
    const ot = document.getElementById("ot");
    if (/(,)/.test(p) || /(,)/.test(o) || /(,)/.test(pt) || /(,)/.test(ot) ) {
        return alert("AAA");
    }

    return Math.round(100*(Number(p.value) + Number(o.value) + Number(pt.value) + Number(ot.value) ))/100;
}

function Element_Numeric_Value(id) {
    const id_value = document.getElementById(id).value;
    return Number(id_value);
}

function ToFixed(value, decimal_point) {
    return value.toFixed(decimal_point);
}
