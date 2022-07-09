export const rectCoordToGeo = (X_SK42, Y_SK42) => {
  const n = Math.trunc(Y_SK42 * Math.pow(10, -6)); // номер шестиградусної зони  в проєкції Гаусса-Крюгера

  // const beta = X_SK42 / 6367558.4968; // допоміжна величина на еліпсоїді Красовського
  const beta = X_SK42 / 6378245; // допоміжна величина на еліпсоїді WGS-84
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
    (Y_SK42 - (10 * n + 5) * Math.pow(10, 5)) / (6378245 * Math.cos(B0)); // допоміжна величина
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
  const l =
    Z0 *
    (1 -
      0.0033467108 * Math.pow(Math.sin(B0), 2) -
      0.0000056002 * Math.pow(Math.sin(B0), 4) -
      0.0000000187 * Math.pow(Math.sin(B0), 6) -
      Math.pow(Z0, 2) *
        (0.16778975 +
          0.16273586 * Math.pow(Math.sin(B0), 2) -
          0.0005249 * Math.pow(Math.sin(B0), 4) -
          0.00000846 * Math.pow(Math.sin(B0), 6) -
          Math.pow(Z0, 2) *
            (0.0420025 +
              0.1487407 * Math.pow(Math.sin(B0), 2) +
              0.005942 * Math.pow(Math.sin(B0), 4) -
              0.000015 * Math.pow(Math.sin(B0), 6) -
              Math.pow(Z0, 2) *
                (0.01225 +
                  0.09477 * Math.pow(Math.sin(B0), 2) +
                  0.03282 * Math.pow(Math.sin(B0), 4) -
                  0.00034 * Math.pow(Math.sin(B0), 6) -
                  Math.pow(Z0, 2) *
                    (0.0038 +
                      0.0524 * Math.pow(Math.sin(B0), 2) +
                      0.0482 * Math.pow(Math.sin(B0), 4) -
                      0.0032 * Math.pow(Math.sin(B0), 6))))));

  const B_Krasovsky = B0 + dB;
  const L_Krasovsky = (6 * (n - 0.5)) / (57.29577951 + l);
  const H = 200;
  //--------------Convert from Krasovsky -> WGS-84---------
  // Latitude is the Y axis, longitude is the X axis
  const Bd = B_Krasovsky; // X axis
  const Ld = L_Krasovsky; // Y axis

  //Еліпсоїд Красовського
  const aP = 6378245; //велика півісь
  const bP = 6356863.019; //мала півісь

  const e2P = (aP * aP - bP * bP) / (aP * aP);
  //Еліпсоїд WGS84
  const aW = 6378137; //Велика півісь
  const bW = 6356752.3142; //мала півісь
  const e2W = (Math.pow(aW, 2) - Math.pow(bW, 2)) / Math.pow(aW, 2);
  const da = aW - aP;
  const de2 = e2W - e2P;
  const a = (aP + aW) / 2;
  const e2 = (e2P + e2W) / 2;
  // поправки
  const dx = 25;
  const dy = -128; // !!!
  const dz = -80;

  const wx = 0;
  const wy = 0;
  const wz = 0;
  const ms = 0;

  const ro = (360 * 60 * 60) / (2 * Math.PI); // кількість кутових секунд в радіані
  const B = Bd; // рад
  const L = Ld;
  const M = a * (1 - e2) * Math.pow(1 - e2 * Math.pow(Math.sin(B), 2), -1.5);
  const N = a * Math.pow(1 - e2 * Math.pow(Math.sin(B), 2), -0.5);
  const deltaB =
    (ro / (M + H)) *
      ((N / a) * e2 * Math.sin(B) * Math.cos(B) * da +
        ((Math.pow(N, 2) / Math.pow(a, 2) + 1) *
          N *
          Math.sin(B) *
          Math.cos(B) *
          de2) /
          2 -
        (dx * Math.cos(L) + dy * Math.sin(L)) * Math.sin(B) +
        dz * Math.cos(B)) -
    wx * Math.sin(L) * (1 + e2 * Math.cos(2 * B)) +
    wy * Math.cos(L) * (1 + e2 * Math.cos(2 * B)) -
    ro * ms * e2 * Math.sin(B) * Math.cos(B); // кутові секунди
  const deltaL =
    (ro / ((N + H) * Math.cos(B))) * (-dx * Math.sin(L) + dy * Math.cos(L)) +
    Math.tan(B) * (1 - e2) * (wx * Math.cos(L) + wy * Math.sin(L)) -
    wz; // кутові секунди
  //--------------\Convert from Krasovsky -> WGS-84---------
  const B_wgs84_deg = (((B_Krasovsky + deltaB) / 3600) * 180) / Math.PI; // lng rad -> deg
  const L_wgs84_deg = (((L_Krasovsky + deltaL) / 3600) * 180) / Math.PI; // lat rad -> deg

  return { B_wgs84_deg, L_wgs84_deg };
};
