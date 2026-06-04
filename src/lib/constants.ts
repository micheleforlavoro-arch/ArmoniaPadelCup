export const ACCENT_COLOR = "#A5D8FF"; // Ice Blue

export const SPONSORS = [
  { name: "Retròscena Barber Shop", type: "Barber Shop", desc: "Taglio capelli e cura barba professionale.", img: "/retròscena_logo_Tavola disegno 1.jpg" },
  { name: "Wine Art", type: "Ristorazione", desc: "Cantina vinicola e piatti ricercati.", img: "/wine art logo.jpg" },
  { name: "Boa Sorte", type: "Ristorazione", desc: "Sapori esotici e cucina fusion di alta classe.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=50" },
  { name: "Gelateria Armonia", type: "Main Sponsor", desc: "Gelato artigianale d'eccellenza e gusti esclusivi.", img: "/ARMONIA DEI GUSTI VETTORIALE.jpg" },
  { name: "Molendini", type: "Ristorazione", desc: "Lounge bar e kit premium per serate indimenticabili.", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=300&q=50" },
  { name: "Dehor", type: "Lounge & Aperitif", desc: "Aperitivi e cocktail d'autore in un'atmosfera unica.", img: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=300&q=50" },
  { name: "Novum Store", type: "Abbigliamento", desc: "Abbigliamento tecnico sportivo e accessori.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=50" },
  { name: "Doppio Malto", type: "Birreria & Grill", desc: "Birra artigianale e griglia per concludere i match in festa.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=50" },
  { name: "Head Padel", type: "Technical Partner", desc: "Attrezzatura tecnica ufficiale per il torneo.", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=300&q=50" },
  { name: "Masagiù SPA", type: "Wellness", desc: "Centro benessere e percorsi relax per atleti.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=50" },
  { name: "Colosseo", type: "Sponsor Ufficiale", desc: "", img: "/Logo COLOSSEO .jpg" },
  { name: "DO&BIZ", type: "Sponsor Ufficiale", desc: "", img: "/logo DO&BIZ.jpg" },
  { name: "Chiappetta Sport Village", type: "Location Ufficiale", desc: "", img: "/logo chiappetta sport village.jpg" }
];

export const compressImage = (base64Str: string, maxWidth = 600, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
};
