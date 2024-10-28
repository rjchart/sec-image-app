import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useHistory } from 'react-router-dom';

export const TagList: React.FC<{ tags: string[] }> = React.memo(({ tags }) => {
  const history = useHistory();
  return <div className={css(styles.tagBox)}>
    {tags?.map((tag, index) => (
      <a
        key={'tag-' + index}
        className={css(styles.tag)}
        href={`/image?keyword=${tag}`}
      >
        {tag}
      </a>
    ))}
  </div>
});

const styles = StyleSheet.create({
  tagBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  tag: {
    width: 'max-contents',
    height: '20px',
    backgroundColor: '#A9CBD7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    padding: '5px',
    cursor: 'pointer',
  },
});
