const circleItems = document.getElementsByClassName('circle-item');
const secondHand = document.querySelector('.hand');
const buffer = new Array(12).fill([-1, undefined]);
let pointer = 0;
let pageFaultCount = 0;

const clockPageChange = async (page) => {
    while (true) {
      if (buffer[pointer][0] === -1 || buffer[pointer][0] === 0) {
        buffer[pointer] = [1, page];
        circleItems[pointer].innerHTML = 1;
        pointer = (pointer + 1) % buffer.length;
        break;
      }
      if (buffer[pointer][0] === 1) {
        buffer[pointer][0] = 0;
        circleItems[pointer].innerHTML = 0;
        pointer = (pointer + 1) % buffer.length;
      }
    }
  };

  const printHitsAndFaults = async (reference_string) => {
    const pagesRequested = reference_string.split(" ");
  
    await pagesRequested.forEach(async (page) => {
      const pageFounded = buffer.find((bufferPage) => bufferPage[1] === page);
      if (!pageFounded) {
        console.log('FALTOU A PAGINA: ', page);
        pageFaultCount++;
        await clockPageChange(page);
      }
    });
  };