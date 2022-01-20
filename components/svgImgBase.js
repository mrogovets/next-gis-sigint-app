export const getSvgImgSymbol = (
  unit,
  UniqDes = "",
  higherForm = "",
  modCP = "",
  dtg = "",
  location = "",
  typeCP = "",
  speed = "",
  reinforceReduce = "",
  stuffComments = "",
  textModequipment = "",
  combatEffect = ""
) => {
  switch (unit) {
    case "hostileArmourCoy":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="303.2" height="68.4" viewBox="-435.99999999999994 -16 1010.6666666666665 228"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M100,18L100,-7" ></path></g><text x="100" y="115" text-anchor="middle" font-size="42" font-family="Arial" font-weight="bold" stroke-width="4" stroke="none" fill="black" >${modCP}</text><text x="8" y="40" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${dtg}</text><text x="8" y="80" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${location}</text><text x="8" y="120" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${typeCP}</text><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${UniqDes}</text><text x="8" y="200" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${speed}</text><text x="192" y="40" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${reinforceReduce}</text><text x="192" y="80" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${stuffComments}</text><text x="192" y="120" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${textModequipment}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higherForm}</text><text x="192" y="200" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${combatEffect}</text></svg>`;
      break;
    case "hostileInfMechCoy":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="303.2" height="68.4" viewBox="-435.99999999999994 -16 1010.6666666666665 228"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M100,18L100,-7" ></path></g><text x="100" y="115" text-anchor="middle" font-size="42" font-family="Arial" font-weight="bold" stroke-width="4" stroke="none" fill="black" >${modCP}</text><text x="8" y="40" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${dtg}</text><text x="8" y="80" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${location}</text><text x="8" y="120" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${typeCP}</text><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${UniqDes}</text><text x="8" y="200" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${speed}</text><text x="192" y="40" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${reinforceReduce}</text><text x="192" y="80" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${stuffComments}</text><text x="192" y="120" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${textModequipment}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higherForm}</text><text x="192" y="200" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${combatEffect}</text></svg>`;
      break;
    default:
      return "undefined unit";
  }
};
