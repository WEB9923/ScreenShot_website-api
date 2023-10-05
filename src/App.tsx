import {ChangeEvent, Fragment, JSX, SyntheticEvent, useEffect, useState} from "react";
import Form from "./components/Form.tsx";
import Result from "./components/Result.tsx";
import axios, {AxiosResponse} from "axios";
import Loader from "./components/Loader.tsx";
const URL: string = import.meta.env.VITE__URL;
const KEY: string = import.meta.env.VITE__KEY;
export interface IState {
  isLoading: boolean;
  data: IData | object;
  error: string;
  inputValue: string;
  isMobile: boolean;
  isFullHeight: boolean;
}
export type IData = {
  requested_url: string;
  screenshot_url: string;
}
export default function App(): JSX.Element {
  const [state, setState] = useState<IState>({
    isLoading: false,
    data: {},
    error: "",
    inputValue: "",
    isMobile: false,
    isFullHeight: false
  });
  const [showFileNameInput, setShowFileNameInput] = useState<boolean>(false);
  const [fileNameValue, setFileNameValue] = useState<string>("");
  const handleChangeFileNameInput = ({target}: ChangeEvent<HTMLInputElement>): void => {
    setFileNameValue(target.value);
  }
  const downloadImage = async (): Promise<void> => {
    await axios.get(state?.data?.screenshot_url, {
      responseType: "blob",
      headers: {
        changeOrigin: false,
      }
    }).then((response: AxiosResponse): void => {
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileNameValue + ".png";
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }).catch((error) => {
      console.error('Error downloading image:', error);
    });
  }
  const handleChangeInput = ({target}: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => {
      return {
        ...prevState,
        inputValue: target.value
      }
    });
  }
  const handleChangeToggleMobile = (): void => {
    setState((prevState) => {
      return {
        ...prevState,
        isMobile: !prevState.isMobile
      }
    });
  }
  const handleChangeToggleFulWebsiteHeight = (): void => {
    setState((prevState) => {
      return {
        ...prevState,
        isFullHeight: !prevState.isFullHeight
      }
    });
  }
  const fetchData = async (e: SyntheticEvent<HTMLFormElement>): Promise<void | boolean> => {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        data: {},
        isLoading: true
      }
    });
    try {
      if (!state.inputValue || !state.inputValue.startsWith("https://")) {
        setState((prevState) => {
          return {
            ...prevState,
            error: "Please fill in the field or correct it(The protocol must be [https://])"
          }
        });
        return false;
      } else {
        const response: AxiosResponse = await axios
          .get(`${URL}?url=${state.inputValue}${!state.isMobile ? "" : "&width=410"}&full=${state.isFullHeight.toString()}`, {
            headers: {
              apikey: KEY
            }
          });
        if (response) {
          setState((prevState) => {
            return {
              ...prevState,
              data: {
                ...response.data
              }
            }
          });
        }
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      switch (err.response.status) {
        case 404:
          return setState((prevState) => {
            return {
              ...prevState,
              error: "The requested resource doesn't exist."
            }
          });
        case 400:
          return setState((prevState) => {
            return {
              ...prevState,
              error: "The request was unacceptable, often due to missing a required parameter."
            }
          });
        case 500 || 502 || 504:
          return setState((prevState) => {
            return {
              ...prevState,
              error: "Failed to process your request. Please try again after a few minutes."
            }
          });
        default: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          throw new Error(err.response.status);
        }
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: false
      }
    });
  }
  const reset = (): void => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: false,
        data: {},
        error: "",
        inputValue: "",
      }
    })
  }
  useEffect(() => {
    if (!state.inputValue) {
      reset();
    }
  }, [state.inputValue])
  return (
    <Fragment>
      <div className="w-full min-h-screen p-2 font-Pixelify bg-gray-700">
        <div className="container min-h-[350px] rounded-md mx-auto">
          <Form
            handleChangeInput={handleChangeInput}
            state={state}
            fetchData={fetchData}
            handleChangeToggleMobile={handleChangeToggleMobile}
            handleChangeToggleFulWebsiteHeight={handleChangeToggleFulWebsiteHeight}
          />
          <div className="relative min-h-[150px] mt-3">
            {state.isLoading && !state.error ? <Loader/> : null}
            {Object.keys(state.data).length > 1 ?
              <Result
                state={state}
                reset={reset}
                fileNameValue={fileNameValue}
                downloadImage={downloadImage}
                handleChangeFileNameInput={handleChangeFileNameInput}
                setShowFileNameInput={setShowFileNameInput}
                showFileNameInput={showFileNameInput}
              /> : null
            }
            {state.error &&
              <h1
                className={"absolute w-full text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-red-500 font-bold"}>
                {state.error}
              </h1>
            }
          </div>
        </div>
      </div>
    </Fragment>
  )
}

