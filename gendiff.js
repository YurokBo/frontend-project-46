import { program } from "commander";

const gendiff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program.command('gendiff')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information')

  program.parse();
}

export default gendiff;
