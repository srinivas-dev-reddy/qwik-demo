import {
  component$,
  useClientEffect$,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const store = useStore({
    count: 1,
    start: false,
  });

  useClientEffect$(({ track, cleanup }) => {
    track(store, "start");
    console.log("Starting clock");
    if (!store.start) return;
    const timer = setInterval(() => {
      store.count++;
    }, 400);

    cleanup(() => {
      clearInterval(timer);
    });
  });

  return (
    <div>
      <h1>Count : {store.count}</h1>
      <button
        onClick$={() => {
          store.start = true;
        }}
      >
        Start
      </button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik 2",
};
