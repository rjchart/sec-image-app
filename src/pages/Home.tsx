import React, { useCallback, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

import { KeyboardKey } from '../utils/KeyBoardKey.ts';
import { BIBLE_API } from './constant.ts';

interface VersicleOrHymn {
  title: string,
  contents: {
    isBold: boolean,
    content: string,
  }[];
}

const LINK_TITLE = ['주일 말씀 & 순서', '예배 순서 & 교회소식', '주보 링크'];

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [versicle, setVersicle] = useState<VersicleOrHymn>({ title: '', contents: [] });
  const [links, setLinks] = useState([]);

  const showVersicle = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BIBLE_API}/broadcast/versicle?index=${value}`,
      );
      setVersicle(data);
    } finally {
      setIsLoading(false);
    }
  }, [setVersicle, setIsLoading]);

  const showHymn = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BIBLE_API}/broadcast/hymn?index=${value}`
      );
      data.contents = data.contents.map((v: string) => ({ content: v, isBold: false }));
      setVersicle(data);
    } finally {
      setIsLoading(false);
    }
  }, [setVersicle, setIsLoading]);

  const showBible = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BIBLE_API}/broadcast/bible?search=${value}`
      );
      setVersicle(data);
    } finally {
      setIsLoading(false);
    }
  }, [setVersicle, setIsLoading]);

  const showLyrics = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BIBLE_API}/broadcast/lyrics?search=${value}`
      );
      setVersicle(data);
    } finally {
      setIsLoading(false);
    }
  }, [setVersicle, setIsLoading]);

  const copy = useCallback((index: number) => {
    const element = document.getElementById('copy') as HTMLInputElement;
    const { content: copyData } = versicle.contents[index];
    element!.value = copyData?.replace(/ ^/, '');
    element!.select();
    document.execCommand('copy');
  }, [versicle]);

  const showNotice = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BIBLE_API}/broadcast/notice-link`);
      setLinks(data);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const RES_INPUT_CSS = 'w-full h-[40px] rounded-[10px] border-black p-[18px] mb-[16px]';
  const RES_LABEL_CSS = 'font-[Spoqa] font-bold mb-[8px] text-white';
  const CONTENT_CSS = 'w-max max-w-[95%] relative mb-[12px] whitespace-pre-wrap last:first:block [&:nth-child(1n)]:first:hidden';
  return (
    <div className={'flex flex-col w-full h-full items-center justify-center bg-black pt-[50px]'}>
      <article className={'relative flex items-center justify-center w-full h-[600px] bg-white'}>
        <div className={'absolute text-white text-6xl font-sans top-[-10px] translate-y-[-100%] font-bold'}>Search
          Bible
        </div>
        <div
          className={'flex-shrink w-[300px] h-[600px] border-black mr-[20px] px-[20px] py-[80px] bg-blue-400'}>
          <div className={RES_LABEL_CSS}>1. 교독문 입력</div>
          <input
            className={RES_INPUT_CSS}
            onKeyDown={async (e) => {
              e.persist();
              e.stopPropagation();
              const inputElement = e.target as HTMLInputElement;
              switch (e.keyCode) {
                case KeyboardKey.Enter: // Enter
                  await showVersicle(inputElement.value);
                  return;
                default:
                  return;
              }
            }}
          />
          <div className={RES_LABEL_CSS}>2. 찬송가 입력</div>
          <input
            className={RES_INPUT_CSS}
            onKeyDown={async (e) => {
              e.persist();
              e.stopPropagation();
              const inputElement = e.target as HTMLInputElement;
              switch (e.keyCode) {
                case KeyboardKey.Enter: // Enter
                  await showHymn(inputElement.value);
                  return;
                default:
                  return;
              }
            }}
          />
          <div className={RES_LABEL_CSS}>3. 성경 입력</div>
          <input
            className={RES_INPUT_CSS}
            onKeyDown={async (e) => {
              e.persist();
              e.stopPropagation();
              const inputElement = e.target as HTMLInputElement;
              switch (e.keyCode) {
                case KeyboardKey.Enter: // Enter
                  await showBible(inputElement.value);
                  return;
                default:
                  return;
              }
            }}
          />
          <div className={RES_LABEL_CSS}>4. CCM 입력</div>
          <input
            className={RES_INPUT_CSS}
            onKeyDown={async (e) => {
              e.persist();
              e.stopPropagation();
              const inputElement = e.target as HTMLInputElement;
              switch (e.keyCode) {
                case KeyboardKey.Enter: // Enter
                  await showLyrics(inputElement.value);
                  return;
                default:
                  return;
              }
            }}
          />
          <input type={'button'} className={'bg-blue-900 px-2 py-1 border-2 text-white font-bold cursor-pointer'}
                 value={'주보 로드'}
                 onClick={() => showNotice()}/>
          {links.map((link, index) => (
            <div
              onClick={() => window.open(link)}
              className={'mt-[8px] text-[14px] text-white font-bold cursor-pointer'}
              key={'link-' + index}
            >
              👉 {LINK_TITLE[index]}
            </div>
          ))}
          <input id={'copy'} style={{ opacity: 0 }}/>
        </div>
        <div className={'flex-shrink-[0.5] w-[700px] h-[600px] p-[20px] select-auto overflow-y-auto'}>
          <h3 className={'mb-[12px] text-2xl font-bold'}>{versicle.title?.replace('.txt', '')}</h3>
          {versicle.contents.map((item, index) => (
            <p
              key={'content-' + index}
              className={item.isBold ? CONTENT_CSS + ' font-bold' : CONTENT_CSS}
              id={'content-' + index}
            >
              {item.content}
              <span
                className={'absolute -right-[4px] top-2/4 translate-x-full -translate-y-1/2 cursor-pointer hover:scale-125 active:scale-150'}
                onClick={() => copy(index)}
              >
                <img src={'/copy.svg'} width={'30px'} height={'30px'}/>
              </span>
            </p>
          ))}
        </div>
      </article>
      {isLoading && (
        <div className={'absolute top-0 left-0 w-full h-full flex justify-center items-center'}>
          <ColorRing/>
        </div>
      )}
    </div>
  );
};
