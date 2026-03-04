export interface CardData {
  type: string;
  prompt: string;
  emoji: string;
}

export interface Edition {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  cards: CardData[];
}

// ============================================================================
// CLASSIC EDITION - The Original Walwal Cards (from data.ts)
// ============================================================================
export const CLASSIC_EDITION: Edition = {
  id: "classic",
  name: "Classic",
  description: "Ang pambansang laro ng barkada! The OG Walwal experience.",
  emoji: "🍻",
  color: "#FB923C", // orange
  cards: [
    // --- Da Who?  ---
    { type: "Da Who?", prompt: "Pinaka-marupok sa ex. Shot!", emoji: "🤡" },
    { type: "Da Who?", prompt: "Pinaka-conyo magsalita. Shot!", emoji: "💅" },
    {
      type: "Da Who?",
      prompt: "Pinaka-iyakin kapag lasing. Shot!",
      emoji: "😭",
    },
    {
      type: "Da Who?",
      prompt: "Laging late? Filipino time yarn? Shot!",
      emoji: "⏰",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-kuripot sa barkada. Shot!",
      emoji: "💸",
    },
    { type: "Da Who?", prompt: "Laging 'di naliligo. Shot!", emoji: "🚿" },
    { type: "Da Who?", prompt: "Pinaka-mabilis mag-reply. Shot!", emoji: "👀" },
    { type: "Da Who?", prompt: "Pinaka-Tito/Tita pumorma. Shot!", emoji: "👔" },
    { type: "Da Who?", prompt: "Pinaka-malakas tumawa. Shot!", emoji: "🤣" },
    {
      type: "Da Who?",
      prompt: "Laging nandadaya sa inuman (Ninja moves). Shot!",
      emoji: "🥷",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-strict ang parents. Shot!",
      emoji: "🚫",
    },
    { type: "Da Who?", prompt: "Pinaka-drawing sa lakad. Shot!", emoji: "🎨" },
    {
      type: "Da Who?",
      prompt: "Laging gutom kahit kakatapos lang kumain. Shot!",
      emoji: "🍗",
    },
    {
      type: "Da Who?",
      prompt: "Mastermind sa chismis. Marites. Shot!",
      emoji: "🍵",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-mahilig mag-English kapag lasing. Shot!",
      emoji: "🇺🇸",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-maraming 'ka-talking stage'. Shot, babaero/lalakero!",
      emoji: "💬",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-mataas ang pride. Shot para bumaba!",
      emoji: "🦁",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-mahilig bumirit sa karaoke. Shot!",
      emoji: "🎤",
    },
    {
      type: "Da Who?",
      prompt:
        "Pinaka-mabilis ma-fall. Konting attention lang, in love na. Shot!",
      emoji: "😍",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-kaladkarin? Yung laging 'G' agad! Shot!",
      emoji: "🏃",
    },
    { type: "Da Who?", prompt: "Pinaka-clout chaser. Shot!", emoji: "🌟" },
    {
      type: "Da Who?",
      prompt:
        "Sino ang laging nauubusan ng pera petsa de peligro pa lang? Shot!",
      emoji: "📉",
    },
    {
      type: "Da Who?",
      prompt: "Pinaka-mahilig mag-selfie/myday. Shot!",
      emoji: "📸",
    },
    { type: "Da Who?", prompt: "Pinaka lutang. Shot!", emoji: "😵" },
    { type: "Da Who?", prompt: "Pinaka nanay sa grupo? Shot!", emoji: "👵" },
    { type: "Da Who?", prompt: "Pinaka bunso sa grupo? Shot!", emoji: "👶" },
    { type: "Da Who?", prompt: "Pinaka tengga. NBSB yarn? Shot!", emoji: "🤷" },
    {
      type: "Da Who?",
      prompt: "Pinaka-chronically offline. Shot!",
      emoji: "📵",
    },
    { type: "Da who?", prompt: "Shot sa pinaka martyr!", emoji: "😇" },

    // --- Sagot o Lagot  ---
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-nakakahiya mong nagawa sa buong buhay mo?",
      emoji: "😳",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino sa group na 'to ang `jojowain`? Pangalanan mo o shot!",
      emoji: "😏",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Kailan ka huling nag-stalk sa ex mo?",
      emoji: "🕵️",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinakamalaking halaga na inutang mo at di mo binayaran?",
      emoji: "💰",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang first impression mo sa katabi mo (kanan)?",
      emoji: "👉",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-weird na panaginip mo sa group na 'to?",
      emoji: "👽",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sinong friend mo ang blinock mo sa FB/IG?",
      emoji: "🚫",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Kung mayaman ka, sino sa barkada ang hindi mo na kakausapin? And why?",
      emoji: "🤑",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino ang pinaka-hate mong teacher nung High School at bakit?",
      emoji: "👩‍🏫",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-baliw na bagay na ginawa mo para sa pag-ibig?",
      emoji: "❤️‍🔥",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Kung kailangan mong i-unfriend ang isa dito sa barkada, sino at bakit? (Bawal safe answer!)",
      emoji: "✂️",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang password ng phone mo? I-unlock mo o shot!",
      emoji: "🔓",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino dito ang may pinaka-pangit na taste sa jowa?",
      emoji: "🤮",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang last na sinearch mo sa Google? Show us or Shot!",
      emoji: "🔍",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Jojowain o Totropahin: Ang katabi mo sa kaliwa?",
      emoji: "🤔",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-ayaw mong ugali ng katabi mo sa kanan?",
      emoji: "😒",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino sa barkada ang tingin mong unang yayaman?",
      emoji: "💰",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Kung pwede kang makipag-date sa ex ng kaibigan mo, sino at bakit?",
      emoji: "🐍",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Kailan ka huling umiyak at bakit?",
      emoji: "😢",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino dito ang di mo gusto ang ugali? Pangalanan mo o Shot!",
      emoji: "😤",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino dito ang gusto mo pang maging-close?",
      emoji: "🫂",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Magbigay ng sekreto na di pa nalalaman ng kahit sino dito. O shot!",
      emoji: "🤫",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Sino ang huli mong naka-fling? Except sa current jowa. Pangalanan o shot!",
      emoji: "🔥",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Ano ang favourite mong position? Context matters lol. Reveal o Shot!",
      emoji: "💦",
    },

    // --- DARE OR SHOT  ---
    {
      type: "Dare or Shot",
      prompt: "I-chat ang crush o ex mo ng 'Miss na kita'. No context.",
      emoji: "💌",
    },
    {
      type: "Dare or Shot",
      prompt: "Ipakita ang last photo sa gallery mo. No skipping!",
      emoji: "🖼️",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Mag-voice message sa crush mo habang kumakanta ng 'All I Want For Christmas Is You'.",
      emoji: "🎤",
    },
    {
      type: "Dare or Shot",
      prompt: "Sayaw ka ng Budots sa loob ng 10 seconds.",
      emoji: "🕺",
    },
    {
      type: "Dare or Shot",
      prompt: "Gayahin ang tawa ng katabi mo.",
      emoji: "🦜",
    },
    {
      type: "Dare or Shot",
      prompt: "Bigyan mo ng 20 pesos ang katabi mo sa kaliwa. (GCash pwede)",
      emoji: "💸",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Mag-story ng selfie ngayon na may caption na 'Feeling fresh'. For 24hrs.",
      emoji: "🤳",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Huwag mag-Ingles hanggang sa iyong sunod na baraha. Inom pag nagkamali!",
      emoji: "🇵🇭",
    },
    {
      type: "Dare or Shot",
      prompt: "Ipabasa ang last conversation niyo ng nanay mo.",
      emoji: "📱",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Tumawag sa random contact number at sabihing 'Nandito na ang order niyo'.",
      emoji: "📞",
    },
    {
      type: "Dare or Shot",
      prompt: "Hawakan ang kamay ng katabi mo hanggang next turn.",
      emoji: "🤝",
    },
    {
      type: "Dare or Shot",
      prompt:
        "I-message ang panglimang profile sa stories mo ng 'Notice me po 👉👈'.",
      emoji: "🫩",
    },
    {
      type: "Dare or Shot",
      prompt: "Gayahin si Kris Aquino magsalita for 1 round.",
      emoji: "💛",
    },
    {
      type: "Dare or Shot",
      prompt:
        "I-prank call ang isang friend na wala dito. Sabihin mo nakipagbreak ang jowa mo sa 'yo habang umiiyak.",
      emoji: "😭",
    },
    {
      type: "Dare or Shot",
      prompt: "Sumayaw ng TikTok dance na trending ngayon. Walang music!",
      emoji: "💃",
    },
    {
      type: "Dare or Shot",
      prompt: "Amuyin ang kili-kili ng katabi (kanan).",
      emoji: "👃",
    },
    {
      type: "Dare or Shot",
      prompt: "Mag-rap tungkol sa ulam niyo kanina.",
      emoji: "😎",
    },
    {
      type: "Dare or Shot",
      prompt: "Mag-planking sa sahig for 20 seconds.",
      emoji: "🪵",
    },
    {
      type: "Dare or Shot",
      prompt: "Inumin ang shot nang walang kamay (gamitin ang bibig lang).",
      emoji: "🥃",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Hayaang mag-post ang group ng status sa Facebook mo. Bawal burahin for 1 hour.",
      emoji: "😈",
    },
    { type: "Dare or Shot", prompt: "I-kiss ang katabi mo.", emoji: "💋" },
    {
      type: "Dare or Shot",
      prompt:
        "Mag selfie habang kinikiss ang pinakatype mo dito (pwede sa cheeks). At i-story. O shot!",
      emoji: "🤳",
    },
    {
      type: "Dare or Shot",
      prompt: "Ipakita ang convo ng huling ka-flirt mo.",
      emoji: "📱",
    },
    {
      type: "Dare or Shot",
      prompt: "Ipakita ang recently deleted photo mo.",
      emoji: "🗑️",
    },

    // --- GROUP SHOT ---
    { type: "Group Shot", prompt: "Lahat ng Single! Shot!", emoji: "🍻" },
    {
      type: "Group Shot",
      prompt: "Lahat ng Taken... (except sa gusto na humiwalay). Shot!",
      emoji: "💑",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng may utang pa sa GCredit/SPayLater. Shot!",
      emoji: "💳",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng hindi naligo ngayong araw. Shot!",
      emoji: "🤢",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng naka-iPhone. Shot kayo mga rich kid!",
      emoji: "📱",
    },
    { type: "Group Shot", prompt: "Lahat ng Android user. Shot!", emoji: "🤖" },
    { type: "Group Shot", prompt: "Lahat ng naka-puti. Shot!", emoji: "⚪" },
    {
      type: "Group Shot",
      prompt: "Lahat ng nang-ghost. Shot kayo mga duwag!",
      emoji: "👻",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng na-ghost. Shot para sa healing!",
      emoji: "💔",
    },
    {
      type: "Group Shot",
      prompt: "Cheers! Lahat shot para masaya!",
      emoji: "🥂",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng may tattoo o piercing. Shot!",
      emoji: "💉",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng palamunin pa rin sa bahay. Shot!",
      emoji: "🏠",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng may balak mag-resign pero di magawa. Shot!",
      emoji: "📝",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng sumuka habang umiinom noon. Shot!",
      emoji: "🤮",
    },
    {
      type: "Group Shot",
      prompt: "Last person na humawak ng cellphone ngayon, shot!",
      emoji: "📵",
    },
    { type: "Group Shot", prompt: "Lahat ng naka-salamin. Shot!", emoji: "🤓" },
    {
      type: "Group Shot",
      prompt: "Lahat ng naka-tsinelas lang ngayon. Shot!",
      emoji: "🩴",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng panganay sa pamilya. Shot!",
      emoji: "1️⃣",
    },
    { type: "Group Shot", prompt: "Lahat ng bunso. Shot!", emoji: "👶" },

    // --- POWER CARDS ---
    { type: "Immunity", prompt: "Ligtas ka sa susunod na shot.", emoji: "🛡️" },
    {
      type: "Drinking Buddy",
      prompt: "Pumili ng damay. Tig-isa kayong shot.",
      emoji: "👯",
    },
    {
      type: "Reverse",
      prompt: "Ibalik ang shot sa nagbigay sayo (o sa naunang player).",
      emoji: "↩️",
    },
    { type: "Power Card", prompt: "Ituro ang iinom ng shot mo.", emoji: "👉" },
    { type: "Skip", prompt: "Safe ka be, next player", emoji: "⏭️" },
    {
      type: "Truth Bomb",
      prompt: "Magtanong ng kahit ano sa kahit kanino. Pag di sinagot, shot!",
      emoji: "💣",
    },
    {
      type: "Dare Bomb",
      prompt: "Magdare ng kahit ano sa kahit kanino. Pag di sinunod, shot!",
      emoji: "💣",
    },
    {
      type: "Lucky!",
      prompt: "Ligtas ka! Pumili ng iinom para sayo.",
      emoji: "🍀",
    },
    {
      type: "Master",
      prompt: "Ibigay ang shot sa di nalalasing.",
      emoji: "👑",
    },
    {
      type: "Fire Drill",
      prompt: "Ang unang mag-duck, cover, and hold, ligtas sa susunod na shot.",
      emoji: "🚨",
    },
    {
      type: "Let's Play",
      prompt:
        "Mula sayo, magbigay ng gulay sa Bahay Kubo. Ang magkamali, shot!",
      emoji: "🥕",
    },
    {
      type: "Let's Play",
      prompt:
        "Kantahin ang favorite song mo. Ang unang makahula ng title, ligtas sa susunod na shot.",
      emoji: "🎶",
    },
    {
      type: "Let's Play",
      prompt:
        "Ipahula ang body count mo sa grupo. Ang pinakamalapit sa sagot, ligtas sa susunod na shot.",
      emoji: "🔢",
    },
  ],
};

// ============================================================================
// SPICY EDITION - 🌶️ For the bold and daring (18+)
// ============================================================================
export const SPICY_EDITION: Edition = {
  id: "spicy",
  name: "Spicy 🔞",
  description: "Para sa mga matapang! Adults only, walang hiya-hiya.",
  emoji: "🌶️",
  color: "#EF4444", // red
  cards: [
    // --- Spicy Da Who? ---
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-malakas ang sex appeal dito? Shot!",
      emoji: "🔥",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-maraming body count? Shot!",
      emoji: "🛏️",
    },
    {
      type: "Da Who?",
      prompt:
        "Sino ang pinaka-wild sa kama according sa dating jowa niya? Shot!",
      emoji: "😈",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-mahilig mag-sext? Shot!",
      emoji: "📱",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-mabilis mag-hubad kapag lasing? Shot!",
      emoji: "👙",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-flirty dito? Shot!",
      emoji: "😏",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang siguradong may crush dito sa grupo? Shot!",
      emoji: "💘",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-madaling i-seduce? Shot!",
      emoji: "🥵",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-matindi mag-dirty talk? Shot!",
      emoji: "🗣️",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-adventurous sa relationships? Shot!",
      emoji: "🎢",
    },

    // --- Spicy Sagot o Lagot ---
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-wild na fantasy mo? Reveal o shot!",
      emoji: "💭",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino sa grupo ang type mo physically? Pangalanan o shot!",
      emoji: "👀",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang weirdest place na nagawa mo 'yun'? Sagot o shot!",
      emoji: "📍",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ilang beses mo ginawa sa isang gabi? Max count, sagot o shot!",
      emoji: "🔢",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Ano ang pinaka-embarrassing moment mo sa bedroom? Kwento o shot!",
      emoji: "😳",
    },
    {
      type: "Sagot o Lagot",
      prompt: "May nagawa ka bang cheating? Aminin o shot!",
      emoji: "💔",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang kink mo? Reveal o shot!",
      emoji: "⛓️",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Sino ang pinaka-gwapo/maganda sa ex mo? Show pic o shot!",
      emoji: "📸",
    },
    {
      type: "Sagot o Lagot",
      prompt:
        "Kung papipiliin ka ng isa dito para sa one night, sino? Sagot o shot!",
      emoji: "🌙",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang biggest turn-on mo? Sagot o shot!",
      emoji: "🔥",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Nagka-crush ka ba sa jowa ng friend mo? Sino? Sagot o shot!",
      emoji: "🐍",
    },
    {
      type: "Sagot o Lagot",
      prompt: "Ano ang pinaka-risky na ginawa mo for pleasure? Kwento o shot!",
      emoji: "⚠️",
    },

    // --- Spicy Dare or Shot ---
    {
      type: "Dare or Shot",
      prompt: "Give a lap dance sa pinaka-type mo dito for 30 seconds.",
      emoji: "💃",
    },
    {
      type: "Dare or Shot",
      prompt: "Whisper something naughty sa tenga ng katabi mo.",
      emoji: "👂",
    },
    {
      type: "Dare or Shot",
      prompt: "Remove one piece of clothing (not shoes/accessories).",
      emoji: "👕",
    },
    {
      type: "Dare or Shot",
      prompt: "Kiss sa lips ang pinaka-type mo dito for 5 seconds.",
      emoji: "💋",
    },
    {
      type: "Dare or Shot",
      prompt: "Do your best fake moan. Dapat convincing!",
      emoji: "🎭",
    },
    {
      type: "Dare or Shot",
      prompt: "Send a flirty message sa last person na naka-chat mo.",
      emoji: "📩",
    },
    {
      type: "Dare or Shot",
      prompt:
        "Let someone from the group touch your abs/stomach for 10 seconds.",
      emoji: "✋",
    },
    {
      type: "Dare or Shot",
      prompt: "Act out your O-face. Walang hiya-hiya!",
      emoji: "😩",
    },
    {
      type: "Dare or Shot",
      prompt: "Give a hickey sa katabi mo (with consent).",
      emoji: "💜",
    },
    {
      type: "Dare or Shot",
      prompt: "Demonstrate your best kissing technique on your hand.",
      emoji: "🤚",
    },
    {
      type: "Dare or Shot",
      prompt: "Sit on the lap ng pinaka-type mo dito for the next 2 rounds.",
      emoji: "🪑",
    },
    {
      type: "Dare or Shot",
      prompt: "Let someone blindfold you and guess who's touching you.",
      emoji: "🙈",
    },

    // --- Spicy Group ---
    {
      type: "Group Shot",
      prompt: "Lahat ng may experience sa public place. Shot!",
      emoji: "🏞️",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng may nudes sa phone ngayon. Shot!",
      emoji: "📱",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng nag-sext sa work/school. Shot!",
      emoji: "💼",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng may FWB experience. Shot!",
      emoji: "🤝",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng na-catch ng magulang. Shot!",
      emoji: "😱",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng gumamit ng toys. Shot!",
      emoji: "🎁",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng nagkaroon ng one night stand. Shot!",
      emoji: "🌙",
    },
    {
      type: "Group Shot",
      prompt: "Lahat ng na-turn on ngayon sa game na 'to. Shot!",
      emoji: "🥵",
    },

    // --- Spicy Power Cards ---
    {
      type: "Kiss or Drink",
      prompt: "Kiss ang katabi mo sa kanan o 3 shots!",
      emoji: "💋",
    },
    {
      type: "Body Shot",
      prompt: "Take a body shot sa pinaka-willing na player.",
      emoji: "🧂",
    },
    {
      type: "Confession",
      prompt: "Confess your deepest darkest secret o 5 shots!",
      emoji: "🤫",
    },
    {
      type: "Hot Seat",
      prompt: "You're on the hot seat! Answer 3 spicy questions truthfully.",
      emoji: "🔥",
    },
    {
      type: "Trade",
      prompt: "Swap one clothing item with someone for 3 rounds.",
      emoji: "🔄",
    },
  ],
};

// ============================================================================
// FAMILY FRIENDLY EDITION - 👨‍👩‍👧‍👦 Clean fun for all ages
// ============================================================================
export const FAMILY_EDITION: Edition = {
  id: "family",
  name: "Family Friendly",
  description: "Wholesome fun for reunions and all-ages gatherings!",
  emoji: "👨‍👩‍👧‍👦",
  color: "#22C55E", // green
  cards: [
    // --- Fun Da Who? ---
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-malakas kumain sa mesa? Drink juice!",
      emoji: "🍽️",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-mahilig mag-picture? Drink juice!",
      emoji: "📷",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-mabait dito? Drink juice!",
      emoji: "😇",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-maingay? Drink juice!",
      emoji: "📢",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-matulungin? Drink juice!",
      emoji: "🤝",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-funny dito? Drink juice!",
      emoji: "🤣",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-talented? Drink juice!",
      emoji: "⭐",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-athletic? Drink juice!",
      emoji: "🏃",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-matalino dito? Drink juice!",
      emoji: "🧠",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-creative? Drink juice!",
      emoji: "🎨",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-sweet sa pamilya? Drink juice!",
      emoji: "🍬",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-masipag? Drink juice!",
      emoji: "💪",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-mahilig sa animals? Drink juice!",
      emoji: "🐶",
    },
    {
      type: "Da Who?",
      prompt: "Sino ang pinaka-adventurous? Drink juice!",
      emoji: "🏔️",
    },

    // --- Fun Tanong Time ---
    {
      type: "Tanong Time",
      prompt: "Ano ang favorite childhood memory mo?",
      emoji: "👶",
    },
    {
      type: "Tanong Time",
      prompt: "Kung pwede kang maging superhero, sino?",
      emoji: "🦸",
    },
    {
      type: "Tanong Time",
      prompt: "Ano ang dream vacation destination mo?",
      emoji: "✈️",
    },
    {
      type: "Tanong Time",
      prompt: "Ano ang pinaka-proud moment mo this year?",
      emoji: "🏆",
    },
    {
      type: "Tanong Time",
      prompt: "Kung may superpower ka, ano pipiliin mo?",
      emoji: "⚡",
    },
    {
      type: "Tanong Time",
      prompt: "Ano ang favorite food mo na luto ni Mama/Papa?",
      emoji: "🍳",
    },
    { type: "Tanong Time", prompt: "Sino ang childhood hero mo?", emoji: "🌟" },
    { type: "Tanong Time", prompt: "Ano ang biggest dream mo?", emoji: "💭" },
    { type: "Tanong Time", prompt: "Kung ikaw ay hayop, ano ka?", emoji: "🦁" },
    {
      type: "Tanong Time",
      prompt: "Ano ang favorite holiday mo at bakit?",
      emoji: "🎄",
    },
    {
      type: "Tanong Time",
      prompt: "Kung may time machine ka, saan ka pupunta?",
      emoji: "⏰",
    },
    {
      type: "Tanong Time",
      prompt: "Ano ang pinaka-nakakatawang nangyari sayo?",
      emoji: "😂",
    },

    // --- Fun Challenges ---
    {
      type: "Challenge",
      prompt: "Do your best animal impression!",
      emoji: "🐒",
    },
    {
      type: "Challenge",
      prompt: "Sing the chorus of your favorite song!",
      emoji: "🎤",
    },
    { type: "Challenge", prompt: "Do 10 jumping jacks!", emoji: "🏋️" },
    {
      type: "Challenge",
      prompt: "Tell a joke and make everyone laugh!",
      emoji: "😄",
    },
    {
      type: "Challenge",
      prompt: "Dance for 15 seconds, any dance!",
      emoji: "💃",
    },
    {
      type: "Challenge",
      prompt: "Say the alphabet backwards as fast as you can!",
      emoji: "🔤",
    },
    {
      type: "Challenge",
      prompt: "Act like your favorite movie character for 30 seconds!",
      emoji: "🎬",
    },
    {
      type: "Challenge",
      prompt: "Give a sincere compliment to everyone in the room!",
      emoji: "💝",
    },
    {
      type: "Challenge",
      prompt: "Do your best celebrity impression!",
      emoji: "🌟",
    },
    {
      type: "Challenge",
      prompt: "Make a funny face and hold it for 10 seconds!",
      emoji: "🤪",
    },
    {
      type: "Challenge",
      prompt: "Recite a nursery rhyme with actions!",
      emoji: "📖",
    },
    {
      type: "Challenge",
      prompt: "Balance a spoon on your nose for 10 seconds!",
      emoji: "🥄",
    },

    // --- Group Fun ---
    {
      type: "Group Cheers",
      prompt: "Lahat ng nag-breakfast kanina. Cheers!",
      emoji: "🥣",
    },
    {
      type: "Group Cheers",
      prompt: "Lahat ng nagda-drawing. Cheers!",
      emoji: "🎨",
    },
    { type: "Group Cheers", prompt: "Lahat ng may pet. Cheers!", emoji: "🐕" },
    {
      type: "Group Cheers",
      prompt: "Lahat ng mahilig sa sports. Cheers!",
      emoji: "⚽",
    },
    {
      type: "Group Cheers",
      prompt: "Lahat ng may kapatid. Cheers!",
      emoji: "👫",
    },
    {
      type: "Group Cheers",
      prompt: "Lahat ng nakatapos ng homework/work today. Cheers!",
      emoji: "✅",
    },
    {
      type: "Group Cheers",
      prompt: "Lahat ng mahilig mag-gaming. Cheers!",
      emoji: "🎮",
    },
    {
      type: "Group Cheers",
      prompt: "Lahat ng naka-smile ngayon. Cheers!",
      emoji: "😊",
    },
    {
      type: "Group Cheers",
      prompt: "Cheers everyone! Group hug!",
      emoji: "🤗",
    },

    // --- Nice Power Cards ---
    {
      type: "High Five",
      prompt: "High five lahat! Spread the good vibes!",
      emoji: "🙌",
    },
    {
      type: "Compliment",
      prompt: "Say something nice about the person to your left!",
      emoji: "💕",
    },
    {
      type: "Story Time",
      prompt: "Tell a 1-minute story about your happiest memory!",
      emoji: "📚",
    },
    {
      type: "Talent Show",
      prompt: "Show off a hidden talent you have!",
      emoji: "🎪",
    },
    {
      type: "Gratitude",
      prompt: "Share one thing you're grateful for today!",
      emoji: "🙏",
    },
    {
      type: "Skip",
      prompt: "You're safe! Pass to the next person!",
      emoji: "⏭️",
    },
    {
      type: "Lucky",
      prompt: "Choose someone to do a fun challenge!",
      emoji: "🍀",
    },
  ],
};

// ============================================================================
// COUPLES EDITION - 💑 For date nights and couples game nights
// ============================================================================
export const COUPLES_EDITION: Edition = {
  id: "couples",
  name: "Couples Night",
  description: "Perfect para sa date night o couples game night!",
  emoji: "💑",
  color: "#EC4899", // pink
  cards: [
    // --- Kilig Questions ---
    {
      type: "Kilig Time",
      prompt: "What was your first impression of your partner?",
      emoji: "👀",
    },
    {
      type: "Kilig Time",
      prompt: "Describe your partner in 3 words.",
      emoji: "💭",
    },
    {
      type: "Kilig Time",
      prompt: "What's your favorite thing about your partner?",
      emoji: "💕",
    },
    {
      type: "Kilig Time",
      prompt: "When did you know you were in love?",
      emoji: "💘",
    },
    {
      type: "Kilig Time",
      prompt: "What's your favorite memory together?",
      emoji: "📸",
    },
    {
      type: "Kilig Time",
      prompt: "What song reminds you of your partner?",
      emoji: "🎵",
    },
    {
      type: "Kilig Time",
      prompt: "What's something your partner does that always makes you smile?",
      emoji: "😊",
    },
    {
      type: "Kilig Time",
      prompt: "If you could relive one moment together, which would it be?",
      emoji: "⏪",
    },

    // --- Couples Challenges ---
    {
      type: "Challenge",
      prompt: "Kiss your partner for 10 seconds!",
      emoji: "💋",
    },
    {
      type: "Challenge",
      prompt: "Give your partner a massage for 1 minute.",
      emoji: "💆",
    },
    {
      type: "Challenge",
      prompt: "Slow dance together for 30 seconds, no music.",
      emoji: "💃",
    },
    {
      type: "Challenge",
      prompt: "Feed your partner something without using hands.",
      emoji: "🍓",
    },
    {
      type: "Challenge",
      prompt: "Stare into each other's eyes for 30 seconds. No laughing!",
      emoji: "👁️",
    },
    {
      type: "Challenge",
      prompt: "Tell your partner 'I love you' in 3 different languages.",
      emoji: "🌍",
    },
    {
      type: "Challenge",
      prompt: "Hold hands for the next 3 rounds.",
      emoji: "🤝",
    },
    {
      type: "Challenge",
      prompt: "Give your partner a forehead kiss.",
      emoji: "😘",
    },

    // --- Would You Rather (Couples) ---
    {
      type: "Would You Rather",
      prompt: "Would you rather have a fancy dinner or a cozy movie night?",
      emoji: "🎬",
    },
    {
      type: "Would You Rather",
      prompt: "Would you rather travel the world or build your dream home?",
      emoji: "🏠",
    },
    {
      type: "Would You Rather",
      prompt: "Would you rather have breakfast in bed or a romantic dinner?",
      emoji: "🍳",
    },
    {
      type: "Would You Rather",
      prompt: "Would you rather receive flowers or a handwritten letter?",
      emoji: "💐",
    },

    // --- Confession Box ---
    {
      type: "Confession",
      prompt: "Confess something you've never told your partner.",
      emoji: "🤫",
    },
    {
      type: "Confession",
      prompt: "What's one thing you wish you did more together?",
      emoji: "💭",
    },
    {
      type: "Confession",
      prompt:
        "What's something small your partner does that you secretly love?",
      emoji: "🥰",
    },
    {
      type: "Confession",
      prompt: "Share a dream you have for your future together.",
      emoji: "✨",
    },

    // --- Group (for double dates) ---
    {
      type: "Couples Battle",
      prompt: "Which couple can hold a plank position longer?",
      emoji: "🪵",
    },
    {
      type: "Couples Battle",
      prompt: "Which couple knows each other's birthday better?",
      emoji: "🎂",
    },
    {
      type: "Couples Battle",
      prompt: "Which couple can name the most songs together?",
      emoji: "🎤",
    },
    {
      type: "Group",
      prompt: "All couples share their first date story!",
      emoji: "📖",
    },
  ],
};

// ============================================================================
// ALL EDITIONS
// ============================================================================
export const ALL_EDITIONS: Edition[] = [
  CLASSIC_EDITION,
  SPICY_EDITION,
  FAMILY_EDITION,
  COUPLES_EDITION,
];

export const getEditionById = (id: string): Edition | undefined => {
  return ALL_EDITIONS.find((edition) => edition.id === id);
};
