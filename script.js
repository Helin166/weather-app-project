const apiKey = "437e0348110f6d8a8b7da17a01fcfd0b";

// Hava durumu getiren ana fonksiyon
async function havaDurumuGetir() {
  const sehir = document.getElementById("sehirInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q=${sehir}&appid=${apiKey}`;

  if (sehir === "") // kullanıcı şehir girmediyse uyarı verir
    {
    document.getElementById("sonuc").innerText = "Lütfen bir şehir adı girin.";
    return;
  }

  try {
    const response = await fetch(url);// API'den veriyi getirir.urle ye gidip oradan verileri çeker.
    const data = await response.json();

    if (data.cod === 200)// 200: her şey yolunda demek,yani her şey yolunda mı diye kontrol ediyor
       {
        // verileri alma kısımları
      const derece = data.main.temp;//sıcaklık
      const aciklama = data.weather[0].description.toLowerCase();// açıklama örneğin:parçalı bulutlu,toLowerCase() --> yazının tüm harflerini küçük harfe çevirir
      const ulke = data.sys.country;
      const nem = data.main.humidity;
      const ruzgar = data.wind.speed;


      let resim = "";// Hava durumuna uygun görsel seç

      if (aciklama.includes("açık")) {
        resim = "images/gunesli.png";
      } else if (aciklama.includes("karlı")) {
        resim = "images/karli.png";
      }else if(aciklama.includes("kapalı")){
        resim="images/kapali.png";
      } else if (aciklama.includes("bulutlu")) {
        resim = "images/bulutlu.png";
      } else if (aciklama.includes("yağmur")) {
        resim = "images/yagmurlu.png";
      } else {
        resim = "images/default.png";// Bilinmeyen durumlar için varsayılan görsel
      }
      // sonucu ekrana yazdırma
      document.getElementById("sonuc").innerHTML = `
        <p><strong>${sehir}, ${ulke}</strong></p>
        <img src="${resim}" alt="hava durumu görseli" class="mx-auto mb-4 w-24 h-24" />
        <p>🌡️ Sıcaklık: ${derece}°C</p>
        <p>📝 Durum: ${aciklama}</p>
        <p>💧 Nem: %${nem}</p>
        <p>💨 Rüzgar: ${ruzgar} m/s</p>

      `;
    } else {
      document.getElementById("sonuc").innerText = "Şehir bulunamadı!";
    }
  } catch (error)// teknik hata olursa bu mesajı gösterir(internet vb.)
   {
    document.getElementById("sonuc").innerText = "Veri alınırken bir hata oluştu.";
  }
}
