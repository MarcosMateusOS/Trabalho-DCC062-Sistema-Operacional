const clockPageChange = (buffer, pointer, page) => {
  while (true) {
    if (buffer[pointer][0] === -1 || buffer[pointer][0] === 0) {
      buffer[pointer] = [1, page];
      pointer = (pointer + 1) % buffer.length;
      break;
    }
    if (buffer[pointer][0] === 1) {
      buffer[pointer][0] = 0;
      pointer = (pointer + 1) % buffer.length;
    }
  }
};

const randomIndexes = (min, max, n) => {
  const indexes = [];

  while (indexes.length < n) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const newIndex = Math.floor(Math.random() * (max - min) + min);

    if (!indexes.includes(newIndex)) {
      indexes.push(newIndex);
    }
  }

  return indexes;
};

const setAccessedPages = (buffer, indexes) => {
  for (const index of indexes) {
    buffer[index] = [1, "process"];
  }
};

const printHitsAndFaults = (reference_string, bufferPages) => {
  let pointer = 0;
  let pageFaultCount = 0;

  let visitedPages = 0;

  // inicializa o buffer com todos os frames vazios
  const buffer = new Array(bufferPages).fill([-1, undefined]);

  // inicializa índices aleatórios para o estado inicial do buffer quando entrar no clock
  const indexes = randomIndexes(0, bufferPages, Math.floor(bufferPages / 2));
  console.log("indexes: ", indexes);

  // acessa as páginas nos índices gerados
  setAccessedPages(buffer, indexes);
  console.log("buffer: ", buffer);

  const pagesRequested = reference_string.split(" ");

  //   pagesRequested.forEach((page) => {
  //     const pageFounded = buffer.find((bufferPage) => bufferPage[1] === page);
  //     if (!pageFounded) {
  //       pageFaultCount++;
  //       clockPageChange(buffer, pointer, page);
  //     }
  //   });

  //   console.log("Total page faults were " + pageFaultCount);
};

const reference_string = "1 2 2";
const bufferPages = 7;
printHitsAndFaults(reference_string, bufferPages);

// printHitsAndFaults(reference_string, 8);
// printHitsAndFaults(reference_string, 5);
// printHitsAndFaults(reference_string, 4);