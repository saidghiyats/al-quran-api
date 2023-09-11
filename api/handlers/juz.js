const juzData = require("../lib/juz.js");
const juzsData = require("../../data/juz.json");
const quranData = require("../../data/quran.json");

class JuzHandler {
  static getJuzs(req, res) {
    const result = [];

    juzsData.data.forEach((juz) => {
      const juzs = [];

      for (let i = juz.start.number; i <= juz.end.number; i++) {
        const matchingSurah = quranData.data.find(
          (surah) => surah.number === i
        );
        if (matchingSurah) {
          // Menghapus properti yang tidak diperlukan
          const { verses, preBismillah, ...filteredSurah } = matchingSurah;

          // Menambahkan properti rangeOfVerses pada masing-masing surah
          filteredSurah.rangeOfVerses = `${juz.start.verse}-${juz.end.verse}`;

          juzs.push(filteredSurah);
        }
      }

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
