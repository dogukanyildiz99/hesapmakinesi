$(document).ready(function () {
  //1. En buyuk ve en kucuk degerleri bul
  //min
  function min(arr = getReady()) {
    return Math.min.apply(null, arr)
  }
  //max
  function max(arr = getReady()) {
    return Math.max.apply(null, arr);
  }

  //2.Araligi hesaplayin = Maksimum - Minimum
  function range(arr = getReady()) {
    return max(arr) - min(arr);
  }
  // 3.İstenen sinif sayisini secin. Bu genellikle 5 ile 20 arasindadir.
  function numberOfClasses(arr = getReady()) {
    //formul kullanarak 2k>n
    // leng=arr.length;
    for (let i = 1; i <= 20; i++) {
      if ((2 ** i) > arr.length) {
        return i;
      }
    }

  }
  //3 sonu

  // 4.Araligi sinif sayisina bolerek ve yukari yuvarlayarak sinif genisligini bulun
  //mesafeye dayali
  function classWidth(arr = getReady()) {
    return range(arr) / numberOfClasses(arr);

  }

  //maksimum baslangic noktasi bazinda
  function classWidth1(arr = getReady()) {
    let w = Math.ceil((max(arr) - startingPoint(arr)) / numberOfClasses(arr));
    return w % 2 == 0 ? ++w : w;
  }
  //4 sonu

  // 5.Minimum degerden kucuk veya bu degere esit uygun bir baslangic noktasi secin. Sunlarİ ele alabileceksiniz: "sinif genisligi carpi sinif sayisi" degerleri. Araliktan bir deger daha kapsamaniz gerekir. Bu kurala uyun ve sorun olmayacak: Baslangic noktasi arti siniflarin sayisi carpi sinif genisligi maksimum degerden büyük olmalıdır. Başlangıç noktanız birinci sınıfın alt sınırıdır. Alt sınırların geri kalanını elde etmek için bu alt sınıra sınıf genişliğini eklemeye devam edin.
  function startingPoint(arr = getReady()) {
    if (min(arr) % 5 == 0) {
      return min(arr);
    } else {
      for (let i = 1; i < 5; i++) {
        if ((min(arr) - i) % 5 == 0)
          return min(arr) - i;
      }
    }
  }
  // veya
  // alt limit
  function startingPointLowerlimit(arr = getReady()) {
    if (min(arr) % 5 == 0) {
      return min(arr);
    } else {
      for (let i = 1; i < 5; i++) {
        if ((min(arr) - i) % 5 == 0)
          return min(arr) - i;
      }
    }
  }
  // 6.Birinci sınıfın üst sınırını bulmak için ikinci sınıfın alt sınırından bir çıkarın. Ardından, üst sınırların geri kalanını bulmak için bu üst sınıra sınıf genişliğini eklemeye devam edin.
  // ust limit 
  function startingPointUpperlimit(arr = getReady()) {
    return Number(startingPointLowerlimit(arr)) + classWidth1(arr) - 1;
  }

  //6 sonu

  function boundaries(arr = getReady()) {
    return Number(startingPointUpperlimit(arr)) + 0.5;
  }

  //classlar
  class Classs {
    constructor(lb, ub) {
      this.lb = lb;
      this.ub = ub;
    }
  }

  function classes(arr = getReady()) {

    var classesArr = [];
    for (let c = 0; c < numberOfClasses(arr); c++) {
      var u = Number(startingPointLowerlimit(arr)) + (c * classWidth1(arr));
      var l = Number(startingPointUpperlimit(arr)) + ((c) * classWidth1(arr));
      var ctemp = new Classs(u, l);
      classesArr[c] = ctemp;
    }

    return classesArr;

  }

  class Tally {
    constructor(f, fn, cf) {
      this.f = f;
      this.fn = fn;
      this.cf = cf
    }
  }

  function TallyAndFreq() {
    var arr = getReady();
    var tfcfArr = [];
    var tempClasses = classes();
    var cf = 0;
    for (c in tempClasses) {
      var tfArr = arr.filter(myFunction);

      function myFunction(value, index, array) {
        return value >= tempClasses[c].lb && value <= tempClasses[c].ub;
      }

      var tally = tfArr.length;
      var frequencyArr = tfArr;
      cf += tally;
      var tftemp = new Tally(tally, frequencyArr, cf);

      tfcfArr[c] = tftemp;

    }
    return tfcfArr;
  }


  //sıralama
  function sortAsc(points) {
    return points.sort(function (a, b) {
      return a - b
    });
  }

  //toplama
  function sumx(arr = getReady()) {
    return arr.reduce(myFunction);

    function myFunction(total, value, index, array) {
      return Number(total) + Number(value);
    }
  }
  //uzunluk
  function n(arr = getReady()) {
    return arr.length;
  }

  function modeInArray(arr) {
    var numMapping = {};
    for (var i = 0; i < arr.length; i++) {
      if (numMapping[arr[i]] === undefined) {
        numMapping[arr[i]] = 0;
      }
      numMapping[arr[i]] += 1;
    }
    console.log(numMapping);
    var greatestFreq = 0;
    var arr = [];
    for (var prop in numMapping) {
      if (numMapping[prop] >= greatestFreq) {
        greatestFreq = numMapping[prop];
        for (const el of arr) {
          if (numMapping[el] < greatestFreq)
            arr = arr.filter(function (value, index, arr) {
              return value != el;
            })
        }
        arr.push(prop);
      }
    }
    return arr.toString();
  }

  function getReady() {
    x = document.getElementById("commainput").value;
    x = x.replace("/(^,)|(,$)/g", "");

    return x.split(",");
  }

  //mod
  function mode() {
    if (getReady()[0] == "") {
      $("#result").html("Lütfen önce veri giriniz!");
    } else
      document.getElementById("result").innerHTML = "Mod = " + modeInArray(getReady()) + "<br><hr>Bir veri grubunda en çok tekrar eden değere mod denir.";
  }


  //medyan

  $('#me').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("Lütfen önce veri giriniz!");
    } else {
      let inArr = getReady();
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + inArr.toString();

      req = "" + "<b><hr>";
      let ans = "";

      let no = n(inArr);

      let arrange = sortAsc(inArr);
      if (no % 2 == 0) {

        let nth = Number(no / 2 - 1),
          nth1 = Number(no / 2);
        highlight = "";

        for (a in arrange) {

          if (a == Number(no / 2 - 1) || a == Number(no / 2)) {
            highlight += "<span style=color:orange>" + arrange[a] + "</span>" + "  ";
          } else {
            highlight += arrange[a] + "  ";
          }
        }
        ans = "<b>ÇÖZÜM</b><br>Öncelikle veri grubunu sıralayalım <br>\
   " + arrange + "<br>N =" + no + "<br>N/2= " + no / 2 + " değeri tamsayıdır" + "<br>\
   Medyan = (  (n/2) + (n/2+1) )/2 <br>\
   " + highlight + "\
   " + "<br>Medyan =(" + arrange[nth] + "+" + arrange[nth1] + ")/" + 2 + "<br>\
   " + "Medyan=" + ((Number(arrange[nth]) + Number(arrange[nth1])) / 2).toFixed(2) + "<br>";

      } else {
        let nth = Number(Number(no + 1) / 2) - Number(1);
        highlight = "";

        for (a in arrange) {
          if (a == nth) {
            highlight += "<span style=color:orange>" + arrange[a] + "</span>" + "  ";
          } else {
            highlight += arrange[a] + "  ";
          }
        }
        ans = "<b>ÇÖZÜM</b><br>Öncelikle veri grubunu sıralayalım <br>\
   " + arrange + "<br>N =" + no + "<br>N/2= " + no / 2 + " tamsayı değil" + "<br>\
   Medyan =  (( n + 1 ) / 2 )<br>\
   " + highlight + "\
   " + "<br>Medyan=" + Number(arrange[nth]) + "<br>";

      }

      hint = "<hr><b>Bilgi!<b><br>Medyan (ya da ortanca) bir anakütle ya da örneklem veri serisini küçükten büyüğe doğru sıraladığımızda,<br> seriyi ortadan ikiye ayıran değere denir."

      document.getElementById("result").innerHTML = given + req + ans + hint;
    }
  });


  function median() {
    if (getReady()[0] == "") {
      $("#result").html("Lütfen önce veri giriniz!");
    } else {
      let inArr = getReady();
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + inArr.toString();

      req = "<hr><br>" + "<b>median=?<hr>";
      let ans = "";

      let no = n(inArr);

      let arrange = sortAsc(inArr);
      if (no % 2 == 0) {

        let nth = Number(no / 2 - 1),
          nth1 = Number(no / 2);
        highlight = "";

        for (a in arrange) {

          if (a == Number(no / 2 - 1) || a == Number(no / 2)) {
            highlight += "<span style=color:orange>" + arrange[a] + "</span>" + "  ";
          } else {
            highlight += arrange[a] + "  ";
          }
        }
        ans = "<b>ÇÖZÜM</b><br>Öncelikle veri grubunu sıralayalım <br>\
   " + arrange + "<br>N =" + no + "<br>N/2= " + no / 2 + " değeri tamsayıdır" + "<br>\
   Medyan = ( (n/2) + (n/2+1) )/2 <br>\
   " + highlight + "\
   " + "<br>Medyan =(" + arrange[nth] + "+" + arrange[nth1] + ")/" + 2 + "<br>\
   " + "Medyan=" + ((Number(arrange[nth]) + Number(arrange[nth1])) / 2).toFixed(2) + "<br>";

      } else {
        let nth = Number(Number(no + 1) / 2) - Number(1);
        highlight = "";

        for (a in arrange) {

          if (a == nth) {
            highlight += "<span style=color:orange>" + arrange[a] + "</span>" + "  ";
          } else {
            highlight += arrange[a] + "  ";
          }
        }
        ans = "<b>ÇÖZÜM</b><br>Öncelikle veri grubunu sıralayalım <br>\
   " + arrange + "<br>N =" + no + "<br>N/2 (" + no / 2 + ") tam sayı değil" + "<br>\
   Medyan =  (( n + 1 ) / 2 ) <br>\
   " + highlight + "\
   " + "<br>Medyan=" + Number(arrange[nth]) + "<br>";

      }

      hint = "<hr><b>Bilgi!<b><br>Medyan, bir verideki orta değerdir."

      document.getElementById("result").innerHTML = given + req + ans + hint;
    }
  }
  //medyan sonu

  // ortalama
  $('#mean').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("Lütfen önce veri giriniz!");
    } else {
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b><hr>";
      ans = "<b>ÇÖZÜM<b><br>Aritmetik Ortalama = Veri Değerlerinin Toplamı / Veri Sayısı<br>Ortalama = " + sumx(getReady()) + "/" + n(getReady()) + "<br>\
      Ortalama = " + (sumx(getReady()) / n(getReady())).toFixed(2);
      hint = "<hr><b>Bilgi!<b><br>Ortalama, bir sayı dizisindeki elemanların toplamının eleman sayısına bölünmesi ile elde edilir."
      $("#result").html(given + req + ans + hint);

    }
  });

  //ortalama sonu

  $('#m').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("Lütfen önce veri giriniz!");
    } else
      document.getElementById("result").innerHTML = "Mod = " + modeInArray(getReady()) + "<br><hr>Bilgi!<br>Bir veri grubunda en çok tekrar eden değere mod denir.";
  });

  // gruplanmış hesaplama
  // ortalama

  $('#gmean').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("<span>Lütfen önce veri giriniz!</span>");
    } else if (getReady().length < 10) {
      $("#result").html("<span>Veri yetersiz!</span>");
    } else {
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b><hr>";
      ans = "";
      let uplo = classes();
      let tfcf = TallyAndFreq();
      let c = 0;
      let sumFxX = 0;
      table = "<table id=customers><tr><td>S.No</td><td>Sınıf Aralığı</td><td>f</td><td>X<sub>m</sub></td><td>f&times;X<sub>m</sub></td></tr>"
      while (c < numberOfClasses()) {

        let x = (Number(uplo[c].lb) + Number(uplo[c].ub)) / 2;
        sumFxX += (x * tfcf[c].f);
        table += "<tr><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</td><td>" + x + "</td><td>" + (tfcf[c].f * x) + "</td></tr>";
        c++;
      }
      table += "<tr><td></td><td></td><td>&sum;f=" + n() + "</td><td></td><td>&sum;fx =" + sumFxX + "</td></tr></table><br>";

      step = "<p>Tahmini Ortalama = &sum;F&times;X &#8725;&sum;f <br> \
         Tahmini Ortalama =" + sumFxX + "/" + n() + "<br>\
         Tahmini Ortalama =" + (sumFxX / n()).toFixed(2);

      eq = "<br><img src=gmean.png width=250px height=auto><br><br>";
      ans = "ÇÖZÜM" + eq + table + step;
      $("#result").html(given + req + ans);

    }
  });
  // ortalama sonu

  // mod
  $('#gmode').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("<span>Lütfen önce veri giriniz!</span>");
    } else if (getReady().length < 10) {
      $("#result").html("<span>Veri yetersiz!</span>");
    } else {

      let tfcfmixFreqIndex = TallyAndFreq();

      function mixFreqIndex() {
        maxIndex = 0;
        maxfreq = -Infinity;
        let cc = 0;
        while (cc < numberOfClasses()) {
          if (tfcfmixFreqIndex[cc].f > maxfreq) {
            maxfreq = tfcfmixFreqIndex[cc].f;
            maxIndex = cc;
          }
          cc++;
        }

        return maxIndex;
      }

      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b></span><hr>";

      let uplo = classes();
      let tfcf = TallyAndFreq();
      let L, fmm1, fm = tfcf[mixFreqIndex()].f,
        fmp1;
      try {
        L = (uplo[mixFreqIndex()].lb + uplo[mixFreqIndex() - 1].ub) / 2, fmm1 = tfcf[mixFreqIndex() - Number(1)].f;
      } catch (err) {
        fmm1 = 0;
        L = uplo[mixFreqIndex()].lb - 0.5;

      }
      try {
        fmp1 = tfcf[mixFreqIndex() + Number(1)].f;
      } catch (err) {
        fmp1 = 0;
      }

      var sumFxX = 0;
      let c = 0;
      table = "<table id=customers><tr><td>S.No</td><td>Sınıf Aralığı</td><td>f</td></tr>"
      while (c < numberOfClasses()) {

        let x = (Number(uplo[c].lb) + Number(uplo[c].ub)) / 2;
        sumFxX += (x * tfcf[c].f);
        if (c == mixFreqIndex())
          table += "<tr><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</tr>";
        else if (c == mixFreqIndex() - Number(1))
          table += "<tr ><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</tr>";
        else if (c == mixFreqIndex() + Number(1))
          table += "<tr ><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</tr>";
        else
          table += "<tr><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</td></tr>";

        c++;
      }
      step2 = "<br><p>Tahmini Mod= " + L + "+ (" + fm + "-" + fmm1 + ")  /  (" + fm + "-" + fmm1 + ")+(" + fm + "-" + fmm1 + ")&times" + classWidth1() + "</p><br>";

      a = fm - fmm1;
      b = fm - fmm1;

      step3 = "<p> Tahmini Mod =" + (Number(L) + Number(a) / (Number(a) + Number(b)) * classWidth1()) + "</p>";

      eq = "<br><img src='gmode.png' width=250px height=auto><br>";
      ans = eq + step2 + step3;

      $("#result").html(given + req + table + ans);
    }
  });
  // mod sonu

  // medyan
  $('#gmedian').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("<span'>Lütfen önce veri giriniz!</span>");
    } else if (getReady().length < 10) {
      $("#result").html("<span>Veri yetersiz!</span>");
    } else {
      let tfcfmixFreqIndex = TallyAndFreq(),
        nth = tfcfmixFreqIndex[numberOfClasses() - 1].cf / 2;

      function modleClassIndex() {
        maxIndex = -1;
        let cc = numberOfClasses() - 1;
        while (cc > -1) {
          try {
            if (tfcfmixFreqIndex[cc].cf > nth && tfcfmixFreqIndex[cc - 1].cf < nth) {
              maxIndex = cc;
              break;
            }
          } catch (err) {
            maxIndex = 0;
          }
          cc--;
        }

        return maxIndex;
      }
      let L, h, f, c;

      let uplo = classes();
      let tfcf = TallyAndFreq();
      try {
        L = uplo[modleClassIndex()].lb;
      } catch (err) {
        alert("Veriler kural dışı");
      }
      h = classWidth1();
      f = tfcfmixFreqIndex[modleClassIndex()].f;
      try {
        c = tfcfmixFreqIndex[modleClassIndex() - 1].cf;
      } catch (err) {
        c = 0;
      }
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b></span><hr>";

      step1 = "ÇÖZÜM<br><p> N / 2 = " + nth + "<sup></sup>";
      let ic = 0;
      let sumFxX = 0;
      table = "<table id=customers><tr><td>S.No</td><td>Sınıf Aralığı</td><td>Frekans</td><td>Kümülatif Frekans</td></tr>"
      while (ic < numberOfClasses()) {
        if (ic == modleClassIndex()) {
          table += "<tr><td >" + (ic + 1) + "</td><td>" + uplo[ic].lb + "-" + uplo[ic].ub + "</td><td>" + tfcf[ic].f + "</td><td>" + (tfcf[ic].cf) + "</td></tr>";

        } else if (ic == modleClassIndex() - 1)
          table += "<tr><td>" + (ic + 1) + "</td><td>" + uplo[ic].lb + "-" + uplo[ic].ub + "</td><td>" + tfcf[ic].f + "</td><td>" + (tfcf[ic].cf) + "</td></tr>";
        else
          table += "<tr><td>" + (ic + 1) + "</td><td>" + uplo[ic].lb + "-" + uplo[ic].ub + "</td><td>" + tfcf[ic].f + "</td><td >" + (tfcf[ic].cf) + "</td></tr>";
        ic++;
      }

      step2 = "Tahmini Medyan =" + L + " + ( " + h + "/" + f + ")(" + n() + "/ 2 -" + c + ")<br>\
         Tahmini Medyan =" + (Number(L) + Number(h / f) * (nth - c)).toFixed(2);

      eq = "<br><center><img src=gmode.png width=250px height=auto></center><br>";
      ans = step1 + eq + table + step2;
      $("#result").html(given + req + ans);


    }
  });
  // medyan sonu

  //varyans

  $('#variance').click(function () {

    if (getReady()[0] == "") {
      $("#result").html("<span>Lütfen önce veri giriniz!</span>");
    } else if (getReady().length < 10) {
      $("#result").html("<span>Veri yetersiz!</span>");
    } else {
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b><hr>";
      ans = "";
      eq = "<br><img src=variance.png width=250px height=auto><br>";
      groupingData = "";
      let uplo = classes();
      let tfcf = TallyAndFreq();
      let c = 0,
        cc = 0;
      let sumFxXx = 0,
        sumFxX = 0;
      let sumxminx = 0;
      while (cc < numberOfClasses()) {
        let xx = (Number(uplo[cc].lb) + Number(uplo[cc].ub)) / 2;
        sumFxXx += (xx * tfcf[cc].f);
        cc++;

      }
      stepx = "<p>S<sup>2</sup>=&sum;(X - x&#772)/ &sum; f<br>Öncelikle x&#772 değerini bulmamız gerek </p>\
<p>x&#772 = &sum;F&times;X &#8725;&sum;f <br> \
         x&#772 =" + sumFxXx + "/" + n() + "<br>\
         x&#772 =" + (sumFxXx / n()).toFixed(2);

      var meanForV = sumFxXx / n();

      table = "<table id=customers><tr><td>S.No</td><td>Sınıf Aralığı</td><td>f</td><td>X<sub>m</sub></td><td>f&times;X<sub>m</sub></td><td>X - x&#772</td><td>(X - x&#772)<sup>2</sup></td></tr>"
      while (c < numberOfClasses()) {

        let x = (Number(uplo[c].lb) + Number(uplo[c].ub)) / 2;
        sumFxX += (x * tfcf[c].f);
        sumxminx = (x - meanForV) * (x - meanForV);
        table += "<tr><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</td><td>" + x + "</td><td>" + (tfcf[c].f * x) + "</td><td>" + (x - meanForV).toFixed(2) + "</td><td>" + ((x - meanForV) * (x - meanForV)).toFixed(2) + "</td></tr>";
        c++;
      }
      table += "<tr><td></td><td></td><td>&sum;f=" + n() + "</td><td></td><td>&sum;fx =" + sumFxX + "</td><td> </td><td>&sum;" + sumxminx.toFixed(2) + "</td></tr></table><br>";

      lastStep = "<p>Formülde yerine koyarsak: <br>S<sup>2</sup>=" + (sumxminx / n()).toFixed(2) + "</p>";

      hint = "<hr><b>Bilgi!<b><br>Varyans, bir rassal değişken, bir olasılık dağılımı veya örneklem için istatistiksel yayılımın, mümkün bütün değerlerin<br> beklenen değer veya ortalamadan uzaklıklarının karelerinin ortalaması şeklinde bulunan bir ölçüdür."

      ans = "ÇÖZÜM" + eq + stepx + table + lastStep;
      $("#result").html(given + req + ans + hint);
    }

  });
  // varyans sonu

  // standart sapma
  $('#sd').click(function () {
    if (getReady()[0] == "") {
      $("#result").html("<span>Lütfen önce veri giriniz!</span>");
    } else if (getReady().length < 10) {
      $("#result").html("<span>Veri yetersiz!</span>");
    } else {
      given = "<span style=margin-left: 0;>ELDEKİ VERİ</span><br>" + getReady().toString();

      req = "" + "<b><hr>";
      ans = "";
      eq = "<br><img src=sd.png width=250px height=auto><br>";
      let uplo = classes();
      let tfcf = TallyAndFreq();
      let c = 0,
        cc = 0;
      let sumFxXx = 0,
        sumFxX = 0;
      let sumxminx = 0;
      while (cc < numberOfClasses()) {
        let xx = (Number(uplo[cc].lb) + Number(uplo[cc].ub)) / 2;
        sumFxXx += (xx * tfcf[cc].f);
        cc++;

      }
      stepx = "<p>S= &#8730(&sum;(X - x&#772)/ &sum; f)<br>Öncelikle x&#772 değerini bulmamız gerek </p>\
<p>x&#772 = &sum;F&times;X &#8725;&sum;f <br> \
         x&#772 =" + sumFxXx + "/" + n() + "<br>\
         x&#772 =" + (sumFxXx / n()).toFixed(2);

      var meanForV = sumFxXx / n();

      table = "<table id=customers><tr><td>S.No</td><td>Sınıf Aralığı</td><td>f</td><td>X<sub>m</sub></td><td>f&times;X<sub>m</sub></td><td>X - x&#772</td><td>(X - x&#772)<sup>2</sup></td></tr>"
      while (c < numberOfClasses()) {

        let x = (Number(uplo[c].lb) + Number(uplo[c].ub)) / 2;
        sumFxX += (x * tfcf[c].f);
        sumxminx = (x - meanForV) * (x - meanForV);
        table += "<tr><td>" + (c + 1) + "</td><td>" + uplo[c].lb + "-" + uplo[c].ub + "</td><td>" + tfcf[c].f + "</td><td>" + x + "</td><td>" + (tfcf[c].f * x) + "</td><td>" + (x - meanForV).toFixed(2) + "</td><td>" + ((x - meanForV) * (x - meanForV)).toFixed(2) + "</td></tr>";
        c++;
      }
      table += "<tr><td></td><td></td><td>&sum;f=" + n() + "</td><td></td><td>&sum;fx =" + sumFxX + "</td><td> </td><td>&sum;" + sumxminx.toFixed(2) + "</td></tr></table><br>";

      lastStep = "<p>Formülde yerine koyarsak:<br>S=" + (Math.sqrt(sumxminx / n()).toFixed(2)) + "</p>";

      hint = "<hr><b>Bilgi!<b><br>Standart sapma, bir anakütle, bir örneklem, bir olasılık dağılımı veya bir rassal değişken, veri değerlerinin<br> yayılımının özetlenmesi için kullanılan bir ölçüdür. Standart sapma varyansın kareköküdür."

      ans = "ÇÖZÜM" + eq + stepx + table + lastStep;
      $("#result").html(given + req + ans + hint);
    }
  });
  //standart sapma sonu
  //grup hesaplamlar sonu


  input = document.getElementById("commainput");

  var originalInput = input.value;
});

function copy(copyId) {
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  let copyText = document.getElementById(copyId).innerHTML;
  inputElement.value = copyText;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand('copy');
  document.body.removeChild(inputElement);

  document.getElementById("alert").style.display = "block";
  setTimeout(function () {
    document.getElementById("alert").style.display = "none";
  }, 1000);
}
