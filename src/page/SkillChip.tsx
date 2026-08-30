import { Chip } from '@mui/material';

export type SkillChipProps = {
  readonly label: string;
};

const SkillChip = ({ label }: SkillChipProps) => (
  <Chip
    label={label}
    size="small"
    sx={(t) => ({
      '& .MuiChip-label': {
        px: 1.5,
      },
      bgcolor:
        t.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.06)',
      border: `1px solid ${
        t.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)'
      }`,
      borderRadius: 1.5,
      boxShadow:
        t.palette.mode === 'dark'
          ? '0 1px 0 rgba(255, 255, 255, 0.04)'
          : '0 1px 0 rgba(0, 0, 0, 0.05)',
      color: 'text.secondary',
      transform: 'none',
      transition: 'none',
    })}
  />
);

export default SkillChip;
