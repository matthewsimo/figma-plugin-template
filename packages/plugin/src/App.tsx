import { useCallback, useEffect } from "react";
import { UIPostMessage } from "./common/msg";
import { useAppState, useDispatch, useFigmaData } from "./hooks/appContext";
import { LogData, LogElement } from "./components/logger";

function App() {
  const dispatch = useDispatch();

  const { initialized } = useAppState();
  const data = useFigmaData();

  const handleMessage = useCallback(
    (msg: UIPostMessage) => {
      true && console.log({ handleMessage: true, msg });

      dispatch({
        type: "UPDATE_FIGMA_DATA",
        payload: {
          ...msg.data.pluginMessage,
        },
      });

      dispatch({
        type: "SET_LOADING",
        payload: {
          isLoading: false,
        },
      });

      if (!initialized) {
        dispatch({
          type: "SET_INITIALIZED",
        });
      }
    },
    [dispatch, initialized]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <LogElement>
      <main>
        <h1>Figma Plugin Template</h1>
        <div>Add UI</div>
        <div>
          <LogData data={data} />
        </div>
      </main>
    </LogElement>
  );
}

export default App;
