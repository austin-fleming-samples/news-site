import { MouseEventHandler } from 'react';

export const WidgetCover = ({
  label,
  clickAction,
  showCover,
}: {
  clickAction: MouseEventHandler;
  label: string;
  showCover: boolean;
}) =>
  showCover ? (
    <button
      className='absolute block w-full h-full z-10 font-primary font-bold text-lg'
      type='button'
      onClick={clickAction}>
      {label}
    </button>
  ) : null;
