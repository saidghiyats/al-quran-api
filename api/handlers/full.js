const data2 = require('../../data/quran.json');

class fullHandler {
   static getFull(req, res) {
      const datas = data2.data;

      // Create new object with "text" attribute containing "arab", "transliteration", and "translation"
      const newText = {
         text: {
            arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            transliteration: {
               en: 'Bismillaahir Rahmaanir Raheem',
               id: 'bismillaahir-rohmaanir-rohiim',
            },
         },
         translation: {
            en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
            id: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
         },
         audio: {
            primary: 'https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/1',
            secondary: [
               'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
               'https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3',
            ],
         },
      };

      datas[1].preBismillah = {
         text: newText.text,
         translation: newText.translation,
         audio: newText.audio,
      };

      return res.status(200).send({
         code: 200,
         status: 'OK.',
         message: 'Success fetching surah.',
         data: data2,
      });
   }
}

module.exports = fullHandler;
