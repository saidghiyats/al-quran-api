const { data: juzData } = require('../../data/juz.json');
const { data: quranData } = require('../../data/quran.json');

const getJuzData = (juzNumber) => {
   const juz = juzData[juzNumber - 1];

   if (!juz) return null;

   const startSurahIndex = juz.start.index - 1;
   const startAyahIndex = juz.start.verse - 1;
   const endSurahIndex = juz.end.index - 1;
   const endAyahIndex = juz.end.verse;
   const juzAyah = [];

   for (let i = startSurahIndex; i <= endSurahIndex; i++) {
      const surah = quranData[i];
      const ayahCount = surah.verses.length;
      const surahData = {
         number: surah.number,
         numberOfVerses: surah.numberOfVerses,
         name: surah.name,
         revelation: surah.revelation,
         tafsir: surah.tafsir,
         preBismillah: surah.preBismillah,
         verses: [],
      };

      if (i === startSurahIndex) {
         for (let j = startAyahIndex; j < ayahCount; j++) {
            surahData.verses.push(surah.verses[j]);
         }
      } else if (i === endSurahIndex) {
         for (let j = 0; j < endAyahIndex; j++) {
            surahData.verses.push(surah.verses[j]);
         }
      } else {
         surahData.verses = surah.verses;
      }

      juzAyah.push(surahData);
   }

   const juzInfo = {
      number: juzNumber,
      start: `${quranData[startSurahIndex].name.transliteration.id} - ${juz.start.verse}`,
      end: `${quranData[endSurahIndex].name.transliteration.id} - ${juz.end.verse}`,
      numberOfVerses: juzAyah.reduce((total, surah) => total + surah.verses.length, 0),
      juzs: juzAyah,
   };

   return juzInfo;
};

module.exports = getJuzData;
