const juzData = require("../lib/juz.js");
const juzsData = require("../../data/juz.json");
const quranData = require("../../data/quran.json");

class JuzHandler {
  static getJuzs(req, res) {
    const result = [];

    juzsData.data.forEach((juz) => {
      const juzs = [];

      const chapters = juz.chapter.map((chapter) => chapter.number);

      const matchingSurahs = quranData.data.filter((surah) =>
        chapters.includes(surah.number)
      );

      matchingSurahs.forEach((matchingSurah) => {
        const { number, verses, preBismillah, ...filteredSurah } =
          matchingSurah;
        const matchingChapters = juz.chapter.filter(
          (chapter) => chapter.number === matchingSurah.number
        );

        filteredSurah.key = matchingChapters
          .map((chapter) => chapter.key)
          .toString();

        juzs.push(filteredSurah);
      });

      result.push({
        number: juz.number,

        juzs,
      });
    });

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Success fetching matching juzs.",
      data: result,
    });
  }

  static getSpesificJuz(req, res) {
    const { juz } = req.params;
    const data = juzData(parseInt(juz));

    if (!data) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: `Juz "${juz}" is not found.`,
        data: {},
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Success fetching juz.",
      data,
    });
  }
}

module.exports = JuzHandler;
