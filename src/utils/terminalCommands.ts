type Command = {
  aliases?: string[];
  description: string;
  execute: (args: string[], context?: CommandContext) => string[];
  name: string;
  usage?: string;
};

type CommandContext = {
  navigateToHome?: () => void;
};

const commands: Command[] = [
  {
    description: 'Display information about Stefan',
    execute: () => [
      'Stefan Milev',
      '',
      '📍 Location:     Skopje, North Macedonia',
      '💼 Role:         Software Engineer @ CodeChem',
      "🎓 Education:    CS Master's @ FCSE",
      '🚀 Founder:      finki-hub',
      '📧 Email:        milev.stefan@gmail.com',
      '🎮 Discord:      delemangi',
      '',
    ],
    name: 'whoami',
  },
  {
    aliases: ['projects', 'repos'],
    description: 'List all projects',
    execute: () => [
      '📁 Projects:',
      '',
      '1. finki-hub/',
      '   └─ Collection of FCSE data tools: scrapers, bots, web apps',
      '   └─ Tech: React, Node.js, PostgreSQL, Docker, LangChain',
      '   └─ https://github.com/finki-hub',
      '',
      '2. eslint-config-imperium/',
      '   └─ Strict & modular ESLint config with presets',
      '   └─ Tech: ESLint, TypeScript, Node.js',
      '   └─ https://github.com/Delemangi/eslint-config-imperium',
      '',
      '3. homepage/',
      '   └─ Personal site (you are here!)',
      '   └─ Tech: React, TypeScript, Vite, Material UI',
      '   └─ https://github.com/Delemangi/homepage',
      '',
      '4. asf-discord-bot/',
      '   └─ Discord bot for managing Steam accounts',
      '   └─ https://github.com/Delemangi/asf-discord-bot',
      '',
    ],
    name: 'ls',
  },
  {
    description: 'Display contact information',
    execute: () => [
      '📬 Contact Information:',
      '',
      '📧 Email:     milev.stefan@gmail.com',
      '🎮 Discord:   delemangi',
      '🐙 GitHub:    https://github.com/Delemangi',
      '💼 LinkedIn:  https://www.linkedin.com/in/stefan-milev',
      '📷 Instagram: https://www.instagram.com/stefan_milev_',
      '🎮 Steam:     https://steamcommunity.com/id/delemangi',
      '',
      'Tip: Use "email" or "discord" to copy contact info!',
      '',
    ],
    name: 'contact',
  },
  {
    description: 'Copy email to clipboard',
    execute: () => {
      void navigator.clipboard.writeText('milev.stefan@gmail.com');
      return ['✓ Email copied to clipboard: milev.stefan@gmail.com', ''];
    },
    name: 'email',
  },
  {
    description: 'Copy Discord username to clipboard',
    execute: () => {
      void navigator.clipboard.writeText('delemangi');
      return ['✓ Discord username copied to clipboard: delemangi', ''];
    },
    name: 'discord',
  },
  {
    aliases: ['github', 'code'],
    description: 'Open GitHub profile',
    execute: () => {
      window.open('https://github.com/Delemangi', '_blank');
      return ['🐙 Opening GitHub profile...', ''];
    },
    name: 'gh',
  },
  {
    aliases: ['exit', 'normal', 'gui'],
    description: 'Return to normal mode',
    execute: (_args, context) => {
      context?.navigateToHome?.();
      return ['👋 Returning to normal mode...', ''];
    },
    name: 'quit',
  },
  {
    description: 'Display available commands',
    execute: () => {
      const output = ['📋 Available Commands:', ''];

      for (const cmd of commands) {
        const aliases = cmd.aliases ? ` (${cmd.aliases.join(', ')})` : '';
        output.push(
          `  ${cmd.name}${aliases}`,
          `    └─ ${cmd.description}`,
          ...(cmd.usage ? [`    └─ Usage: ${cmd.usage}`] : []),
        );
      }

      output.push(
        '',
        '💡 Tips:',
        '  • Use Tab for autocomplete',
        '  • Use ↑/↓ arrows for command history',
        '  • Type "clear" to clear the screen',
        '  • Press Ctrl+` to toggle terminal mode',
        '',
      );

      return output;
    },
    name: 'help',
  },
];

export const executeCommand = (
  input: string,
  context?: CommandContext,
): string[] => {
  const [cmdName, ...args] = input.trim().split(/\s+/u);
  const cmd = commands.find(
    (c) => c.name === cmdName || c.aliases?.includes(cmdName),
  );

  if (!cmd) {
    return [
      `Error: Command not found: ${cmdName}`,
      'Type "help" for available commands.',
      '',
    ];
  }

  return cmd.execute(args, context);
};

export const getCommandSuggestions = (input: string): string[] => {
  const inputLower = input.toLowerCase();
  return commands
    .filter(
      (cmd) =>
        cmd.name.startsWith(inputLower) ||
        cmd.aliases?.some((alias) => alias.startsWith(inputLower)),
    )
    .map((cmd) => cmd.name);
};
