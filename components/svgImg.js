export const svgImgTxt = (unit, num, higher) => {
  switch (unit) {
    case "hostileAK_CP":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="118.66666666666666" height="146" viewBox="-18.666666666666664 -16 237.33333333333331 292"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><path d="M28,100 L28,272" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M52.5,18 l25,-25 m0,25 l-25,-25    M87.5,18 l25,-25 m0,25 l-25,-25    M122.5,18 l25,-25 m0,25 l-25,-25" ></path></g><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${num}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${higher}</text></svg>`;
      break;
    case "hostileBr":
      return `<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="118.66666666666666" height="146" viewBox="-18.666666666666664 -16 237.33333333333331 292"><path d="M 100,28 L172,100 100,172 28,100 100,28 Z" stroke-width="4" stroke="black" fill="rgb(255,128,128)" fill-opacity="1" ></path><path d="M60,70L140,130M60,130L140,70" stroke-width="4" stroke="black" fill="black" ></path><path d="M125,80 C150,80 150,120 125,120 L75,120 C50,120 50,80 75,80 Z" stroke-width="4" stroke="black" fill="none" ></path><path d="M28,100 L28,272" stroke-width="4" stroke="black" fill="none" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><path d="M52.5,18 l25,-25 m0,25 l-25,-25    M87.5,18 l25,-25 m0,25 l-25,-25    M122.5,18 l25,-25 m0,25 l-25,-25" ></path></g><text x="8" y="160" text-anchor="end" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${7}</text><text x="192" y="160" text-anchor="start" font-size="40" font-family="Arial" stroke-width="4" stroke="none" fill="black" >${8}</text></svg>`;
      break;
    default:
      return "undefined unit";
  }
};
