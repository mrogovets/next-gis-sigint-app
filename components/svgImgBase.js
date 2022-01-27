export const getSvgImgSymbol = (unit, UniqDes = "", higherForm = "") => {
  switch (unit) {
    case "infantryMechanizedCoy":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="71.19999999999999" height="57.6" viewBox="-18.666666666666664 -16 237.33333333333331 192"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M100,18L100,-7" ></path></g><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${UniqDes}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higherForm}</text></svg>`;

    case "infantryMechanizedBtn":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="71.19999999999999" height="57.6" viewBox="-18.666666666666664 -16 237.33333333333331 192"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M90,18L90,-7" ></path><path d="M110,18L110,-7" ></path></g><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${UniqDes}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higherForm}</text></svg>`;

    case "infantryMechanizedRgmnt":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="71.19999999999999" height="57.6" viewBox="-18.666666666666664 -16 237.33333333333331 192"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M100,18L100,-7" ></path><path d="M120,18L120,-7" ></path><path d="M80,18L80,-7" ></path></g><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${UniqDes}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higherForm}</text></svg>`;

    default:
      return "undefined unit";
  }
};
