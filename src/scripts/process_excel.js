if (typeof require !== "undefined") XLSX = require("xlsx");

const processFile = (fileName) => {
  const parametros = [
    { cuota: "pago anual 579", comision: 7 },
    { cuota: "pago anual 395", comision: 4 },
    { cuota: "pago anual 299", comision: 3 },
    { cuota: "alta 299", comision: 4 },
    { cuota: "alta 199", comision: 3 },
    { cuota: "alta 99", comision: 1 },
    { cuota: "alta 50", comision: 1 },
    { cuota: "alta gratis", comision: 1 },
    { cuota: "ltu", comision: 10 },
  ];

  const parametrosLina = [
    { cuota: "pago anual 579", comision: 2.5 },
    { cuota: "pago anual 395", comision: 2.5 },
    { cuota: "pago anual 299", comision: 1.5 },
    { cuota: "alta 299", comision: 1.5 },
    { cuota: "alta 199", comision: 1 },
    { cuota: "alta 99", comision: 0.5 },
    { cuota: "alta 50", comision: 0.5 },
    { cuota: "alta gratis", comision: 0.5 },
    { cuota: "ltu", comision: 4 },
  ];

  let workbook = XLSX.readFile(fileName);

  let sheet = workbook.SheetNames[0];

  let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  let requiredExcelData = sheetData.map((item) => {
    let obj = {
      operador:
        item.Teleoperador !== undefined
          ? item.Teleoperador.toLowerCase().trim()
          : "indeterminado",
      tarifa:
        item["Tarifa que contrata"] !== undefined
          ? item["Tarifa que contrata"].toLowerCase().trim()
          : "indeterminado",
      cuota:
        item["Cuota de Alta"] !== undefined
          ? item["Cuota de Alta"].toLowerCase().trim()
          : "indeterminado",
    };

    return obj;
  });

  let operators = requiredExcelData.map((item) => {
    let operador = item.operador;
    if (operador !== undefined) {
      return operador.toLowerCase().trim();
    }
  });

  let tarifas = requiredExcelData.map((item) => {
    let tarifaName = item.tarifa;
    if (tarifaName !== undefined) {
      return tarifaName.toLowerCase().trim();
    }
  });

  let uniqueOperators = [...new Set(operators)];

  let uniqueTarifas = [...new Set(tarifas)];

  let uniqueOperatorsArray = uniqueOperators.map((item) => {
    let obj = {
      operador: item,
      comision: 0,
    };
    uniqueTarifas.forEach((elem) => {
      return (obj[elem] = 0);
    });
    return obj;
  });

  for (let i = 0; i < uniqueOperatorsArray.length; i++) {
    let datai = uniqueOperatorsArray[i];
    let operatorName = datai.operador;

    for (let j = 0; j < requiredExcelData.length; j++) {
      let dataj = requiredExcelData[j];

      if (operatorName === dataj.operador && dataj.operador !== undefined) {
        if (dataj.cuota.indexOf(parametros[0].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[0].comision
              : parametrosLina[0].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[1].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[1].comision
              : parametrosLina[1].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[2].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[2].comision
              : parametrosLina[2].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[3].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[3].comision
              : parametrosLina[3].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[4].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[4].comision
              : parametrosLina[4].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[5].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[5].comision
              : parametrosLina[5].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[6].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[6].comision
              : parametrosLina[6].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[7].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[7].comision
              : parametrosLina[7].comision;
          datai[dataj.tarifa] += 1;
        }

        if (dataj.cuota.indexOf(parametros[8].cuota) !== -1) {
          datai.comision +=
            operatorName !== "lina"
              ? parametros[8].comision
              : parametrosLina[8].comision;
          datai[dataj.tarifa] += 1;
        }
      }
    }
  }

  //console.log(uniqueOperatorsArray);

  return uniqueOperatorsArray;
};

module.exports = processFile;
