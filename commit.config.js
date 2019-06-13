const inquirer = require('inquirer');
const fs = require('fs');

const prompt = inquirer.createPromptModule();
let str;
if (fs.existsSync('./.commitMessage')) {
  str = fs.readFileSync('./.commitMessage');
}
const question = [
  {
    type: 'list',
    name: 'type',
    message: '提交类型?',
    choices: [
      new inquirer.Separator(' = 提交类型 = '),
      {
        name: '「add」：新增某模块',
        value: '「add」',
      },
      {
        name: '「update」：更新某模块',
        value: '「update」',
      },
      {
        name: '「fix」：修复某个bug',
        value: '「fix」',
      },
      {
        name: '「remove」：删除某模块',
        value: '「remove」',
      },
      {
        name: '「hotfix」：热修复',
        value: '「hotfix」',
      },
      {
        name: '「init」：初始化',
        value: '「init」',
      },
    ],
  },
  {
    type: 'input',
    name: 'message',
    message: '请输入提交注释',
    default: str || '',
    validate: (value = '') => !!String(value),
  },
];
const emojiGithubEnum = {
  add: ':star:',
  update: ':sparkles:',
  fix: ':wrench:',
  remove: ':no_entry_sign:',
  hotfix: ':hammer:',
  init: ':new:',
};
const emojiGitlabEnum = {
  add: '⭐️',
  update: '✨',
  fix: '🔧',
  remove: '🚫',
  hotfix: '🔨',
  init: '🆕',
};
module.exports = {
  prompter(cz, commit) {
    prompt(question).then(answers => {
      const message =
        answers.type + emojiGitlabEnum[answers.type.match(/[0-9a-z]+/gi)[0]] + answers.message;
      fs.writeFile('./.commitMessage', answers.message, err => {
        console.log(err);
      });
      commit(message);
    });
  },
};
