## SCRIPT TOSCO PARA CALCULAR HORAS DE TRABALHO

![](gifs/calc-horas-trabalho-GIF.gif)

## Dependências

[NodeJS](https://nodejs.org/en/download/)

## Rodando o script

Rode no console o seguinte comando e vá respondendo as perguntas.

```
npm install
```

```
node inputs.js
```

Perguntas e exemplo de respostas:

```
Que horas você começou a trabalhar no primeiro turno (formato HH:mm) ? 08:54

Que horas você finalizou o expediente do primeiro turno (formato HH:mm) ? 12:09

Que horas você começou o expediente do segundo turno (formato HH:mm) ? 13:17

Seu banco de horas está positivo (tecle = P) ou negativo (tecle = N) ? P

Qual o tempo do seu banco de horas (formato HH:mm) ? 00:57

Que horário registrou o último ponto (formato HH:mm) ? 18:06
```

Resultado no console:

```
----------------------------------------------------
Iniciou a trabalhar às: 08:54
----------------------------------------------------
Saiu para o intervalo às: 12:09
----------------------------------------------------
DE MANHÃ TRABALHOU O TOTAL DE: 03:15
----------------------------------------------------
Banco de horas é: 00:57 P
----------------------------------------------------
Hora total para hoje, com banco de horas: 07:03
----------------------------------------------------
Segunto turno tem que trabalhar: 03:48
----------------------------------------------------
Iniciou segundo turno às: 13:17
----------------------------------------------------
Tem que trabalhar até as 17:05 para fechar 8 horas
----------------------------------------------------
Bateu ponto às 18:06
----------------------------------------------------
Banco de horas do dia: 01:01
----------------------------------------------------

OBRIGADO !!!
```
