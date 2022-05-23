export const rectCoordToGeo = (X_SK42, Y_SK42) => {
  const n = Math.trunc(Y_SK42 * Math.pow(10, -6)); // номер шестиградусної зони  в проєкції Гаусса-Крюгера
  const beta = X_SK42 / 6367558.4968; // допоміжна величина
  const B0 =
    beta +
    Math.sin(
      2 *
        beta *
        (0.00252588685 -
          0.0000149186 * Math.pow(Math.sin(beta), 2) +
          0.00000011904 * Math.pow(Math.sin(beta), 4))
    ); //  геодезична широта точки, абсцисса якої дорівнює абсциссі х точки, що визначається, а ордината дорівнює нулю, рад
  const Z0 =
    ((Y_SK42 - (10 * n + 5) * Math.pow(10, 5)) / 6378245) * Math.cos(B0); // допоміжна величина
  const dB =
    -Math.pow(Z0, 2) *
    Math.sin(2 * B0) *
    (0.251684631 -
      0.003369263 * Math.pow(Math.sin(B0), 2) +
      0.00001127 * Math.pow(Math.sin(B0), 4) -
      Math.pow(Z0, 2) *
        (0.10500614 -
          0.04559916 * Math.pow(Math.sin(B0), 2) +
          0.00228901 * Math.pow(Math.sin(B0), 4) -
          0.00002987 * Math.pow(Math.sin(B0), 6) -
          Math.pow(Z0, 2) *
            (0.042858 -
              0.025318 * Math.pow(Math.sin(B0), 2) +
              0.014346 * Math.pow(Math.sin(B0), 4) -
              0.001264 * Math.pow(Math.sin(B0), 6) -
              Math.pow(Z0, 2) *
                (0.01672 -
                  0.0063 * Math.pow(Math.sin(B0), 2) +
                  0.01188 * Math.pow(Math.sin(B0), 4) -
                  0.00328 * Math.pow(Math.sin(B0), 6)))));
  const l = Z0;
};
