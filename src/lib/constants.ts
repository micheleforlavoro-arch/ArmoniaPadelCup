export const ACCENT_COLOR = "#A5D8FF"; // Ice Blue

export const SPONSORS = [
  {
    "name": "Armonia dei Gusti",
    "type": "Main Sponsor",
    "desc": "",
    "img": "/ARMONIA DEI GUSTI VETTORIALE.jpg"
  },
  {
    "name": "Chiappetta Sport Village",
    "type": "Location Ufficiale",
    "desc": "",
    "img": "/logo chiappetta sport village.jpg"
  },
  {
    "name": "Molto",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/logo molto.png"
  },
  {
    "name": "Molendini",
    "type": "Ristorazione",
    "desc": "",
    "img": "/molendini logo.png"
  },
  {
    "name": "Retròscena Barber Shop",
    "type": "Barber Shop",
    "desc": "",
    "img": "/retroscena_logo.jpg"
  },
  {
    "name": "Dehor",
    "type": "Lounge & Aperitif",
    "desc": "",
    "img": "/dehor logo.png"
  },
  {
    "name": "Masagiù SPA",
    "type": "Wellness",
    "desc": "",
    "img": "/masagiu_logo.jpg"
  },
  {
    "name": "Novum Store",
    "type": "Abbigliamento",
    "desc": "",
    "img": "/novum store logo.png"
  },
  {
    "name": "Wine Art",
    "type": "Ristorazione",
    "desc": "",
    "img": "/wine art logo.jpg"
  },
  {
    "name": "Boa Sorte",
    "type": "Ristorazione",
    "desc": "",
    "img": "/boa sorte logo.png"
  },
  {
    "name": "Doppio Malto",
    "type": "Birreria & Grill",
    "desc": "",
    "img": "/doppio malto.png"
  },
  {
    "name": "Head Padel",
    "type": "Technical Partner",
    "desc": "",
    "img": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=300&q=50"
  },
  {
    "name": "Colosseo",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/Logo COLOSSEO .jpg"
  },
  {
    "name": "DO&BIZ",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/logo DO&BIZ.jpg"
  },
  {
    "name": "Call The Future",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/call the future logo.jpg"
  },
  {
    "name": "Pasticceria Siciliana",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/PASTICCERIA SICILIANA logo.jpg"
  },
  {
    "name": "Due Fratelli",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/due fratelli logo.png"
  },
  {
    "name": "AM Sport",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/AM Group.jpg"
  },
  {
    "name": "Pizza.com",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/pizza.com logo.jpeg"
  },
  {
    "name": "Maxima",
    "type": "Sponsor Ufficiale",
    "desc": "",
    "img": "/maxima logo.jpg"
  }
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
