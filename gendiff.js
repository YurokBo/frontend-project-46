import { Command } from "commander";

const program = new Command();

const gendiff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('filepath1')
    .argument('filepath2')
    .option('-h, --help', 'output usage information')
    .option('-f, --format', 'output format')
    .outputHelp()

  // if (program.help) {
  //   program.outputHelp();
  // }
}

export default gendiff;
