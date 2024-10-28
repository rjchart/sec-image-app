import { FC } from 'react';

export type SecImage = {
  code: string,
  pageCount: number,
  title: string,
  artists: { artist: string }[],
  parodys: { parody: string }[],
  type: string,
  tags: { tag: string, male: string, female: string }[],
  language: string,
}

export const SecImageItem: FC<{ item: SecImage, index: number }> = (
  {
    item,
    index,
  }) => {

  return <div
    key={'ima-' + index}
    className={'w-[300px] flex-col border-[#cc9999] border-[1px] rounded-xl'}
  >
    <h1
      className={'p-2 whitespace-nowrap m-0 font-bold font-sans text-white text-lg text-shadow bg-[#cc9999] overflow-hidden rounded-t-xl'}>
      <a href={`detail?code=${item.code}&pageCount=${item.pageCount}`}>{item.title}</a>
    </h1>
    <div className={'p-2 text-[#663333] bg-[#ffcccc] font-bold'}>{item.artists?.[0]?.artist ?? 'N/A'}</div>
    <div className={'flex'}>
      <div className={'w-32 h-48 bg-black flex flex-col justify-center'}>
        <a href={`detail?code=${item.code}&pageCount=${item.pageCount}`}>
          <img className={'w-full'} src={`https://minio-host.jakestory.me/sec-images/${item.code}/thumb/0.jpeg`}/>
        </a>
      </div>
      <table className={'table ml-2 box-border border-gray-300 font-bold color-[#696969]'}>
        <tbody>
        <tr className={'h-[20px]'}>
          <td className={'w-[70px]'}>Series</td>
          <td>
            <ul>
              {
                item.parodys.length === 0 && <li className={`cursor-pointer text-sm after:content-[','] last:after:content-none`}>N/A</li>
              }
              {
                item.parodys.map(({ parody }) => <li
                  className={`cursor-pointer text-sm after:content-[','] last:after:content-none`}>{parody}</li>)
              }
            </ul>
          </td>
        </tr>
        <tr className={'h-[20px]'}>
          <td className={'w-[70px]'}>Type</td>
          <td>{item.type}</td>
        </tr>
        <tr className={'h-[20px]'}>
          <td className={'w-[70px]'}>Lang</td>
          <td>{item.language}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div className={'p-2 mt-2 flex flex-wrap gap-1 font-bold color-[#696969]'}>
      {item.tags.map((tag) => <div className={'p-1 bg-gray-500 rounded text-sm text-white'}>{tag.tag}</div>)}
    </div>
    {/*<a href={`detail?code=${item.code}&pageCount=${item.pageCount}`} />*/}
    {/*<img src={item.thumb} alt={'thumb'} className={'w-[300px] h-[400px] mb-1.5'} />*/}
  </div>;
};
