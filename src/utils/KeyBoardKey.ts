export enum KeyboardKey {
  Enter = 13,
}

export const onKeyEnter = async (e: any, func: () => Promise<void> | void) => {
  e.persist();
  e.stopPropagation();
  switch (e.keyCode) {
    case KeyboardKey.Enter: // Enter
      await func();
      return;
    default:
      return;
  }
}
