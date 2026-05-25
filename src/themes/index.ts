/**
 * jemma-progressbar · 主题色板
 * ----------------------------
 * 5 套主题：紫色（佳蔓默认） + 4 套大众色
 * 改 theme prop 就能换全套配色，组件内部不再硬编码颜色
 */

export type Theme = {
  name: string;
  displayName: string;  // 中文名（方便文档/UI 选择）
  bg: string;           // 整体背景渐变
  panel: string;        // 卡片半透明背景
  title: string;        // 标题文字色
  text: string;         // 主文字色
  subtle: string;       // 副文字色（半透明）
  track: string;        // 进度轨道底色
  fillStart: string;    // 填充渐变起色
  fillEnd: string;      // 填充渐变止色
  accent: string;       // 强调色（光晕/点缀）
};

export const themes = {
  'jemma-purple': {
    name: 'jemma-purple',
    displayName: '佳蔓紫（品牌默认）',
    bg: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
    panel: 'rgba(91, 33, 182, 0.08)',
    title: '#3B0764',
    text: '#2E1065',
    subtle: 'rgba(91, 33, 182, 0.65)',
    track: 'rgba(91, 33, 182, 0.15)',
    fillStart: '#7C3AED',
    fillEnd: '#5B21B6',
    accent: '#8B5CF6',
  },
  'ocean-blue': {
    name: 'ocean-blue',
    displayName: '深海蓝（商务/科技）',
    bg: 'linear-gradient(135deg, #0F172A, #1E3A8A)',
    panel: 'rgba(255, 255, 255, 0.06)',
    title: '#FFFFFF',
    text: '#F1F5F9',
    subtle: 'rgba(241, 245, 249, 0.75)',
    track: 'rgba(255, 255, 255, 0.12)',
    fillStart: '#3B82F6',
    fillEnd: '#0EA5E9',
    accent: '#60A5FA',
  },
  'forest-green': {
    name: 'forest-green',
    displayName: '森林绿（自然/教育）',
    bg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    panel: 'rgba(6, 95, 70, 0.08)',
    title: '#064E3B',
    text: '#065F46',
    subtle: 'rgba(6, 78, 59, 0.65)',
    track: 'rgba(6, 95, 70, 0.15)',
    fillStart: '#10B981',
    fillEnd: '#059669',
    accent: '#34D399',
  },
  'sunset-orange': {
    name: 'sunset-orange',
    displayName: '落日橙（活泼/美食）',
    bg: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
    panel: 'rgba(154, 52, 18, 0.08)',
    title: '#7C2D12',
    text: '#9A3412',
    subtle: 'rgba(154, 52, 18, 0.65)',
    track: 'rgba(154, 52, 18, 0.15)',
    fillStart: '#F97316',
    fillEnd: '#EA580C',
    accent: '#FB923C',
  },
  'mono-black': {
    name: 'mono-black',
    displayName: '极简黑（商务/严肃）',
    bg: 'linear-gradient(135deg, #0A0A0A, #1A1A1A)',
    panel: 'rgba(255, 255, 255, 0.04)',
    title: '#FFFFFF',
    text: '#E5E5E5',
    subtle: 'rgba(229, 229, 229, 0.7)',
    track: 'rgba(255, 255, 255, 0.1)',
    fillStart: '#FFFFFF',
    fillEnd: '#A3A3A3',
    accent: '#FFFFFF',
  },
} as const;

export type ThemeName = keyof typeof themes;
export const DEFAULT_THEME: ThemeName = 'jemma-purple';

export const getTheme = (name: ThemeName = DEFAULT_THEME): Theme => themes[name];
