/* eslint react/no-multi-comp:"off", react/display-name:"off" */
import { TextStyler } from '@components/ui/PortableText/PortableText.Styled';
import { parseError } from '@lib/errors';
// TODO: future. use html-to-image with script imported fonts instead of font-face defined
import { toPng, toJpeg } from 'html-to-image';
import html2canvas from 'html2canvas';
import { Page, PageProps } from './Page';
import { PreviewCardWrapper } from './QuickreadCard.styled';

const saveAs = (blob: string, fileName: string) => {
  const elem = window.document.createElement('a');
  elem.href = blob;
  elem.download = fileName;
  elem.style.display = 'none';
  // eslint-disable-next-line unicorn/prefer-dom-node-append
  (document.body || document.documentElement).appendChild(elem);
  if (typeof elem.click === 'function') {
    elem.click();
  } else {
    elem.target = '_blank';
    elem.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
  }
  URL.revokeObjectURL(elem.href);
  elem.remove();
};

const exportPng = async (targetId: string): Promise<boolean> => {
  try {
    const html = document.querySelector('html');
    const body = document.querySelector('html');

    if (!html || !body) {
      console.error('Failed to find html or body tag in screenshot for:', targetId);
      return false;
    }

    const htmlWidth = html.clientWidth;
    const bodyWidth = body.clientWidth;

    /* eslint-disable-next-line unicorn/prefer-query-selector */
    const data = document.getElementById(`${targetId}`);

    console.log({ body, bodyWidth, data, html, htmlWidth });

    if (!data) {
      console.error('Failed element for screenshot for:', targetId);
      return false;
    }

    const desiredWidth = data.scrollWidth - data.clientWidth;

    const normalizedHtmlWidth =
      desiredWidth > data.clientWidth ? htmlWidth + desiredWidth : htmlWidth;
    const normalizedBodyWidth =
      desiredWidth > data.clientWidth ? bodyWidth + desiredWidth : bodyWidth;

    html.style.width = `${normalizedHtmlWidth}px`;
    body.style.width = `${normalizedBodyWidth}px`;

    console.log({
      body: body.style.width,
      desiredWidth,
      html: html.style.width,
      normalizedBodyWidth,
      normalizedHtmlWidth,
    });

    return await html2canvas(data as HTMLElement, {
      allowTaint: true,
      scale: 2,
      useCORS: true,
    })
      .then((canvas) => canvas.toDataURL('image/png', 1))
      .then((image) => {
        saveAs(image, `${targetId}=${new Date()}`);
        // changed from null. Make sure OK.
        html.style.width = null;
        body.style.width = null;
      })
      .then(() => true);
  } catch (error) {
    console.error('Failed to export png at "exportPng", error:', parseError(error));
    return false;
  }
};

const createImage = async (targetId: string): Promise<boolean> => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');

  if (!html || !body) {
    console.error('Failed to find html or body tag in screenshot for:', targetId);
    return false;
  }

  /* eslint-disable-next-line unicorn/prefer-query-selector */
  const data = document.getElementById(targetId);

  if (!data) {
    console.error('Failed element for screenshot for:', targetId);
    return false;
  }

  const { clientWidth: htmlWidth } = html;
  const { clientWidth: bodyWidth } = body;
  const { clientWidth: dataWidth, scrollWidth: dataScrollWidth } = data;

  const widthOffset = dataScrollWidth - dataWidth;

  const dataOverflowsX = widthOffset > dataWidth;

  const adjustedHtmlWidth = dataOverflowsX ? htmlWidth + widthOffset : htmlWidth;
  const adjustedBodyWidth = dataOverflowsX ? bodyWidth + widthOffset : bodyWidth;

  /* eslint-disable unicorn/consistent-destructuring */
  html.style.width = `${adjustedHtmlWidth}px`;
  body.style.width = `${adjustedBodyWidth}px`;
  /* eslint-enable unicorn/consistent-destructuring */

  console.log({
    adjustedBodyWidth,
    adjustedHtmlWidth,
    bodyStyle: body.style.width,
    bodyWidth,
    data,
    dataOverflowsX,
    dataScrollWidth,
    dataWidth,
    htmlStyle: html.style.width,
    htmlWidth,
    widthOffset,
  });

  const canvas = await html2canvas(data, {
    allowTaint: true,
    height: 800,
    scale: 1,
    useCORS: true,
    width: 800,
    // windowWidth: adjustedBodyWidth,
  });

  document.body.append(canvas);

  console.log({ canvas });
  const dataUrl = canvas.toDataURL('image/png', 1);

  const timeStamp = new Date();
  const fileName = `${targetId}=${timeStamp.toISOString()}.png`;

  const img = new Image();
  img.src = dataUrl;
  document.body.append(img);

  return true;
};

const buildImage = async (cardId: string) => {
  /* eslint-disable-next-line unicorn/prefer-query-selector */
  const card = document.getElementById(cardId);

  if (!card) throw new Error('damnit');

  const dataUrl = await toJpeg(card, { cacheBust: true, height: 400, width: 400 });
  /* const img = new Image();
  img.src = dataUrl;
  document.body.append(img); */

  const link = document.createElement('a');
  link.download = 'sample.jpeg';
  link.href = dataUrl;
  link.click();
};

const test = async (cardId: string) => {
  /* eslint-disable-next-line unicorn/prefer-query-selector */
  // const card = document.getElementById(cardId);
  const card = document.body;

  if (!card) window.alert('Could not find card');

  const canvas = await html2canvas(card, { allowTaint: true, useCORS: true });

  if (!canvas) window.alert('Could not build canvas.');

  document.body.append(canvas);
};

export const PrintableCard = (props: PageProps) => {
  const { pageContent, stackIndex } = props;

  const cardId = `card-${pageContent?._id}-${stackIndex}`;

  console.log([cardId]);

  return (
    <>
      <PreviewCardWrapper>
        <Page id={cardId} {...props} />
      </PreviewCardWrapper>
      {/* TODO: [future] have button status indicated for exportPng promise */}
      <button
        type='button'
        onClick={() => {
          // exportPng(cardId);
          // createImage(cardId);
          buildImage(cardId);
          // test(cardId);
        }}>
        Export Card
      </button>
    </>
  );
};
