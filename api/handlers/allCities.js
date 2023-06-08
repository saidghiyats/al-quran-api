const data = require('../../data/sally.json');
const data2 = require('../../data/semua.json');

class AllCityHandler {
   static getAllCities(req, res) {
      const mergedData = data.map(item => {
         const matchingData2 = data2.find(d => d.lokasi === item.city);
         if (matchingData2) {
            return { id: matchingData2.id, ...item };
         } else {
            return item;
         }
      });

      return res.status(200).send({
         code: 200,
         status: 'OK.',
         message: 'Success fetching all cities.',
         data: mergedData,
      });
   }
}

module.exports = AllCityHandler;
