import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Renders simple markdown-style emphasis (`**bold**`) used in the SEO
 * semantic-binding copy blocks, without pulling in a full parser.
 */
export default function RichText({ text, className, style }: Props) {
  const parts = text.split('**');
  const nodes: ReactNode[] = parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

  return (
    <span className={className} style={style}>
      {nodes}
    </span>
  );
}
