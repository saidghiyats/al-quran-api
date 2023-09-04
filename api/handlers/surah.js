const { data: quran } = require('../../data/quran.json');

class SurahHandler {
  static getAllSurah(req, res) {
    const data = quran.map(item => {
      const surah = { ...item };
      delete surah.verses;
      delete surah.preBismillah;
      return surah;
    });
    return res.status(200).send({
      code: 200,
      status: 'OK.',
      message: 'Success fetching all surah.',
      data
    });
  }

  static getSurah(req, res) {
    const { surah } = req.params;
    const data = quran[surah - 1];
    if (data) {
      return res.status(200).send({
        code: 200,
        status: 'OK.',
        message: 'Success fetching surah.',
        data
      });
    }
    return res.status(404).send({
      code: 404,
      status: 'Not Found.',
      message: `Surah "${surah}" is not found.`,
      data: {}
    });
  }

  static getSpesificAyahInSurah(req, res) {
    const { surah, ayah } = req.params;
    const checkSurah = quran[surah - 1];

    if (!checkSurah) {
      return res.status(404).send({
        code: 404,
        status: 'Not Found.',
        message: `Surah "${surah}" is not found.`,
        data: {}
      });
    }

    let verses = checkSurah.verses;
    if (ayah.indexOf('-') !== -1) {
      // Mengecek apakah parameter ayah adalah rentang ayat
      const [startVerse, endVerse] = ayah.split('-').map(Number);

      // Pengecekan tambahan untuk memastikan format rentang yang valid
      if (
        !isNaN(startVerse) &&
         !isNaN(endVerse) &&
         startVerse > 0 &&
         endVerse > 0 &&
         startVerse <= endVerse &&
         endVerse <= verses.length
      ) {
        verses = verses.slice(startVerse - 1, endVerse);
      } else {
        // Fallback untuk rentang ayah tidak valid
        return res.status(400).send({
          code: 400,
          status: 'Bad Request.',
          message: 'Invalid ayah range.',
          data: {}
        });
      }
    } else if (!/^\d+$/.test(ayah)) {
      // Fallback untuk parameter ayah tidak sesuai format angka-angka
      return res.status(400).send({
        code: 400,
        status: 'Bad Request.',
        message: 'Ayah should be a numeric value or a valid range (e.g., 1-5).',
        data: {}
      });
    } else {
      // Jika parameter ayah hanya satu ayat
      const checkAyah = checkSurah.verses[ayah - 1];
      if (!checkAyah) {
        return res.status(404).send({
          code: 404,
          status: 'Not Found.',
          message: `Ayah "${ayah}" in surah "${surah}" is not found.`,
          data: {}
        });
      }
      verses = [checkAyah];
    }

    const dataSurah = { ...checkSurah };
    delete dataSurah.verses;
    const data = {
      number: dataSurah.number,
      sequence: dataSurah.sequence,
      numberOfVerses: dataSurah.numberOfVerses,
      name: dataSurah.name,
      revelation: dataSurah.revelation,
      tafsir: dataSurah.tafsir,
      preBismillah: dataSurah.preBismillah,
      verses
    };
    return res.status(200).send({
      code: 200,
      status: 'OK.',
      message: 'Success fetching ayah',
      data
    });
  }

}

module.exports = SurahHandler;
