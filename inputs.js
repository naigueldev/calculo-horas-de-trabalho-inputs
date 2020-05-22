const readline = require("readline");
const moment = require("moment");

const totalHoraDia = "8:00";

console.log(
  "--------------------------------------------------------------------------------------"
);
console.log(`Informe os horários das suas entradas e saídas para o trabalho no dia de hoje, 
para saber até que horas você deve trabalhar para concluir o total de ${totalHoraDia} horas.`);
console.log(
  "--------------------------------------------------------------------------------------"
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Que horas você começou a trabalhar no primeiro turno (formato HH:mm) ? ",
  function (manhaEntrouAs) {
    rl.question(
      "Que horas você finalizou o expediente do primeiro turno (formato HH:mm) ? ",
      function (manhaSaiuAs) {
        rl.question(
          "Que horas você começou o expediente do segundo turno (formato HH:mm) ? ",
          function (tardeEntrouAs) {
            rl.question(
              "Seu banco de horas está positivo (tecle = P) ou negativo (tecle = N) ? ",
              function (statusBancoDeHoras) {
                rl.question(
                  "Qual o tempo do seu banco de horas (formato HH:mm) ? ",
                  function (tempoBancoDeHoras) {
                    // let manhaEntrouAs = "09:11";
                    // let manhaSaiuAs = "12:15";
                    // let tardeEntrouAs = "13:15";
                    // let statusBancoDeHoras = "P";
                    // let tempoBancoDeHoras = "00:15";
                    let bancoDeHoras = moment(tempoBancoDeHoras, "HH:mm");

                    let end = moment(manhaSaiuAs, "HH:mm");
                    let startTime = moment(manhaEntrouAs, "HH:mm");

                    let iniciouTrabalho = startTime.format("HH:mm");
                    let intervaloAs = end.format("HH:mm");

                    printLog(`Iniciou a trabalhar às: ${iniciouTrabalho}`);
                    printLog(`Saiu para o intervalo às: ${intervaloAs}`);

                    let trabalhoManha = moment
                      .utc(end.diff(startTime))
                      .format("HH:mm");

                    printLog(`DE MANHÃ TRABALHOU O TOTAL DE: ${trabalhoManha}`);

                    let totalHoras = moment(totalHoraDia, "HH:mm");

                    let totalHorasFormatted = totalHoras.format("HH:mm");

                    let totalHorasBancoDeHoras = "";

                    if (statusBancoDeHoras == "P") {
                      totalHorasBancoDeHoras = totalHoras.diff(bancoDeHoras);
                    } else {
                      totalHorasBancoDeHoras = totalHoras.add(bancoDeHoras);
                    }
                    let totalHorasBancoDeHorasFormatted = moment
                      .utc(totalHorasBancoDeHoras)
                      .format("HH:mm");

                    printLog(
                      `Banco de horas é: ${bancoDeHoras.format(
                        "HH:mm"
                      )} ${statusBancoDeHoras}`
                    );

                    printLog(
                      `Hora total para hoje, com banco de horas: ${totalHorasBancoDeHorasFormatted}`
                    );

                    let tempoTrabalhoManha = moment(trabalhoManha, "HH:mm");

                    let totalHorasTarde = moment
                      .utc(totalHoras.diff(tempoTrabalhoManha))
                      .format("HH:mm");

                    printLog(
                      `Segunto turno tem que trabalhar: ${totalHorasTarde}`
                    );

                    let inicioTarde = moment(tardeEntrouAs, "HH:mm");

                    let inicioTardeFormat = inicioTarde.format("HH:mm");

                    let trabalharAte = inicioTarde.add(totalHorasTarde);

                    let trabalharAteFormatted = trabalharAte.format("HH:mm");

                    printLog(`Iniciou segundo turno às: ${inicioTardeFormat}`);

                    printLog(
                      `Tem que trabalhar até as ${trabalharAteFormatted} para fechar ${totalHoras.hour()} horas`
                    );

                    let bateuPontoFinalAs = moment("18:53", "HH:mm");

                    let bateuPontoFinalAsFormatted = bateuPontoFinalAs.format(
                      "HH:mm"
                    );

                    printLog(`Bateu ponto às ${bateuPontoFinalAsFormatted}`);

                    let bancoDeHorasDoDia = moment
                      .utc(bateuPontoFinalAs.diff(trabalharAte))
                      .format("HH:mm");

                    printLog(`Banco de horas do dia: ${bancoDeHorasDoDia}`);

                    function printLog(msg) {
                      console.log(
                        "----------------------------------------------------"
                      );
                      console.log(msg);
                    }
                    console.log(
                      "----------------------------------------------------"
                    );

                    rl.close();
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

rl.on("close", function () {
  console.log("\nOBRIGADO !!!");
  process.exit(0);
});
