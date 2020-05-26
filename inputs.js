const readline = require("readline");
const moment = require("moment");

const totalHoraDia = "8:00";
const timeFormat = "HH:mm";

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
                    rl.question(
                      "Que horário registrou o último ponto (formato HH:mm) ? ",
                      function (ultimoPontoAs) {
                        let bancoDeHoras = moment(
                          tempoBancoDeHoras,
                          timeFormat
                        );

                        let saidaPrimeiroTurno = moment(
                          manhaSaiuAs,
                          timeFormat
                        );
                        let inicioPrimeiroTurno = moment(
                          manhaEntrouAs,
                          timeFormat
                        );

                        let iniciouTrabalho = inicioPrimeiroTurno.format(
                          timeFormat
                        );
                        let intervaloAs = saidaPrimeiroTurno.format(timeFormat);

                        let trabalhoManha = moment
                          .utc(saidaPrimeiroTurno.diff(inicioPrimeiroTurno))
                          .format(timeFormat);

                        let totalHoras = moment(totalHoraDia, timeFormat);

                        let totalHorasBancoDeHoras = "";
                        if (statusBancoDeHoras.toUpperCase() == "P") {
                          totalHorasBancoDeHoras = totalHoras.diff(
                            bancoDeHoras
                          );
                        } else {
                          totalHorasBancoDeHoras = totalHoras.add(bancoDeHoras);
                        }

                        let totalHorasBancoDeHorasFormatted = moment
                          .utc(totalHorasBancoDeHoras)
                          .format(timeFormat);

                        let tempoTrabalhoManha = moment(
                          trabalhoManha,
                          timeFormat
                        );

                        let totalHorasBancoDeHorasMoment = moment(
                          totalHorasBancoDeHorasFormatted,
                          "HH:mm"
                        );

                        let totalHorasTarde = moment
                          .utc(
                            totalHorasBancoDeHorasMoment.diff(
                              tempoTrabalhoManha
                            )
                          )
                          .format(timeFormat);

                        let inicioTarde = moment(tardeEntrouAs, timeFormat);

                        let inicioTardeFormat = inicioTarde.format(timeFormat);

                        let trabalharAte = inicioTarde.add(totalHorasTarde);

                        let trabalharAteFormatted = trabalharAte.format(
                          "HH:mm"
                        );

                        let bateuPontoFinalAs = moment(
                          ultimoPontoAs,
                          timeFormat
                        );

                        let bateuPontoFinalAsFormatted = bateuPontoFinalAs.format(
                          "HH:mm"
                        );

                        let bancoDeHorasDoDia = moment
                          .utc(bateuPontoFinalAs.diff(trabalharAte))
                          .format(timeFormat);

                        printLog(`Iniciou a trabalhar às: ${iniciouTrabalho}`);

                        printLog(`Saiu para o intervalo às: ${intervaloAs}`);

                        printLog(
                          `DE MANHÃ TRABALHOU O TOTAL DE: ${trabalhoManha}`
                        );

                        printLog(
                          `Banco de horas é: ${bancoDeHoras.format(
                            "HH:mm"
                          )} ${statusBancoDeHoras}`
                        );

                        printLog(
                          `Hora total para hoje, com banco de horas: ${totalHorasBancoDeHorasFormatted}`
                        );

                        printLog(
                          `Segunto turno tem que trabalhar: ${totalHorasTarde}`
                        );

                        printLog(
                          `Iniciou segundo turno às: ${inicioTardeFormat}`
                        );

                        printLog(
                          `Tem que trabalhar até as ${trabalharAteFormatted} para fechar ${totalHoras.hour()} horas`
                        );

                        printLog(
                          `Bateu ponto às ${bateuPontoFinalAsFormatted}`
                        );

                        printLog(`Banco de horas do dia: ${bancoDeHorasDoDia}`);

                        printLine();

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
  }
);

function printLog(msg) {
  printLine();
  console.log(msg);
}

function printLine() {
  console.log("----------------------------------------------------");
}

rl.on("close", function () {
  console.log("\nOBRIGADO !!!");
  process.exit(0);
});
