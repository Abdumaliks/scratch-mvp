import type { BlockDefinition, Costume } from '../types';

export const COSTUMES: Costume[] = [
  { id: 1, emoji: '🐱', name: 'Котик' },
  { id: 2, emoji: '🐶', name: 'Собачка' },
  { id: 3, emoji: '🐼', name: 'Панда' },
  { id: 4, emoji: '🦊', name: 'Лиса' },
  { id: 5, emoji: '🐸', name: 'Лягушка' },
  { id: 6, emoji: '🦁', name: 'Лев' },
  { id: 7, emoji: '🐯', name: 'Тигр' },
  { id: 8, emoji: '🐻', name: 'Медведь' },
  { id: 9, emoji: '🐰', name: 'Кролик' },
  { id: 10, emoji: '🦄', name: 'Единорог' },
  { id: 11, emoji: '🐉', name: 'Дракон' },
  { id: 12, emoji: '🦖', name: 'Динозавр' },
];

export const AVAILABLE_BLOCKS: BlockDefinition[] = [
  { type: 'events', action: 'Когда нажато', category: 'События' },
  { type: 'motion', action: 'Двигаться', category: 'Движение', hasValue: true, defaultValue: 10, unit: 'шагов' },
  { type: 'motion', action: 'Повернуть', category: 'Движение', hasValue: true, defaultValue: 15, unit: 'градусов' },
  { type: 'motion', action: 'В центр', category: 'Движение' },
  { type: 'looks', action: 'Сказать', category: 'Внешность', hasValue: true, defaultValue: 2, unit: 'сек' },
  { type: 'looks', action: 'Показаться', category: 'Внешность' },
  { type: 'looks', action: 'Спрятаться', category: 'Внешность' },
  { type: 'control', action: 'Ждать', category: 'Управление', hasValue: true, defaultValue: 1, unit: 'секунд' },
  { type: 'control', action: 'Повторить', category: 'Управление', hasValue: true, defaultValue: 10, unit: 'раз' },
];

export const INITIAL_SPRITE_STATE = {
  x: 200,
  y: 150,
  visible: true,
  size: 60,
  costume: '🐱',
  rotation: 0,
  message: ''
};
