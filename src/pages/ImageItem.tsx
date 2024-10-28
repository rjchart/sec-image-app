import React, { FC, useEffect, useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import axios from 'axios';



export const ImageItem: FC<{ item: { link: string, thumb: string, title: string }, index: number }> = (
  {
    item,
    index,
  }) => {

  return <a
    key={'ima-' + index}
    className={css(styles.imageWrapper)}
    href={`image/detail?url=${item.link}`}
  >
    <img src={item.thumb} alt={'thumb'} className={css(styles.image_thumb)} />
    <p className={css(styles.image_title)}>{item.title}</p>
  </a>;
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image_thumb: {
    width: 300,
    height: 400,
    marginBottom: 5,
  },
  image_title: {
    fontFamily: 'Spoqa',
    fontSize: 18,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    wordBreak: 'keep-all',
  }
});
