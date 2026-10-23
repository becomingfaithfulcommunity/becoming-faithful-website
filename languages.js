// Language menu: English and Spanish are locally authored; other languages open a machine-translated view.
const BFC_LANGUAGES = {
  "af": "Afrikaans",
  "sq": "Shqip",
  "am": "አማርኛ",
  "ar": "العربية",
  "hy": "Հայերեն",
  "as": "অসমীয়া",
  "az": "Azərbaycanca",
  "eu": "Euskara",
  "be": "Беларуская",
  "bn": "বাংলা",
  "bs": "Bosanski",
  "bg": "Български",
  "ca": "Català",
  "ceb": "Cebuano",
  "zh-CN": "中文（简体）",
  "zh-TW": "中文（繁體）",
  "co": "Corsu",
  "hr": "Hrvatski",
  "cs": "Čeština",
  "da": "Dansk",
  "dv": "ދިވެހި",
  "nl": "Nederlands",
  "en": "English",
  "eo": "Esperanto",
  "et": "Eesti",
  "fil": "Filipino",
  "fi": "Suomi",
  "fr": "Français",
  "fy": "Frysk",
  "gl": "Galego",
  "ka": "ქართული",
  "de": "Deutsch",
  "el": "Ελληνικά",
  "gu": "ગુજરાતી",
  "ht": "Kreyòl ayisyen",
  "ha": "Hausa",
  "haw": "ʻŌlelo Hawaiʻi",
  "he": "עברית",
  "hi": "हिन्दी",
  "hmn": "Hmoob",
  "hu": "Magyar",
  "is": "Íslenska",
  "ig": "Igbo",
  "id": "Bahasa Indonesia",
  "ga": "Gaeilge",
  "it": "Italiano",
  "ja": "日本語",
  "jv": "Basa Jawa",
  "kn": "ಕನ್ನಡ",
  "kk": "Қазақша",
  "km": "ខ្មែរ",
  "ko": "한국어",
  "ku": "Kurdî",
  "ky": "Кыргызча",
  "lo": "ລາວ",
  "la": "Latina",
  "lv": "Latviešu",
  "lt": "Lietuvių",
  "lb": "Lëtzebuergesch",
  "mk": "Македонски",
  "mg": "Malagasy",
  "ms": "Bahasa Melayu",
  "ml": "മലയാളം",
  "mt": "Malti",
  "mi": "Māori",
  "mr": "मराठी",
  "mn": "Монгол",
  "my": "မြန်မာ",
  "ne": "नेपाली",
  "no": "Norsk",
  "ny": "Chichewa",
  "or": "ଓଡ଼ିଆ",
  "ps": "پښتو",
  "fa": "فارسی",
  "pl": "Polski",
  "pt": "Português",
  "pa": "ਪੰਜਾਬੀ",
  "ro": "Română",
  "ru": "Русский",
  "sm": "Gagana Samoa",
  "gd": "Gàidhlig",
  "sr": "Српски",
  "st": "Sesotho",
  "sn": "Shona",
  "sd": "سنڌي",
  "si": "සිංහල",
  "sk": "Slovenčina",
  "sl": "Slovenščina",
  "so": "Soomaali",
  "es": "Español",
  "su": "Basa Sunda",
  "sw": "Kiswahili",
  "sv": "Svenska",
  "tg": "Тоҷикӣ",
  "ta": "தமிழ்",
  "te": "తెలుగు",
  "th": "ไทย",
  "tr": "Türkçe",
  "tk": "Türkmençe",
  "uk": "Українська",
  "ur": "اردو",
  "ug": "ئۇيغۇرچە",
  "uz": "Oʻzbekcha",
  "vi": "Tiếng Việt",
  "cy": "Cymraeg",
  "xh": "isiXhosa",
  "yi": "ייִדיש",
  "yo": "Yorùbá",
  "zu": "isiZulu"
};

(function(){
  const menus = document.querySelectorAll('.bfc-language-select');
  const path = window.location.pathname.replace(/\/+$/,'/');
  let suffix = path.replace(/^\/es(?=\/)/,'/').replace(/^\//,'');
  // Published website is at the root domain; avoid using file:// URLs for translations.
  const supported = ['','connect/','support/','story/'];
  if (!supported.includes(suffix)) suffix = '';
  const base = 'https://becomingfaithfulcommunity.com/';
  const url = base + suffix;
  for(const menu of menus){
    const current = document.documentElement.lang || 'en';
    for(const [code,name] of Object.entries(BFC_LANGUAGES)){
      const opt=document.createElement('option');opt.value=code;opt.textContent=name; opt.lang=code;
      if(code===current)opt.selected=true;
      menu.append(opt);
    }
    menu.addEventListener('change',function(){
      const code=this.value;
      if(code==='en'){window.location.href=url;return;}
      if(code==='es'){window.location.href=base+'es/'+suffix;return;}
      // Google Translate's external translation view supports many languages without storing visitor text on this site.
      const translated='https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(code)+'&u='+encodeURIComponent(url);
      window.location.href=translated;
    });
  }
})();
