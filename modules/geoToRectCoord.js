export const geoToRectCoord = (lng, lat, height = 200) => {
  // Latitude is the Y axis, longitude is the X axis
  const Bd = lng; // X axis
  const Ld = lat; // Y axis
  const H = height;

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

  //public const double PI;
  const ro = (360 * 60 * 60) / (2 * Math.PI); // кількість кутових секунд в радіані
  const B = (Bd * Math.PI) / 180; // рад
  const L = (Ld * Math.PI) / 180;
  const M = (a * (1 - e2)) / Math.pow(1 - e2 * Math.pow(Math.sin(B), 2), 1.5);
  const N = a / Math.pow(1 - e2 * Math.pow(Math.sin(B), 2), 0.5);
  const dB =
    (ro / (M + H)) *
      ((N / a) * e2 * Math.sin(B) * Math.cos(B) * da +
        ((N * N) / (a * a) + 1) * N * Math.sin(B) * Math.cos(B) * (de2 / 2) -
        (dx * Math.cos(L) + dy * Math.sin(L)) * Math.sin(B) +
        dz * Math.cos(B)) -
    wx * Math.sin(L) * (1 + e2 * Math.cos(2 * B)) +
    wy * Math.cos(L) * (1 + e2 * Math.cos(2 * B)) -
    ro * ms * e2 * Math.sin(B) * Math.cos(B); // секунди
  const dL =
    (ro / ((N + H) * Math.cos(B))) * (-dx * Math.sin(L) + dy * Math.cos(L)) +
    Math.tan(B) * (1 - e2) * (wx * Math.cos(L) + wy * Math.sin(L)) -
    wz;
  const dH =
    (-a / N) * da +
    N * Math.pow(Math.sin(B), 2) * (de2 / 2) +
    (dx * Math.cos(L) + dy * Math.sin(L)) * Math.cos(B) +
    dz * Math.sin(B) -
    N *
      e2 *
      Math.sin(B) *
      Math.cos(B) *
      ((wx / ro) * Math.sin(L) - (wy / ro) * Math.cos(L)) +
    ((a * a) / N + H) * ms;

  const WGS84_SK42_Lat = B - dB / ro; // rad
  const x = WGS84_SK42_Lat * (360 / (2 * Math.PI));

  const WGS84_SK42_Long = L - dL / ro;
  const y = WGS84_SK42_Long * (360 / (2 * Math.PI));

  const WGS84Alt = H + dH; // for returning

  const dLat = x;
  const dLon = y;
  const zone = Math.trunc((6 + dLon) / 6);
  const a11 = 6378245;
  const b = 6356863.019;
  const e21 = (Math.pow(a11, 2) - Math.pow(b, 2)) / Math.pow(a11, 2);
  const n = (a11 - b) / (a11 + b);
  const F = 1;
  const Lat0 = 0;
  const Lon0 = ((zone * 6 - 3) * Math.PI) / 180;
  const N0 = 0;
  const E0 = zone * 1000000 + 500000;
  const Lat = (dLat * Math.PI) / 180;
  const Lon = (dLon * Math.PI) / 180;
  const v = a11 * F * Math.pow(1 - e21 * Math.pow(Math.sin(Lat), 2), -0.5);
  const p =
    a11 * F * (1 - e21) * Math.pow(1 - e21 * Math.pow(Math.sin(Lat), 2), -1.5);
  const n2 = v / p - 1;
  const M1 =
    (1 + n + (5 / 4) * Math.pow(n, 2) + (5 / 4) * Math.pow(n, 3)) *
    (Lat - Lat0);
  const M2 =
    (3 * n + 3 * Math.pow(n, 2) + (21 / 8) * Math.pow(n, 3)) *
    Math.sin(Lat - Lat0) *
    Math.cos(Lat + Lat0);
  const M3 =
    ((15 / 8) * Math.pow(n, 2) + (15 / 8) * Math.pow(n, 3)) *
    Math.sin(2 * (Lat - Lat0)) *
    Math.cos(2 * (Lat + Lat0));
  const M4 =
    (35 / 24) *
    Math.pow(n, 3) *
    Math.sin(3 * (Lat - Lat0)) *
    Math.cos(3 * (Lat + Lat0));
  const MM = b * F * (M1 - M2 + M3 - M4);
  const I = MM + N0;
  const II = (v / 2) * Math.sin(Lat) * Math.cos(Lat);
  const III =
    (v / 24) *
    Math.sin(Lat) *
    Math.pow(Math.cos(Lat), 3) *
    (5 - Math.pow(Math.tan(Lat), 2) + 9 * n2);
  const IIIA =
    (v / 720) *
    Math.sin(Lat) *
    Math.pow(Math.cos(Lat), 5) *
    (61 - 58 * Math.pow(Math.tan(Lat), 2) + Math.pow(Math.tan(Lat), 4));
  const IV = v * Math.cos(Lat);
  const V =
    (v / 6) * Math.pow(Math.cos(Lat), 3) * (v / p - Math.pow(Math.tan(Lat), 2));
  const VI =
    (v / 120) *
    Math.pow(Math.cos(Lat), 5) *
    (5 -
      18 * Math.pow(Math.tan(Lat), 2) +
      Math.pow(Math.tan(Lat), 4) +
      14 * n2 -
      58 * Math.pow(Math.tan(Lat), 2) * n2);

  const N1 =
    I +
    II * Math.pow(Lon - Lon0, 2) +
    III * Math.pow(Lon - Lon0, 4) +
    IIIA * Math.pow(Lon - Lon0, 6); // for returning
  const E =
    E0 +
    IV * (Lon - Lon0) +
    V * Math.pow(Lon - Lon0, 3) +
    VI * Math.pow(Lon - Lon0, 5) -
    6; // for returning

  return { N1, E, WGS84Alt };
};
