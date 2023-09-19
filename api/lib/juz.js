const { data: juzData } = require("../../data/juz.json");
const { data: quranData } = require("../../data/quran.json");

const getJuzData = (juzNumber) => {
  const result = [];

  const requestedJuz = parseInt(juzNumber);

  if (
    isNaN(requestedJuz) ||
    requestedJuz < 1 ||
    requestedJuz > juzData.length
  ) {
    return null;
  }

  const juzItem = juzData[requestedJuz - 1];
  const chapters = juzItem.chapter.map((chapterInfo) => {
    const startChapterNumber = chapterInfo.number;
    const [startVerseNumber, endVerseNumber] = chapterInfo.key
      .split("-")
      .map(Number);

    const chapter = quranData.find(
      (surah) => surah.number === startChapterNumber
    );

    if (chapter) {
      const verses = chapter.verses.slice(startVerseNumber - 1, endVerseNumber);

      return {
        number: startChapterNumber,
        sequence: chapter.sequence,
        numberOfVerses: chapter.numberOfVerses,
        name: chapter.name,
        translation: chapter.translation,
        tafsir: chapter.tafsir,
        preBismillah: chapter.preBismillah,
        verses,
      };
    }
  });

  const totalAyah = chapters.reduce(
    (total, chapter) => total + chapter.verses.length,
    0
  );

  result.push({
    juzNumber: requestedJuz,
    totalAyah,
    chapters,
  });

  return result[0];
};

module.exports = getJuzData;
