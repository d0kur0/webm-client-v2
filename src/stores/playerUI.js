import { writable } from "svelte/store";

const stateStruct = {
  // HTMLElement of root video container
  playerElement: undefined,
  // Flag of fullscreen mode
  isFullscreen: false,

  // TimeoutID for controls visible
  showControlsTimeout: undefined,
  // Flag of visible controls
  showControls: true,
};

// Store factory
const createStore = () => {
  const { subscribe, set, update } = writable(stateStruct, function start(set) {
    return () => set(stateStruct);
  });

  return {
    set,
    subscribe,

    toggleControls() {
      update((store) => {
        const timeoutHandler = () => {
          const elementFromPoints = document.elementFromPoint(
            window.mousePosition.X,
            window.mousePosition.Y
          );

          const isMouseOnControls = elementFromPoints
            ? elementFromPoints.closest(".controls")
            : false;

          const isTouch = matchMedia(
            "(hover: none) and (pointer: fine), (hover: none) and (pointer: coarse)"
          ).matches;

          if (isMouseOnControls && !isTouch) {
            store.showControlsTimeout = setTimeout(timeoutHandler, 2500);
            return;
          }

          update(function (store) {
            store.showControls = false;
            return store;
          });
        };

        clearTimeout(store.showControlsTimeout);
        store.showControlsTimeout = setTimeout(timeoutHandler, 2500);
        store.showControls = true;

        return store;
      });
    },
  };
};

export const playerUI = createStore();
