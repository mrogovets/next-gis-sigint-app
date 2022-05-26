export const sk42ToWGS84 = (X_SK42, Y_SK42) => {
  const n = Math.trunc(Y_SK42 / 1000000); // номер шестиградусної зони  в проєкції Гаусса-Крюгера

  const C = 500000;
  const y = (Y_SK42 - 1000000 * n - C) / 1.0;
  const x = X_SK42 / 1.0;

  //Еліпсоїд Красовського
  const a = (6378245 + 6378137) / 2; //велика півісь
  const b = (6356863.019 + 6356752.3142) / 2; //мала півісь

  const e2 = (a * a - b * b) / (a * a);
  const e22 = (a * a - b * b) / (b * b);

  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));

  const A0 =
    1 +
    (3 / 4) * e2 +
    (45 / 64) * Math.pow(e2, 2) +
    (175 / 256) * Math.pow(e2, 3) +
    (11025 / 16384) * Math.pow(e2, 4);
  const A2 = (3 / 2) * e1 - (27 / 32) * Math.pow(e1, 3);
  const A4 = (21 / 16) * Math.pow(e1, 2) - (55 / 32) * Math.pow(e1, 4);
  const A6 = (151 / 96) * Math.pow(e1, 3);
  const A8 = (1097 / 512) * Math.pow(e1, 4);

  const beta = x / (A0 * a * (1 - e2));

  const Bx =
    beta +
    A2 * Math.sin(2 * beta) +
    A4 * Math.sin(4 * beta) +
    A6 * Math.sin(6 * beta) +
    A8 * Math.sin(8 * beta);

  const Nx = a / Math.sqrt(1 - e2 * Math.pow(Math.sin(Bx), 2));

  const G0 =
    (Math.pow(y, 2) * (1 + e22 * Math.pow(Math.cos(Bx), 2)) * Math.tan(Bx)) /
    Math.pow(Nx, 2);
  const G1 =
    5 +
    3 * Math.pow(Math.tan(Bx), 2) +
    e22 * Math.pow(Math.cos(Bx), 2) -
    9 * e22 * Math.pow(Math.cos(Bx), 2) * Math.pow(Math.tan(Bx), 2) -
    4 * Math.pow(e22, 2) * Math.pow(Math.cos(Bx), 4);
  const G2 =
    61 + 90 * Math.pow(Math.tan(Bx), 2) + 45 * Math.pow(Math.tan(Bx), 4);

  const Db =
    G0 *
    (0.5 -
      (Math.pow(y, 2) / (24 * Math.pow(Nx, 2))) * G1 +
      (Math.pow(y, 4) / (720 * Math.pow(Nx, 4))) * G2);

  const D0 = y / (Nx * Math.cos(Bx));
  const D1 =
    1 + 2 * Math.pow(Math.tan(Bx), 2) + e22 * Math.pow(Math.cos(Bx), 2);
  const D2 =
    5 +
    28 * Math.pow(Math.tan(Bx), 2) +
    24 * Math.pow(Math.tan(Bx), 4) +
    6 * e22 * Math.pow(Math.cos(Bx), 2) +
    8 * e22 * Math.pow(Math.cos(Bx), 2) * Math.pow(Math.tan(Bx), 2);

  const dl =
    D0 *
    (1 -
      (Math.pow(y, 2) / (6 * Math.pow(Nx, 2))) * D1 +
      (Math.pow(y, 4) / (120 * Math.pow(Nx, 4))) * D2);

  const L0 = ((n * 6 - 3) * Math.PI) / 180;

  const B = ((Bx - Db) * 180) / Math.PI;
  const L = ((L0 + dl) * 180) / Math.PI;

  return { B, L };
};
