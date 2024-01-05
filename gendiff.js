import { Command } from "commander";
import { parseFile } from "./fileParse.js";

const program = new Command();

const gendiff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-h, --help', 'output usage information')
    .option('-f, --format', 'output format')
    .argument('filepath1')
    .argument('filepath2')
    .action((file1, file2) => {
      parseFile(file1)
      parseFile(file2)
    })
    // .outputHelp();

  program.parse();
};

export default gendiff;
