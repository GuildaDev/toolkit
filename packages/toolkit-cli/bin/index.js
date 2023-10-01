const { Command } = require('commander');
const { MultiSelect } = require('enquirer');

const program = new Command();


function showHelpers() {
  const prompt = new MultiSelect({
    name: 'value',
    message: 'Select the helper you want to use:',
    limit: 7,
    choices: [
      { name: 'remove-falsy-keys', value: '#00ffff' },
      { name: 'remove-nil-keys', value: '#000000' },
      { name: 'get-initials', value: '#0000ff' },
    ]
  });

  prompt.run()
    .then(answer => console.log('Answer:', answer))
    .catch(console.error);
}
function bootstrap() {
  program.command('generate <kind>')
  .description('Split a string into substrings and display as an array')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    const params = str.split(options.separator, limit)
    if(params.includes('helper')) {
      showHelpers()
    }

  });

  program.parse();

}


bootstrap();
