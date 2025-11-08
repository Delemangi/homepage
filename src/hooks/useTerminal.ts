import { useRouter } from '@tanstack/react-router';
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  executeCommand,
  getCommandSuggestions,
} from '../utils/terminalCommands';

type CommandHistory = {
  command: string;
  id: string;
  output: Array<{ id: string; text: string }>;
};

const getWelcomeMessage = (): string[] => [
  'DELEMANGI - TERMINAL v1.0',
  '',
  '💡 Type "help" for available commands',
  '⌨️ Press Ctrl+` to toggle terminal mode',
  '',
];

export const useTerminal = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '',
      id: 'welcome',
      output: getWelcomeMessage().map((text, i) => ({
        id: `welcome-${i}`,
        text,
      })),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (terminalRef.current && shouldAutoScrollRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const navigateToHome = () => {
    void router.navigate({ to: '/' });
  };

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim();

      if (trimmedCmd === '') {
        setHistory((prev) => [
          ...prev,
          { command: '', id: `empty-${Date.now()}`, output: [] },
        ]);
        scrollToBottom();
        return;
      }

      if (trimmedCmd === 'clear') {
        setHistory([]);
        return;
      }

      const output = executeCommand(trimmedCmd, {
        navigateToHome,
      });
      const timestamp = Date.now();
      setHistory((prev) => [
        ...prev,
        {
          command: trimmedCmd,
          id: `cmd-${timestamp}`,
          output: output.map((text, i) => ({ id: `${timestamp}-${i}`, text })),
        },
      ]);
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
      scrollToBottom();
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (historyIndex !== -1) {
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
              setHistoryIndex(-1);
              setInput('');
            } else {
              setHistoryIndex(newIndex);
              setInput(commandHistory[newIndex]);
            }
          }

          break;

        case 'ArrowUp':
          e.preventDefault();
          if (commandHistory.length > 0) {
            const newIndex =
              historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }

          break;

        case 'Enter':
          e.preventDefault();
          handleCommand(input);
          setInput('');
          setSuggestion('');

          break;

        case 'Tab':
          e.preventDefault();
          if (suggestion) {
            setInput(suggestion);
            setSuggestion('');
          }

          break;

        default:
          break;
      }
    },
    [input, suggestion, commandHistory, historyIndex, handleCommand],
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const suggestions = getCommandSuggestions(value.trim());
      setSuggestion(suggestions[0] || '');
    } else {
      setSuggestion('');
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (terminalRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = terminalRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      shouldAutoScrollRef.current = isNearBottom;
    }
  }, []);

  return {
    handleInputChange,
    handleKeyDown,
    handleScroll,
    history,
    input,
    inputRef,
    suggestion,
    terminalRef,
  };
};
